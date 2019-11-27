import React, { Component } from 'react';
import './ccForm.styl';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';

import WorkData from '../../common/collections_2';

export default class CcForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            companyInfo: {},
            firstName: '',
            lastName: '',
            movingDate: '',
            cardHolderInfo: {
                firstName: '',
                lastName: '',
                email: ''
            }
        };

        this.inputSelect = this.inputSelect.bind(this);
        this.sendCCForm = this.sendCCForm.bind(this);

        this.input = React.createRef();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let id = Session.get('tabletIsId');
            let jobInfo = WorkData.findOne({
                _id: id
            });
            if (jobInfo) {
                let firstName = jobInfo.clientFirstName;
                let lastName = jobInfo.clientLastName;
                let companyInfo = jobInfo.companyInfo;
                let cardHolderInfo = jobInfo.cardHolderInfo;

                this.setState({
                    _id: id,
                    firstName,
                    lastName,
                    companyInfo,
                    cardHolderInfo
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    sendCCForm() {
        Meteor.call('emailToCardHolder', this.state, (error, result) => {
            if (error) {
                console.error(error);
                swal({
                    title: 'Error!',
                    text: 'Can\'t send email. Please check email or contact helpdesk',
                    icon: 'error',
                    button: 'OK'
                });
            } else {
                let obj = {
                    _id: this.state._id,
                    cardHolderInfo: this.state.cardHolderInfo
                };

                Meteor.call('updateWork', obj, (err, res) => {
                    if (err) {
                        console.error(err);
                        swal({
                            title: 'Error!',
                            text: 'Can\'t  make update. Please contact helpdesk',
                            icon: 'error',
                            button: 'OK'
                        });
                    }
                    swal({
                        title: 'Success!',
                        text: 'Email successfully sent to card holder',
                        icon: 'success',
                        button: 'OK'
                    });
                    Session.set('ccForm', false);
                });
            }
        });
    }

    inputSelect() {
        this.input.current.setSelectionRange(0, this.state.cardHolderInfo.email.length);
    }

    changeInput(e, what) {
        let value = e.target.value;
        this.setState(prevState => {
            let obj = prevState;
            obj.cardHolderInfo[what] = value;

            return {
                obj
            };
        });
    }

    render() {
        return (
            <div className="ccForm">
                <div className="ccform_form">
                    <div className="row">
                        <div className="col s12 m6 l6">
                            <label htmlFor="cardholder_first_name" className="active">
                                First Name
                            </label>
                            <input
                                id="cardholder_first_name"
                                ref={this.input}
                                onClick={this.inputSelect}
                                onChange={e => this.changeInput(e, 'firstName')}
                                value={this.state.cardHolderInfo.firstName}
                                autoComplete={'none'}
                                placeholder="enter first name"
                                type="text"
                            />
                        </div>
                        <div className="col s12 m5 l5 offset-m1 offset-l1">
                            <label htmlFor="cardholder_last_name" className="active">
                                Last Name
                            </label>
                            <input
                                id="cardholder_last_name"
                                ref={this.input}
                                onClick={this.inputSelect}
                                onChange={e => this.changeInput(e, 'lastName')}
                                value={this.state.cardHolderInfo.lastName}
                                autoComplete={'none'}
                                placeholder="enter last name"
                                type="text"
                            />
                        </div>
                    </div>
                    <label htmlFor="cardholder_email" className="active">
                        Email
                    </label>
                    <input
                        id="cardholder_email"
                        ref={this.input}
                        onClick={this.inputSelect}
                        onChange={e => this.changeInput(e, 'email')}
                        value={this.state.cardHolderInfo.email}
                        autoComplete={'none'}
                        placeholder="enter email"
                        type="text"
                    />
                    <button onClick={() => Session.set('ccForm', false)}>Cancel</button>
                    <button onClick={this.sendCCForm}>Save & Submit</button>
                </div>
            </div>
        );
    }
}
