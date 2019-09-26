import './main.html';
import './collections/works';
import './templates/admin/calendar.html';
import '../imports/imports';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import LogRocket from 'logrocket';

// LogRocket.init('wplgg5/probusinessrun');

import getUserIP from '../imports/helpers/getIp';

/*global $, Bert*/ window.jQuery = window.$ = $;

// $(document).ready(function() {
//     // $('select').material_select();

//     // Time picker
//     $('#quote-time-picker-from, #quote-time-picker-to').pickatime({
//         default: '9:00AM', // Set default time: 'now', '1:30AM', '16:30'
//         fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
//         twelvehour: true, // Use AM/PM or 24-hour format
//         donetext: 'SELECT', // text for done-button
//         cleartext: 'Clear', // text for clear-button
//         canceltext: 'Cancel', // Text for cancel-button
//         autoclose: false, // automatic close timepicker
//         ampmclickable: true, // make AM PM clickable
//         aftershow: function() {} //Function for after opening timepicker
//     });
// });

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
    Session.set('cardHolder', {});
    Session.set('ccForm', false);
    Session.set('buttonsDisabled', false);
    Session.set('dataReady', false);
    Session.set('searching', false);
    Session.set('customerRate', 0);
    Session.set('customerRate_', 0);
    Session.set('dataUpdated', false);
    Session.set('addressExt', []);
    Session.set('job_', {});

    Tracker.autorun(() => {
        let user = Meteor.userId();
        getUserIP().then(result => Session.set('ip', result));

        if (user) {
            let user1 = Meteor.users.find({ _id: user }).fetch()[0];
            if (
                user1 &&
                (user1.profile.rank === 'admin' || user1.profile.rank === 'officeEmployee' || user1.profile.rank === 'tablet')
            ) {
                Session.set('loading', true);

                Meteor.subscribe('fullUser', {
                    onReady: function() {
                        // Meteor.subscribe('workSchema', {
                        // onReady: function() {
                        Meteor.subscribe('Dicsounts', {
                            onReady: function() {
                                Meteor.subscribe('tabletData', {
                                    onReady: function() {
                                        Session.set('loading', false);
                                    },
                                    onError: function() {
                                        Session.set('loading', false);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        } else {
            console.info('User doesnt sign');
        }
    });

    Bert.defaults = {
        hideDelay: 6000,
        // Accepts: a number in milliseconds.
        style: 'fixed-top',
        // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
        // growl-bottom-left, growl-bottom-right.
        type: 'default'
        // Accepts: default, success, info, warning, danger.
    };
});
