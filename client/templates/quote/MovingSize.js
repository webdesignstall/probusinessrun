import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React, { Component } from 'react';

export default class MovingSize extends Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            value: 'select_moving_size',
            options: [
                {
                    value: 'select_moving_size',
                    name: 'Select Moving Size'
                },
                {
                    value: 'items',
                    name: 'Items'
                },
                {
                    value: 'studio',
                    name: 'Studio'
                },
                {
                    value: '1_bedroom',
                    name: '1 Bedroom'
                },
                {
                    value: '2_bedroom_small',
                    name: '2 Bedrooms (small size, few items)'
                },
                {
                    value: '2_bedroom_avg',
                    name: '2 Bedrooms (avg. size, avg. items)'
                },
                {
                    value: '2_bedroom_large',
                    name: '2 Bedrooms (large size, many items)'
                },
                {
                    value: '3_bedroom_avg',
                    name: '3 Bedrooms (avg. size, avg. items)'
                },
                {
                    value: '3_bedroom_large',
                    name: '3 Bedrooms (large size, many items)'
                },
                {
                    value: '4_bedrooom_avg',
                    name: '4 Bedrooms (avg. size, avg. items)'
                },
                {
                    value: '4_bedroom_large',
                    name: '4 Bedrooms (large size, many items)'
                },
                {
                    value: '5_bedroom_avarage',
                    name: '5 Bedrooms (avarage size, avg items)'
                },
                {
                    value: 'commercial_sml',
                    name: 'Commercial (small size, few items)'
                },
                {
                    value: 'commercial_avg',
                    name: 'Commercial (avg. size, avg. items)'
                },
                {
                    value: 'commercial_large',
                    name: 'Commercial (large size, many items)'
                },
                {
                    value: 'long_distance_moves',
                    name: 'Long Distance Moves'
                }
            ]
        };

        this.changeSelect = this.changeSelect.bind(this);
        this.renderSizes = this.renderSizes.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');

            job.movingSize
                ? this.setState({ value: job.movingSize })
                : this.setState({ value: 'select_moving_size' });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeSelect(e) {
        let value = e.target.value;
        let job = Session.get('job_');
        job.movingSize = value;

        this.setState(
            {
                value
            },
            () => {
                Session.set('job_', job);
            }
        );
    }

    renderSizes() {
        return this.state.options.map(option => {
            return (
                <option key={option.value + 'key'} value={option.value}>
                    {option.name}
                </option>
            );
        });
    }

    render() {
        return (
            <div className="">
                <label htmlFor="moving_size_2" className="active">
                    Moving Size
                </label>
                <select
                    title="moving_size"
                    className="browser-default"
                    name="moving_size"
                    id="moving_size_2"
                    value={this.state.value}
                    onChange={e => this.changeSelect(e)}>
                    <option value="select_moving_size" disabled>
                        Select Moving Size
                    </option>
                    {this.renderSizes()}
                </select>
            </div>
        );
    }
}
