import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


if (Meteor.isServer) {
    Meteor.methods({
        // remove user
        removeUser: function (id) {
            Meteor.users.remove(id);
        },
        // add user
        addUserOrTruck: function (obj) {
            let userInfo = Accounts.createUser(obj);
            if (userInfo) {
                return userInfo;
            } else {
                throw new Meteor.Error('Error', `Can't create information in the database`)
            }
        }
    });
}
