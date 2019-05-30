import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
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

    extend(id) {
        this.setState(prevState => {
            return {
                extend:
                    prevState.id === id || prevState.id === ''
                        ? !prevState.extend
                        : prevState.extend,
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
                    className="collection-item archive-list-item">
                    <div onClick={() => this.extend(job._id)}>
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
                    <div className="right-content">
                        <a
                            className="archive-list--contract"
                            href={job.finishedJobPDF || ''}>
                            CONTRACT{' '}
                            <i
                                style={{ color: 'black' }}
                                className="material-icons">
                                insert_drive_file
                            </i>
                        </a>
                        <a
                            className="archive-list--contract"
                            href={job.finishedJobPDF || ''}>
                            CARDHOLDER{' '}
                            <i
                                style={{ color: 'black' }}
                                className="material-icons">
                                insert_drive_file
                            </i>
                        </a>
                    </div>
                    {this.state.extend && this.state.id === job._id ? (
                        <ExtendArchive job={job || {}} />
                    ) : (
                        ''
                    )}
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
