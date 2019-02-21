import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

export default class List extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        };

        this.renderList = this.renderList.bind(this);
    }

    workData() {
        return WorkData.find({}).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            const jobs = this.workData();
            Session.set('searchResult', jobs);
            this.setState({
                jobs
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return (
            Session.get('searchResult') && Session.get('searchResult').length > 0
                ? Session.get('searchResult').map((job) => {
                    return (
                        <div key={job._id + 'followUpList'} className="followup-list--elements" >
                            {job.clientFirstName.toUpperCase()} {job.clientLastName.toUpperCase()}
                        </div>
                    );
                })
                : null
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderList()}
            </React.Fragment>
        );
    }
}
