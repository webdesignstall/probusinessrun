import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

//Spinnet Load settings
Meteor.Spinner.options = {
    lines: 17, // The number of lines to draw
    length: 9, // The length of each line
    width: 10, // The line thickness
    radius: 42, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#34495e', // #rgb or #rrggbb
    speed: 1.5, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
};

//Login
Template.loginFormasi.events({
    'click #sign_in': function (event) {
        event.preventDefault();
        const userNameLogin = document.getElementById('userName').value;
        const passwordLogin = document.getElementById('loginPassword').value;
        Meteor.loginWithPassword(
            userNameLogin, passwordLogin,
            function (err) {
                if (err) {
                    Bert.alert({
                        hideDelay: 4000,
                        title: 'Error',
                        message: 'Incorrect username or password!',
                        type: 'danger',
                        style: 'growl-top-right'
                    });
                } else {
                    Bert.alert({
                        title: 'Logged in',
                        message: `Hello ${userNameLogin}`,
                        type: 'success',
                        style: 'growl-top-right'
                    });
                }
            }
        );
    }
});

Template.loginFormasi.helpers({
    errorMessage: function () {
        return Session.get('errorMessage');
    }
});

//navbar
Template.navBar.helpers({
    nameAdi: function () {
        return Meteor.user().profile.name;
    },
    moverIs: function () {
        return Meteor.user().profile.rank === 'mover';
    },
    driverIs: function () {
        return Meteor.user().profile.rank === 'driver';
    },
    adminIs: function () {
        return Meteor.user().profile.rank === 'admin';
    }
});

Template.navBar.events({
    'click #logout': function (event) {
        event.preventDefault();
        Meteor.logout();

        function GoToHomePage() {
            window.location = '/';
        }

        GoToHomePage();
    }
});