import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import ListInnerDisplay from './ListInnerDisplay';
import FlipMove from 'react-flip-move';

export default class List extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
        };

        this.renderList = this.renderList.bind(this);
    }

    workData() {
        return WorkData.find({}).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            const jobs = this.workData().sort((a, b) => {
                return new Date(b.workDate).getTime() - new Date(a.workDate).getTime();
            });

            Session.get('searchResult').length > 0
                ? null
                : (Session.set('searchResult', jobs),
                this.setState({
                    jobs,
                }));
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return Session.get('searchResult') && Session.get('searchResult').length > 0
            ? Session.get('searchResult').map(job => {
                return (
                    <div key={job._id + 'followUpList'} className="collection-item">
                        <ListInnerDisplay job={job} />
                    </div>
                );
            })
            : null;
    }

    render() {
        return (
            <div className="collection">
                <FlipMove>{this.renderList()}</FlipMove>
            </div>
        );
    }
}
