import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './_add';
import './add.css';
import { Meteor } from 'meteor/meteor';
import Payment from '../payment/Payment';

Template.add.onRendered(function() {
    Meteor.subscribe('usersData');
    ReactDOM.render(<Payment />, document.getElementById('addComponent'));
});

Template.add.onDestroyed(function() {
    ReactDOM.unmountComponentAtNode(document.getElementById('addComponent'));
});
