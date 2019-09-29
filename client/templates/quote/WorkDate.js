/*global $*/
import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class WorkDate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workDate: ''
        };
    }
    componentDidMount() {
        let this_ = this;
        this.setState({
            workDate: Session.get('job_').workDate
        });
        $('#quote-date-picker').datepicker({
            onSelect: function() {
                let job = Session.get('job_');
                let date_ = this.value;

                job.workDate = date_;

                this_.setState({
                    workDate: date_
                });
                Session.set('job_', job);
            }
        });
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="input-field valideyn col s12 m6 l3">
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
