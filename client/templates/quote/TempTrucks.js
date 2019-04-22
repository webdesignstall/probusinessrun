import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';
import PropTypes from 'prop-types';

export default class TempTrucks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: this.props.update,
            trucks: [],
            trucksList: ['16 foot', '18 foot', '20 foot', '22 foot', '24 foot', '26 foot'],
        };

        this.deleteTempTruck = this.deleteTempTruck.bind(this);
        this.addMore = this.addMore.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let selectedJob = null;

            if (this.state.update) {
                let isinOzu = Session.get('is');
                selectedJob = WorkData.findOne({ _id: isinOzu });
            }

            if (selectedJob) {
                Session.set('trucklar', selectedJob.trucksTemp);
                this.setState(
                    {
                        trucks: selectedJob.trucksTemp,
                    },
                    () => {
                        this.props.updateJob && this.props.updateJob({ trucksTemp: this.state.trucks });
                    },
                );
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderTuckSizes(upIndex) {
        return this.state.trucksList.map((size, index) => {
            return (
                <option key={upIndex + size + index} value={size}>
                    {size}
                </option>
            );
        });
    }

    deleteTempTruck(index) {
        this.setState(
            prevState => {
                prevState.trucks.splice(index, 1);
                return { trucks: prevState.trucks };
            },
            err => {
                err
                    ? console.log(err)
                    : (Session.set('trucklar', this.state.trucks),
                    this.props.updateJob && this.props.updateJob({ trucksTemp: this.state.trucks }));
            },
        );
    }

    changeHandler(type, numberOrString, index, e) {
        let value = numberOrString === 'number' ? parseInt(e.target.value) : e.target.value;
        this.setState(
            prevState => {
                let old = prevState.trucks;
                old[index][type] = value;

                return {
                    trucks: old,
                };
            },
            err => {
                err
                    ? console.log(err)
                    : (Session.set('trucklar', this.state.trucks),
                    this.props.updateJob && this.props.updateJob({ trucksTemp: this.state.trucks }));
            },
        );
    }

    addTruckList() {
        return this.state.trucks.map((truck, index) => {
            return (
                <div className="col s12 m6 l6" style={{ margin: '10px 0' }} key={index + 'tempTruckList'}>
                    <div className="col s8 m8 l8">
                        <label htmlFor={'temp-trucks-sizes-list' + index}>Truck Size</label>
                        <select
                            onChange={e => this.changeHandler('size', 'string', index, e)}
                            className="browser-default"
                            name={'truck-sizes' + index}
                            id={'temp-trucks-sizes-list' + index}
                            value={truck.size}>
                            <option value="Select Trucks Size" disabled={true}>
                                Select Trucks Size
                            </option>
                            {this.renderTuckSizes(index)}
                        </select>
                    </div>
                    <div className="col s3 m3 l3">
                        <label htmlFor={'temp-trucks-quantity' + index}>Quantity</label>
                        <select
                            onChange={e => this.changeHandler('qty', 'number', index, e)}
                            className="browser-default"
                            name={'truck-quantity' + index}
                            id={'temp-trucks-quantity' + index}
                            value={truck.qty || 1}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    <div className="col s1 m1 l1">
                        <i
                            onClick={() => this.deleteTempTruck(index)}
                            className="material-icons qirmizi"
                            style={{
                                margin: '0px auto',
                                padding: '28px 0',
                                marginLeft: '-10px',
                                cursor: 'pointer',
                            }}>
                            delete_forever
                        </i>
                    </div>
                </div>
            );
        });
    }

    addMore() {
        this.setState(
            prevState => {
                return {
                    trucks: [
                        ...prevState.trucks,
                        {
                            size: 'Select Trucks Size',
                            qty: 1,
                        },
                    ],
                };
            },
            err => {
                err
                    ? console.log(err)
                    : (Session.set('trucklar', this.state.trucks),
                    this.props.updateJob && this.props.updateJob({ trucksTemp: this.state.trucks }));
            },
        );
    }

    render() {
        return (
            <div
                className="row"
                style={{
                    borderRadius: '16px',
                    margin: '10px 0 0 0',
                    letterSpacing: '0.5px',
                    overflow: 'hidden',
                    border: '1px solid #D55B26',
                }}>
                <span
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '5px 10px',
                        backgroundColor: '#D55B26',
                        color: 'white',
                        margin: '0 4px 0 0',
                        position: 'relative',
                        fontWeight: '500',
                    }}>
                    TEMPORARY TRUCKS
                    <i
                        className="material-icons"
                        onClick={this.addMore}
                        style={{
                            position: 'absolute',
                            margin: '4px 0 0 15px',
                            color: '#4EDB9E',
                            top: '0',
                            cursor: 'pointer',
                        }}>
                        add_circle
                    </i>
                </span>
                {this.addTruckList()}
            </div>
        );
    }
}

TempTrucks.propTypes = {
    updateJob: PropTypes.func,
    update: PropTypes.bool,
};
