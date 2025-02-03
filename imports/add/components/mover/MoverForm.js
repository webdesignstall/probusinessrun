import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

export default class MoverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: {
                company: Meteor.userId(),
                rank: this.props.rank,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                email: '',
                snn: ''
            },
            update: false,
            show: props.show,
            reset: false
        };

        this.inputChange = this.inputChange.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.saveDataToState = this.saveDataToState.bind(this);
    }

    saveDataToState() {
        let mover = [];
        this.props.id ? (mover = Meteor.users.find({ _id: this.props.id }).fetch()[0]) : null;

        let obj = {};

        mover.profile && (mover.profile.rank === 'mover' || mover.profile.rank === 'officeEmployee')
            ? ((obj = {
                company: Meteor.userId(),
                rank: this.props.rank,
                firstName: mover.profile.firstName || '',
                lastName: mover.profile.lastName || '',
                phoneNumber: mover.profile.phoneNumber || '',
                address: mover.profile.address || '',
                email: mover.profile.email || '',
                snn: mover.profile.snn || ''
            }),
            this.setState({
                obj,
                update: true
            }))
            : ((obj = {
                company: Meteor.userId(),
                rank: this.props.rank,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                email: '',
                snn: ''
            }),
            this.setState({
                obj
            }));
    }

    UNSAFE_componentWillMount() {
        this.saveDataToState();
    }

    resetForm() {
        let obj = {
            company: Meteor.userId(),
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            snn: ''
        };

        this.setState({ obj });

        let labels = Array.from(document.getElementsByTagName('label'));

        labels.forEach(input => {
            input.classList.add('active');
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        nextProps.show && this.state.update ? this.saveDataToState() : null;
        this.state.reset && !this.state.update ? this.resetForm() : null;
        let obj = this.state.obj;

        obj.rank = nextProps.rank;

        this.setState({
            show: nextProps.show,
            reset: !nextProps.show
        });
    }

    inputChange(type, e) {
        let obj = this.state.obj;
        obj[type] = e.target.value;

        this.setState(
            {
                obj
            },
            err => {
                err ? console.error(err) : this.state.update ? null : this.props.saveInfo(obj);
            }
        );
    }

    updateInfo() {
        Meteor.call('updateUserOrTruck', this.props.id, this.state.obj, err => {
            err
                ? (console.error(err),
                swal({
                    title: 'Error! Can\'t update account, please contact help desk',
                    text: 'Reason: ' + err.message,
                    icon: 'error'
                }),
                Session.set('loading', false))
                : swal({
                    title: 'Success',
                    text: 'Account updated successfully',
                    icon: 'success'
                });
        });
    }

    render() {
        return (
            <div className={this.props.show ? 'row' : 'hide'}>
                {this.state.update ? (
                    <a
                        key={this.props.id + 'updateInfo'}
                        href="#"
                        onClick={this.updateInfo}
                        style={{ marginRight: '10px' }}
                        className="waves-effect waves-light btn amber"
                    >
                        update information
                    </a>
                ) : null}
                {this.state.update ? (
                    <a
                        key={this.props.id + 'closeForm'}
                        href="#"
                        onClick={() => this.props.hide(this.props.id)}
                        className="waves-effect waves-light btn deep-orange"
                    >
                        close this form [ X ]
                    </a>
                ) : null}
                <div className="clear" />
                <hr />
                <form key={this.props.id + 'form'} id="mover_form">
                    <div
                        key={this.props.id + 'firstNameDiv'}
                        className="input-field valideyn col s12 m6 l3"
                    >
                        <i className="material-icons isare">person</i>
                        <input
                            key={this.props.id + 'firstName'}
                            onChange={e => this.inputChange('firstName', e)}
                            value={this.state.obj.firstName !== '' ? this.state.obj.firstName : ''}
                            placeholder="First Name"
                            type="text"
                            className="validate"
                        />
                        <label className="active" htmlFor="first_name">
                            First Name
                        </label>
                    </div>
                    <div
                        key={this.props.id + 'lastNameDiv'}
                        className="input-field valideyn col s12 m6 l3"
                    >
                        <i className="material-icons isare">person</i>
                        <input
                            key={this.props.id + 'lastName'}
                            onChange={e => this.inputChange('lastName', e)}
                            value={this.state.obj.lastName || ''}
                            placeholder="Last Name"
                            type="text"
                            className="validate"
                        />
                        <label className="active" htmlFor="last_name">
                            Last Name
                        </label>
                    </div>
                    <div
                        key={this.props.id + 'phoneNumberDiv'}
                        className="input-field valideyn col s12 m6 l3"
                    >
                        <i className="material-icons isare">phone</i>
                        <input
                            key={this.props.id + 'phoneNumber'}
                            onChange={e => this.inputChange('phoneNumber', e)}
                            value={this.state.obj.phoneNumber || ''}
                            placeholder="Phone Number"
                            type="number"
                            className="validate"
                        />
                        <label className="active" htmlFor="phone_number">
                            Phone Number
                        </label>
                    </div>
                    <div
                        key={this.props.id + 'snnDiv'}
                        className="input-field valideyn col s12 m6 l3"
                    >
                        <i className="material-icons isare">credit_card</i>
                        <input
                            key={this.props.id + 'snn'}
                            onChange={e => this.inputChange('snn', e)}
                            value={this.state.obj.snn || ''}
                            placeholder="SNN"
                            type="number"
                            className="validate"
                        />
                        <label className="active" htmlFor="mover_snn">
                            SNN
                        </label>
                    </div>
                    <div
                        key={this.props.id + 'emailDiv'}
                        className="input-field valideyn col s12 m6 l6"
                    >
                        <i className="material-icons isare">email</i>
                        <input
                            key={this.props.id + 'email'}
                            onChange={e => this.inputChange('email', e)}
                            value={this.state.obj.email || ''}
                            placeholder="Email"
                            type="text"
                            className="validate"
                        />
                        <label className="active" htmlFor="mover_email">
                            Email
                        </label>
                    </div>
                    <div
                        key={this.props.id + 'addressDiv'}
                        className="input-field valideyn col s12 m6 l6"
                    >
                        <i className="material-icons isare">pin_drop</i>
                        <input
                            key={this.props.id + 'address'}
                            onChange={e => this.inputChange('address', e)}
                            value={this.state.obj.address || ''}
                            placeholder="Address"
                            type="text"
                            className="validate"
                        />
                        <label className="active" htmlFor="mover_address">
                            Address
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}
