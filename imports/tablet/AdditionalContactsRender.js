import React, { Component } from 'react';

export default class AdditionalContactsRender extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        };
    }

    // TODO: finalize this
    componentDidMount() {
        console.log('AddConta rendered');
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            contacts: nextProps.contacts
        });
    }

    renderContactList() {
        return (this.state.contacts.map((contact, index) => {
            return (
                <div key={index + 'additionalContactRender'}>
                    <div className="col s12 m4 l4">
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Additioal Contact Name:</div>
                                <div className="cardInner">{contact.firstName} {contact.lastName}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Contact Main No:</div>
                                <div className="cardInner">{contact.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="card__">
                            <div>
                                <div className="cardTitle">Contact Secondary No:</div>
                                <div className="cardInner">{contact.phoneAdditional}</div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <hr />
                </div>
            );
        }));
    }

    render() {
        return (
            <React.Fragment>
                {this.renderContactList()}
            </React.Fragment>
        );
    }
}
