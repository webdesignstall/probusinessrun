/*global moment*/
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import UpdateDetailed from './UpdateDetailed';

import './updateList.styl';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            display: -1
        };

        this.renderUpdates = this.renderUpdates.bind(this);
        this.display = this.display.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.updates
        });
    }

    display(index) {
        let index_ = -1;
        this.state.display === index ? null : (index_ = index);
        this.setState({
            display: index_
        });
    }

    renderUpdates() {
        return this.state.list.map((list, index) => {
            const { date, by, changes } = list;
            let by_ = {};

            if (by === '') {
                by_ = { firstName: 'automatic by computer', lastName: '' };
            } else if (by === 'customer') {
                by_ = { firstName: 'Customer', lastName: '' };
            } else {
                by_ = Meteor.users.findOne({ _id: by }).profile;
            }

            return (
                <React.Fragment key={'updatesList' + index}>
                    <li onClick={() => this.display(index)} className="collection-item update_list_elements">
                        <span className="update_list_date">{moment(date).format('MM/DD/YYYY hh:mm a')}</span>
                        <span className="update_list_by">
                            {by_.firstName} {by_.lastName}
                        </span>
                    </li>
                    {this.state.display === index ? <UpdateDetailed updates={changes} /> : ''}
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <div className="row update_list_main">
                <div id="update_list" className="col s12 m12 l12 update_list">
                    <span id="update_list_header">updates</span>
                </div>
                <div className="col s12 m12 l12">
                    <ul className="collection">{this.renderUpdates()}</ul>
                </div>
            </div>
        );
    }
}
