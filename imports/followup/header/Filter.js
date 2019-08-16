import React, { Component } from 'react';
import './filter.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

export default class Filter extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            clicked: 'inProgress'
        };

        this.filter = this.filter.bind(this);
    }

    filter(status) {
        this.setState(
            prevState => {
                return prevState.clicked === status ? { clicked: '' } : { clicked: status };
            },
            () => {
                Session.set('status', status);
                Session.set('searchWords', '');
                Session.set('is', '');
                Session.set('ExtendedJobInformation', '');
                Session.set('dataReady', false);
            }
        );
    }

    render() {
        return (
            <div className="filter--main">
                <ul className={'filter--list'}>
                    <li
                        className={this.state.clicked === '' || this.state.clicked === 'inProgress' ? 'sari_' : 'hide'}
                        onClick={() => this.filter('inProgress')}>
                        IN PROGRESS
                    </li>
                    <li
                        className={this.state.clicked === '' || this.state.clicked === 'lost' ? 'qirmizi_' : 'hide'}
                        onClick={() => this.filter('lost')}>
                        LOST
                    </li>
                    <li
                        className={this.state.clicked === '' || this.state.clicked === 'won' ? 'yasil_' : 'hide'}
                        onClick={() => this.filter('won')}>
                        WON
                    </li>
                    <li
                        className={this.state.clicked === '' || this.state.clicked === 'cancelled' ? 'boz_' : 'hide'}
                        onClick={() => this.filter('cancelled')}>
                        CANCELLED
                    </li>
                </ul>
            </div>
        );
    }
}
