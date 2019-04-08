import React, { Component } from 'react';
import Header from './header/Header';
import List from './list/List';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader';

export default class FollowUpMain extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {};
    }

    workDataInProgress() {
        return WorkData.find({ status: 'inProgress' }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let progressJobs = this.workDataInProgress();
            let date = new Date().getTime();
            this.setState({
                loading: Session.get('loading'),
            });
            // progressJobs.map(job => {
            //     let jobDateTime = new Date(job.workDate).getTime();
            //     if (jobDateTime + 86400000 <= date) {
            //         job.status = 'lost';
            //         let finalNote_ = {
            //             reason: 'Time Expired',
            //             other: false,
            //         };
            //         job.finalNote = finalNote_;
            //         Meteor.call('updateWork', job);
            //     }
            // });

            // let jobs = this.workDataInProgress().sort((a, b) => {
            //     return new Date(b.quoteDate).getTime() - new Date(a.quoteDate).getTime();
            // });

            // jobs = jobs.sort((a, b) => {
            //     return new Date(a.workDate).getTime() - new Date(b.workDate).getTime();
            // });

            // Session.get('isSearch')
            //     ? null
            //     : (Session.set('searchResult', jobs),
            //     this.setState({
            //         jobs,
            //     }));
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <LoadingOverlay
                text="Loading..."
                className="loader"
                active={this.state.loading}
                spinner={<RingLoader color={'#6DD4B8'} />}>
                <div className="followup-header">
                    <Header />
                    <List />
                </div>
            </LoadingOverlay>
        );
    }
}
