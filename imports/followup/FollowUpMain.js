import React, { Component } from 'react';
import Header from './header/Header';
import List from './list/List';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

export default class FollowUpMain extends TrackerReact(Component) {
    constructor(props) {
        super(props);
    }

    workData() {
        return WorkData.find({ isFollowUp: true }).fetch();
    }

    workDataInProgress() {
        return WorkData.find({ status: 'inProgress' }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let progressJobs = this.workDataInProgress();
            let date = new Date().getTime();
            progressJobs.map((job, index) => {
                let jobDateTime = new Date(job.workDate).getTime();
                if (jobDateTime <= date) {
                    job.status = 'lost';
                    let finalNote_ = {
                        reason: 'Time Expired',
                        other: false
                    };
                    job.finalNote = finalNote_;
                    Meteor.call('updateWork', job);
                }
            });

            let jobs = this.workData().sort((a, b) => {
                return (
                    new Date(b.quoteDate).getTime() -
                    new Date(a.quoteDate).getTime()
                );
            });

            jobs = jobs.sort((a, b) => {
                return (
                    new Date(b.workDate).getTime() -
                    new Date(a.workDate).getTime()
                );
            });

            Session.get('isSearch')
                ? null
                : (Session.set('searchResult', jobs),
                this.setState({
                    jobs
                }));
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <div className="followup-header">
                <Header />
                <List />
            </div>
        );
    }
}
