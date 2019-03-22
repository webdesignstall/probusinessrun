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

    filter(type) {
        if (this.state.clicked === type) {
            this.setState({ clicked: '' }, () => {
                let list = this.workData('');
                list.sort((a, b) => {
                    return new Date(b.workDate).getTime() - new Date(a.workDate).getTime();
                });
                Session.set('searchResult', list);
            });
        } else {
            this.setState({ clicked: type }, () => {
                let list = this.workData(type);
                list.sort((a, b) => {
                    return new Date(b.workDate).getTime() - new Date(a.workDate).getTime();
                });
                Session.set('searchResult', list);
            });
        }
    }

    workData(status) {
        return status === ''
            ? WorkData.find({ confirmed: false, status: 'inProgress' }).fetch()
            : WorkData.find({ status }).fetch();
    }

    render() {
        return (
            <div className="sag">
                <ul className="filter--list sag">
                    <li
                        className={this.state.clicked === 'inProgress' ? 'sari_' : ''}
                        onClick={() => this.filter('inProgress')}>
                        IN PROGRESS
                    </li>
                    <li className={this.state.clicked === 'lost' ? 'qirmizi_' : ''} onClick={() => this.filter('lost')}>
                        LOST
                    </li>
                    <li className={this.state.clicked === 'won' ? 'yasil_' : ''} onClick={() => this.filter('won')}>
                        WON
                    </li>
                </ul>
                <span className="sag">
                    <i className="material-icons">filter_list</i>
                </span>
            </div>
        );
    }
}
