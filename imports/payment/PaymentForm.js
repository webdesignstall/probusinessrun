import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import WorkData from '../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/*global swal */

import ConfirmationDisplay from '../../client/templates/reserve_quote/ConfirmationDisplay';

var configs = require('../helpers/config.json');

const styles = {
    name: {
        display: 'inline-flex',
        width: '185px',
        borderBottom: '2px solid #387DD6',
        paddingLeft: '15px',
        position: 'absolute',
        left: '0',
        top: '0'
    },
    leftCenter: {
        float: 'left',
        textAlign: 'center'
    },
    blockRight: {
        display: 'block',
        float: 'right'
    },
    center: {
        textAlign: 'center'
    }
};

export default class PaymentForm extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            cardBrand: '',
            nonce: undefined,
            googlePay: false,
            applePay: false,
            masterpass: false,
            paymentAmount: 0,
            cardHolderName: ''
        };

        this.requestCardNonce = this.requestCardNonce.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange(e) {
        let value = e.target.value;
        this.setState({
            cardHolderName: value
        });
    }

    requestCardNonce() {
        Session.set('loading', true);
        this.paymentForm.requestCardNonce();
    }

    workData(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            paymentAmount: this.workData(nextProps.id)[0].deposit
        });
    }

    componentDidMount() {
        this.setState({
            paymentAmount: this.workData(this.props.id)[0].deposit
        });
        const config = {
            applicationId: configs.squareApplicationId,
            locationId: configs[this.workData(this.props.id)[0].name],
            inputClass: 'sq-input',
            autoBuild: false,
            inputStyles: [
                {
                    fontSize: '16px',
                    fontFamily: 'Helvetica Neue',
                    padding: '16px',
                    color: '#373F4A',
                    backgroundColor: 'transparent',
                    lineHeight: '1.15em',
                    placeholderColor: '#000',
                    _webkitFontSmoothing: 'antialiased',
                    _mozOsxFontSmoothing: 'grayscale'
                }
            ],
            applePay: {
                elementId: 'sq-apple-pay'
            },
            masterpass: {
                elementId: 'sq-masterpass'
            },
            googlePay: {
                elementId: 'sq-google-pay'
            },
            cardNumber: {
                elementId: 'sq-card-number',
                placeholder: '• • • •  • • • •  • • • •  • • • •'
            },
            cvv: {
                elementId: 'sq-cvv',
                placeholder: 'CVV'
            },
            expirationDate: {
                elementId: 'sq-expiration-date',
                placeholder: 'MM/YY'
            },
            postalCode: {
                elementId: 'sq-postal-code',
                placeholder: 'Zip'
            },
            callbacks: {
                methodsSupported: methods => {
                    if (methods.googlePay) {
                        this.setState({
                            googlePay: methods.googlePay
                        });
                    }
                    if (methods.applePay) {
                        this.setState({
                            applePay: methods.applePay
                        });
                    }
                    if (methods.masterpass) {
                        this.setState({
                            masterpass: methods.masterpass
                        });
                    }
                    return;
                },
                createPaymentRequest: () => {
                    return {
                        requestShippingAddress: false,
                        requestBillingInfo: true,
                        currencyCode: 'USD',
                        countryCode: 'US',
                        total: {
                            label: 'MERCHANT NAME',
                            amount: this.state.paymentAmount * 100,
                            pending: false
                        },
                        lineItems: [
                            {
                                label: 'Subtotal',
                                amount: this.state.paymentAmount * 100,
                                pending: false
                            }
                        ]
                    };
                },
                cardNonceResponseReceived: (errors, nonce, cardData) => {
                    if (errors) {
                        // Log errors from nonce generation to the Javascript console
                        console.log('Encountered errors:');
                        errors.forEach(function(error) {
                            Session.set('loading', false);
                            swal({
                                title: 'Error!',
                                text:
                                    'Can\'t proccess payment. Reason: ' +
                                    error.message,
                                icon: 'error',
                                button: 'OK'
                            });
                            console.log('  ' + error.message);
                        });

                        return;
                    }
                    this.setState(
                        {
                            nonce: nonce
                        },
                        () => {
                            // fetch('https://www.probusinessrun.com/charge/', {
                            fetch('http://localhost:3000/charge/', {
                                method: 'POST',
                                body: JSON.stringify({
                                    nonce: this.state.nonce,
                                    id: this.props.id,
                                    what: 'deposit',
                                    cardHolderName: this.state.cardHolderName,
                                    jobNumber: Session.get('jobNumber'),
                                    clientFirstName:
                                        Session.get('job').clientFirstName ||
                                        '',
                                    clientLastName:
                                        Session.get('job').clientLastName || ''
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(data => {
                                    console.log(data.status);
                                    return data.json();
                                })
                                .then(data => {
                                    if (!data.error) {
                                        Session.set('loading', false);
                                        swal({
                                            title: 'Success!',
                                            text:
                                                'Payment processed successfully ',
                                            icon: 'success',
                                            button: 'OK'
                                        });
                                        document
                                            .getElementById('jobInfoMain')
                                            .classList.add('hide');
                                        document
                                            .getElementById('son-mesaj')
                                            .classList.remove('hide');
                                        Meteor.call(
                                            'confirmationGonder',
                                            Session.get('job')
                                        );
                                        ReactDOM.render(
                                            <ConfirmationDisplay />,
                                            document.getElementById('son-mesaj')
                                        );
                                        let job = Session.get('job');
                                        job.quote = false;
                                        job.confirmed = true;
                                        job.isFollowUp = true;
                                        job.status = 'won';
                                        Meteor.call('updateWork', job);
                                    } else {
                                        console.log(error);
                                        Session.set('loading', false);
                                        swal({
                                            title: 'Error!',
                                            text:
                                                'Can\'t proccess payment. Please ensure that you entered correct card information',
                                            icon: 'error',
                                            button: 'OK'
                                        });
                                    }
                                });
                        }
                    );
                },
                unsupportedBrowserDetected: () => {},
                inputEventReceived: inputEvent => {
                    switch (inputEvent.eventType) {
                    case 'focusClassAdded':
                        break;
                    case 'focusClassRemoved':
                        break;
                    case 'errorClassAdded':
                        document.getElementById('error').innerHTML =
                                'Please fix card information errors before continuing.';
                        break;
                    case 'errorClassRemoved':
                        document.getElementById('error').style.display =
                                'none';
                        break;
                    case 'cardBrandChanged':
                        if (inputEvent.cardBrand !== 'unknown') {
                            this.setState({
                                cardBrand: inputEvent.cardBrand
                            });
                        } else {
                            this.setState({
                                cardBrand: ''
                            });
                        }
                        break;
                    case 'postalCodeChanged':
                        break;
                    default:
                        break;
                    }
                },
                paymentFormLoaded: function() {
                    document.getElementById('name').style.display =
                        'inline-flex';
                    Session.set('loading', false);
                }
            }
        };
        this.paymentForm = new this.props.paymentForm(config);
        this.paymentForm.build();
    }

    render() {
        return (
            <div className="container payment-form-main">
                <div id="form-container">
                    <div id="sq-walletbox">
                        <button
                            style={{
                                display: this.state.applePay
                                    ? 'inherit'
                                    : 'none'
                            }}
                            className="wallet-button"
                            id="sq-apple-pay"
                        />
                        <button
                            style={{
                                display: this.state.masterpass
                                    ? 'block'
                                    : 'none'
                            }}
                            className="wallet-button"
                            id="sq-masterpass"
                        />
                        <button
                            style={{
                                display: this.state.googlePay
                                    ? 'inherit'
                                    : 'none'
                            }}
                            className="wallet-button"
                            id="sq-google-pay"
                        />
                        <hr />
                    </div>

                    <div id="sq-ccbox">
                        <p id="card_header">
                            <span style={styles.leftCenter}>
                                Enter Card Info Below{' '}
                            </span>
                            <span style={styles.blockRight}>
                                {this.state.cardBrand.toUpperCase()}
                            </span>
                        </p>
                        <div id="cc-field-wrapper">
                            <div id="sq-card-number" />
                            <input type="hidden" id="card-nonce" name="nonce" />
                            <div id="sq-expiration-date" />
                            <div id="sq-cvv" />
                        </div>
                        <div className="relative">
                            <input
                                id="name"
                                className="browser-default"
                                autoComplete="off"
                                style={styles.name}
                                type="text"
                                placeholder="Name"
                                onChange={e => this.nameChange(e)}
                            />
                            <div id="sq-postal-code" />
                        </div>
                    </div>
                    <button
                        className="button-credit-card"
                        onClick={this.requestCardNonce}>
                        Pay ${this.state.paymentAmount}
                    </button>
                </div>
                <p style={styles.center} id="error" />
            </div>
        );
    }
}

PaymentForm.propTypes = {
    id: PropTypes.string.isRequired
};
