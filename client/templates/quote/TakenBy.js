import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class TakenBy extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: ''
        };
    }

    fetchUsers(_id) {
        return Meteor.users.find({ _id }).fetch()[0];
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            let userId = Meteor.userId();
            job.takenBy ? (userId = job.takenBy) : null;
            job.takenBy = userId;
            Session.set('job_', job);

            let user = this.fetchUsers(userId);
            this.setState({
                firstName: user ? user.profile.firstName : 'Profile not found',
                lastName: user ? user.profile.lastName : ''
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        let { firstName, lastName } = this.state;
        return (
            <option>
                {firstName} {lastName}
            </option>
        );
    }

    render() {
        return (
            <div id="takenBy">
                <label htmlFor="taken_by_add">Taken by</label>
                <select id="takenBy--value" ref={this.selectRef} disabled={true} className="browser-default">
                    {this.renderList()}
                </select>
            </div>
        );
    }
}
