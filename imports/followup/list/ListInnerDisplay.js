import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ListInnerDisplay extends Component {
    constructor(props) {
        super(props);
    }

    statusOfJob() {
        return (
            <span>
                <span

                >
                    <i
                        className={
                            this.props.job.status === 'inProgress'
                                ? 'material-icons yasil-text'
                                : this.props.job.status === 'won'
                                    ? 'material-icons goy-text'
                                    : this.props.job.status === 'lost'
                                        ? 'material-icons sari-text'
                                        : 'material-icons'
                        }

                        style={{
                            position: 'relative',
                            top: '4px',
                            margin: '0 5px 0 10px',
                            fontSize: '18px'
                        }}
                    >
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
                                : 'STATUS UNDEFINED'
                    }
                </span>
            </span >
        );
    }

    followUpStatus() {
        let status = [{}, {}, {}, {}, {}];

        return (
            status.map((obj, index) => {
                return (
                    <span key={index + 'followUpStatus'}>
                        <i
                            className={
                                (index < (this.props.job.followUp ? this.props.job.followUp.length : -1))
                                    ? (
                                        (this.props.job.status && this.props.job.status === 'lost') && (index === (this.props.job.followUp ? this.props.job.followUp.length - 1 : -1))
                                    )
                                        ? 'material-icons sari-text'
                                        : 'material-icons yasil-text'
                                    : 'material-icons'
                            }
                            style={{
                                position: 'relative',
                                top: '2px',
                                fontSize: '16px'
                            }}>
                            check_circle
                        </i>
                        <i
                            className={
                                index === 4
                                    ? 'hide'
                                    : (index < (this.props.job.followUp ? this.props.job.followUp.length - 1 : 0))
                                        ? 'material-icons yasil-text'
                                        : 'material-icons'
                            }
                            style={{
                                position: 'relative',
                                top: '2px',
                                fontSize: '16px'
                            }}>
                            more_horiz
                        </i>
                        <i
                            className={
                                index === 4
                                    ? 'hide'
                                    : (index < (this.props.job.followUp ? this.props.job.followUp.length - 1 : 0))
                                        ? 'material-icons yasil-text'
                                        : 'material-icons'
                            }
                            style={{
                                position: 'relative',
                                top: '2px',
                                fontSize: '16px'
                            }}>
                            more_horiz
                        </i>
                    </span>
                );
            })
        );
    }

    reason() {
        return (
            <span>
                {this.props.job.reason}
            </span>
        );
    }

    render() {
        return (
            <div>
                <span
                    style={{
                        marginRight: '8px'
                    }}
                >
                    {this.props.job ? this.props.job.clientFirstName : ''}
                </span>
                <span
                    style={{
                        marginRight: '8px'
                    }}
                >
                    {this.props.job ? this.props.job.clientLastName : ''}
                </span>
                <span
                    style={{
                        marginRight: '8px'
                    }}
                >
                    {this.props.job ? this.props.job.workDate : ''}
                </span>
                {this.statusOfJob()}
                {this.followUpStatus()}
                {this.reason()}
            </div>
        );
    }
}

ListInnerDisplay.propTypes = {
    job: PropTypes.object.isRequired
};