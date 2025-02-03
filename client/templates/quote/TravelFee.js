import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class TravelFee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let value = Session.get('job_').gasFee;

            if (!value) {
                this.setState({ value: '' });
            } else {
                this.setState({ value });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onClick() {
        this.setState(prevState => {
            let value = Number(prevState.value === -0.01 ? 0 : -0.01);

            this.interval('gasFee', value);

            return { value };
        });
    }

    setSession(what, value) {
        let job = Session.get('job_');
        job[what] = value;
        Session.set('job_', job);
    }

    interval(what, value) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setSession(what, value), 500);
    }

    onChange(e) {
        let value = Number(e.target.value);

        this.interval('gasFee', value);

        this.setState({
            value
        });
    }
    render() {
        return (
            <div className="input-field valideyn">
                <i className="material-icons isare">attach_money</i>
                <input
                    onChange={this.onChange}
                    id="gas_fee"
                    className="xx"
                    type="number"
                    placeholder="0"
                    disabled={this.state.value === -0.01}
                    value={this.state.value}
                />
                <label className="active" htmlFor="gas_fee">
                    Travel Fee
                    <i className="lime-text lighten-5 black">
                        [ Not sure?
                        <input type="checkbox" onChange={this.onClick} checked={this.state.value === -0.01} />]
                    </i>
                </label>
            </div>
        );
    }
}
