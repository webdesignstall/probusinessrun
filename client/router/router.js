// Routing ayarlari
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() {
        // return Meteor.subscribe('userData');
    },
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/', {
    onBeforeAction: function() {
        if (Meteor.userId()) {
            if (Meteor.user().profile.rank === 'admin') {
                this.render('calendarMenu');
                // this.render('tablet');
                //this.render('quote');
            } else if (Meteor.user().profile.rank === 'mover') {
                this.render('register');
            } else if (Meteor.user().profile.rank === 'tablet') {
                this.render('tablet');
            }
        } else {
            this.render('loginFormasi');
        }
    }
});

Router.route('/add', {
    onBeforeAction: function() {
        this.render('add');
    }
});

if (Meteor.userId()) {
    Router.route('/followup', {
        onBeforeAction: function() {
            this.render('followUp');
        }
    });

    Router.route('/workers', {
        onBeforeAction: function() {
            this.render('workersList');
        }
    });

    Router.route('/workers/addWorker', {
        onBeforeAction: function() {
            this.render('register');
        }
    });
    Router.route('/quote', {
        onBeforeAction: function() {
            this.render('quoteTam');
        }
    });
    Router.route('/prequote', {
        onBeforeAction: function() {
            this.render('preQuote');
        }
    });
    Router.route('/discount', {
        onBeforeAction: function() {
            this.render('discountAdmin');
        }
    });
    Router.route('/archive', {
        onBeforeAction: function() {
            this.render('archive');
        }
    });
    Router.route('/statistic', {
        onBeforeAction: function() {
            this.render('statistic');
        }
    });
}

Router.route('/reserve', {
    onBeforeAction: function() {
        this.render('reserveQuote');
    }
});

Router.route('/cardholder/:id', function() {
    Meteor.call('checkId', this.params.id, (err, res) => {
        if (err) console.error(err);
        if (res && res.cardHolderInfo && !res.cardHolderInfo.agreement) {
            this.render('cardHolder');
            Session.set('job', res);
        } else {
            this.render('404');
        }
    });
});
