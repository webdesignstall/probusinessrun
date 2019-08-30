import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import followUpTemplate from './followUpTemplate';

/*global swal*/

export default class SendEmailFollowUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
            id: '',
            loading: false
        };

        this.sendEmailFollowUp = this.sendEmailFollowUp.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            job: nextProps.job,
            id: nextProps.id
        });
    }

    componentDidMount() {
        this.setState({
            job: this.props.job,
            id: this.props.id
        });
    }

    sendEmailFollowUp() {
        this.setState(
            {
                loading: true
            },
            () => {
                let { job, id } = this.state;
                let template = followUpTemplate(job);
                Meteor.call('followUpEmail', job, template, (err, res) => {
                    if (err) {
                        console.error(err);
                        swal({
                            title: 'Error! Can\'t send email to customer',
                            text: err.reason,
                            icon: 'error',
                            button: 'OK'
                        });
                        this.setState({ loading: false });
                    } else {
                        swal({
                            title: 'Success!',
                            text: 'Email was send successfully.',
                            icon: 'success',
                            button: 'OK'
                        });
                        // document.getElementById(id).value = 'Follow up email was sent \n' + document.getElementById(id).value;
                        this.props.update(id);
                        this.setState({ loading: false });
                    }
                });
            }
        );
    }

    render() {
        return (
            <div className="relative" style={{ width: '200px', display: 'inline-block' }}>
                <span className={this.state.loading ? '' : 'hide'}>
                    <svg
                        width="20px"
                        height="20px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        className="lds-eclipse">
                        <path
                            ng-attr-d="{{config.pathCmd}}"
                            ng-attr-fill="{{config.color}}"
                            stroke="none"
                            d="M10 50A40 40 0 0 0 90 50A40 46 0 0 1 10 50"
                            fill="#fc4309"
                            transform="rotate(131.736 50 53)">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                calcMode="linear"
                                values="0 50 53;360 50 53"
                                keyTimes="0;1"
                                dur="1s"
                                begin="0s"
                                repeatCount="indefinite"></animateTransform>
                        </path>
                    </svg>
                </span>
                <span className={this.state.loading ? 'hide' : 'send_email_followUp'} onClick={this.sendEmailFollowUp}>
                    Send Email
                </span>
            </div>
        );
    }
}

SendEmailFollowUp.propTypes = {
    job: PropTypes.object.isRequired,
    id: PropTypes.number,
    update: PropTypes.func
};
