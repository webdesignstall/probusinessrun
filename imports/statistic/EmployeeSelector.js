import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class EmployeeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            takenBy: 'all'
        };

        this.renderEmployeeList = this.renderEmployeeList.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let takenBy = Session.get('takenBy');
            let employeesList = Session.get('employeesList') || [];
            this.setState({
                employees: employeesList,
                takenBy
            });
        });
    }

    renderEmployeeList() {
        return this.state.employees.map((employee, index) => {
            return (
                <option key={'employeeSelector' + index} value={employee._id}>
                    {employee.profile.firstName} {employee.profile.lastName}
                </option>
            );
        });
    }

    changeEmployee(e) {
        Session.set('takenBy', e.target.value);
    }

    render() {
        return (
            <select onChange={e => this.changeEmployee(e)} value={this.state.takenBy} className="browser-default statistic__employee_selector">
                <option value="all">All Employee</option>
                {this.renderEmployeeList()}
            </select>
        );
    }
}
