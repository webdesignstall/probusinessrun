import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class NoteForMovers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let job = Session.get('job_');

            if (job.noteForMovers) {
                this.setState({
                    value: job.noteForMovers || ''
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

    changeHandler(e) {
        let value = e.target.value;
        this.setState(
            {
                value
            },
            () => {
                this.interval('noteForMovers', value);
            }
        );
    }

    render() {
        return (
            <div className="input-field">
                <textarea
                    style={{ height: '100px' }}
                    value={this.state.value}
                    onChange={e => this.changeHandler(e)}
                    className="materialize-textarea"></textarea>
                <label htmlFor="textarea1" className="active">
                    Note for Movers
                </label>
            </div>
        );
    }
}
