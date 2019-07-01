import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

/*global swal*/

export default class QuoteExpiration extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            time: 0
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {});
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeHandler(e) {
        this.setState({
            time: e.target.value
        });
    }

    renew(e) {
        e.preventDefault();

        let time = Number(this.state.time) * 3600000 + new Date().getTime();
        let doc = {
            _id: Session.get('is'),
            quoteExpirationDate: new Date(time)
        };

        doc.ip = Session.get('ip');

        Meteor.call('updateWork', doc, err => {
            err
                ? (swal({
                    title: 'Error, can\'t renew expiration date!',
                    text: err.reason,
                    icon: 'error',
                    button: 'OK'
                }),
                Session.set('loading', false),
                console.error(err))
                : swal({
                    title: 'Success!',
                    text: 'Expiration date updated successfully',
                    icon: 'success',
                    button: 'OK'
                });
        });
    }

    render() {
        return (
            <React.Fragment>
                <label className="active" htmlFor="quote-job-number">
                    Quote Expiration Date
                </label>
                <select
                    onChange={e => this.changeHandler(e)}
                    name="quoteExpirationDate"
                    className="browser-default col s8 m8 l8"
                    id="quoteExpirationDate"
                    value={this.state.time}
                >
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
                {Session.get('is') !== '' ? (
                    <a
                        onClick={e => this.renew(e)}
                        className="col s3 m3 l3 waves-effect waves-light btn offset-s1 offset-m1 offset-l1"
                        style={{ height: '42px' }}
                    >
                        Renew
                    </a>
                ) : (
                    ''
                )}
            </React.Fragment>
        );
    }
}
