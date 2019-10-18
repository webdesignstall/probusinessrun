import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class DoubleDriveTime extends Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            value: 'false'
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_') || {};

            if (job.doubleDrive) {
                this.setState({ value: job.doubleDrive });
            } else {
                this.setState({
                    value: 'false'
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onChangeHandler(e) {
        let job = Session.get('job_');
        this.setState(
            {
                value: e.target.value
            },
            () => {
                job.doubleDrive = this.state.value;
                Session.set('job_', job);
            }
        );
    }

    render() {
        return (
            <div className="input-field azMargin">
                <select
                    className="browser-default"
                    title="Double drive"
                    name="double_drive"
                    id="double_drive"
                    onChange={e => this.onChangeHandler(e)}
                    value={this.state.value}>
                    <option value="false" disabled>
                        Select double drive
                    </option>
                    <option value="waived">No</option>
                    <option value="yes">Yes</option>
                    <option value="notSure">Not Sure</option>
                </select>
                <label
                    className="active"
                    style={{
                        backgroundColor: 'rgb(237, 240, 241)',
                        padding: '0px 5px',
                        margin: '-28px 15px',
                        top: '-15px',
                        left: '0',
                        position: 'absolute'
                    }}
                    htmlFor="double_drive">
                    Double Drive Time
                </label>
            </div>
        );
    }
}

export default DoubleDriveTime;
