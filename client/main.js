import './main.html';
import './collections/works';
import './templates/admin/calendar.html';
import '../imports/imports';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

/*global $, Bert*/ window.jQuery = window.$ = $;

$(document).ready(function() {
    $('select').material_select();

    function isNumberKey(evt) {
        var charCode = evt.which ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

        return true;
    }

    // $('#quote-date-picker').pickadate({
    //     selectMonths: true, // Creates a dropdown to control month
    //     selectYears: 15, // Creates a dropdown of 15 years to control year,
    //     today: 'Today',
    //     clear: 'Clear',
    //     close: 'Ok',
    //     closeOnSelect: false // Close upon selecting a date,
    // });

    // $('#quote-date-picker_2').pickadate({
    //     selectMonths: true, // Creates a dropdown to control month
    //     selectYears: 15, // Creates a dropdown of 15 years to control year,
    //     today: 'Today',
    //     clear: 'Clear',
    //     close: 'Ok',
    //     closeOnSelect: false // Close upon selecting a date,
    // });

    // Time picker
    $('#quote-time-picker-from, #quote-time-picker-to').pickatime({
        default: '9:00AM', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: true, // Use AM/PM or 24-hour format
        donetext: 'SELECT', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function() {}, //Function for after opening timepicker
    });
});

Meteor.startup(() => {
    Session.set('isciId', '');
    Session.set('jobNumber', '');
    Session.set('tabletIsId', '');
    Session.set('is', '');
    Session.set('payed', false);
    Session.set('companyInfo', {});
    Session.set('secilmisIsciler', []);
    Session.set('trucklar', []);
    Session.set('clicked', false);
    Session.set('flatRate', false);
    Session.set('promoCodes', ['zumka']);
    Session.set('discountAproved', false);
    Session.set('discountId', null);
    Session.set('movingSize', 'select_moving_size');
    Session.set('job', {});
    Session.set('reset', false);
    Session.set('additionalContacts', []);
    Session.set('ExtendedJobInformation', '');
    Session.set('isSearch', false);
    Session.set('loading', false);
    Session.set('status', 'inProgress');
    Session.set('searchWords', '');
    Session.set('sort', 'default');
    Session.set('addingJob', false);
    Session.set('update', false);
    Session.set('additionalInfo', []);

    Bert.defaults = {
        hideDelay: 6000,
        // Accepts: a number in milliseconds.
        style: 'fixed-top',
        // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
        // growl-bottom-left, growl-bottom-right.
        type: 'default',
        // Accepts: default, success, info, warning, danger.
    };
});
