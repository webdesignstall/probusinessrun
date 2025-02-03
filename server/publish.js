import { Meteor } from 'meteor/meteor';
import bonusData from '../common/bonusData';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';

/*global moment*/

if (Meteor.isServer) {
	Meteor.methods({
		findWorks: function(obj) {
			return (
				(Meteor.user().profile.rank === 'admin' ||
					Meteor.user().profile.rank === 'officeEmployee') &&
				WorkData.find(obj || {}).fetch()
			);
		}
	});
}

Meteor.publish('calendar', function(date, status) {
	let month = moment(date).format('MM');
	let year = moment(date).format('YYYY');
	let regex_ = month + '/[0-9][0-9]/' + year;

	return WorkData.find({ workDate: { $regex: regex_ }, status: 'won' });
});

Meteor.publish('dateSubscribe', function(date) {
	let day = moment(date).format('DD');
	let month = moment(date).format('MM');
	let year = moment(date).format('YYYY');
	let date_ = month + '/' + day + '/' + year;

	return WorkData.find({ workDate: date_, status: 'won' });
});

Meteor.publish('workSchema', function(query, options) {
	const data = WorkData.find(query || {}, options || {});
	return data;
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

Meteor.publish('bonusData', function() {
	return bonusData.find();
});
