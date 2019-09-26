import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import ReactDOM from 'react-dom';
import WorkData from './../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';
import React from 'react';
import QuoteMainPage from './QuoteMainPage';

/*global $*/

let tracker_ = null;

let enableButtons = function() {
    let btns = document.getElementsByClassName('btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('disabled');
    }
};

Template.updateQuote.onRendered(function() {
    // Meteor.subscribe('workSchema');
    // Meteor.subscribe('tabletData');
    // Meteor.subscribe('usersData');

    // $('#quote-date-picker_2').pickadate({
    //     selectMonths: true, // Creates a dropdown to control month
    //     selectYears: 15, // Creates a dropdown of 15 years to control year,
    //     today: 'Today',
    //     clear: 'Clear',
    //     close: 'Ok',
    //     closeOnSelect: false, // Close upon selecting a date,
    // });
    let ishDeyisibdir = '';
    let checkedUpdate = document.querySelector('#flatBoxUpdate');
    let regex = new RegExp(/^\d+$/);

    document.querySelector('#phoneNumber_2').addEventListener('input', e => {
        e.preventDefault();
        if (regex.test(e.target.value)) {
            let value = e.target.value;
            document.querySelector('#phoneNumber_2').value = value;
        } else {
            let value = e.target.value.toString().slice(0, e.target.value.length - 1);
            document.querySelector('#phoneNumber_2').value = value;
        }
    });
    document.querySelector('#phoneNumber_2_additional').addEventListener('input', e => {
        e.preventDefault();
        if (regex.test(e.target.value)) {
            let value = e.target.value;
            document.querySelector('#phoneNumber_2_additional').value = value;
        } else {
            let value = e.target.value.toString().slice(0, e.target.value.length - 1);
            document.querySelector('#phoneNumber_2_additional').value = value;
        }
    });

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
        return WorkData.findOne({ _id: Session.get('is') }) ? !WorkData.findOne({ _id: Session.get('is') }).quote : false;
    }
});

Template.updateQuote.events({
    'click #send-info-supervisior': function(e) {
        e.preventDefault();

        let job = WorkData.findOne({ _id: Session.get('is') });

        Meteor.call('supervisorEmail', job, err => {
            err
                ? (console.error(err),
                swal({
                    title: 'Error! Can\'t send email to supervisor pls contact help desk',
                    text: 'Reason: ' + err.message,
                    icon: 'error'
                }),
                Session.set('loading', false))
                : swal({
                    title: 'Success',
                    text: 'Email sent successfully',
                    icon: 'success'
                });
        });
    },
    'click #resend-confirmation': function(e) {
        e.preventDefault();
        if (!confirm('Are you sure to send confirmation email to customer?')) {
            throw new Error('Email doesn\'t send to customer');
        }
        let job = WorkData.findOne({ _id: Session.get('is') });

        Meteor.call('confirmationGonder', job, err => {
            err
                ? (console.error(err),
                swal({
                    title: 'Error! Can\'t send email to supervisor pls contact help desk',
                    text: 'Reason: ' + err.message,
                    icon: 'error'
                }),
                Session.set('loading', false))
                : swal({
                    title: 'Success',
                    text: 'Email sent successfully',
                    icon: 'success'
                });
        });
    },
    'click #resend-email': function(e) {
        e.preventDefault();
        if (!confirm('Are you sure to send email to customer?')) {
            throw new Error('Email doesn\'t send to customer');
        }

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
                    truck: massiv[i].value
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
            movingDateConverted: workDate,
            workMustBeginTime: [document.getElementById('customTime--1').value, document.getElementById('customTime--2').value],
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
            noteForYourMove: document.getElementById('for_your_move_update').value,
            additionalInfo: Session.get('additionalInfo')
        };

        Meteor.call('emailGonder', doc, err => {
            err
                ? (console.error(err),
                swal({
                    title: 'Error while sending email',
                    text: err.message,
                    icon: 'error'
                }),
                Session.set('loading', false))
                : (swal({
                    title: 'Success',
                    text: 'Email sent successfully',
                    icon: 'success'
                }),
                Meteor.call('updateWork', {
                    _id: Session.get('is'),
                    emailSent: true,
                    ip: Session.get('ip')
                }));
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
                    truck: massiv[i].value
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
        let noteForMovers = document.querySelector('#note_for_movers').value;
        let addressExt = Session.get('addressExt');

        let doc = {
            _id: Session.get('is'),
            clientFirstName: document.getElementById('firstName_2').value,
            clientLastName: document.getElementById('lastName_2').value,
            phoneNumber: document.getElementById('phoneNumber_2').value,
            phoneAdditional: document.getElementById('phoneNumber_2_additional').value,
            email: document.getElementById('musteriEmail_2').value,
            addresses,
            workDate,
            workMustBeginTime: [document.getElementById('customTime--1').value, document.getElementById('customTime--2').value],
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
                        : 0
                }
            ],
            comment: document.getElementById('textarea2').value,
            deposit: document.getElementById('deposit-update').value,
            additionalContacts: Session.get('additionalContacts'),
            status: document.getElementById('jobStatus_followup').value,
            noteForYourMove: document.getElementById('for_your_move_update').value.trim(),
            additionalInfo: Session.get('additionalInfo'),
            ip: Session.get('ip'),
            noteForMovers,
            addressExt
        };

        Meteor.call('updateWork', doc, function(err) {
            if (err) {
                swal({
                    title: 'Error!',
                    text: err.reason,
                    icon: 'error',
                    button: 'OK'
                });
                Session.set('loading', false);
            } else {
                swal({
                    title: 'Success!',
                    text: 'Information saved successfully',
                    icon: 'success',
                    button: 'OK'
                });
            }
        });
    },
    'click #hide-update-quote': function() {
        document.querySelector('#updateQuote2').classList.add('hide');
        ReactDOM.unmountComponentAtNode('');
    }
});

Template.preQuote.onRendered(function() {
    $(document).ready(function() {
        $('select').material_select();
    });
    // Meteor.subscribe('usersData');
    // Meteor.subscribe('workSchema');

    // declare job number
    function jobNumber_() {
        let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
        jobNumber = jobNumber.toString();
        let howManyZero = 6 - jobNumber.length;
        if (howManyZero > 0) {
            for (let i = 0; i < howManyZero; i++) {
                jobNumber = '0' + jobNumber;
            }
        }
        let result = WorkData.find({ jobNumber }).fetch();
        result && result.length > 0 ? jobNumber_() : null;
        document.getElementById('quote-job-number').value = jobNumber;
    }

    // run job number
    jobNumber_();

    $('#quote-date-picker').datepicker();
    $(function() {
        $('#quote-date-picker').datepicker('setDate', new Date());
    });

    let regex = new RegExp(/^\d+$/);

    document.querySelector('#phoneNumber').addEventListener('input', e => {
        e.preventDefault();
        if (regex.test(e.target.value)) {
            let value = e.target.value;
            document.querySelector('#phoneNumber').value = value;
        } else {
            let value = e.target.value.toString().slice(0, e.target.value.length - 1);
            document.querySelector('#phoneNumber').value = value;
        }
    });
    document.querySelector('#phoneNumberAdditional').addEventListener('input', e => {
        e.preventDefault();
        if (regex.test(e.target.value)) {
            let value = e.target.value;
            document.querySelector('#phoneNumberAdditional').value = value;
        } else {
            let value = e.target.value.toString().slice(0, e.target.value.length - 1);
            document.querySelector('#phoneNumberAdditional').value = value;
        }
    });
});

Template.preQuote.events({
    'click .btn': function() {
        let btns = document.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.add('disabled');
        }
    },
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
        let movingDateConverted = movingDate;
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
        let smallItemPacking = document.getElementById('small_item_pack').value;
        let largeItemFee = document.getElementById('large_item_fee').value;
        let jobNumber = document.getElementById('quote-job-number').value;
        let movingSize = document.getElementById('moving_size_2').value;
        let note = document.getElementById('textarea1').value;
        let secilmisIsci = document.getElementsByClassName('secilmisIsci');
        let iscilerinSayi = document.getElementById('iscinin-sayi').value;
        if (isNaN(iscilerinSayi)) {
            iscilerinSayi = 0;
        }
        let workMustBeginTime = [document.getElementById('customTime--1').value, document.getElementById('customTime--2').value];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCash').value : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCard').value : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy_ = document.getElementById('takenBy--value').value;
        let takenBy = takenBy_ !== '' && takenBy_ !== null && takenBy_ !== undefined && takenBy_ !== '_' ? takenBy_ : undefined;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = true;
        let confirmed = false;
        let isFollowUp = true;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'inProgress';
        let emailSent = true;
        let emailSentDate = new Date();
        let expireHour = Number(document.getElementById('quoteExpirationDate').value);
        let quoteExpirationDate = new Date(new Date().getTime() + expireHour * 3600000);
        let noteForYourMove = document.getElementById('for_your_move').value;
        let additionalInfo = Session.get('additionalInfo');
        let customerRate = Session.get('customerRate');
        let noteForMovers = document.querySelector('#note_for_movers').value;
        let addressExt = Session.get('addressExt');

        if (customerRate === 0) {
            swal({
                title: 'Cant finish creating new job',
                text: 'Please rate customer before continue',
                icon: 'error'
            });
            enableButtons();
            return false;
        }

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
            let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
            jobNumber = jobNumber.toString();
            let howManyZero = 6 - jobNumber.length;
            if (howManyZero > 0) {
                for (let i = 0; i < howManyZero; i++) {
                    jobNumber = '0' + jobNumber;
                }
            }
            let result = WorkData.find({ jobNumber }).fetch();
            result && result.length > 0 ? jobNumber_() : null;
            document.getElementById('quote-job-number').value = jobNumber;
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
            smallPackingItems: smallItemPacking,
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
            expireHour,
            quoteExpirationDate,
            noteForYourMove,
            additionalInfo
        };

        let doc = {
            clientFirstName: firstName,
            clientLastName: lastName,
            emailSent,
            phoneNumber: phone,
            phoneAdditional: phoneAdditional,
            email,
            addresses,
            workDate: movingDateConverted,
            price,
            laborTime: minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallItemPacking,
            largeItemFee,
            jobNumber,
            movingSize,
            comment,
            workers: baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate: [
                {
                    isTrue: flatRate,
                    cashAmount: flatRateCash,
                    cardAmount: flatRateCard
                }
            ],
            deposit,
            takenBy,
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            emailSentDate,
            expireHour,
            quoteExpirationDate,
            noteForYourMove,
            additionalInfo,
            customerRate,
            noteForMovers,
            addressExt
        };

        let emailReg = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        typeof email === 'string' && email !== '' && emailReg.test(email)
            ? Meteor.call('quotaniBazayaElaveEt', doc, function(err) {
                if (err) {
                    swal({
                        title: 'Impossible add quote to database',
                        text: err.message,
                        icon: 'error'
                    });
                    enableButtons();
                    Session.set('loading', false);
                } else {
                    swal({
                        title: 'Success',
                        text: 'Quote added to database successfully',
                        icon: 'success'
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

                    Meteor.call('emailGonder', jobInfo, err => {
                        if (err) {
                            swal({
                                title: 'Impossible send email to customer',
                                text: err.message,
                                icon: 'error'
                            });
                            console.error(err);
                            Session.set('loading', false);
                            enableButtons();
                        } else {
                            swal({
                                title: 'Success',
                                text: 'Email successfully sent to customer',
                                icon: 'success'
                            });
                            enableButtons();
                        }
                    });
                }
            })
            : (swal({
                title: 'Impossible add quote to database',
                text: 'Email field is empty or incorrect email',
                icon: 'error'
            }),
            Session.set('loading', false),
            enableButtons());
    },
    'click #work-request-reset': function() {
        Session.set('reset', true);
        enableButtons();
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
        let movingDateConverted = document.getElementById('quote-date-picker').value;
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
        let workMustBeginTime = [document.getElementById('customTime--1').value, document.getElementById('customTime--2').value];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCash').value : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCard').value : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy_ = document.getElementById('takenBy--value').value;
        let takenBy = takenBy_ !== '' && takenBy_ !== null && takenBy_ !== undefined && takenBy_ !== '_' ? takenBy_ : undefined;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = false;
        let confirmed = true;
        let isFollowUp = true;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'won';
        let emailSent = true;
        let noteForYourMove = document.getElementById('for_your_move').value;
        let additionalInfo = Session.get('additionalInfo');
        let customerRate = Session.get('customerRate');
        let noteForMovers = document.querySelector('#note_for_movers').value;
        let addressExt = Session.get('addressExt');

        if (customerRate === 0) {
            swal({
                title: 'Cant finish creating new job',
                text: 'Please rate customer before continue',
                icon: 'error'
            });
            enableButtons();
            return false;
        }

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
            let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
            jobNumber = jobNumber.toString();
            let howManyZero = 6 - jobNumber.length;
            if (howManyZero > 0) {
                for (let i = 0; i < howManyZero; i++) {
                    jobNumber = '0' + jobNumber;
                }
            }
            let result = WorkData.find({ jobNumber }).fetch();
            result && result.length > 0 ? jobNumber_() : null;
            document.getElementById('quote-job-number').value = jobNumber;
        }

        let doc = {
            clientFirstName: firstName,
            clientLastName: lastName,
            emailSent,
            phoneNumber: phone,
            phoneAdditional: phoneAdditional,
            email,
            addresses,
            workDate: movingDateConverted,
            price,
            laborTime: minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallItemPacking: smallPackingItems,
            largeItemFee,
            jobNumber,
            movingSize,
            comment,
            workers: baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate: [
                {
                    isTrue: flatRate,
                    cashAmount: flatRateCash,
                    cardAmount: flatRateCard
                }
            ],
            deposit,
            takenBy,
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            noteForYourMove,
            additionalInfo,
            customerRate,
            noteForMovers,
            addressExt
        };

        Meteor.call('quotaniBazayaElaveEt', doc, function(err) {
            if (err) {
                swal({
                    title: 'Impossible add quote to database',
                    text: err.message,
                    icon: 'error'
                });
                Session.set('loading', false);
                enableButtons();
            } else {
                swal({
                    title: 'Success',
                    text: 'Quote added to database successfully',
                    icon: 'success'
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
                enableButtons();
                setTimeout(() => Session.set('reset', false), 3000);
            }
        });
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
        let movingDateConverted = document.getElementById('quote-date-picker').value;
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
        let workMustBeginTime = [document.getElementById('customTime--1').value, document.getElementById('customTime--2').value];
        let numberOfWorkers = document.getElementById('iscinin-sayi').value;
        let companyInfo = Session.get('companyInfo');
        let trucksTemp = Session.get('trucklar');
        let flatRate = document.getElementById('flatRateCheck').checked;
        let flatRateCash = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCash').value : 0;
        let flatRateCard = document.querySelector('#flatRateCash').value ? document.querySelector('#flatRateCard').value : 0;
        let comment = document.getElementById('textarea1').value;
        let deposit = document.getElementById('deposit').value;
        let takenBy_ = document.getElementById('takenBy--value').value;
        let takenBy = takenBy_ !== '' && takenBy_ !== null && takenBy_ !== undefined && takenBy_ !== '_' ? takenBy_ : undefined;
        let additionalContacts = Session.get('additionalContacts');
        let quoteDate = new Date();
        let quote = false;
        let confirmed = false;
        let isFollowUp = true;
        let sourceOfLeads = document.getElementById('source_of_leads_add').value;
        let status = 'inProgress';
        let noteForYourMove = document.getElementById('for_your_move').value;
        let additionalInfo = Session.get('additionalInfo');
        let customerRate = Session.get('customerRate');
        let noteForMovers = document.querySelector('#note_for_movers').value;
        let addressExt = Session.get('addressExt');

        if (customerRate === 0) {
            swal({
                title: 'Cant finish creating new job',
                text: 'Please rate customer before continue',
                icon: 'error'
            });
            enableButtons();
            return false;
        }

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
            let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
            jobNumber = jobNumber.toString();
            let howManyZero = 6 - jobNumber.length;
            if (howManyZero > 0) {
                for (let i = 0; i < howManyZero; i++) {
                    jobNumber = '0' + jobNumber;
                }
            }
            let result = WorkData.find({ jobNumber }).fetch();
            result && result.length > 0 ? jobNumber_() : null;
            document.getElementById('quote-job-number').value = jobNumber;
        }

        let doc = {
            clientFirstName: firstName,
            clientLastName: lastName,
            emailSent: false,
            phoneNumber: phone,
            phoneAdditional: phoneAdditional,
            email,
            addresses,
            workDate: movingDateConverted,
            price,
            laborTime: minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallItemPacking: smallPackingItems,
            largeItemFee,
            jobNumber,
            movingSize,
            comment,
            workers: baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate: [
                {
                    isTrue: flatRate,
                    cashAmount: flatRateCash,
                    cardAmount: flatRateCard
                }
            ],
            deposit,
            takenBy,
            additionalContacts,
            quoteDate,
            quote,
            confirmed,
            isFollowUp,
            sourceOfLeads,
            status,
            noteForYourMove,
            additionalInfo,
            customerRate,
            noteForMovers,
            addressExt
        };

        Meteor.call('quotaniBazayaElaveEt', doc, function(err) {
            if (err) {
                swal({
                    title: 'Impossible add job to database',
                    text: err.message,
                    icon: 'error'
                });
                Session.set('loading', false);
                enableButtons();
            } else {
                swal({
                    title: 'Success',
                    text: 'Job added to database successfully',
                    icon: 'success'
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
                enableButtons();
            }
        });
    }
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
    }
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
    ReactDOM.render(<QuoteMainPage />, document.getElementById('pre_quote'));
    checked.addEventListener('change', function() {
        Session.set('flatRate', !Session.get('flatRate'));
    });
});

Template.navBar.events({
    'click .quoteDuymesi': function() {
        document.querySelector('#quoteTam') ? document.querySelector('#quoteTam').classList.remove('hide') : '';
        document.querySelector('#updateQuote2') ? document.querySelector('#updateQuote2').classList.add('hide') : '';
    }
});
