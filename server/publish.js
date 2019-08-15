import { Meteor } from 'meteor/meteor';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';

/*global moment*/

if (Meteor.isServer) {
    Meteor.methods({
        findWorks: function(obj) {
            return (
                (Meteor.user().profile.rank === 'admin' || Meteor.user().profile.rank === 'officeEmployee') &&
                WorkData.find(obj || {}).fetch()
            );
        }
    });
}

Meteor.publish('calendar', function(date) {
    let month = moment(date).format('MM');
    let year = moment(date).format('YYYY');
    let regex_ = month + '/[0-9][0-9]/' + year;

    return WorkData.find({ workDate: { $regex: regex_ }, status: 'won' });
});

Meteor.publish('workSchema', function(param) {
    return WorkData.find(param || {});
});

Meteor.publish('usersData', function() {
    return Meteor.users.find({});
});

Meteor.publish('fullUser', function() {
    return Meteor.users.find({});
});

Meteor.publish('Dicsounts', function() {
    return Discounts.find({});
});
