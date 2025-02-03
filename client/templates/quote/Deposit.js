import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class Deposit extends Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let value = Session.get('job_').deposit;
            if (value) {
                this.setState({
                    value
                });
            } else {
                this.setState({
                    value: ''
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
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

        this.interval('deposit', value);

        this.setState({
            value
        });
    }

    render() {
        return (
            <div className="input-field valideyn">
                <i className="material-icons isare">attach_money</i>
                <input
                    id="deposit"
                    className="xx"
                    type="number"
                    placeholder="0"
                    onChange={e => this.onChange(e)}
                    value={this.state.value}
                />
                <label className="active" htmlFor="deposit">
                    Deposit
                </label>
            </div>
        );
    }
}
