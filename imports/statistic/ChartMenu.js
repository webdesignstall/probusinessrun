import React, { Component } from 'react';

export default class ChartMenu extends Component {
    render() {
        return (
            <nav className="statistic_menu">
                <span className="statistic_menu__item">Date</span>
                <span className="statistic_menu__item">Company</span>
                <span className="statistic_menu__item">Status</span>
                <span className="statistic_menu__item">Employees</span>
            </nav>
        );
    }
}
