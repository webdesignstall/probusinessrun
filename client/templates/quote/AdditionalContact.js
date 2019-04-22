import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';

export default class AdditionalContact extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            additionalContacts: [],
        };

        this.addMore = this.addMore.bind(this);
        this.deleteAddContacnt = this.deleteAddContacnt.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Session.get('reset') ? this.setState({ additionalContacts: [] }) : null;

            this.setState({
                additionalContacts: this.props.contacts || [],
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    animateHeight(id, height) {
        let element = document.getElementById(id);

        element.style.height = height + 'px';
    }

    deleteAddContacnt(index) {
        this.setState(
            prevState => {
                let newArr = prevState.additionalContacts;
                newArr.splice(index, 1);

                return {
                    additionalContacts: newArr,
                };
            },
            () => {
                let height = 32 + 88 * this.state.additionalContacts.length;
                this.animateHeight('additionalContactId', height);
            },
        );
    }

    componentWillReceiveProps(nextProps) {
        Array.isArray(nextProps.contacts) && nextProps.contacts.length > 0
            ? this.setState({
                additionalContacts: nextProps.contacts,
            })
            : null;
    }

    changeInput(index, targ, event) {
        let yazi = new AsYouType('US').input(event.target.value);
        console.log('TCL: AdditionalContact -> changeInput -> yazi', yazi);
        this.setState(
            prevState => {
                let info = prevState.additionalContacts;
                info[index][targ] = yazi;

                return {
                    additionalContacts: info,
                };
            },
            () => {
                Session.set('additionalContacts', this.state.additionalContacts);
                this.props.updateJob && this.props.updateJob(this.state);
            },
        );
    }

    addMore() {
        this.setState(
            prevState => {
                let arr = prevState.additionalContacts.concat({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    additionalPhoneNumber: '',
                });

                return {
                    additionalContacts: arr,
                };
            },
            () => {
                let height = 32 + 88 * this.state.additionalContacts.length;
                this.animateHeight('additionalContactId', height);
            },
        );
    }

    renderAdditional() {
        return this.state.additionalContacts.map((contact, index) => {
            return (
                <div key={index + 'additionalContact'} className="row" style={{ marginTop: '10px' }}>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">account_box</i>
                        <input
                            onChange={event => this.changeInput(index, 'firstName', event)}
                            id={index + 'firstNameAdditionalContact'}
                            value={contact.firstName}
                            type="text"
                            placeholder=""
                            required
                        />
                        <label className="active" htmlFor={index + 'firstNameAdditionalContact'}>
                            First Name
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">account_box</i>
                        <input
                            onChange={event => this.changeInput(index, 'lastName', event)}
                            id={index + 'lastNameAdditionalContact'}
                            value={contact.lastName}
                            type="text"
                            placeholder=""
                            required
                        />
                        <label className="active" htmlFor={index + 'lastNameAdditionalContact'}>
                            Last Name
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">phone</i>
                        <input
                            onChange={event => this.changeInput(index, 'phoneNumber', event)}
                            id={index + 'phoneNumberAdditionalContact'}
                            value={contact.phoneNumber}
                            type="text"
                            placeholder=""
                            required
                        />
                        <label className="active" htmlFor={index + 'phoneNumberAdditionalContact'}>
                            Main Phone Number
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m5 l2">
                        <i className="material-icons isare">phone</i>
                        <input
                            onChange={event => this.changeInput(index, 'additionalPhoneNumber', event)}
                            id={index + 'phoneNumberAddAdditionalContact'}
                            value={contact.additionalPhoneNumber}
                            type="text"
                            placeholder=""
                        />
                        <label className="active" htmlFor={index + 'phoneNumberAddAdditionalContact'}>
                            Secondary Phone Number
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m1 l1">
                        <i
                            className="material-icons isare"
                            onClick={() => this.deleteAddContacnt(index)}
                            style={{
                                color: 'red',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}>
                            delete_forever
                        </i>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div
                id="additionalContactId"
                className="row add_contact"
                style={{
                    // border: '1px solid #D55B26',
                    margin: '10px 0 0 0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: '32px',
                    backgroundColor: '#D9DCDD',
                }}>
                <span
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '5px 10px',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        backgroundColor: '#D55B26',
                        color: 'white',
                        borderRadius: '14px',
                        margin: '0 4px 0 0',
                        position: 'relative',
                        textTransform: 'uppercase',
                    }}>
                    Additional Contact
                    <i
                        className="material-icons"
                        onClick={this.addMore}
                        style={{
                            position: 'absolute',
                            margin: '5px 0 0 15px',
                            color: '#4EDB9E',
                            top: '-2px',
                            cursor: 'pointer',
                        }}>
                        add_circle
                    </i>
                </span>
                {this.renderAdditional()}
            </div>
        );
    }
}

AdditionalContact.propTypes = {
    updateJob: PropTypes.func,
    contacts: PropTypes.array,
};
