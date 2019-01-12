import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import FlipMove from 'react-flip-move';
/*global Bert*/

export default class AddButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saveOrAdd: false
        };

        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    add() {
        if (this.state.saveOrAdd) {
            let randomNumber = Math.random().toString(36).substr(2, 5);
            let username = this.props.obj.rank === 'truck'
                ? ('turck' + this.props.obj.truckNumber)
                : (this.props.obj.rank + randomNumber.toString());
            let obj = {
                username,
                password: 'asdasd',
                profile: {
                    rank: this.props.obj && this.props.obj.rank ? this.props.obj.rank : '',
                    company: Meteor.userId(),
                    firstName: this.props.obj && this.props.obj.firstName || '',
                    lastName: this.props.obj && this.props.obj.lastName || '',
                    phoneNumber: this.props.obj && this.props.obj.phone || '',
                    address: this.props.obj && this.props.obj.address || '',
                    email: this.props.obj && this.props.obj.email || '',
                    ssn: this.props.obj && this.props.obj.ssn || '',
                    truck: {
                        number: this.props.obj && this.props.obj.truckNumber || '',
                        plateNumber: this.props.obj && this.props.obj.truckPlateNumber || '',
                        lenght: this.props.obj && this.props.obj.truckLenght || '',
                        numberOfSeats: this.props.obj && this.props.obj.numberOfSeats || 0
                    }
                }
            };

            Meteor.call('addUserOrTruck', obj, (err, res) => {
                err
                    ? (
                        console.log(err),
                        console.log(obj),
                        Bert.alert({
                            title: 'Error',
                            message: 'Cant create new account, please contact help desk',
                            type: 'danger',
                        })
                    )
                    : (
                        console.log(obj),
                        document.getElementById('mover_form').reset(),
                        Bert.alert({
                            title: 'Success',
                            message: 'Account created successfully',
                            type: 'success',
                        })
                    );
            });
        } else {
            this.setState(
                (prevState) => {
                    return {
                        saveOrAdd: !(prevState.saveOrAdd)
                    };
                },
                (err) => err ? console.log(err) : this.props.show(this.state.saveOrAdd)
            );
        }
    }

    cancel() {
        this.setState(
            (prevState) => {
                return {
                    saveOrAdd: !(prevState.saveOrAdd)
                };
            },
            (err) => err
                ? console.log(err)
                : (
                    this.props.show(this.state.saveOrAdd),
                    (document.getElementById('mover_form') && document.getElementById('mover_form').reset()),
                    (document.getElementById('truck_form') && document.getElementById('truck_form').reset())
                )
        );
    }

    render() {
        return (
            <FlipMove>
                <div key="add-button" className={this.state.saveOrAdd ? 'row' : ''}>
                    {/* save or add new button */}
                    <a key="save-or-add" href="#" onClick={this.add} style={{ marginRight: '10px' }} className={this.state.saveOrAdd ? 'waves-effect waves-light btn teal' : 'waves-effect waves-light btn cyan'}>
                        {this.state.saveOrAdd ? 'Save' : 'Add New +'}
                    </a>
                    {/* cancel button */}
                    <a key="close-form" href="#" onClick={this.cancel} className={this.state.saveOrAdd ? 'waves-effect waves-light btn deep-orange' : 'hide'}>
                        close form
                    </a>
                    <span
                        key="list-name"
                        className="add--list-name waves-effect waves-light btn"
                        style={{
                            backgroundColor: 'rgb(255, 253, 244)',
                            color: 'rgb(119, 119, 119)',
                            boxShadow: 'none',
                            border: '1px dashed dimgrey'
                        }} >
                        {
                            this.props.obj.rank === 'mover'
                                ? 'Movers'
                                : this.props.obj.rank === 'officeEmployee'
                                    ? 'Office Employees'
                                    : this.props.obj.rank === 'tablet'
                                        ? 'Tucks'
                                        : null
                        }
                    </span>
                </div>
            </FlipMove >
        );
    }
}
