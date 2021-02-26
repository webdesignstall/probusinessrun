import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class StatusSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'inProgress'
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let status = Session.get('status');
            this.setState({
                status
            });
        });
    }

    changeStatus(e) {
        this.setState({ status: e.target.value });
    }

    render() {
        let { status } = this.state;
        return (
            <select onChange={e => this.changeStatus(e)} className="browser-default statistic__status_selector" value={status}>
                <option value="all">All Status</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="inProgress">In Progress</option>
                <option value="cancelled">Cancelled</option>
            </select>
        );
    }
}
