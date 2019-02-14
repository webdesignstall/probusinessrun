import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';
import TimeSelector from '../../../imports/timeSelector/TimeSelector';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ArrivalWindow extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            custom: false,
            update: false,
            valueOfInput: '',
            time1: '',
            time2: '',
            options: [
                {
                    name: 'Select moving time window',
                    status: 1
                },
                {
                    name: 'Morning',
                    status: 0
                },
                {
                    name: '08:00 am - 09:00 am',
                    status: 1,
                    value1: '08:00 am',
                    value2: '09:00 am'
                },
                {
                    name: '09:00 am - 10:00 am',
                    status: 1,
                    value1: '09:00 am',
                    value2: '10:00 am'
                },
                {
                    name: 'Afternoon',
                    status: 0
                },
                {
                    name: '01:00 pm - 04:00 pm',
                    status: 1,
                    value1: '01:00 pm',
                    value2: '04:00 pm'
                },
                {
                    name: '02:00 pm - 05:00 pm',
                    status: 1,
                    value1: '02:00 pm',
                    value2: '05:00 pm'
                },
                {
                    name: 'Morning & Afternoon',
                    status: 1,
                    value1: '04:00 am',
                    value2: '04:00 am'
                },
                {
                    name: 'Custom',
                    status: 1
                }
            ]
        };

        this.arrivalTime = React.createRef();

        this.onChangeInput = this.onChangeInput.bind(this);
        // this.secilmisiRenderEt = this.secilmisiRenderEt.bind(this);
        this.custom = this.custom.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderArrivalTime = this.renderArrivalTime.bind(this);
    }

    finTheJob(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let id = Session.get('is');
            let selected = [];
            let reset = Session.get('reset');

            reset
                ? (
                    document.getElementById('select-arrive-time').value = 'Select moving time window',
                    this.setState({ custom: false })
                )
                : null;

            if (id !== '') {
                selected = this.finTheJob(id);
                selected = selected[0].workMustBeginTime;
                let isMorningAfternoon = (selected[0] === '04:00 am' && selected[1] === '04:00 am'); // is it Morning Afternoon aviability selected
                console.log('TCL: ArrivalWindow -> componentDidMount -> isMorningAfternoon', isMorningAfternoon)
                let isCustom = false; // is custom time selected
                let difValue = '';

                this.state.options.map((option) => {
                    selected[0] === option.value1 && selected[1] === option.value2 ? difValue = (selected[0] + ' - ' + selected[1]) : null;
                });

                // if the 1st and 2nd value are equal
                selected[0] === selected[1]
                    ? isCustom = false
                    : isCustom = true;

                // if MorningAfternoon selected
                isMorningAfternoon ? (isCustom = false, difValue = '') : null;

                difValue !== ''
                    ? (
                        this.setState({
                            time1: selected[0],
                            time2: selected[1],
                            custom: false
                        }, (err) => {
                            err ? console.log(err) : null;
                            document.getElementById('select-arrive-time').value = difValue;
                        })
                    )
                    : isMorningAfternoon
                        ? (
                            this.setState({
                                time1: selected[0],
                                time2: selected[1],
                                custom: false
                            }, (err) => {
                                err ? console.log(err) : null;
                                document.getElementById('select-arrive-time').value = 'Morning & Afternoon';
                            })
                        )
                        : isCustom
                            ? (
                                this.setState({
                                    time1: selected[0],
                                    time2: selected[1],
                                    custom: true
                                }, (err) => {
                                    err ? console.log(err) : null;
                                    document.getElementById('select-arrive-time').value = 'Custom';
                                })
                            )
                            : null;

            }

            document.getElementById('select-arrive-time').onchange = () => {
                let value = document.getElementById('select-arrive-time').value;
                if (value === 'Custom') {
                    this.setState({
                        custom: true
                    });
                } else {
                    this.setState({
                        custom: false
                    });
                }

                let selectedOption = '';

                Array.from(document.getElementsByTagName('option')).map((option) => {
                    option.value === this.arrivalTime.current.value ? selectedOption = option : null;
                });

                selectedOption !== '' ? this.setState({
                    time1: selectedOption.getAttribute('data-time1'),
                    time2: selectedOption.getAttribute('data-time2')
                }) : null;
            };
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderOptions() {
        return (
            this.state.options.map((option) => {
                return (
                    <option
                        key={option.name}
                        value={option.name}
                        disabled={option.status === 0}
                        data-time1={option.value1 || '12:00 am'}
                        data-time2={option.value2 || '12:00 am'}
                    >{option.name}</option>
                );
            })
        );
    }

    renderArrivalTime() {
        return (
            <select onChange={this.setTimes} ref={this.arrivalTime} className="browser-default custom--select-arrivalWindow" name="select-arrive-time" id="select-arrive-time">
                {this.renderOptions()}
            </select>
        );
    }

    onChangeInput(e) {
        this.setState({
            valueOfInput: e.target.value
        });
    }

    custom() {
        return (
            <div className={this.state.custom ? 'custom--input' : 'hide'}>
                <hr />
                <div className={this.state.custom ? 'col s12 m6 l6 margin--bottom-10' : 'hide'}>
                    <TimeSelector id="customTime--1" defVal={this.state.time1} interval={30} />
                </div>
                <div className={this.state.custom ? 'col s12 m6 l6 margin--bottom-10' : 'hide'}>
                    <TimeSelector id="customTime--2" defVal={this.state.time2} interval={30} />
                </div>
                <div className="clear"> </div>
            </div>
        );
    }

    render() {
        return (
            <div className='arrivalWindow'>
                <div id="arrivalWindow--id" className="parent">
                    <i className="material-icons isare">date_range</i>
                    {this.renderArrivalTime()}
                    {this.custom()}
                </div>
                <label
                    className="active"
                    htmlFor="arrivalWindow--id"
                    style={{ backgroundColor: '#EDF0F1', padding: '0 5px', margin: '8px 15px' }}>
                    Arrival Window
                </label>
            </div>
        );
    }
}
