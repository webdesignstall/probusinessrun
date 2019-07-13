import React, { Component } from 'react';
import DateSelector from './DateSelector';
import CompanySelector from './CompanySelector';
import StatusSelector from './StatusSelector';
import EmployeeSelector from './EmployeeSelector';

export default class ChartMenu extends Component {
    render() {
        return (
            <nav className="statistic_menu">
                <span className="statistic_menu__item">
                    <DateSelector />
                </span>
                <span className="statistic_menu__item">
                    <CompanySelector />
                </span>
                <span className="statistic_menu__item">
                    <StatusSelector />
                </span>
                <span className="statistic_menu__item">
                    <EmployeeSelector />
                </span>
            </nav>
        );
    }
}
