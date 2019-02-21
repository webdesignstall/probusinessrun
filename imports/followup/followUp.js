import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import FollowUpMain from './FollowUpMain';

Template.followUp.onRendered(() => {
    ReactDOM.render(<FollowUpMain />, document.getElementById('follow-up'));
});