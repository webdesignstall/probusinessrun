import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: this.props.job
        };

        this.checkBox = this.checkBox.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            job: nextProps.job
        });
    }

    checkBox() {
        this.setState((prevState) => {
            let job = prevState.job;
            job.flatRate[0].isTrue = !job.flatRate[0].isTrue;
            return {
                job
            };
        }, (err) => {
            err
                ? console.log(err)
                : '';
        });
    }

    render() {
        return (
            <div className="row chargingPanel">
                <div className="col s12 m12 l12 orange darken-4 payment-header">
                    Payment options
                    <i className="lime-text lighten-5 black">
                        [ Flat Rate
                        <input
                            id="flatRateCheck"
                            type="checkbox"
                            checked={(this.state.job.flatRate && this.state.job.flatRate[0].isTrue)
                                ? (() => {
                                    return true;
                                })()
                                : false}
                            onChange={this.checkBox}
                        />
                        ]
                    </i>
                </div>
                <div id="paymentContent">
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">timer</i>
                        <input id="labor_time" className="xx" type="number" placeholder="0" onChange={() => {
                            if (this.value < 0) {
                                this.value = 0;
                            }
                        }} />
                        <label className="active" htmlFor="labor_time">Minimum labor time (hours)</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input id="hourly_rates_cash" className="xx" type="number" placeholder="0" onChange={function () {
                            if (this.value < 0) {
                                this.value = 0;
                            }
                        }} />
                        <label className="active" htmlFor="hourly_rates_cash">Hourly rates (cash)</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input id="hourly_rates_card" className="xx" type="number" placeholder="0" onChange={function () {
                            if (this.value < 0) {
                                this.value = 0;
                            }
                        }} />
                        <label className="active" htmlFor="hourly_rates_card">Hourly rates (card)</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input id="quote_price" className="xx" type="number" placeholder="0" onChange={function () {
                            if (this.value < 0) {
                                this.value = 0;
                            }
                        }} />
                        <label className="active" htmlFor="quote_price">Not Exceed Price</label>
                    </div>
                </div>
                <div id="flatRate_followup" className={this.state.job.flatRate && this.state.job.flatRate[0].isTrue ? 'input-field valideyn col s12 m12 l12 flatRate' : 'input-field valideyn col s12 m12 l12 flatRate hide'}>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input id="flatRateCash" className="xx" type="number" placeholder="0" onChange={function () {
                            if (this.value < 0) {
                                this.value = 0;
                            }
                        }} />
                        <label className="active" htmlFor="flatRateCash">Flat rate cash</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input id="flatRateCard" className="xx" type="number" placeholder="0" onChange={function () {
                            if (this.value < 0) { this.value = 0; }
                        }} />
                        <label className="active" htmlFor="flatRateCard">Flat rate card</label>
                    </div>
                </div>
            </div>
        );
    }
}

PaymentOptions.propTypes = {
    job: PropTypes.object.isRequired
};