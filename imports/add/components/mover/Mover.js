import React, { Component } from 'react';
import './mover.css';

export default class Mover extends Component {
    render() {
        return (
            // setting sub menu
            <div className="add-header--menu">
                <a href="#" onClick={() => this.props.setSubMenu(['office employees', 'movers'])} className="waves-effect waves-light btn">Employees</a>
            </div>
        );
    }
}
