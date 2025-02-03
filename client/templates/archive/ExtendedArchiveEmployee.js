import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExtendedArchiveEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        };

        this.employees = this.employees.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            employees: nextProps.employee
        });
    }

    componentDidMount() {
        let employees = this.props.employee;

        this.setState({
            employees
        });
    }

    employees() {
        return this.state.employees.map((employee, index) => {
            return (
                <button key={'archiveListEmployee' + index}>
                    {employee.profile.firstName} {employee.profile.lastName}
                </button>
            );
        });
    }

    render() {
        return (
            <div className="col s12 m3 l3">
                <div className="archive-card-main">
                    <div className="card-content black-text">
                        <span className="card-title">Movers</span>
                        <p>{this.employees()}</p>
                    </div>
                </div>
            </div>
        );
    }
}

ExtendedArchiveEmployee.propTypes = {
    employee: PropTypes.array.isRequired
};
