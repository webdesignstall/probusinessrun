import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import FollowUpMainX from './FollowUpMainX';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import jobNumberCreator from '../../client/templates/quote/JobNumberCreator';

Template.followUp.onRendered(() => {
	this.x = Tracker.autorun(() => {
		ReactDOM.render(<FollowUpMainX />, document.getElementById('follow-up'));
	});
});

Template.followUp.onDestroyed(() => {
	ReactDOM.unmountComponentAtNode(document.getElementById('follow-up'));
	Session.set('isciId', '');
	Session.set('jobNumber', '');
	Session.set('tabletIsId', '');
	Session.set('is', '');
	Session.set('payed', false);
	Session.set('companyInfo', {});
	Session.set('secilmisIsciler', []);
	Session.set('trucklar', []);
	Session.set('clicked', false);
	Session.set('flatRate', false);
	Session.set('promoCodes', ['zumka']);
	Session.set('discountAproved', false);
	Session.set('discountId', null);
	Session.set('movingSize', 'select_moving_size');
	Session.set('job', {});
	Session.set('reset', false);
	Session.set('additionalContacts', []);
	Session.set('ExtendedJobInformation', '');
	Session.set('isSearch', false);
	Session.set('loading', false);
	Session.set('status', 'inProgress');
	Session.set('searchWords', '');
	Session.set('job_', {
		takenBy: Meteor.userId(),
		sourceOfLeads: 'call',
		quoteDate: new Date()
	});
	jobNumberCreator();
});
