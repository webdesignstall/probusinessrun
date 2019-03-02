import React, { Component } from 'react';
import './filter.css';

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.filter = this.filter.bind(this);
    }

    filter(type) {
        console.log(type);
    }

    render() {
        return (
            <div className="sag">
                <span className="sag">FILTER</span>
                <span className="sag">
                    <i className="material-icons">filter_list</i>
                </span>
                <ul className="filter--list sag">
                    <li className={this.state.clicked === 'inProgress' ? 'in-progress' : ''} onClick={() => this.filter('inProgress')} >IN PROGRESS</li>
                    <li className={this.state.clicked === 'lost' ? 'lost' : ''} onClick={() => this.filter('lost')}>LOST</li>
                    <li className={this.state.clicked === 'won' ? 'won' : ''} onClick={() => this.filter('won')}>WON</li>
                </ul>
            </div>
        );
    }
}
