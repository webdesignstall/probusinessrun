import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import WorkData from '../common/collections_2';
import email from 'emailjs';
import depositPaymentEmail from './depositPaymentEmail';

if (Meteor.isServer) {
    Meteor.methods({
        // remove user
        removeUser: function(id) {
            Meteor.users.remove(id);
        },
        // add user
        addUserOrTruck: function(obj) {
            let userInfo = Accounts.createUser(obj);
            if (userInfo) {
                return userInfo;
            } else {
                throw new Meteor.Error('Error', 'Can\'t create information in the database');
            }
        },
        updateUserOrTruck: function(id, obj) {
            Meteor.users.update(
                { _id: id },
                {
                    $set: {
                        profile: obj
                    }
                },
                err => {
                    if (err) {
                        console.log(err);
                        throw new Meteor.Error('Error', 'Can\'t update information. Please contact with the administration');
                    }
                }
            );
        },
        checkId: function(id) {
            let list = WorkData.find({ _id: id }).fetch();
            if (list.length > 0) {
                return list[0];
            } else {
                return false;
            }
        },
        officeEmployees: function() {
            return Meteor.users.find({ 'profile.rank': 'officeEmployee' }).fetch();
        }
    });
}
