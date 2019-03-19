import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import ExtendedJobInformation from './ExtendedJobInformation';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';

export default class ListInnerDisplay extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            show: '',
            job: {}
        };

        this.showMore = this.showMore.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            job: this.workData(nextProps.job._id)[0]
        });
    }

    workData(_id) {
        return WorkData.find({ _id }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                job: this.workData(this.props.job._id)[0]
            });
            Session.set('ExtendedJobInformation', '');
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    statusOfJob() {
        return (
            <span>
                <span>
                    <i
                        className={
                            this.state.job.status === 'inProgress'
                                ? 'material-icons sari-text'
                                : this.state.job.status === 'won'
                                    ? 'material-icons yasil-text'
                                    : this.state.job.status === 'lost'
                                        ? 'material-icons narinci-text'
                                        : 'material-icons'
                        }
                        style={{
                            position: 'relative',
                            top: '4px',
                            margin: '0 5px 0 10px',
                            fontSize: '18px'
                        }}>
                        fiber_manual_record
                    </i>
                </span>
                <span style={{ marginRight: '10px' }}>
                    {this.state.job.status === 'inProgress'
                        ? 'IN PROGRESS'
                        : this.state.job.status === 'won'
                            ? 'WON'
                            : this.state.job.status === 'lost'
                                ? 'LOST'
                                : 'STATUS UNDEFINED'}
                </span>
            </span>
        );
    }

    followUpStatus() {
        let status = [{}, {}, {}, {}, {}];

        let greenFollowUp = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="11" fill="#4cd137" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#4cd137"
                    stroke="#fff"
                    strokeWidth="1">
                    <circle cx="7.333" cy="7.333" r="7.333" stroke="none" />
                    <circle cx="7.333" cy="7.333" r="6.833" fill="none" />
                </g>
            </svg>
        );
        let redFollowUp = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="11" fill="#e84118" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#e84118"
                    stroke="#fff"
                    strokeWidth="1">
                    <circle cx="7.333" cy="7.333" r="7.333" stroke="none" />
                    <circle cx="7.333" cy="7.333" r="6.833" fill="none" />
                </g>
            </svg>
        );
        let greyFollowUp = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="11" fill="#a0a7a7" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#a0a7a7"
                    stroke="#fff"
                    strokeWidth="1">
                    <circle cx="7.333" cy="7.333" r="7.333" stroke="none" />
                    <circle cx="7.333" cy="7.333" r="6.833" fill="none" />
                </g>
            </svg>
        );
        let sariFollowUp = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="11" fill="#ffd32a" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#ffd32a"
                    stroke="#fff"
                    strokeWidth="1">
                    <circle cx="7.333" cy="7.333" r="7.333" stroke="none" />
                    <circle cx="7.333" cy="7.333" r="6.833" fill="none" />
                </g>
            </svg>
        );

        return status.map((obj, index) => {
            return (
                <span key={index + 'followUpStatus'}>
                    <span
                        style={{
                            position: 'relative',
                            top: '3px'
                        }}>
                        {index <
                        (this.state.job.followUp
                            ? this.state.job.followUp.length
                            : -1)
                            ? index ===
                              (this.state.job.followUp
                                  ? this.state.job.followUp.length - 1
                                  : -1)
                                ? this.state.job.status &&
                                  this.state.job.status === 'lost'
                                    ? redFollowUp
                                    : this.state.job.status &&
                                      this.state.job.status === 'won'
                                        ? greenFollowUp
                                        : sariFollowUp
                                : sariFollowUp
                            : greyFollowUp}
                    </span>
                    <span
                        className={index === 4 ? 'hide' : ''}
                        style={{
                            position: 'relative',
                            top: '-4px',
                            margin: '0 5px'
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="2"
                            viewBox="0 0 40 2">
                            <line
                                x2="40"
                                transform="translate(0 1)"
                                fill="none"
                                stroke={
                                    index <
                                    (this.state.job.followUp
                                        ? this.state.job.followUp.length - 1
                                        : 0)
                                        ? '#ffd32a'
                                        : '#98ABAB'
                                }
                                strokeWidth="2"
                            />
                        </svg>
                    </span>
                </span>
            );
        });
    }

    reason() {
        return <span>{this.state.job.reason}</span>;
    }

    showMore(e) {
        e.preventDefault();
        let session = Session.get('ExtendedJobInformation');
        if (this.state.job._id === session && session !== '') {
            Session.set('ExtendedJobInformation', '');
            Session.set('is', '');
            Session.set('searchResult', Session.get('searchResult_'));
            this.setState({ show: '' });
        } else {
            Session.set('is', this.state.job._id);
            Session.get('searchResult').length > 1
                ? Session.set('searchResult_', Session.get('searchResult'))
                : null;
            Session.set('searchResult', [this.state.job]);
            Session.set('ExtendedJobInformation', this.state.job._id);
            this.setState({ show: this.state.job._id });
        }
    }

    displayInfo() {
        return (
            <div className={this.state.job._id ? '' : 'hide'}>
                <span
                    style={{
                        marginRight: '8px'
                    }}>
                    {this.state.job ? this.state.job.clientFirstName : ''}
                </span>
                <span
                    style={{
                        marginRight: '8px'
                    }}>
                    {this.state.job ? this.state.job.clientLastName : ''}
                </span>
                <span
                    style={{
                        marginRight: '8px',
                        backgroundColor: '#3D587E',
                        borderRadius: '5px',
                        color: 'white',
                        padding: '5px 10px'
                    }}>
                    {this.state.job ? this.state.job.workDate : ''}
                </span>
                <span
                    style={{
                        marginRight: '8px',
                        borderRadius: '5px',
                        backgroundColor: '#67AD5B',
                        color: 'white',
                        padding: '5px 10px'
                    }}>
                    {this.state.job ? this.state.job.jobNumber : ''}
                </span>
                {this.statusOfJob()}
                {this.followUpStatus()}
                <span
                    style={{
                        marginRight: '8px',
                        borderRadius: '5px',
                        color: '#50325C',
                        padding: '5px 10px'
                    }}>
                    {this.state.job.companyInfo
                        ? this.state.job.companyInfo.name || ''
                        : ''}
                </span>
                {this.reason()}
                {Session.get('is') !== '' &&
                Session.get('is') === this.state.show ? (
                        <i
                            style={{ top: '-5px', cursor: 'pointer' }}
                            className="material-icons right"
                            onClick={(e) => this.showMore(e)}>
                        close
                        </i>
                    ) : (
                        <i
                            style={{ top: '-5px', cursor: 'pointer' }}
                            className="material-icons right"
                            onClick={(e) => this.showMore(e)}>
                        edit
                        </i>
                    )}
                <span
                    style={{
                        marginRight: '8px',
                        borderRadius: '5px',
                        backgroundColor: this.state.job.quote
                            ? '#77AB64'
                            : '#D64F2D',
                        color: 'white',
                        padding: '5px 10px'
                    }}>
                    Quote
                </span>
                {Session.get('ExtendedJobInformation') !== '' ? (
                    <ExtendedJobInformation job={this.state.job} />
                ) : (
                    ''
                )}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.state.job && this.state.job._id ? this.displayInfo() : ''}
                {this.state.job && this.state.job._id ? '' : 'NO RESULT'}
            </React.Fragment>
        );
    }
}

ListInnerDisplay.propTypes = {
    job: PropTypes.object.isRequired
};
