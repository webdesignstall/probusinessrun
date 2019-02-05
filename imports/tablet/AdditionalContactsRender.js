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
        this.state.contacts.map((contact, index) => {
            return (<React.Fragment key={index + 'additionalContactRender'}>
                <div className="col s6 m6 l6">
                    <div className="card__">
                        <div>
                            <div className="cardTitle">Customer Main Number:</div>
                            <div className="cardInner">{contact.phoneNumber}</div>
                        </div>
                    </div>
                </div>
                <div className="col s6 m6 l6">
                    <div className="card__">
                        <div>
                            <div className="cardTitle">Customer Secondary Number:</div>
                            <div className="cardInner">{contact.phoneAdditional}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
        });
    }

    render() {
        return (
            <>
                {this.renderContactList()}
            </>
        );
    }
}
