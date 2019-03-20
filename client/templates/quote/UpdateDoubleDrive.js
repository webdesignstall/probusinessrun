import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from './../../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UpdateDoubleDrive extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    workDataFind(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let is = Session.get('is');
            const ish = this.workDataFind(is)[0];
            let doubleDrive = undefined;

            if (ish) {
                doubleDrive = ish.doubleDrive;
            }
            if (
                doubleDrive !== undefined &&
                doubleDrive !== null &&
                Session.get('is') !== ''
            ) {
                this.setState({
                    value: doubleDrive
                });
            }
        });
    }

    changeHandler(e) {
        this.setState({
            value: e.target.value
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <div>
                <label
                    className="active"
                    htmlFor="updated-double-drive-value"
                    style={{
                        backgroundColor: 'rgb(237, 240, 241)',
                        padding: '0px 5px',
                        margin: '-28px 15px',
                        top: '-15px',
                        left: '0px',
                        position: 'absolute'
                    }}>
                    Double drive
                </label>
                <select
                    className="browser-default"
                    id="updated-double-drive-value"
                    title="Double drive"
                    onChange={(e) => this.changeHandler(e)}
                    value={this.state.value}
                    name="double_drive">
                    <option value="false" disabled>
                        Select double drive
                    </option>
                    <option value="waived">No</option>
                    <option value="yes">Yes</option>
                    <option value="notSure">Not Sure</option>
                </select>
            </div>
        );
    }
}
