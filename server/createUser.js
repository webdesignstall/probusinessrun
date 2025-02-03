import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
    Meteor.methods({
        addUserToBase: function(obj) {
            Accounts.createUser(obj);
        },
        addTrack: function(obj) {
            Accounts.createUser(obj);
        }
    });
}
