import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
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
            (err) => err ? console.log(err) : (this.props.show(this.state.saveOrAdd), document.getElementById('mover_form').reset())
        );
    }

    render() {
        return (
            <div className={this.state.saveOrAdd ? 'row' : ''}>
                {/* save or add new button */}
                <a href="#" onClick={this.add} style={{ marginRight: '10px' }} className={this.state.saveOrAdd ? 'waves-effect waves-light btn teal' : 'waves-effect waves-light btn cyan'}>
                    {this.state.saveOrAdd ? 'Save' : 'Add New +'}
                </a>
                {/* cancel button */}
                <a href="#" onClick={this.cancel} className={this.state.saveOrAdd ? 'waves-effect waves-light btn deep-orange' : 'hide'}>
                    cancel
                </a>
            </div>
        );
    }
}
