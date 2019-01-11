import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './_add';
import './add.css';

Template.add.onRendered(function () {
    ReactDOM.render(<App />, document.getElementById('addComponent'));
});
