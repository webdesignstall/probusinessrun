import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import ExtendArchive from './ExtendArchive';

export default class ArchiveList extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            extend: false,
            id: ''
        };

        this.renderList = this.renderList.bind(this);
        this.extend = this.extend.bind(this);
    }

    workData() {
        Meteor.call('findJobEx', { finished: true }, (err, res) => {
            if (err) {
                this.setState({
                    list: []
                });
            } else {
                this.setState({
                    list: res
                });
            }
        });
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.props.jobList && this.props.jobList.length > 0
                ? this.setState({
                    list: this.props.jobList
                })
                : this.workData();
        });
    }

    extend(id) {
        this.setState(prevState => {
            return {
                extend: prevState.id === id || prevState.id === '' ? !prevState.extend : prevState.extend,
                id: prevState.id === '' || prevState.id !== id ? id : ''
            };
        });
    }

    componentWillReceiveProps(nextProps) {
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
                    style={{
                        height: this.state.extend ? 'auto' : '40px'
                    }}
                    key={'archiveList' + index}
                    className="collection-item archive-list-item"
                >
                    <div onClick={() => this.extend(job._id)}>
                        <div className="archive-fullName">
                            {job.clientFirstName} {job.clientLastName}
                        </div>
                        <div className="archive-date">{job.workDate}</div>
                        <div className="archive-list--jobNumber">{job.jobNumber}</div>
                        <div className="archive-list--company">{job.companyInfo.name}</div>
                    </div>
                    <div className="right-content">
                        <a
                            href={'https://s3-us-west-1.amazonaws.com/probusinessrun.finished.jobs.pdf/' + job._id + '.pdf'}
                            className="archive-list--contract"
                        >
                            CONTRACT{' '}
                            <i style={{ color: 'black' }} className="material-icons">
                                insert_drive_file
                            </i>
                        </a>
                    </div>
                    {this.state.extend && this.state.id === job._id ? <ExtendArchive job={job || {}} /> : ''}
                </div>
            );
        });
    }

    render() {
        return <div className="collection archive-list">{this.renderList()}</div>;
    }
}
