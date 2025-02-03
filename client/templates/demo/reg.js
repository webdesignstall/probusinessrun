import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Template.register.events({
    'submit form': function(event) {
        // Meteor.subscribe('usersData');
        event.preventDefault();
        const userName = event.target.userName.value;
        const password = String(event.target.registerPassword.value);
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        Accounts.createUser(
            {
                username: userName,
                password: password,
                profile: {
                    rank: 'mover',
                    company: Meteor.userId(),
                    fistName: firstName,
                    lastName: lastName
                }
            },
            function(error) {
                console.error(error);
            }
        );
    }
});
