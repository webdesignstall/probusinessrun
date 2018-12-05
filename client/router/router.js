// Routing ayarlari
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return Meteor.subscribe('userData');
    },
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/', {
    onBeforeAction: function () {
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

if (Meteor.userId()) {
    Router.route('/workers', {
        onBeforeAction: function () {
            this.render('workersList');
        }
    });
    Router.route('/workers/addWorker', {
        onBeforeAction: function () {
            this.render('register');
        }
    });
    Router.route('/quote', {
        onBeforeAction: function () {
            this.render('quoteTam');
        }
    });
    Router.route('/prequote', {
        onBeforeAction: function () {
            this.render('preQuote');
        }
    });
    Router.route('/discount', {
        onBeforeAction: function () {
            this.render('discountAdmin');
        }
    })
}

Router.route('/reserve', {
    onBeforeAction: function () {
        this.render('reserveQuote');
    }
});
