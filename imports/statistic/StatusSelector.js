import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class StatusSelector extends Component {
    changeStatus(e) {
        Session.set('status', e.target.value);
    }
    render() {
        return (
            <select onChange={e => this.changeStatus(e)} className="browser-default statistic__status_selector" value={Session.get('status')}>
                <option value="all">All Status</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="inProgress">In Progress</option>
                <option value="cancelled">Cancelled</option>
            </select>
        );
    }
}
