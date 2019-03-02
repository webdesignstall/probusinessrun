import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import ExtendedJobInformation from './ExtendedJobInformation';

export default class ListInnerDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: '',
        };

        this.showMore = this.showMore.bind(this);
    }

    componentDidMount() {
        Session.set('ExtendedJobInformation', '');
    }

    componentWillUnmount() {
        Session.set('ExtendedJobInformation', '');
    }

    statusOfJob() {
        return (
            <span>
                <span>
                    <i
                        className={
                            this.props.job.status === 'inProgress'
                                ? 'material-icons sari-text'
                                : this.props.job.status === 'won'
                                    ? 'material-icons yasil-text'
                                    : this.props.job.status === 'lost'
                                        ? 'material-icons narinci-text'
                                        : 'material-icons'
                        }
                        style={{
                            position: 'relative',
                            top: '4px',
                            margin: '0 5px 0 10px',
                            fontSize: '18px',
                        }}>
                        fiber_manual_record
                    </i>
                </span>
                <span style={{ marginRight: '10px' }}>
                    {this.props.job.status === 'inProgress'
                        ? 'IN PROGRESS'
                        : this.props.job.status === 'won'
                            ? 'WON'
                            : this.props.job.status === 'lost'
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
                <circle cx="11" cy="11" r="11" fill="#5ABB7E" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#5ABB7E"
                    stroke="#fff"
                    strokeWidth="1">
                    <circle cx="7.333" cy="7.333" r="7.333" stroke="none" />
                    <circle cx="7.333" cy="7.333" r="6.833" fill="none" />
                </g>
            </svg>
        );
        let goyFollowUp = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="11" fill="#25B7D9" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#25B7D9"
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
                <circle cx="11" cy="11" r="11" fill="#f8731b" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#f8731b"
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
                <circle cx="11" cy="11" r="11" fill="#EEC55C" />
                <g
                    transform="translate(3.667 3.667)"
                    fill="#EEC55C"
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
                            top: '3px',
                        }}>
                        {index <
                        (this.props.job.followUp
                            ? this.props.job.followUp.length
                            : -1)
                            ? index ===
                              (this.props.job.followUp
                                  ? this.props.job.followUp.length - 1
                                  : -1)
                                ? this.props.job.status &&
                                  this.props.job.status === 'lost'
                                    ? redFollowUp
                                    : greenFollowUp
                                : sariFollowUp
                            : greyFollowUp}
                    </span>
                    <span
                        className={index === 4 ? 'hide' : ''}
                        style={{
                            position: 'relative',
                            top: '-4px',
                            margin: '0 5px',
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
                                    (this.props.job.followUp
                                        ? this.props.job.followUp.length - 1
                                        : 0)
                                        ? '#EEC55C'
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
        return <span>{this.props.job.reason}</span>;
    }

    showMore(e) {
        e.preventDefault();
        let session = Session.get('ExtendedJobInformation');
        this.props.job._id === session
            ? (Session.set('ExtendedJobInformation', ''),
            Session.set('is', ''),
            this.setState({ show: '' }))
            : (Session.set('ExtendedJobInformation', this.props.job._id),
            Session.set('is', this.props.job._id),
            this.setState({ show: this.props.job._id }));
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.job._id ? '' : 'hide'}>
                    <span
                        style={{
                            marginRight: '8px',
                        }}>
                        {this.props.job ? this.props.job.clientFirstName : ''}
                    </span>
                    <span
                        style={{
                            marginRight: '8px',
                        }}>
                        {this.props.job ? this.props.job.clientLastName : ''}
                    </span>
                    <span
                        style={{
                            marginRight: '8px',
                            backgroundColor: '#3D587E',
                            borderRadius: '5px',
                            color: 'white',
                            padding: '5px 10px',
                        }}>
                        {this.props.job ? this.props.job.workDate : ''}
                    </span>
                    <span
                        style={{
                            marginRight: '8px',
                            borderRadius: '5px',
                            backgroundColor: '#67AD5B',
                            color: 'white',
                            padding: '5px 10px',
                        }}>
                        {this.props.job ? this.props.job.jobNumber : ''}
                    </span>
                    {this.statusOfJob()}
                    {this.followUpStatus()}
                    <span
                        style={{
                            marginRight: '8px',
                            borderRadius: '5px',
                            color: '#50325C',
                            padding: '5px 10px',
                        }}>
                        {this.props.job.companyInfo
                            ? this.props.job.companyInfo.name || ''
                            : ''}
                    </span>
                    {this.reason()}
                    {this.props.job._id === this.state.show ? (
                        <i
                            style={{ top: '-5px', cursor: 'pointer' }}
                            className="material-icons right"
                            onClick={e => this.showMore(e)}>
                            close
                        </i>
                    ) : (
                        <i
                            style={{ top: '-5px', cursor: 'pointer' }}
                            className="material-icons right"
                            onClick={e => this.showMore(e)}>
                            edit
                        </i>
                    )}
                    {Session.get('ExtendedJobInformation') !== '' ? (
                        <ExtendedJobInformation job={this.props.job} />
                    ) : (
                        ''
                    )}
                </div>
                {this.props.job._id ? '' : 'NO RESULT'}
            </React.Fragment>
        );
    }
}

ListInnerDisplay.propTypes = {
    job: PropTypes.object.isRequired,
};
