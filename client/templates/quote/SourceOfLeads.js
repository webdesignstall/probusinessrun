import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class SourceOfLeads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'call'
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            let sourceOfLeads = Session.get('job_').sourceOfLeads;
            job.sourceOfLeads = 'call';

            !sourceOfLeads && sourceOfLeads !== '' ? Session.set('job_', job) : null;

            this.setState({
                value: sourceOfLeads
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeHandler(e) {
        let value = e.target.value;
        let job = Session.get('job_');
        job.sourceOfLeads = value;

        Session.set('job_', job);

        this.setState({
            value
        });
    }

    render() {
        return (
            <div className="col s12 m3 l3">
                <label className="active" htmlFor="source_of_leads_add">
                    Source of Leads
                </label>
                <select
                    onChange={e => this.changeHandler(e)}
                    id="source_of_leads_add"
                    className="browser-default"
                    value={this.state.value}>
                    <option value="call">Call</option>
                    <option value="e-mail">Email</option>
                    <option value="yelp">Yelp</option>
                    <option value="thumbtack">Thumbtack</option>
                    <option value="text">Text</option>
                    <option value="groupon">Groupon</option>
                    <option value="other">Other</option>
                </select>
            </div>
        );
    }
}
