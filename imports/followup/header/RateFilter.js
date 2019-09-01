import React, { Component } from 'react';

import './rateFilter.styl';
import { Session } from 'meteor/session';

export default class RateFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        let rate = e.target.value;
        Session.set('customerRate_', rate);
        this.setState({
            rate
        });
    }

    render() {
        return (
            <div className="rate_filter">
                <select
                    onChange={e => this.changeHandler(e)}
                    className="browser-default"
                    name="customer_rate_filter"
                    id="custoer_rate_filter"
                    value={this.state.rate}>
                    <option value="0">Customer Priority (default)</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                </select>
            </div>
        );
    }
}
