import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class JobNumber extends Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            value: undefined
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            if (job.jobNumber) {
                this.setState({ value: job.jobNumber });
            } else {
                this.setState({ value: this.jobNumber_() });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    jobNumber_() {
        let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
        jobNumber = jobNumber.toString();
        let howManyZero = 6 - jobNumber.length;
        if (howManyZero > 0) {
            for (let i = 0; i < howManyZero; i++) {
                jobNumber = '0' + jobNumber;
            }
        }
        let result = WorkData.find({ jobNumber }).fetch();
        result && result.length > 0 ? this.jobNumber_() : null;
        let job = Session.get('job_');
        job.jobNumber = jobNumber;
        Session.set('job_', job);
        return jobNumber;
    }

    render() {
        return (
            <div className="input-field valideyn">
                <i className="material-icons isare">local_offer</i>
                <input
                    id="quote-job-number"
                    className="xx"
                    type="text"
                    defaultValue={this.state.value}
                    placeholder="Job ID"
                    disabled
                />
                <label className="active" htmlFor="quote-job-number">
                    Job Number
                </label>
            </div>
        );
    }
}

export default JobNumber;
