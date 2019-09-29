import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class CustomerContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.changeHangdler = this.changeHangdler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let { clientFirstName, clientLastName, phoneNumber, phoneAdditional, email } = Session.get('job_');
            this.setState({
                clientFirstName,
                clientLastName,
                phoneNumber,
                phoneAdditional,
                email
            });
        });
    }

    componenWillUnmount() {
        this.x.stop();
    }

    changeHangdler(e, what) {
        let value = e.target.value;
        let job = Session.get('job_');
        job[what] = value;
        this.setState(
            {
                [what]: value
            },
            () => {
                Session.set('job_', job);
            }
        );
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="input-field valideyn col s12 m6 l2">
                    <i className="material-icons isare">account_box</i>
                    <input
                        onChange={e => this.changeHangdler(e, 'clientFirstName')}
                        id="firstName"
                        value={state.clientFirstName || ''}
                        type="text"
                        placeholder=""
                        required={true}
                    />
                    <label className="active" htmlFor="firstName">
                        First Name
                    </label>
                </div>
                <div className="input-field valideyn col s12 m6 l2">
                    <i className="material-icons isare">account_box</i>
                    <input
                        onChange={e => this.changeHangdler(e, 'clientLastName')}
                        id="lastName"
                        type="text"
                        placeholder=""
                        value={state.clientLastName || ''}
                        required={true}
                    />
                    <label className="active" htmlFor="lastName">
                        Last Name
                    </label>
                </div>
                <div className="input-field valideyn col s12 m6 l2">
                    <i className="material-icons isare">phone</i>
                    <input
                        onChange={e => this.changeHangdler(e, 'phoneNumber')}
                        id="phoneNumber"
                        type="number"
                        placeholder=""
                        value={state.phoneNumber || ''}
                        required={true}
                    />
                    <label className="active" htmlFor="phoneNumber">
                        Main Phone Number
                    </label>
                </div>
                <div className="input-field valideyn col s12 m6 l2">
                    <i className="material-icons isare">phone</i>
                    <input
                        onChange={e => this.changeHangdler(e, 'phoneAdditional')}
                        id="phoneNumberAdditional"
                        type="number"
                        placeholder=""
                        value={state.phoneAdditional || ''}
                    />
                    <label className="active" htmlFor="phoneNumberAdditional">
                        Secondary Phone Number
                    </label>
                </div>
                <div className="input-field valideyn col s12 m6 l4">
                    <i className="material-icons isare">email</i>
                    <input
                        onChange={e => this.changeHangdler(e, 'email')}
                        id="musteriEmail"
                        type="email"
                        placeholder=""
                        value={state.email || ''}
                        required={true}
                    />
                    <label className="active" htmlFor="musteriEmail">
                        E-mail
                    </label>
                </div>
            </div>
        );
    }
}
