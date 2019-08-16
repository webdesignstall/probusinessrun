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

        this.state = {
            loading: false,
            dataReady: false,
            workDataInProgress: []
        };

        this.workDataInProgress = this.workDataInProgress.bind(this);
    }

    workDataInProgress() {
        let res = WorkData.find({ status: 'inProgress' }).fetch() || [];
        this.setState(
            {
                workDataInProgress: res
            },
            () => {
                Session.set('_', '_');
            }
        );
    }

    UNSAFE_componentWillMount() {
        Session.set('loading', true);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Session.set('loading', true);
            Session.set('_', '');
            let status = Session.get('status');
            this.setState({
                dataReady: false
            });
            Meteor.subscribe(
                'workSchema',
                { status },
                {
                    onReady: () => {
                        this.setState(
                            {
                                dataReady: true
                            },
                            () => {
                                this.workDataInProgress();

                                let progressJobs = this.state.workDataInProgress;
                                let sess = Session.get('_');
                                let date = new Date().getTime();
                                this.setState({
                                    loading: true
                                });
                                progressJobs.map(job => {
                                    let jobDateTime = new Date(job.workDate).getTime();
                                    if (jobDateTime + 86400000 <= date) {
                                        job.status = 'lost';
                                        let finalNote_ = {
                                            reason: 'Time Expired',
                                            other: false
                                        };
                                        job.finalNote = finalNote_;

                                        job.ip = Session.get('ip');

                                        Meteor.call('updateWork', job, err => {
                                            err
                                                ? console.error('Error while trying to make lost some jobs. ' + err.reason)
                                                : null;
                                        });
                                    }
                                });
                                this.setState(
                                    {
                                        loading: false
                                    },
                                    () => {
                                        Session.set('loading', false);
                                    }
                                );
                            }
                        );
                    }
                }
            );
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
                active={Session.get('loading')}
                spinner={<RingLoader color={'#6DD4B8'} />}>
                <div className="followup-header">
                    <Header />
                    {this.state.dataReady ? <List /> : ''}
                </div>
            </LoadingOverlay>
        );
    }
}
