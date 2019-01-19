import React, { Component } from 'react';

/*global moment*/

export default class TimeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 24,
            minutes: 60,
            isAm: this.props.siAm || false,
            interval: this.props.interval || 15,
        };

        // refs
        this.select = React.createRef();

        this.timeList = this.timeList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        nextProps.defVal !== '' ? this.select.current.value = nextProps.defVal : null;
    }

    timeList() {
        let i;
        let z;
        let stringOfTime;
        let arrayOfTime = [];
        for (i = 0; i < this.state.hours; i++) {
            for (z = 0; z < this.state.minutes; z += this.state.interval) {
                stringOfTime = moment().set({ 'hour': i, 'minutes': z }).format('hh:mm a');

                arrayOfTime.push(stringOfTime);
            }
        }

        return (arrayOfTime.map((time, index) => {
            return (
                <option key={index + 'timeKey'} value={time} >
                    {time}
                </option>
            );
        }));
    }

    render() {
        return (
            <select ref={this.select} className="browser-default" id={this.props.id} defaultValue="12:00 am">
                {this.timeList()}
            </select>
        );
    }
}
