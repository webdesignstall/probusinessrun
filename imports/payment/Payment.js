import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
import PropTypes from 'prop-types';
import WorkData from '../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

import './payment.css';

class Payment extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            amount: 0,
            loaded: false,
            button: true
        };

        this.clicked = this.clicked.bind(this);
    }

    workData(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    UNSAFE_componentWillReceiveProp(nextProps) {
        this.setState({
            id: nextProps.id,
            amount: this.workData(nextProps.id)[0].deposit || 0,
            button: true
        });
    }

    componentDidMount() {
        this.props.id &&
            this.setState({
                id: this.props.id,
                amount: this.workData(this.props.id)[0].deposit || 0
            });
    }

    UNSAFE_componentWillMount() {
        const that = this;
        let sqPaymentScript = document.createElement('script');
        sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
        sqPaymentScript.type = 'text/javascript';
        sqPaymentScript.async = false;
        sqPaymentScript.onload = () => {
            that.setState({
                loaded: true
            });
        };
        document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
    }

    clicked() {
        this.setState(
            {
                button: false
            },
            () => {
                Session.set('loading', true);
            }
        );
    }

    render() {
        return !this.state.button && this.state.loaded ? (
            <PaymentForm
                paymentForm={window.SqPaymentForm}
                id={this.props.id}
            />
        ) : (
            <button
                style={{
                    padding: '3px 18px',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '1px 6px 15px #318cff',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: '#0094ff',
                    fontSize: '18px'
                }}
                onClick={this.clicked}>
                Make Payment ${this.state.amount}
            </button>
        );
    }
}

Payment.propTypes = {
    id: PropTypes.string.isRequired
};

export default Payment;
