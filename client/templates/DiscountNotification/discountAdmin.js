import { Template } from 'meteor/templating';
import DiscountAdminRender from './DiscountAdminRender';
import React from 'react';
import ReactDOM from 'react-dom';

Template.discountAdmin.onRendered(() => {
    ReactDOM.render(<DiscountAdminRender />, document.querySelector('#discountAdminPanel'));
});
