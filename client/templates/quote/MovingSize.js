import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import WorkData from './../../../common/collections_2';

export default class MovingSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    name: '2 Bedroom (small size, few items)'
                },
                {
                    value: '2_bedroom_avg',
                    name: '2 Bedroom (avg. size, avg. items)'
                },
                {
                    value: '2_bedroom_large',
                    name: '2 Bedroom (large size, many items)'
                },
                {
                    value: '3_bedroom_avg',
                    name: '3 Bedroom (avg. size, avg. items)'
                },
                {
                    value: '3_bedroom_large',
                    name: '3 Bedroom (large size, many items)'
                },
                {
                    value: '4_bedrooom_avg',
                    name: '4 Bedroom (avg. size, avg. items)'
                },
                {
                    value: '4_bedroom_large',
                    name: '4 Bedroom (large size, many items)'
                },
                {
                    value: 'commercial_avg',
                    name: 'Commercial (avg. size, avg. items)'
                },
                {
                    value: 'commercial_large',
                    name: 'Commercial (large size, many items)'
                },
            ]
        };

        this.sizeSelected = React.createRef();

        this.changeSelect = this.changeSelect.bind(this);
        this.renderSizes = this.renderSizes.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.x = Tracker.autorun(() => {
            if (Session.get('is') !== '') {
                const ish = WorkData.find({ _id: Session.get('is') }).fetch();
                if (ish[0].movingSize && (ish[0].movingSize !== '' || ish[0].movingSize !== undefined || ish[0].movingSize !== null)) {
                    Session.set('movingSize', ish[0].movingSize);
                }
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeSelect() {
        Session.set('movingSize', this.sizeSelected.current.value);
    }

    renderSizes() {
        return (
            this.state.options.map((option) => {
                return (
                    <option key={option.value + 'key'} value={option.value}>{option.name}</option>
                );
            })
        );
    }

    render() {
        return (
            <div>
                <select title="moving_size" className="browser-default" ref={this.sizeSelected} name="moving_size" defaultValue={Session.get('movingSize')} id="moving_size_2" onChange={this.changeSelect}>
                    <option value="select_moving_size" disabled>Select Moving Size</option>
                    {this.renderSizes()}
                </select>
            </div>
        );
    }
}
