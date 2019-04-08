import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import ListInnerDisplay from './ListInnerDisplay';
import FlipMove from 'react-flip-move';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader';

export default class List extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            loading: false,
        };

        this.renderList = this.renderList.bind(this);
        this.startStopLoading = this.startStopLoading.bind(this);
    }

    workData() {
        return WorkData.find({ status: 'inProgress' }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                loading: true,
            });
            const jobs = this.workData().sort((a, b) => {
                return new Date(a.workDate).getTime() - new Date(b.workDate).getTime();
            });
            this.setState({
                loading: false,
            });

            Session.get('isSearch')
                ? null
                : this.setState({
                    jobs: this.workData().sort((a, b) => {
                        return (
                            new Date(a.workDate || new Date()).getTime() -
                              new Date(b.workDate || new Date()).getTime()
                        );
                    }),
                });
        });
    }

    startStopLoading() {
        this.setState(prevState => {
            return {
                loading: !prevState.loading,
            };
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return this.state.jobs.map(job => {
            return Session.get('is') === job._id ? (
                <div key={job._id + 'followUpList'} className="collection-item">
                    <ListInnerDisplay loading={this.startStopLoading} job={job} />
                </div>
            ) : Session.get('is') === '' ? (
                <div key={job._id + 'followUpList'} className="collection-item">
                    <ListInnerDisplay loading={this.startStopLoading} job={job} />
                </div>
            ) : null;
        });
    }

    render() {
        return (
            <div className="collection">
                <FlipMove>
                    <LoadingOverlay
                        text="Loading..."
                        className="loader"
                        active={this.state.loading}
                        spinner={<RingLoader color={'#6DD4B8'} />}>
                        {this.renderList()}
                    </LoadingOverlay>
                </FlipMove>
            </div>
        );
    }
}
