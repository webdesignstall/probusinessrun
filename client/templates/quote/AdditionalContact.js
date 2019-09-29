import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class AdditionalContact extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            additionalContacts: []
        };

        this.addMore = this.addMore.bind(this);
        this.deleteAddContacnt = this.deleteAddContacnt.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Session.get('reset') ? this.setState({ additionalContacts: [] }) : null;
            let { additionalContacts } = Session.get('job_');

            this.setState({
                additionalContacts
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
        this.setState(prevState => {
            let newArr = prevState.additionalContacts;
            let job = Session.get('job_');

            newArr.splice(index, 1);

            job.additionalContacts = newArr;
            Session.set('job_', job);

            return {
                additionalContacts: newArr
            };
        });
    }

    changeInput(index, targ, event) {
        let regex = new RegExp(/^\d+$/);
        let value = '';
        let that = this;

        function setValueToState() {
            value = event.target.value;
            let job = Session.get('job_');

            that.setState(
                prevState => {
                    let info = prevState.additionalContacts;
                    info[index][targ] = value;

                    return {
                        additionalContacts: info
                    };
                },
                () => {
                    job.additionalContacts = that.state.additionalContacts;
                    Session.set('job_', job);
                    that.props.updateJob && that.props.updateJob(that.state);
                }
            );
        }

        if (targ === 'phoneNumber' || targ === 'additionalPhoneNumber') {
            if (regex.test(event.target.value)) {
                value = event.target.value;

                setValueToState();
            }
        } else {
            setValueToState();
        }
    }

    addMore() {
        this.setState(prevState => {
            let arr = prevState.additionalContacts || [];
            arr.push({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                additionalPhoneNumber: ''
            });

            return {
                additionalContacts: arr
            };
        });
    }

    renderAdditional() {
        return (
            this.state.additionalContacts &&
            this.state.additionalContacts.map((contact, index) => {
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
                                    marginLeft: '10px'
                                }}>
                                delete_forever
                            </i>
                        </div>
                    </div>
                );
            })
        );
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
                    // height: '32px',
                    backgroundColor: '#D9DCDD'
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
                        textTransform: 'uppercase'
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
                            cursor: 'pointer'
                        }}>
                        add_circle
                    </i>
                </span>
                {this.renderAdditional()}
            </div>
        );
    }
}
