import React, { Component } from 'react';
import Header from './header/Header';
import List from './list/List';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../common/collections_2';
import { Tracker } from 'meteor/tracker';

export default class FollowUpMain extends TrackerReact(Component) {
    constructor(props) {
        super(props);
    }

    workData() {
        return WorkData.find({ isFollowUp: true }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            const jobs = this.workData().sort((a, b) => {
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
