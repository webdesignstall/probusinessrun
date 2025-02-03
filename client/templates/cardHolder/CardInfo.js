import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*global $*/

class CardInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOnCard: '',
            billingAddress: '',
            creditCardType: 'visa',
            creditCardNumber: '',
            expirationDate: '',
            cardId: ''
        };
    }

    inputChange(e, what) {
        let value = e.target.value;
        this.setState({ [what]: value }, () => {
            this.props.change(what, value);
        });
    }

    componentDidMount() {
        $('select').material_select();
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         nameOnCard: nextProps.state.nameOnCard,
    //         billingAddress: nextProps.state.billingAddress,
    //         creditCardType: nextProps.state.creditCardType,
    //         creditCardNumber: nextProps.state.creditCardNumber,
    //         expirationDate: nextProps.state.expirationDate,
    //         cardId: nextProps.state.cardId
    //     });
    // }

    render() {
        return (
            <div className="row">
                <div className="cardHolder-cardInfo col s12 m6 l6 offset-m3 offset-l3">
                    <div className="input-field col s12 m6 l6">
                        <input
                            placeholder="name on card"
                            id="cardholder_first_name"
                            type="text"
                            className="validate"
                            value={this.state.nameOnCard}
                            onChange={e => this.inputChange(e, 'nameOnCard')}
                        />
                        <label htmlFor="cardholder_first_names" className="active">
                            Name on Card <span className="red_star">*</span>
                        </label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input
                            placeholder="billing address"
                            id="cardholder_billing_address"
                            type="text"
                            className="validate"
                            value={this.state.billingAddress}
                            onChange={e => this.inputChange(e, 'billingAddress')}
                        />
                        <label htmlFor="cardholder_billing_address" className="active">
                            Billing Address <span className="red_star">*</span>
                        </label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <select
                            id="cardholder_cardtype"
                            value={this.state.creditCardType}
                            onChange={e => this.inputChange(e, 'creditCardType')}
                        >
                            <option name="visa" id="cardholder_visa">
                                Visa
                            </option>
                            <option name="mastercard" id="cardholder_mastercard">
                                Matercard
                            </option>
                            <option name="discover" id="cardholder_discover">
                                Discovery
                            </option>
                            <option name="amex" id="cardholder_amex">
                                AmEx
                            </option>
                        </select>
                        <label htmlFor="cardholder_cardtype">
                            Credit Card Type <span className="red_star">*</span>
                        </label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input
                            placeholder="card number"
                            id="cardholder_cardnumber"
                            type="number"
                            className="validate"
                            value={this.state.creditCardNumber}
                            onChange={e => this.inputChange(e, 'creditCardNumber')}
                        />
                        <label htmlFor="cardholder_cardnumber" className="active">
                            Credit Card Number <span className="red_star">*</span>
                        </label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input
                            placeholder="expiration date"
                            id="cardholder_expdate"
                            type="text"
                            className="validate"
                            value={this.state.expirationDate}
                            onChange={e => this.inputChange(e, 'expirationDate')}
                        />
                        <label htmlFor="cardholder_expdate" className="active">
                            Expiration Date <span className="red_star">*</span>
                        </label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input
                            placeholder="card identification number"
                            id="cardholder_cardid"
                            type="number"
                            className="validate"
                            value={this.state.cardId}
                            onChange={e => this.inputChange(e, 'cardId')}
                        />
                        <label htmlFor="cardholder_cardid" className="active">
                            Card Identification Number <span className="red_star">*</span>*
                        </label>
                    </div>
                    <p className="cardholder_note">
                        * last 3 digits located on the back of the credit card. <br />
                        For Amex cards 4 digits located on the front <br />
                        <span className="red_star">*</span> required fields
                    </p>
                </div>
            </div>
        );
    }
}

CardInfo.propTypes = {
    change: PropTypes.func
};

export default CardInfo;
