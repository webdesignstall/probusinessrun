import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*global moment*/

export default class WonDate extends Component {
    render() {
        return (
            <span
                style={{
                    marginRight: '8px',
                    borderRadius: '10px',
                    backgroundColor: '#CBEEDD',
                    color: '#2AC852',
                    padding: '1px 10px',
                    fontWeight: 'bold'
                }}>
                <span style={{ color: 'black' }}>
                    {this.props.wonDate
                        ? 'WON DATE - ' +
                          moment(this.props.wonDate).format(
                              'MM/DD/YYYY hh:mm a'
                          )
                        : 'DATE INFORMATION NOT AVIABLE'}
                </span>
            </span>
        );
    }
}

WonDate.propTypes = {
    wonDate: PropTypes.instanceOf(Date)
};
