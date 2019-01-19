import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';
import TimeSelector from '../../../imports/timeSelector/TimeSelector';

export default class ArrivalWindow extends React.Component {
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
                    value2: '09:00 am',
                    time: 'am'
                },
                {
                    name: '09:00 am - 10:00 am',
                    status: 1,
                    value1: '09:00 am',
                    value2: '10:00 am',
                    time: 'am'
                },
                {
                    name: 'Afternoon',
                    status: 0
                },
                {
                    name: '01:00 pm - 04:00 pm',
                    status: 1,
                    value1: '01:00 pm',
                    value2: '04:00 pm',
                    time: '1:'
                },
                {
                    name: '02:00 pm - 05:00 pm',
                    status: 1,
                    value1: '02:00 pm',
                    value2: '05:00 pm',
                    time: 'pm',

                },
                {
                    name: 'Morning & Afternoon',
                    status: 1,
                    value1: '12:00 am',
                    value2: '12:00 am'
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

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let id = Session.get('is');
            let selected = [];
            let reset = Session.get('reset');
            console.log(id);

            if (id !== '') {
                console.log('id bos deyilse');
                selected = WorkData.find({ _id: id }).fetch();
                selected = selected[0].workMustBeginTime;
                this.setState((prevState) => {
                    return {
                        time1: selected[0],
                        time2: selected[1],
                        custom: true
                    };
                }, () => {
                    document.getElementById('select-arrive-time').value = 'Custom';
                    console.log(this.state.custom);
                });
            }

            reset
                ? this.setState({
                    custom: false
                })
                : this.setState({
                    custom: true
                });

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

    // secilmisiRenderEt() {
    //     //isdeki zamanin siyahida olub olmamasi yoxlanilir
    //     this.state.options.map((option) => {
    //         if (option.name === this.state.selected) {
    //             this.setState({
    //                 defValue: this.state.selected
    //             });
    //         }
    //     });

    //     //isdeki zaman siyahida yoxdursa ve isdeki zaman bos deyilse
    //     if (this.state.defValue === '' && this.state.selected !== '') {
    //         this.setState({
    //             defValue: 'Custom'
    //         });

    //         this.setState({
    //             trueFalse: true,
    //             custom: true,
    //             valueOfInput: this.state.selected
    //         });
    //     }

    //     if (this.state.selected === '') {
    //         this.setState({
    //             defValue: 'Select moving time window'
    //         });
    //     }
    // }

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
            <div className="custom--input">
                <hr />
                <div className={this.state.custom ? 'col s12 m6 l6 margin--bottom-10' : 'hide'}>
                    <TimeSelector id="customTime--1" defVal={this.state.time1} interval={60} />
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
