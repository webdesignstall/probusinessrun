import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';

function CardHolder() {
    return 'Hello';
}

Template.cardHolder.onRendered(() => {
    ReactDOM.render(<CardHolder />, document.getElementById('cardHolder'));
});
