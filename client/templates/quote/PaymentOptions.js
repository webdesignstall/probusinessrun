import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class PaymentOptions extends Component {
    constructor(props) {
        super(props);

        // noinspection JSValidateTypes
        this.state = {
            laborTime: '',
            hourlyRatesCash: '',
            hourlyRatesCard: '',
            price: '',
            flatRate: [
                {
                    isTrue: false,
                    cashAmount: '',
                    cardAmount: ''
                }
            ]
        };

        this.check = this.check.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onFlatRateChange = this.onFlatRateChange.bind(this);
        this.setSession = this.setSession.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let job = Session.get('job_') || {};

            this.setState({
                laborTime: job.laborTime || '',
                hourlyRatesCash: job.hourlyRatesCash || '',
                hourlyRatesCard: job.hourlyRatesCard || '',
                price: job.price || ''
            });

            if (job.flatRate) {
                this.setState({
                    flatRate: job.flatRate
                });
            } else {
                this.setState({
                    flatRate: [
                        {
                            isTrue: false,
                            cashAmount: '',
                            cardAmount: ''
                        }
                    ]
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    setSession() {
        let job = Session.get('job_');
        job = Object.assign(job, this.state);
        Session.set('job_', job);
    }

    interval() {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setSession(), 500);
    }

    check() {
        let job = Session.get('job_');
        this.setState(
            prevState => {
                let flatRate = prevState.flatRate;
                flatRate[0].isTrue = !flatRate[0].isTrue;
                return {
                    flatRate
                };
            },
            () => {
                job = Object.assign(job, this.state);
                Session.set('job_', job);
            }
        );
    }

    onChangeHandler(e, what) {
        this.setState(
            {
                [what]: Number(e.target.value) || ''
            },
            () => {
                this.interval();
            }
        );
    }

    onFlatRateChange(e, what) {
        let value = Number(e.target.value) || '';
        this.setState(
            prevState => {
                let flatRate = prevState.flatRate;
                flatRate[0][what] = value;
                return {
                    flatRate
                };
            },
            () => {
                this.interval();
            }
        );
    }

    render() {
        let { laborTime, hourlyRatesCash, hourlyRatesCard, price, flatRate } = this.state;
        return (
            <div className="chargingPanel">
                <div className="col s12 m12 l12 orange darken-4 payment-header">
                    Payment options
                    <i className="lime-text lighten-5 black flatRateSelect">
                        [ Flat Rate
                        <input id="flatRateCheck" type="checkbox" onChange={this.check} checked={this.state.flatRate[0].isTrue} />
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
                            value={laborTime}
                            onChange={e => this.onChangeHandler(e, 'laborTime')}
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
                            value={hourlyRatesCash}
                            onChange={e => this.onChangeHandler(e, 'hourlyRatesCash')}
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
                            value={hourlyRatesCard}
                            onChange={e => this.onChangeHandler(e, 'hourlyRatesCard')}
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
                            value={price}
                            onChange={e => this.onChangeHandler(e, 'price')}
                        />
                        <label className="active" htmlFor="quote_price">
                            Not Exceed Price
                        </label>
                    </div>
                </div>
                <div
                    id="flatRate_"
                    className={this.state.flatRate[0].isTrue ? 'input-field valideyn col s12 m12 l12 flatRate' : 'hide'}>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">attach_money</i>
                        <input
                            id="flatRateCash"
                            className="xx"
                            type="number"
                            placeholder="0"
                            value={flatRate[0].cashAmount}
                            onChange={e => this.onFlatRateChange(e, 'cashAmount')}
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
                            value={flatRate[0].cardAmount}
                            onChange={e => this.onFlatRateChange(e, 'cardAmount')}
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

export default PaymentOptions;
