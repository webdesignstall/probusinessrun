import React, { Component } from 'react';

export default class MoverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            email: '',
            snn: ''
        };

        this.inputChange = this.inputChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rank: nextProps.rank
        });
    }

    inputChange(type, e) {
        this.setState({
            [type]: e.target.value
        }, () => {
            this.props.saveInfo(this.state);
        });
    }

    render() {
        return (
            <div className={this.props.show ? 'row' : 'hide'}>
                <hr />
                <form id="mover_form" >
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">person</i>
                        <input onChange={(e) => this.inputChange('firstName', e)} placeholder="First Name" id="first_name" type="text" className="validate" />
                        <label className="active" htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">person</i>
                        <input onChange={(e) => this.inputChange('lastName', e)} placeholder="Last Name" id="last_name" type="text" className="validate" />
                        <label className="active" htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">phone</i>
                        <input onChange={(e) => this.inputChange('phone', e)} placeholder="Phone Number" id="phone_number" type="number" className="validate" />
                        <label className="active" htmlFor="phone_number">Phone Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">credit_card</i>
                        <input onChange={(e) => this.inputChange('snn', e)} placeholder="SNN" id="mover_snn" type="number" className="validate" />
                        <label className="active" htmlFor="mover_snn">SNN</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l6">
                        <i className="material-icons isare">email</i>
                        <input onChange={(e) => this.inputChange('email', e)} placeholder="Email" id="mover_email" type="text" className="validate" />
                        <label className="active" htmlFor="mover_email">Email</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l6">
                        <i className="material-icons isare">pin_drop</i>
                        <input onChange={(e) => this.inputChange('address', e)} placeholder="Address" id="mover_address" type="text" className="validate" />
                        <label className="active" htmlFor="mover_address">Address</label>
                    </div>
                </form>
            </div>
        );
    }
}
