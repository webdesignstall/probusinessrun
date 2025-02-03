import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExtendedArchiveCardHolder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardHolder: {}
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ cardHolder: nextProps.cardHolder });
    }

    render() {
        let {
            billingAddress,
            creditCardNumber,
            expirationDate,
            creditCardType,
            nameOnCard,
            cardFront,
            cardBack,
            cardHolderId
        } = this.state.cardHolder;
        return (
            <div className="cardHolderInformation">
                <div className="row">
                    <h4>Card Holder Information</h4>
                </div>
                <div className="row">
                    <div className="col s12 m6 l6">
                        <h5>Card Informations</h5>
                        <p>Name On Card: {nameOnCard}</p>
                        <p>Card Type: {creditCardType}</p>
                        <p>Experiation Date: {expirationDate}</p>
                        <p>Credit Card Number: {creditCardNumber}</p>
                    </div>
                    <div className="col s12 m6 l6">
                        <h5>Billing address</h5>
                        <p>{billingAddress}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <p>Card Front</p>
                        <img
                            style={{
                                width: '85%',
                                position: 'static'
                            }}
                            src={cardFront}
                            alt="card holder cards front"
                        />
                    </div>
                    <div className="col s12 m4 l4">
                        <p>Card Back</p>
                        <img
                            style={{
                                width: '85%',
                                position: 'static'
                            }}
                            src={cardBack}
                            alt="card holder cards back"
                        />
                    </div>
                    <div className="col s12 m4 l4">
                        <p>Card Holder ID</p>
                        <img
                            style={{
                                width: '85%',
                                position: 'static'
                            }}
                            src={cardHolderId}
                            alt="card holder id"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ExtendedArchiveCardHolder.propTypes = {
    cardHolder: PropTypes.object
};
