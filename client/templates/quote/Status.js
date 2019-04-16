import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status || 'inProgress',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status,
        });
    }

    onChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            status: value,
        });
    }

    render() {
        let color = '#A1A7A7';

        switch (this.state.status) {
        case 'inProgress':
            color = '#ffd32a';
            break;
        case 'won':
            color = '#4cd137';
            break;
        case 'lost':
            color = '#e84118';
            break;
        case 'cancelled':
            color = '#bdc3c7';
            break;
        default:
            color = '#F17721';
        }

        return (
            <React.Fragment>
                <label className="active" htmlFor="jobStatus_followup">
                    Status <span style={{ color: color }}>&#9673;</span>
                </label>
                <select
                    onChange={e => this.onChangeHandler(e, 'status')}
                    className="browser-default"
                    name="jobStatus"
                    id="jobStatus_followup"
                    value={this.state.status}>
                    <option value="inProgress">In Progress</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </React.Fragment>
        );
    }
}

Status.propTypes = {
    status: PropTypes.string,
};
