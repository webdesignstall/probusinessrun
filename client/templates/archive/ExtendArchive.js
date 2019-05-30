import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import ExtendedArchiveTrucs from './ExtendedArchiveTrucs';
import ExtendedArchiveEmployee from './ExtendedArchiveEmployee';

export default class ExtendArchive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            trucks: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let employee =
            nextProps.job.workers && Object.values(nextProps.job.workers[0]);
        employee = Meteor.users.find({ _id: { $in: employee } }).fetch();
        let trucks =
            nextProps.job.trucks && Object.values(nextProps.job.trucks[0]);
        trucks = Meteor.users
            .find({ 'profile.number': { $in: trucks } })
            .fetch();

        this.setState({
            employee,
            trucks
        });
    }

    componentDidMount() {
        let employee =
            this.props.job.workers && Object.values(this.props.job.workers[0]);
        employee = Meteor.users.find({ _id: { $in: employee } }).fetch();
        let trucks =
            this.props.job.trucks && Object.values(this.props.job.trucks[0]);
        trucks = Meteor.users
            .find({ 'profile.number': { $in: trucks } })
            .fetch();

        this.setState({
            employee,
            trucks
        });
    }
    render() {
        return (
            <div>
                <hr
                    style={{
                        borderBottom: '1px solid #2F3E4E',
                        margin: '10px auto'
                    }}
                />
                <div className="row">
                    <ExtendedArchiveEmployee employee={this.state.employee} />
                    {/* <ExtendedArchiveTrucs /> */}
                </div>
            </div>
        );
    }
}

ExtendArchive.propTypes = {
    job: PropTypes.object.isRequired
};
