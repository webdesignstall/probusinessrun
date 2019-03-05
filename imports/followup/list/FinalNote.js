import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FinalNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finalNote: {
                reason: '',
                other: false,
                otherNote: '',
            },
        };

        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidMount() {
        this.setState({
            finalNote: this.props.finalNote,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            finalNote: nextProps.finalNote,
        });
    }

    changeSelect(e, what) {
        let finalNote = this.state.finalNote;
        let other = finalNote.other;
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
            this.props.updateJob(this.state);
        });
    }

    render() {
        return (
            <div>
                <select
                    className="browser-default"
                    name="select_finalNote"
                    onChange={e => this.changeSelect(e, 'reason')}
                    value={this.state.finalNote.reason}
                    id="select_finalNote">
                    <option value="Time Expired">Time Expired</option>
                    <option value="No respond from customer">No respond from customer</option>
                    <option value="Could not reach customer">Could not reach customer</option>
                    <option value="Does not accept Minimum Labor Hours">
                        Does not accept Minimum Labor Hours
                    </option>
                    <option value="Price is high">Price is high</option>
                    <option value="No need moving service anymore">
                        No need moving service anymore
                    </option>
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
                            outline: 'none',
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

FinalNote.propTypes = {
    finalNote: PropTypes.object.isRequired,
    updateJob: PropTypes.func.isRequired,
};
