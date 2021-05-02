import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import './add.css';
import App from './_add';

Template.add.onRendered(function() {
	// Meteor.subscribe('usersData');
	ReactDOM.render(<App />, document.getElementById('addComponent'));
});

Template.add.onDestroyed(function() {
	ReactDOM.unmountComponentAtNode(document.getElementById('addComponent'));
});
