import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import WorkData from './../../../common/collections_2';

export default class MovingSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'select_moving_size'
        };
    }

    componentWillMount() {
        this.x = Tracker.autorun(() => {
            if (Session.get('is') !== '') {
                const ish = WorkData.find({ _id: Session.get('is') }).fetch();
                if (ish[0].movingSize && (ish[0].movingSize !== '' || ish[0].movingSize !== undefined || ish[0].movingSize !== null)) {
                    this.setState({
                        value: ish[0].movingSize
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <div>
                <select title="moving_size" name="moving_size" value={this.state.value} id="moving_size_2" >
                    <option value="select_moving_size" disabled>Select Moving Size</option>
                    <option value="items">Items</option>
                    <option value="studio">Studio</option>
                    <option value="1_bedroom">1 Bedroom</option>
                    <option value="2_bedroom_small">2 Bedroom (small size, few items)</option>
                    <option value="2_bedroom_avg">2 Bedroom (avg. size, avg. items)</option>
                    <option value="2_bedroom_large">2 Bedroom (large size, many items)</option>
                    <option value="3_bedroom_avg">3 Bedroom (avg. size, avg. items)</option>
                    <option value="3_bedroom_large">3 Bedroom (large size, many items)</option>
                    <option value="4_bedrooom_avg">4 Bedroom (avg. size, avg. items)</option>
                    <option value="4_bedroom_large">4 Bedroom (large size, many items)</option>
                    <option value="commercial_avg">Commercial (avg. size, avg. items)</option>
                    <option value="commercial_large">Commercial (large size, many items)</option>
                </select>
            </div>
        );
    }
}