/*global $*/
import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class WorkDate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workDate: ''
        };
    }
    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let this_ = this;
            let job = Session.get('job_');

            if (job.workDate) {
                this.setState({
                    workDate: job.workDate
                });
            } else {
                this.setState({
                    workDate: ''
                });
            }
            $('#quote-date-picker').datepicker({
                onSelect: function() {
                    let date_ = this.value;
                    let job_ = Session.get('job_');

                    job_.workDate = date_;

                    this_.setState({
                        workDate: date_
                    });
                    Session.set('job_', job_);
                }
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="input-field valideyn">
                    <i className="material-icons isare">date_range</i>
                    <input
                        onChange={() => 1 + 1}
                        id="quote-date-picker"
                        className="xx"
                        autoComplete="off"
                        type="text"
                        placeholder=""
                        value={state.workDate || ''}
                    />
                    <label className="active" htmlFor="quote-date-picker">
                        Moving Date
                    </label>
                </div>
            </div>
        );
    }
}
