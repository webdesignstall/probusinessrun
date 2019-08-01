import {Meteor} from 'meteor/meteor';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';

if (Meteor.isServer) {
    Meteor.methods({
        findWorks: function (obj) {
            return (
                (Meteor.user().profile.rank === 'admin' || Meteor.user().profile.rank === 'officeEmployee') &&
                WorkData.find(obj || {}).fetch()
            );
        }
    });
}

let workData = WorkData.find({});
let userData = Meteor.users.find({});
let discounts = Discounts.find({});

Meteor.publish('workSchema', function () {
    return workData;
});

Meteor.publish('usersData', function () {
    return userData;
});

Meteor.publish('fullUser', function () {
    return userData;
});

Meteor.publish('Dicsounts', function () {
    return discounts;
});
