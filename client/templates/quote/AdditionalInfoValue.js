import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AdditionalInfoValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    changeValue(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <div>
                <textarea
                    id="additional_info"
                    className="col s6 m6 l6"
                    value={this.state.value}
                    onChange={e => this.changeValue(e)}
                    style={{
                        maxWidth: '50%',
                        minWidth: '50%',
                        minHeight: '100px',
                        maxHeight: '100px',
                        border: 'none',
                        padding: '10px',
                        outline: 'none'
                    }}
                />
            </div>
        );
    }
}

AdditionalInfoValue.propTypes = {
    value: PropTypes.string
};
