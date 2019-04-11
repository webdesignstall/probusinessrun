import React, { Component } from 'react';
import './filter.css';
import WorkData from '../../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

export default class Filter extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            clicked: '',
        };

        this.filter = this.filter.bind(this);
        this.workData = this.workData.bind(this);
    }

    filter(status) {
        this.setState(
            {
                clicked: status,
            },
            () => {
                Session.set('status', status);
                Session.set('searchWords', '');
            },
        );
    }

    workData(status) {
        return status === '' ? WorkData.find({ status: 'inProgress' }).fetch() : WorkData.find({ status }).fetch();
    }

    render() {
        return (
            <div className="sag">
                <ul className="filter--list sag">
                    <li
                        className={this.state.clicked === '' || this.state.clicked === 'inProgress' ? 'sari_' : ''}
                        onClick={() => this.filter('inProgress')}>
                        IN PROGRESS
                    </li>
                    <li className={this.state.clicked === 'lost' ? 'qirmizi_' : ''} onClick={() => this.filter('lost')}>
                        LOST
                    </li>
                    <li className={this.state.clicked === 'won' ? 'yasil_' : ''} onClick={() => this.filter('won')}>
                        WON
                    </li>
                    <li
                        className={this.state.clicked === 'cancelled' ? 'boz_' : ''}
                        onClick={() => this.filter('cancelled')}>
                        CANCELLED
                    </li>
                </ul>
                <span className="sag">
                    <i className="material-icons">filter_list</i>
                </span>
            </div>
        );
    }
}
