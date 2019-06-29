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
        if (
            nextProps.job &&
            nextProps.job.workers &&
            nextProps.job.trucks &&
            nextProps.job.workers.length > 0 &&
            nextProps.job.trucks.length > 0
        ) {
            let employee = nextProps.job.workers && Object.values(nextProps.job.workers[0]);
            employee = Meteor.users.find({ _id: { $in: employee } }).fetch();

            let trucks = nextProps.job.trucks && Object.values(nextProps.job.trucks[0]);
            trucks = Array.from(trucks.join(' ').split(' '));
            trucks = Meteor.users.find({ 'profile.number': { $in: trucks } }).fetch();

            this.setState({
                employee,
                trucks
            });
        }
    }

    componentDidMount() {
        if (
            this.props.job &&
            this.props.job.workers &&
            this.props.job.trucks &&
            this.props.job.workers.length > 0 &&
            this.props.job.trucks.length > 0
        ) {
            let employee =
                this.props.job.workers &&
                this.props.job.workers.map(employee => {
                    return employee.id;
                });

            employee = Meteor.users.find({ _id: { $in: employee } }).fetch();
            let trucks =
                this.props.job.trucks &&
                this.props.job.trucks.map(truck => {
                    return truck.truck;
                });

            trucks = Array.from(trucks.join(' ').split(' '));

            trucks = Meteor.users.find({ 'profile.number': { $in: trucks } }).fetch();

            this.setState({
                employee,
                trucks
            });
        }
    }

    render() {
        return (
            <div>
                <hr
                    style={{
                        borderBottom: '1px solid #bdc3c7',
                        margin: '10px auto'
                    }}
                />
                <div className="row">
                    <ExtendedArchiveEmployee employee={this.state.employee} />
                    <ExtendedArchiveTrucs trucks={this.state.trucks} />
                </div>
            </div>
        );
    }
}

ExtendArchive.propTypes = {
    job: PropTypes.object.isRequired
};
