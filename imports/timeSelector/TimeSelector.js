import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*global moment*/

export default class TimeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 24,
            minutes: 60,
            isAm: this.props.isAm || false,
            interval: this.props.interval || 15,
        };

        // refs
        this.select = React.createRef();

        this.timeList = this.timeList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        nextProps.defVal !== '' ? (this.select.current.value = nextProps.defVal) : null;
    }

    onChangeHandler(e) {
        this.props.timeReturn(e.target.value, this.props.index);
    }

    timeList() {
        let i;
        let z;
        let stringOfTime;
        let arrayOfTime = [];
        for (i = 0; i < this.state.hours; i++) {
            for (z = 0; z < this.state.minutes; z += this.state.interval) {
                stringOfTime = moment()
                    .set({ hour: i, minutes: z })
                    .format('hh:mm a');

                arrayOfTime.push(stringOfTime);
            }
        }

        return arrayOfTime.map((time, index) => {
            return (
                <option key={index + 'timeKey'} value={time}>
                    {time}
                </option>
            );
        });
    }

    render() {
        return (
            <select
                onChange={e => this.onChangeHandler(e)}
                ref={this.select}
                className="browser-default"
                id={this.props.id}
                defaultValue={this.props.default || '12:00 am'}>
                {this.timeList()}
            </select>
        );
    }
}

TimeSelector.propTypes = {
    timeReturn: PropTypes.func.isRequired,
    isAm: PropTypes.bool,
    interval: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    default: PropTypes.string,
};
