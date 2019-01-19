/*global moment*/
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import ReactDOM from 'react-dom';
import WorkData from './../../../common/collections_2';
import { Tracker } from 'meteor/tracker';

/*global Bert, $*/

let traker = null;

Template.updateQuote.onRendered(function () {
    Meteor.subscribe('workSchema');
    Meteor.subscribe('tabletData');
    Meteor.subscribe('usersData');

    $('#quote-date-picker_2').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
    let ishDeyisibdir = '';
    let checkedUpdate = document.querySelector('#flatBoxUpdate');

    checkedUpdate.addEventListener('change', function () {
        Session.set('flatRate', !(Session.get('flatRate')));
    });
    traker = Tracker.autorun(() => {
        if (Session.get('is') !== '' && Session.get('is') !== ishDeyisibdir) {
            Session.set('flatRate', false);
            const ish = WorkData.findOne({ _id: Session.get('is') });
            ish.smallItemPacking && ish.smallItemPacking == -1
                ? (document.querySelector('#smallItemPackUpdate').checked = true, document.querySelector('#small_item_pack_2').disabled = true)
                : null;
            document.querySelector('#flatRateCashUpdate').defaultValue = ish.flatRate[0].cashAmount;
            document.querySelector('#flatRateCardUpdate').defaultValue = ish.flatRate[0].cardAmount;
            console.log(ish.flatRate[0].isTrue);
            document.querySelector('#flatBoxUpdate').checked = ish.flatRate[0].isTrue;
            Session.set('flatRate', ish.flatRate[0].isTrue);
            ish.flatRate[0].isTrue
                ? (
                    document.querySelector('#flatRateUpdate_').classList.remove('hide')
                )
                : document.querySelector('#flatRateUpdate_').classList.add('hide');

            document.querySelector('#flatBoxUpdate').addEventListener('change', function () {
                if (document.querySelector('#flatBoxUpdate').checked === false) {
                    document.querySelector('#flatRateUpdate_').classList.add('hide');
                } else {
                    document.querySelector('#flatRateUpdate_').classList.remove('hide');
                }
            });
            ishDeyisibdir = Session.get('is');
        }
    });
});

Template.updateQuote.helpers({
    istifadechi: function () {
        return (
            WorkData.findOne({ _id: Session.get('is') })
        );
    },
    isGasFee: () => {
        return (WorkData.findOne({ _id: Session.get('is') }) && WorkData.findOne({ _id: Session.get('is') }).gasFee < 0
            ? true
            : false);
    },
    isFlat: function () {
        return WorkData.findOne({ _id: Session.get('is') })
            ? WorkData.findOne({ _id: Session.get('is') }).flatRate.isTrue
            : false;
    }
});

Template.updateQuote.events({
    'click #resend-email': function (e) {
        e.preventDefault();

        let job = WorkData.findOne({ _id: Session.get('is') });
        let companyInfo = job.companyInfo;
        let bazaIsci = [];
        let bazaIsciOb = document.getElementsByClassName('secilmisIsci');
        let trucksSelected = (function () {
            let massiv = document.getElementsByClassName('truck-select');
            let massivFilter = [];
            let i = 0;

            for (i = 0; i < massiv.length; i++) {
                massivFilter.push({
                    truck: massiv[i].value
                });
            }
            return massivFilter;
        })();

        let t = 0;
        for (t = 0; t < bazaIsciOb.length; t++) {
            bazaIsci.push({ id: (bazaIsciOb[t].id) });
        }

        let workDate = document.getElementById('quote-date-picker_2').value;

        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map((address) => {
            addresses.push(address.value);
        });


        let doc = {
            _id: Session.get('is'),
            clientFirstName: document.getElementById('firstName_2').value,
            clientLastName: document.getElementById('lastName_2').value,
            phoneNumber: document.getElementById('phoneNumber_2').value,
            phoneAdditional: document.getElementById('phoneNumber_2_additional').value,
            email: document.getElementById('musteriEmail_2').value,
            addresses,
            workDate: moment(workDate).format('MM/DD/YYYY'),
            workMustBeginTime: (function () {
                let birinci = document.getElementById('update-input-custom-time').value;
                let ikinci = document.getElementById('update-select-arrive-time').value;

                if (ikinci === 'Select moving time window' || ikinci === 'Custom') {
                    return birinci;
                } else {
                    return ikinci;
                }
            })(),
            price: document.getElementById('quote_price_2').value,
            laborTime: document.getElementById('labor_time_2').value,
            hourlyRatesCash: document.getElementById('hourly_rates_cash_2').value,
            hourlyRatesCard: document.getElementById('hourly_rates_card_2').value,
            trucks: trucksSelected,
            companyInfo,
            doubleDrive: document.getElementById('updated-double-drive-value').value,
            gasFee: document.getElementById('gas_fee_2').value,
            smallItemPacking: document.getElementById('small_item_pack_2').value,
            largeItemFee: document.getElementById('large_item_fee_2').value,
            movingSize: Session.get('movingSize'),
            workers: Session.get('secilmisIsciler'),
            note: document.getElementById('textarea2').value,
            trucksTemp: Session.get('trucklar'),
            flatRate: [{
                isTrue: Session.get('flatRate'),
                cashAmount: !isNaN(document.querySelector('#flatRateCashUpdate').value) ? document.querySelector('#flatRateCashUpdate').value : 0,
                cardAmount: !isNaN(document.querySelector('#flatRateCardUpdate').value) ? document.querySelector('#flatRateCardUpdate').value : 0
            }],
            comment: document.getElementById('textarea2').value,
            deposit: document.getElementById('deposit-update').value
        };

        Meteor.call('emailGonder', doc, (err, res) => err ? console.log(err) : console.log(res));
    },
    'click #work-update': function (e) {
        e.preventDefault;
        let bazaIsci = [];
        let bazaIsciOb = document.getElementsByClassName('secilmisIsci');
        let trucksSelected = (function () {
            let massiv = document.getElementsByClassName('truck-select');
            let massivFilter = [];
            let i = 0;

            for (i = 0; i < massiv.length; i++) {
                massivFilter.push({
                    truck: massiv[i].value
                });
            }
            return massivFilter;
        })();

        let t = 0;
        for (t = 0; t < bazaIsciOb.length; t++) {
            bazaIsci.push({ id: (bazaIsciOb[t].id) });
        }

        let workDate = document.getElementById('quote-date-picker_2').value;

        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map((address) => {
            addresses.push(address.value);
        });


        let doc = {
            _id: Session.get('is'),
            clientFirstName: document.getElementById('firstName_2').value,
            clientLastName: document.getElementById('lastName_2').value,
            phoneNumber: document.getElementById('phoneNumber_2').value,
            phoneAdditional: document.getElementById('phoneNumber_2_additional').value,
            email: document.getElementById('musteriEmail_2').value,
            addresses,
            workDate: moment(workDate).format('MM/DD/YYYY'),
            workMustBeginTime: (function () {
                let birinci = document.getElementById('update-input-custom-time').value;
                let ikinci = document.getElementById('update-select-arrive-time').value;

                if (ikinci === 'Select moving time window' || ikinci === 'Custom') {
                    return birinci;
                } else {
                    return ikinci;
                }
            })(),
            price: document.getElementById('quote_price_2').value,
            laborTime: document.getElementById('labor_time_2').value,
            hourlyRatesCash: document.getElementById('hourly_rates_cash_2').value,
            hourlyRatesCard: document.getElementById('hourly_rates_card_2').value,
            trucks: trucksSelected,
            doubleDrive: document.getElementById('updated-double-drive-value').value,
            gasFee: document.getElementById('gas_fee_2').value,
            smallItemPacking: document.getElementById('small_item_pack_2').value,
            largeItemFee: document.getElementById('large_item_fee_2').value,
            movingSize: Session.get('movingSize'),
            workers: Session.get('secilmisIsciler'),
            note: document.getElementById('textarea2').value,
            trucksTemp: Session.get('trucklar'),
            flatRate: [{
                isTrue: Session.get('flatRate'),
                cashAmount: !isNaN(document.querySelector('#flatRateCashUpdate').value) ? document.querySelector('#flatRateCashUpdate').value : 0,
                cardAmount: !isNaN(document.querySelector('#flatRateCardUpdate').value) ? document.querySelector('#flatRateCardUpdate').value : 0
            }],
            comment: document.getElementById('textarea2').value,
            deposit: document.getElementById('deposit-update').value
        };

        Meteor.call('updateWork', doc, function (err) {
            if (err) {
                Bert.alert({
                    title: 'There is problem while updating job informtion',
                    message: err.reason,
                    type: 'danger',
                });
            } else {
                Bert.alert({
                    title: 'Information saved succesfully',
                    type: 'success',
                });
            }
        });
    },
    'click #hide-update-quote': function () {
        document.querySelector('#updateQuote2').classList.add('hide');
        ReactDOM.unmountComponentAtNode('');
    }
});

Template.preQuote.onRendered(function () {
    $(document).ready(function () {
        $('select').material_select();
    });
    Meteor.subscribe('usersData');
    Meteor.subscribe('workSchema');

    $('#quote-date-picker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
});


Template.preQuote.events({
    'click #work-request': function (e) {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phone = document.getElementById('phoneNumber').value;
        let phoneAdditional = document.getElementById('phoneNumberAdditional').value;
        let email = document.getElementById('musteriEmail').value;
        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map((address) => {
            addresses.push(address.value);
        });
        let movingDate = document.getElementById('quote-date-picker').value;
        let movingDateConverted = moment(movingDate, 'DD MMMM,YYYY').format('MM/DD/YYYY');
        let price = document.getElementById('quote_price').value;
        let minimumLaborTime = document.getElementById('labor_time').value;
        let hourlyRatesCash = document.getElementById('hourly_rates_cash').value;
        let hourlyRatesCard = document.getElementById('hourly_rates_card').value;
        let trucksArray = document.getElementsByClassName('truck-select');
        //trucks loop ele array yarat
        let trucks = [];
        let i = 0;
        for (i = 0; i < trucksArray.length; i++) {
            trucks.push({
                truck: Number(trucksArray[i].value)
            });
        }
        let doubleDrive = document.getElementById('double_drive').value;
        let gasFee = document.getElementById('gas_fee').value;
        let smallPackingItems = document.getElementById('small_item_pack').value;
        let largeItemFee = document.getElementById('large_item_fee').value;
        let jobNumber = document.getElementById('quote-job-number').value;
        let movingSize = document.getElementById('moving_size_2').value;
        let note = document.getElementById('textarea1').value;
        let secilmisIsci = document.getElementsByClassName('secilmisIsci');
        let iscilerinSayi = document.getElementById('iscinin-sayi').value;
        if (isNaN(iscilerinSayi)) {
            iscilerinSayi = 0;
        }
        let workMustBeginTime = [
            document.getElementById('customTime--1').value,
            document.getElementById('customTime--2').value
        ];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCash').value : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCard').value : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy = document.getElementById('takenBy--value').value;

        function idniSec(soz) {
            var baslama = soz.indexOf(':');
            var secme = soz.substr(baslama + 1, soz.lenght);
            return secme;
        }

        let baza = [];
        for (let i = 0; i < secilmisIsci.length; i++) {
            baza.push({ id: idniSec(secilmisIsci[i].value) });
        }

        // declare job number
        function jobNumber_() {
            document.getElementById('quote-job-number').value = Math.random().toString(36).substr(2, 5);
        }

        let jobInfo = {
            firstName,
            lastName,
            phone,
            phoneAdditional,
            email,
            addresses,
            movingDateConverted,
            price,
            minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallPackingItems,
            largeItemFee,
            jobNumber,
            movingSize,
            note,
            baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate,
            flatRateCash,
            flatRateCard
        };


        Meteor.call('quotaniBazayaElaveEt',
            firstName,
            lastName,
            phone,
            phoneAdditional,
            email,
            addresses,
            movingDateConverted,
            price,
            minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallPackingItems,
            largeItemFee,
            jobNumber,
            movingSize,
            note,
            baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate,
            flatRateCash,
            flatRateCard,
            comment,
            deposit,
            takenBy,
            function (err) {
                if (err) {
                    Bert.alert({
                        title: 'Imposible add quote to database',
                        message: err.reason,
                        type: 'danger',
                    });
                } else {
                    Bert.alert({
                        title: 'Success',
                        message: 'Information added to database successfully',
                        type: 'success'
                    });

                    Meteor.call('emailGonder', jobInfo, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            document.querySelector('#flatRateCheck').checked = false;
                            document.getElementById('gas_fee').disabled = false;

                            document.querySelector('#paymentContent').classList.remove('hide');
                            document.querySelector('#flatRate_').classList.add('hide');

                            window.addresses.resetComponent();

                            document.getElementById('quote-request').reset();

                            // run job number
                            jobNumber_();

                            Session.set('reset', true);

                            Session.get('flatRate')
                                ? (
                                    document.querySelector('#flatRate_').classList.remove('hide'),
                                    document.querySelector('#paymentContent').classList.add('hide'),
                                    document.querySelector('#flatRateCheck').checked = true
                                )
                                : (
                                    document.querySelector('#flatRate_').classList.add('hide'),
                                    document.querySelector('#paymentContent').classList.remove('hide'),
                                    document.querySelector('#flatRateCheck').checked = false
                                );
                        }
                    });
                }
            }
        );
    },
    // 'click #quote-2nd-header': function () {
    //     let tarix = document.getElementById('quote-date-picker').value;
    //     let tarixC = new Date(tarix);
    //     console.log(moment(tarixC).format('YYYY/MM/DD'));
    // },
    // 'click .add-truck': function () {
    //     let addRoot = document.getElementsByClassName('add-truck-root');
    //     let lastInlist = document.getElementsByClassName('add-truck-root')[addRoot.length - 1];
    //     lastInlist.insertAdjacentHTML('afterend',
    //         `<div class="input-field valideyn col s12 m6 l3 add-truck-root">
    //         <i class="material-icons add-truck isare">add_circle</i>
    //         <!-- <input id="quote-turck-number" class="xx" type="number" placeholder="Truck Number" /> -->
    //         <div class="select-wrapper"><span class="caret">▼</span><input type="text" class="select-dropdown" readonly="true" data-activates="select-options-b5d6d601-2e7e-ceb2-3f55-7e62cb96d196" value="Select Truck Size"><ul id="select-options-b5d6d601-2e7e-ceb2-3f55-7e62cb96d196" class="dropdown-content select-dropdown "><li class="disabled "><span>Select Truck Size</span></li><li class=""><span>16ft box truck</span></li><li class=""><span>18ft box truck</span></li><li class=""><span>20ft box truck</span></li><li class=""><span>22ft box truck</span></li><li class=""><span>24ft box truck</span></li><li class=""><span>26ft box truck</span></li></ul><select title="moving_size" name="truck_size" class="initialized">
    //             <option value="select_truck_size" selected="" disabled="">Select Truck Size</option>
    //             <option value="16ft box truck">16ft box truck</option>
    //             <option value="18ft box truck">18ft box truck</option>
    //             <option value="20ft box truck">20ft box truck</option>
    //             <option value="22ft box truck">22ft box truck</option>
    //             <option value="24ft box truck">24ft box truck</option>
    //             <option value="26ft box truck">26ft box truck</option>
    //         </select></div>
    //     </div>`
    //     );
    //     n += 1;
    // }
});

Template.quoteTam.events({
    'click #update-quote-open': function () {
        $(document).ready(function () {
            $('select').material_select();
        });
    },
    'click #close-update-work': function () {
        ReactDOM.unmountComponentAtNode(document.querySelector('#truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#update_time_window'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#number-of-movers2'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#moving-size'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#double-drive-time-update'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#iscilerinSiyahisiRender'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#tempTruckUpdate'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#addressesIdUpdate'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#takenBy--update'));
        traker.stop();
        // ReactDOM.unmountComponentAtNode(document.querySelector('#tempTruck'));

        document.querySelector('#quoteTam').classList.remove('hide');
        document.querySelector('#updateQuote2').classList.add('hide');
    }
});

Template.quoteTam.onDestroyed(function () {
    ReactDOM.unmountComponentAtNode(document.querySelector('#truck-list-update'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#update_time_window'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#number-of-movers2'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#moving-size'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#double-drive-time-update'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#iscilerinSiyahisiRender'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#tempTruckUpdate'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#quoteTam'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#addressesIdUpdate'));
    ReactDOM.unmountComponentAtNode(document.querySelector('#takenBy--update'));

    document.querySelector('#quoteTam').classList.remove('hide');
    document.querySelector('#updateQuote2').classList.add('hide');

    traker.stop();

    console.log('Quote tam onDestroyed');
})

Template.preQuote.onRendered(function () {
    let checked = document.querySelector('#flatRateCheck');
    checked.addEventListener('change', function () {
        Session.set('flatRate', !(Session.get('flatRate')));
    });
})

Template.navBar.events({
    'click .quoteDuymesi': function () {
        document.querySelector('#quoteTam') ? document.querySelector('#quoteTam').classList.remove('hide') : '';
        document.querySelector('#updateQuote2') ? document.querySelector('#updateQuote2').classList.add('hide') : '';
    }
});
