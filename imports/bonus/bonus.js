import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// components
import './bonusCalculator.html';
import BonusMainPage from './BonusMainPage';

Template.bonusCalculator.onRendered(() => {
    Session.set('bonusMenu', 'dash');
    ReactDOM.render(<BonusMainPage />, document.getElementById('bonuceCalculator'));
});

Template.bonusCalculator.onDestroyed(() => {
    Session.set('bonusMenu', 'dash');
    ReactDOM.unmountComponentAtNode(document.getElementById('bonuceCalculator'));
});
