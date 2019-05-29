import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';

export default class ArchiveList extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };

        this.renderList = this.renderList.bind(this);
    }

    workData() {
        return WorkData.find({ finished: true }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                list:
                    this.props.jobList && this.props.jobList.length > 0
                        ? this.props.jobList
                        : this.workData()
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.jobList);
        this.setState({
            list: nextProps.jobList
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return this.state.list.map((job, index) => {
            return (
                <div
                    key={'archiveList' + index}
                    className="collection-item archive-list-item">
                    <div className="archive-fullName">
                        {job.clientFirstName} {job.clientLastName}
                    </div>
                    <div className="archive-date">{job.workDate}</div>
                    <div className="archive-list--jobNumber">
                        {job.jobNumber}
                    </div>
                    <div className="archive-list--company">
                        {job.companyInfo.name}
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="collection archive-list">{this.renderList()}</div>
        );
    }
}
