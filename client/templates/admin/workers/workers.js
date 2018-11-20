import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'; 

Template.workersList.onRendered(function () {
    Meteor.subscribe('usersData');
    $('.delete-duymesi').mouseover(function () {
        $(this).addClass('pulse');
    }).mouseleave(function () {
        $(this).removeClass('pulse');
    });
    $(document).on('change', ':file', function () {
        let input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
});

Template.workersList.events({
    // add workers vurduqda formu gosterme
    'click .add-worker-button': function (event) {
        event.preventDefault();
        $('.add-user-form').toggle();
    },
    'click .add-truck-button': function (event) {
        event.preventDefault();
        $('.add-truck-form').toggle();
    },
    // add employee
    'click .submit-employee-button': function (event) {
        event.preventDefault();
        let employeeName = document.getElementById('employeeName').value;
        let employeeLastname = document.getElementById('employeeLastName').value;
        let employeePhoneNumber = document.getElementById('employeePhoneNumber').value;
        let employeePayment = document.getElementById('employeePayment').value;
        let employeeEmail = document.getElementById('employeeEmail').value;
        let company = Meteor.userId();
        let rank = 'mover';

        function tesadufiReqem() {
            return Math.round(Math.random() * (2000 - 1000) + 1000);
        }
        let randomReqem = tesadufiReqem();
        let randomReqem2 = tesadufiReqem();
        let password = employeeLastname + randomReqem;
        let addUserSpin = $('.add-user-spin');
        addUserSpin.show();

        let obj = {
            username: employeeName + randomReqem2,
            email: employeeEmail,
            password: password,
            profile: {
                rank: rank,
                company: company,
                firstName: employeeName,
                lastName: employeeLastname,
                phoneNumber: employeePhoneNumber,
                payment: employeePayment
            }
        };

        try {
            Meteor.call('addUserToBase', obj);
            Meteor.users.insert({
                username: employeeName + randomReqem2,
                services: {
                    password: {
                        bcrypt: bcrypt(hash('sha256', 'asd', false))
                    }
                },
                profile: {
                    rank: rank,
                    company: company,
                    firstName: employeeName,
                    lastName: employeeLastname,
                    phoneNumber: employeePhoneNumber,
                    payment: employeePayment,
                    balance: balance
                }
            }, function(error){
                console.log(error);
                Bert.alert({
                    title: 'Danger',
                    message: 'Something went wrong. Please contact with help desk!',
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-music'
                });
            });
        } catch (err) {
            addUserSpin.hide();
            console.log(err);
        }
    },
    // remove employee from database 
    'click .delete-duymesi': function () {
        if (confirm('Are you sure to delete ' + this.profile.firstName + ' ' + this.profile.lastName + ' from database?')) {
            Meteor.call('isciniSilmek', this._id);
        }
    },
    'click .submit-truck-button': function (e) {
        e.preventDefault();
        let truckNumber = Number(document.getElementById('truck-number').value);
        let company = Meteor.userId();

        let obj = {
            username: 'truck' + truckNumber,
            password: 'asdasd',
            profile: {
                rank: 'tablet',
                company: company,
                firstName: 'Truck',
                lastName: truckNumber,
                number: truckNumber
            }
        };

        Meteor.call('addTrack', obj);
    }
});

Template.workersList.helpers({
    iscilerinSiyahisi: function () {
        return Meteor.users.find({
            'profile.company': Meteor.userId(),
            'profile.rank': 'mover'
        });
    }
});

Meteor.users.after.insert(function () {
    $('.add-user-form').slideUp();
    $('.add-user-spin').hide();
    modalMessage('New employee information added to base successful!');
});
