import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LargeItemFee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let value = Session.get('job_').largeItemFee;
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

    setSession(what, value) {
        let job = Session.get('job_');
        job[what] = value;
        Session.set('job_', job);
    }

    interval(what, value) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setSession(what, value), 500);
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onChange(e) {
        let value = e.target.value;

        this.setState(
            {
                value
            },
            () => {
                this.interval('largeItemFee', Number(value) || '');
            }
        );
    }

    render() {
        return (
            <div className="input-field valideyn">
                <i className="material-icons isare">view_carousel</i>
                <input
                    onChange={e => this.onChange(e)}
                    id="large_item_fee"
                    className="xx"
                    type="number"
                    placeholder="0"
                    value={this.state.value}
                />
                <label className="active" htmlFor="large_item_fee">
                    Large item fee
                </label>
            </div>
        );
    }
}
