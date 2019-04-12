import React, { Component } from 'react';
import './sorting.styl';
import { Session } from 'meteor/session';

export default class Sorting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: 'default',
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        let value = e.target.value;
        this.setState(
            {
                sort: value,
            },
            () => {
                Session.set('sort', value);
            },
        );
    }

    render() {
        return (
            <div className="sag sorting">
                <span className="sol">Sort by:</span>
                <select
                    onChange={e => this.changeHandler(e)}
                    className="browser-default"
                    name="sortBy"
                    id="sort_by"
                    value={this.state.sort}>
                    <option value="default">Default</option>
                    <option value="az">Moving Date A-Z</option>
                    <option value="za">Moving Date Z-A</option>
                    <option value="lc">Last Change</option>
                </select>
            </div>
        );
    }
}
