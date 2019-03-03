import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: this.props.job,
        };

        this.checkBox = this.checkBox.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.flatRateHandler = this.flatRateHandler.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            job: nextProps.job,
        });
    }

    checkBox() {
        this.setState(
            prevState => {
                let job = prevState.job;
                job.flatRate[0].isTrue = !job.flatRate[0].isTrue;
                return {
                    job,
                };
            },
            err => {
                err ? console.log(err) : '';
            },
        );
    }

    changeHandler(e, target_) {
        let valueOf = e.target.value;
        let oldInfo = this.state.job;
        oldInfo[target_] = valueOf;
        this.setState({
            job: oldInfo,
        });
    }

    flatRateHandler(e, target_) {
        let valueOf = e.target.value;
        let oldInfo = this.state.job;
        let baza = oldInfo.flatRate[0];
        baza[target_] = valueOf;
        oldInfo.flatRate[0] = baza;
        console.log(
            'TCL: PaymentOptions -> flatRateHandler -> oldInfo.flatRate[target_]',
            oldInfo.flatRate,
        );
        this.setState({
            job: oldInfo,
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
                            checked={
                                this.state.job.flatRate && this.state.job.flatRate[0].isTrue
                                    ? (() => {
                                        return true;
                                    })()
                                    : false
                            }
                            onChange={this.checkBox}
                        />
                        ]
                    </i>
                </div>
                <div id="paymentContent">
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">timer</i>
                        <input
                            id="labor_time"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={this.state.job.laborTime || ''}
                            onChange={e => this.changeHandler(e, 'laborTime')}
                        />
                        <label className="active" htmlFor="labor_time">
                            Minimum labor time (hours)
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="hourly_rates_cash"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={this.state.job.hourlyRatesCash || ''}
                            onChange={e => this.changeHandler(e, 'hourlyRatesCash')}
                        />
                        <label className="active" htmlFor="hourly_rates_cash">
                            Hourly rates (cash)
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="hourly_rates_card"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={this.state.job.hourlyRatesCash}
                            onChange={e => this.changeHandler(e, 'hourlyRatesCash')}
                        />
                        <label className="active" htmlFor="hourly_rates_card">
                            Hourly rates (card)
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="quote_price"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={this.state.job.price || ''}
                            onChange={e => this.changeHandler(e, 'price')}
                        />
                        <label className="active" htmlFor="quote_price">
                            Not Exceed Price
                        </label>
                    </div>
                </div>
                <div
                    id="flatRate_followup"
                    className={
                        this.state.job.flatRate && this.state.job.flatRate[0].isTrue
                            ? 'input-field valideyn col s12 m12 l12 flatRate'
                            : 'input-field valideyn col s12 m12 l12 flatRate hide'
                    }>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="flatRateCash"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={
                                (this.state.job.flatRate &&
                                    this.state.job.flatRate[0].cashAmount) ||
                                ''
                            }
                            onChange={e => this.flatRateHandler(e, 'cashAmount')}
                        />
                        <label className="active" htmlFor="flatRateCash">
                            Flat rate cash
                        </label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="flatRateCard"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={
                                (this.state.job.flatRate &&
                                    this.state.job.flatRate[0].cardAmount) ||
                                ''
                            }
                            onChange={e => this.flatRateHandler(e, 'cardAmount')}
                        />
                        <label className="active" htmlFor="flatRateCard">
                            Flat rate card
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

PaymentOptions.propTypes = {
    job: PropTypes.object.isRequired,
    updateJob: PropTypes.func.isRequired,
};
