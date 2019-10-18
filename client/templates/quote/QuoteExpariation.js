import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

export default class QuoteExpiration extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            time: 0,
            expirationDate: new Date()
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            job.quoteExpirationDate
                ? this.setState({
                    expirationDate: new Date(job.quoteExpirationDate).getTime()
                })
                : this.setState({ time: 0 });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    timeToDate() {
        return Number(this.state.time) * 3600000 + new Date().getTime();
    }

    changeHandler(e) {
        let job = Session.get('job_');
        this.setState(
            {
                time: e.target.value
            },
            () => {
                job.quoteExpirationDate = new Date(this.timeToDate());
                Session.set('job_', job);
            }
        );
    }

    render() {
        let active = new Date().getTime() < this.state.expirationDate;
        return (
            <React.Fragment>
                <label className="active" htmlFor="quote-job-number">
                    Quote Expiration Date{' '}
                    {Session.get('addingJob') ? (
                        ''
                    ) : (
                        <span className={active ? 'expired_' : 'expired'}>{active ? 'active' : 'expired'}</span>
                    )}
                </label>
                <select
                    onChange={e => this.changeHandler(e)}
                    name="quoteExpirationDate"
                    className="browser-default"
                    id="quoteExpirationDate"
                    value={this.state.time}>
                    <option value="0">in 0 hour</option>
                    <option value="1">in 1 hour</option>
                    <option value="2">in 2 hour</option>
                    <option value="6">in 6 hour</option>
                    <option value="12">in 12 hour</option>
                    <option value="24">in 1 day</option>
                    <option value="48">in 2 days</option>
                    <option value="72">in 3 days</option>
                    <option value="168">in 1 week</option>
                </select>
            </React.Fragment>
        );
    }
}
