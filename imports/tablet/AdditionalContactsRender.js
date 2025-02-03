import React, { Component } from 'react';

export default class AdditionalContactsRender extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            contacts: nextProps.contacts
        });
    }

    renderContactList() {
        return this.state.contacts.map((contact, index) => {
            return (
                <div className="row" key={index + 'additionalContactRender'}>
                    <div
                        className={
                            contact.phoneAdditional !== '' &&
                            contact.phoneAdditional !== null &&
                            contact.phoneAdditional !== undefined
                                ? 'col s12 m4 l4'
                                : 'col s12 m6 l6'
                        }
                    >
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Additional Contact Name:</div>
                                <div className="cardInner">
                                    {contact.firstName} {contact.lastName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            contact.phoneAdditional !== '' &&
                            contact.phoneAdditional !== null &&
                            contact.phoneAdditional !== undefined
                                ? 'col s12 m4 l4'
                                : 'col s12 m6 l6'
                        }
                    >
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Contact Main Number:</div>
                                <div className="cardInner">{contact.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            contact.phoneAdditional !== '' &&
                            contact.phoneAdditional !== null &&
                            contact.phoneAdditional !== undefined
                                ? 'col s12 m4 l4'
                                : 'hide'
                        }
                    >
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Contact Secondary Number:</div>
                                <div className="cardInner">{contact.phoneAdditional}</div>
                            </div>
                        </div>
                    </div>
                    <div className="clear" />
                    <hr />
                </div>
            );
        });
    }

    render() {
        return <React.Fragment>{this.renderContactList()}</React.Fragment>;
    }
}
