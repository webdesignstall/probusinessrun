import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

let state_ = {
    reason: '',
    other: false,
    otherNote: ''
};

export default class FinalNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finalNote: state_
        };

        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            this.setState({
                finalNote: job.finalNote || state_
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeSelect(e, what) {
        let finalNote = this.state.finalNote;
        let other = finalNote.other;
        let job = Session.get('job_');
        what === 'reason' && e.target.value === 'Other'
            ? (other = true)
            : what === 'reason' && e.target.value !== 'Other'
                ? (other = false)
                : null;
        other ? (finalNote.reason = 'Other') : null;
        let value = e.target.value;
        finalNote.other = other;
        finalNote[what] = value;
        this.setState({ finalNote }, () => {
            job.finalNote = this.state.finalNote;
            Session.set('job_', job);
        });
    }

    render() {
        return (
            <div>
                <label htmlFor="select_finalNote">Final Note</label>
                <select
                    className="browser-default"
                    name="select_finalNote"
                    onChange={e => this.changeSelect(e, 'reason')}
                    value={this.state.finalNote.reason || 'none'}
                    id="select_finalNote">
                    <option value="none" disabled={true}>
                        Select Final Note
                    </option>
                    <option value="Time Expired" disabled={true}>
                        Time Expired
                    </option>
                    <option value="No respond from customer">No respond from customer</option>
                    <option value="Could not reach customer">Could not reach customer</option>
                    <option value="Does not accept Minimum Labor Hours">Does not accept Minimum Labor Hours</option>
                    <option value="Price is high">Price is high</option>
                    <option value="No need moving service anymore">No need moving service anymore</option>
                    <option value="Found another company">Found another company</option>
                    <option value="Found lower price">Found lower price</option>
                    <option value="Other">Other</option>
                </select>
                {this.state.finalNote.other ? (
                    <textarea
                        onChange={e => this.changeSelect(e, 'otherNote')}
                        value={this.state.finalNote.otherNote}
                        style={{
                            height: '100px',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '5px',
                            borderColor: '#CECECE',
                            outline: 'none'
                        }}
                        name="select_finalNote_other"
                        id="select_finalNote_other"
                        placeholder="type note here..."
                    />
                ) : (
                    ''
                )}
            </div>
        );
    }
}
