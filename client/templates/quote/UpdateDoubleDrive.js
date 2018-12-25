import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from './../../../common/collections_2';

export default class UpdateDoubleDrive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'yes'
        };
    }

    componentWillMount() {
        this.x = Tracker.autorun(() => {
            const ish = WorkData.findOne({ _id: Session.get('is') });
            let doubleDrive = undefined;
            if (ish) {
                doubleDrive = ish.doubleDrive;
            }
            if (doubleDrive !== undefined && doubleDrive !== null && Session.get('is') !== '') {
                this.setState({
                    value: doubleDrive
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <div>
                <select id="updated-double-drive-value" title="Double drive" value={this.state.value} name="double_drive">
                    <option value="false" disabled>Select double drive</option>
                    <option value="waived">No</option>
                    <option value="yes">Yes</option>
                    <option value="notSure">Not Sure</option>
                </select>
                <label className="active" htmlFor="updated-double-drive-value">Double drive</label>
            </div>
        );
    }
}
