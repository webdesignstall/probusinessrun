/*global moment*/
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import ReactDOM from 'react-dom';
import WorkData from './../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';

/*global Bert, $*/

let tracker_ = null;

Template.updateQuote.onRendered(function() {
    Meteor.subscribe('workSchema');
    Meteor.subscribe('tabletData');
    Meteor.subscribe('usersData');

    $('#quote-date-picker_2').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false, // Close upon selecting a date,
    });
    let ishDeyisibdir = '';
    let checkedUpdate = document.querySelector('#flatBoxUpdate');

    checkedUpdate.addEventListener('change', function() {
        Session.set('flatRate', !Session.get('flatRate'));
    });
    tracker_ = Tracker.autorun(() => {
        if (Session.get('is') !== '' && Session.get('is') !== ishDeyisibdir) {
            Session.set('flatRate', false);
            const ish = WorkData.findOne({ _id: Session.get('is') });
            ish.smallItemPacking && ish.smallItemPacking == -1
                ? document.querySelector('#smallItemPackUpdate')
                    ? ((document.querySelector('#smallItemPackUpdate').checked = true),
                    (document.querySelector('#small_item_pack_2').disabled = true))
                    : null
                : null;
            document.querySelector('#flatRateCashUpdate') &&
                (document.querySelector('#flatRateCashUpdate').defaultValue = ish.flatRate[0].cashAmount);
            document.querySelector('#flatRateCardUpdate') &&
                (document.querySelector('#flatRateCardUpdate').defaultValue = ish.flatRate[0].cardAmount);
            document.querySelector('#flatBoxUpdate') &&
                (document.querySelector('#flatBoxUpdate').checked = ish.flatRate[0].isTrue);
            Session.set('flatRate', ish.flatRate[0].isTrue);
            document.querySelector('#flatRateUpdate_')
                ? ish.flatRate[0].isTrue
                    ? document.querySelector('#flatRateUpdate_').classList.remove('hide')
                    : document.querySelector('#flatRateUpdate_').classList.add('hide')
                : null;

            document.querySelector('#flatBoxUpdate')
                ? document.querySelector('#flatBoxUpdate').addEventListener('change', function() {
                    if (document.querySelector('#flatBoxUpdate').checked === false) {
                        document.querySelector('#flatRateUpdate_').classList.add('hide');
                    } else {
                        document.querySelector('#flatRateUpdate_').classList.remove('hide');
                    }
                })
                : null;
            ishDeyisibdir = Session.get('is');
        }
    });
});

Template.updateQuote.helpers({
    istifadechi: function() {
        return WorkData.findOne({ _id: Session.get('is') });
    },
    isGasFee: () => {
        return WorkData.findOne({ _id: Session.get('is') }) && WorkData.findOne({ _id: Session.get('is') }).gasFee < 0
            ? true
            : false;
    },
    isFlat: function() {
        return WorkData.findOne({ _id: Session.get('is') })
            ? WorkData.findOne({ _id: Session.get('is') }).flatRate.isTrue
            : false;
    },
    isConfirmed: () => {
        return WorkData.findOne({ _id: Session.get('is') })
            ? !WorkData.findOne({ _id: Session.get('is') }).quote
            : false;
    },
});

Template.updateQuote.events({
    'click #resend-email': function(e) {
        e.preventDefault();

        let job = WorkData.findOne({ _id: Session.get('is') });
        let companyInfo = job.companyInfo;
        let bazaIsci = [];
        let bazaIsciOb = document.getElementsByClassName('secilmisIsci');
        let trucksSelected = (function() {
            let massiv = document.getElementsByClassName('truck-select');
            let massivFilter = [];
            let i = 0;

            for (i = 0; i < massiv.length; i++) {
                massivFilter.push({
                    truck: massiv[i].value,
                });
            }
            return massivFilter;
        })();

        let t = 0;
        for (t = 0; t < bazaIsciOb.length; t++) {
            bazaIsci.push({ id: bazaIsciOb[t].id });
        }

        let workDate = document.getElementById('quote-date-picker_2').value;

        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map(address => {
            addresses.push(address.value);
        });

        let doc = {
            _id: Session.get('is'),
            firstName: document.getElementById('firstName_2').value,
            lastName: document.getElementById('lastName_2').value,
            phone: document.getElementById('phoneNumber_2').value,
            phoneAdditional: document.getElementById('phoneNumber_2_additional').value,
            email: document.getElementById('musteriEmail_2').value,
            addresses,
            movingDateConverted: moment(workDate).format('MM/DD/YYYY'),
            workMustBeginTime: [
                document.getElementById('customTime--1').value,
                document.getElementById('customTime--2').value,
            ],
            price: document.getElementById('quote_price_2').value,
            minimumLaborTime: document.getElementById('labor_time_2').value,
            hourlyRatesCash: document.getElementById('hourly_rates_cash_2').value,
            hourlyRatesCard: document.getElementById('hourly_rates_card_2').value,
            trucks: trucksSelected,
            companyInfo,
            doubleDrive: document.getElementById('updated-double-drive-value').value,
            gasFee: document.getElementById('gas_fee_2').value,
            smallPackingItems: document.getElementById('small_item_pack_2').value,
            largeItemFee: document.getElementById('large_item_fee_2').value,
            movingSize: Session.get('movingSize'),
            workers: Session.get('secilmisIsciler'),
            note: document.getElementById('textarea2').value,
            trucksTemp: Session.get('trucklar'),
            flatRate: Session.get('flatRate'),
            flatRateCash: !isNaN(document.querySelector('#flatRateCashUpdate').value)
                ? document.querySelector('#flatRateCashUpdate').value
                : 0,
            flatRateCard: !isNaN(document.querySelector('#flatRateCardUpdate').value)
                ? document.querySelector('#flatRateCardUpdate').value
                : 0,
            comment: document.getElementById('textarea2').value,
            deposit: document.getElementById('deposit-update').value,
            jobNumber: document.getElementById('quote-job-number_2').value,
            numberOfWorkers: document.getElementById('iscinin-sayi').value,
            additionalContacts: Session.get('additionalContacts'),
        };

        Meteor.call('emailGonder', doc, err => {
            err
                ? (console.log(err),
                swal({
                    title: 'Error while sending email',
                    text: err.message,
                    icon: 'error',
                }))
                : swal({
                    title: 'Success',
                    text: 'Email sent successfully',
                    icon: 'success',
                });
        });
    },
    'click #work-update': function(e) {
        e.preventDefault;
        let bazaIsci = [];
        let bazaIsciOb = document.getElementsByClassName('secilmisIsci');
        let trucksSelected = (function() {
            let massiv = document.getElementsByClassName('truck-select');
            let massivFilter = [];
            let i = 0;

            for (i = 0; i < massiv.length; i++) {
                massivFilter.push({
                    truck: massiv[i].value,
                });
            }
            return massivFilter;
        })();

        let t = 0;
        for (t = 0; t < bazaIsciOb.length; t++) {
            bazaIsci.push({ id: bazaIsciOb[t].id });
        }

        let workDate = document.getElementById('quote-date-picker_2').value;

        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map(address => {
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
            workMustBeginTime: [
                document.getElementById('customTime--1').value,
                document.getElementById('customTime--2').value,
            ],
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
            numberOfWorkers: document.getElementById('iscinin-sayi').value,
            flatRate: [
                {
                    isTrue: Session.get('flatRate'),
                    cashAmount: !isNaN(document.querySelector('#flatRateCashUpdate').value)
                        ? document.querySelector('#flatRateCashUpdate').value
                        : 0,
                    cardAmount: !isNaN(document.querySelector('#flatRateCardUpdate').value)
                        ? document.querySelector('#flatRateCardUpdate').value
                        : 0,
                },
            ],
            comment: document.getElementById('textarea2').value,
            deposit: document.getElementById('deposit-update').value,
            additionalContacts: Session.get('additionalContacts'),
        };

        Meteor.call('updateWork', doc, function(err) {
            if (err) {
                swal({
                    title: 'Error!',
                    text: err.reason,
                    icon: 'error',
                    button: 'OK',
                });
            } else {
                swal({
                    title: 'Success!',
                    text: 'Information saved successfully',
                    icon: 'success',
                    button: 'OK',
                });
            }
        });
    },
    'click #hide-update-quote': function() {
        document.querySelector('#updateQuote2').classList.add('hide');
        ReactDOM.unmountComponentAtNode('');
    },
});

Template.preQuote.onRendered(function() {
    $(document).ready(function() {
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
        closeOnSelect: false, // Close upon selecting a date,
    });
});

Template.preQuote.events({
    'click #work-request': function(e) {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phone = document.getElementById('phoneNumber').value;
        let phoneAdditional = document.getElementById('phoneNumberAdditional').value;
        let email = document.getElementById('musteriEmail').value;
        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map(address => {
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
                truck: Number(trucksArray[i].value),
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
            document.getElementById('customTime--2').value,
        ];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCash').value
            : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCard').value
            : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy = document.getElementById('takenBy--value').value;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = true;
        let confirmed = false;
        let isFollowUp = true;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'inProgress';

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
            document.getElementById('quote-job-number').value = Math.random()
                .toString(36)
                .substr(2, 5);
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
            flatRateCard,
            additionalContacts,
            quoteDate,
        };

        Meteor.call(
            'quotaniBazayaElaveEt',
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
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            function(err) {
                if (err) {
                    swal({
                        title: 'Impossible add quote to database',
                        text: err.message,
                        icon: 'error',
                    });
                } else {
                    swal({
                        title: 'Success',
                        text: 'Quote added to database successfully',
                        icon: 'success',
                    });

                    Meteor.call('emailGonder', jobInfo, err => {
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
                            Session.set('additionalContacts', []);
                            setTimeout(() => Session.set('reset', false), 3000);
                        }
                    });
                }
            },
        );
    },
    'click #confirmed_job': function(e) {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phone = document.getElementById('phoneNumber').value;
        let phoneAdditional = document.getElementById('phoneNumberAdditional').value;
        let email = document.getElementById('musteriEmail').value;
        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map(address => {
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
                truck: Number(trucksArray[i].value),
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
            document.getElementById('customTime--2').value,
        ];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCash').value
            : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCard').value
            : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy = document.getElementById('takenBy--value').value;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = false;
        let confirmed = true;
        let isFollowUp = false;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'won';

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
            document.getElementById('quote-job-number').value = Math.random()
                .toString(36)
                .substr(2, 5);
        }

        Meteor.call(
            'quotaniBazayaElaveEt',
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
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            function(err) {
                if (err) {
                    swal({
                        title: 'Impossible add quote to database',
                        text: err.message,
                        icon: 'error',
                    });
                } else {
                    swal({
                        title: 'Success',
                        text: 'Quote added to database successfully',
                        icon: 'success',
                    });
                    document.querySelector('#flatRateCheck').checked = false;
                    document.getElementById('gas_fee').disabled = false;

                    document.querySelector('#paymentContent').classList.remove('hide');
                    document.querySelector('#flatRate_').classList.add('hide');

                    window.addresses.resetComponent();

                    document.getElementById('quote-request').reset();

                    // run job number
                    jobNumber_();

                    Session.set('reset', true);
                    Session.set('additionalContacts', []);
                    setTimeout(() => Session.set('reset', false), 3000);
                }
            },
        );
    },
    'click #followup': function(e) {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phone = document.getElementById('phoneNumber').value;
        let phoneAdditional = document.getElementById('phoneNumberAdditional').value;
        let email = document.getElementById('musteriEmail').value;
        let addressesArray = Array.from(document.getElementsByClassName('addresses'));
        let addresses = [];
        addressesArray.map(address => {
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
                truck: Number(trucksArray[i].value),
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
            document.getElementById('customTime--2').value,
        ];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCash').value
            : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value
            ? document.querySelector('#flatRateCard').value
            : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy = document.getElementById('takenBy--value').value;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = false;
        let confirmed = false;
        let isFollowUp = true;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'inProgress';

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
            document.getElementById('quote-job-number').value = Math.random()
                .toString(36)
                .substr(2, 5);
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
            flatRateCard,
            additionalContacts,
            quoteDate,
            sourceOfLeads,
        };

        Meteor.call(
            'quotaniBazayaElaveEt',
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
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            function(err) {
                if (err) {
                    swal({
                        title: 'Impossible add quote to database',
                        text: err.message,
                        icon: 'error',
                    });
                } else {
                    swal({
                        title: 'Success',
                        text: 'Quote added to database successfully',
                        icon: 'success',
                    });

                    Meteor.call('emailGonder', jobInfo, err => {
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
                            Session.set('additionalContacts', []);
                            setTimeout(() => Session.set('reset', false), 3000);
                        }
                    });
                }
            },
        );
    },
});

Template.quoteTam.events({
    'click #update-quote-open': function() {
        $(document).ready(function() {
            $('select').material_select();
        });
    },
    'click #close-update-work': function() {
        ReactDOM.unmountComponentAtNode(document.querySelector('#truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#update_time_window'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#number-of-movers2'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#moving-size'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#double-drive-time-update'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#iscilerinSiyahisiRender'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#tempTruckUpdate'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#addressesIdUpdate'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#takenBy--update'));
        ReactDOM.unmountComponentAtNode(document.querySelector('#additional-contact-update'));
        tracker_.stop();
        // ReactDOM.unmountComponentAtNode(document.querySelector('#tempTruck'));

        document.querySelector('#quoteTam').classList.remove('hide');
        document.querySelector('#updateQuote2').classList.add('hide');
        Session.set('additionalContacts', []);
    },
});

Template.quoteTam.onDestroyed(function() {
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
    ReactDOM.unmountComponentAtNode(document.querySelector('#additional-contact-update'));

    document.querySelector('#quoteTam').classList.remove('hide');
    document.querySelector('#updateQuote2').classList.add('hide');

    tracker_.stop();
});

Template.preQuote.onRendered(function() {
    let checked = document.querySelector('#flatRateCheck');
    checked.addEventListener('change', function() {
        Session.set('flatRate', !Session.get('flatRate'));
    });
});

Template.navBar.events({
    'click .quoteDuymesi': function() {
        document.querySelector('#quoteTam') ? document.querySelector('#quoteTam').classList.remove('hide') : '';
        document.querySelector('#updateQuote2') ? document.querySelector('#updateQuote2').classList.add('hide') : '';
    },
});
