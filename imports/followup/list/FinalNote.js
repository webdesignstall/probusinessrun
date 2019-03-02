import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FinalNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finalNote: {
                reason: '',
                other: false,
            },
        };

        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidMount() {
        this.setState({
            finalNote: this.props.finalNote
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            finalNote: nextProps.finalNote,
        });
    }

    changeSelect(e) {
        let finalNote = this.state.finalNote;
        console.log('TCL: FinalNote -> changeSelect -> finalNote', finalNote);
        let other = false;
        console.log('TCL: FinalNote -> changeSelect -> other', other);
        e.target.value === 'Other' ? (other = true) : null;
        console.log('TCL: FinalNote -> changeSelect -> other', other);
        let value = e.target.value;
        console.log('TCL: FinalNote -> changeSelect -> value', value);
        finalNote.other = other;
        finalNote.reason = value;
        console.log('TCL: FinalNote -> changeSelect -> finalNote', finalNote);
        this.setState({ finalNote });
    }

    render() {
        return (
            <div>
                <select
                    className="browser-default"
                    name="select_finalNote"
                    onChange={e => this.changeSelect(e)}
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
                        name="select_finalNote_other"
                        id="select_finalNote_other"
                        cols="30"
                        rows="10"
                    />
                ) : (
                        ''
                    )}
            </div>
        );
    }
}

FinalNote.propTypes = {
    finalNote: PropTypes.string.isRequired,
};
