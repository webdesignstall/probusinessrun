import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class JobStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#ffd32a',
            status: 'inProgress'
        };
    }

    componentDidMount() {
        let color = '#ffd32a';
        let status = 'inProgress';
        let job = Session.get('job_');

        if (job.status && job.status.length > 0) {
            color = this.setColor(job.status);
            status = job.status;
        }

        this.x = Tracker.autorun(() => {
            this.setState({
                color,
                status
            });
        });
    }

    setColor(status) {
        let color = '#A1A7A7';

        switch (status) {
        case 'inProgress':
            color = '#ffd32a';
            break;
        case 'won':
            color = '#4cd137';
            break;
        case 'lost':
            color = '#e84118';
            break;
        case 'cancelled':
            color = '#bdc3c7';
            break;
        default:
            color = '#F17721';
        }

        return color;
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onChangeHandler(e) {
        let status = e.target.value;
        let color = this.setColor(status);
        this.setState(
            {
                color,
                status
            },
            () => {
                let job = Session.get('job_');
                job.status = status;

                Session.set('job_', job);
            }
        );
    }

    render() {
        let { color, status } = this.state;

        return (
            <React.Fragment>
                <label className="active" htmlFor="jobStatus_followup">
                    Status <span style={{ color }}>&#9673;</span>
                </label>
                <select
                    onChange={e => this.onChangeHandler(e, 'status')}
                    className="browser-default"
                    name="jobStatus"
                    id="jobStatus_followup"
                    value={status}>
                    <option value="inProgress">In Progress</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </React.Fragment>
        );
    }
}
