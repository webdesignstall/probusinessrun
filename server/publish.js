import { Meteor } from 'meteor/meteor';
import WorkData from './../common/collections_2';
import Discounts from '../common/discountData';

Meteor.publish('workSchema', function () {
    return WorkData.find({});
});

Meteor.publish('usersData', function () {
    return Meteor.users.find({ 'profile.company': Meteor.userId() });
});

Meteor.publish('fullUser', function () {
    return Meteor.users.find({});
});

Meteor.publish('tabletData', function () {
    return Meteor.users.find({ 'profile.company': Meteor.userId(), 'profile.rank': 'tablet' });
});

Meteor.publish('Dicsounts', function () {
    return Discounts.find({});
});
