import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

/*global Bert*/

export default class TruckForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: {
                company: '',
                rank: this.props.rank,
                number: 0,
                firstName: 'Truck',
                lastName: '',
                plateNumber: '',
                lenght: '',
                numberOfSeats: 0
            },
            update: false,
            show: props.show,
            reset: false
        };

        this.inputChange = this.inputChange.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        console.log('fetch basladi');
        let truck = [];
        this.props.id
            ? truck = Meteor.users.find({ _id: this.props.id }).fetch()[0]
            : null;

        let obj = {};

        console.log(truck);

        truck.profile && truck.profile.rank === 'tablet'
            ? (
                console.log('fetch bazada melumat tapildi'),
                obj = {
                    company: Meteor.userId(),
                    rank: 'tablet',
                    number: Number(truck.profile.number) || '',
                    firstName: 'Truck',
                    lastName: truck.profile.lastName || '',
                    plateNumber: truck.profile.plateNumber || '',
                    lenght: truck.profile.lenght || '',
                    numberOfSeats: Number(truck.profile.numberOfSeats) || ''
                },
                this.setState({
                    obj,
                    update: true
                })
            )
            : null;
        console.log('fetch yekunlasdi');
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    resetForm() {
        let obj = {
            company: Meteor.userId(),
            number: 0,
            firstName: 'Truck',
            lastName: '',
            plateNumber: '',
            lenght: '',
            numberOfSeats: 0
        };

        this.setState({ obj });

        let labels = Array.from(document.getElementsByTagName('label'));

        labels.forEach((input) => {
            input.classList.add('active');
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(new Date(), 'got props');
        this.fetchData();
        this.state.reset && !this.state.update ? this.resetForm() : null;

        let obj = this.state.obj;

        obj.rank = nextProps.rank;

        this.setState({
            show: nextProps.show,
            reset: !nextProps.show,
        });
    }

    inputChange(whatToChange, e) {
        let obj = this.state.obj;
        obj[whatToChange] = e.target.value;

        whatToChange === 'number'
            ? obj.lastName = e.target.value
            : null;

        this.setState({
            obj
        }, (err) => {
            err ? console.log(err) : this.props.saveInfo(this.state.obj);
        });
    }

    updateInfo() {
        Meteor.call('updateUserOrTruck', this.props.id, this.state.obj, (err) => {
            err
                ? (
                    console.log(err),
                    Bert.alert({
                        title: 'Error',
                        message: 'Cant update account, please contact help desk',
                        type: 'danger',
                    })
                )
                : (
                    Bert.alert({
                        title: 'Success',
                        message: 'Account updated successfully',
                        type: 'success',
                    })
                );
        });
    }


    render() {
        return (
            <div className={this.state.show ? 'row' : 'hide'} >
                {this.state.update
                    ? (
                        <a key={this.props.id + 'updateInfo'} href="#" onClick={this.updateInfo} style={{ marginRight: '10px' }} className='waves-effect waves-light btn amber'>
                            update information
                        </a>
                    )
                    : null
                }
                {this.state.update
                    ? (
                        <a key={this.props.id + 'closeForm'} href="#" onClick={() => this.props.hide(this.props.id)} className='waves-effect waves-light btn deep-orange'>
                            close this form [ X ]
                        </a>
                    )
                    : null
                }
                <hr />
                <form key={this.props.id + 'form'} id="truck_form" >
                    <div key='keyTruckNumber' className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">format_list_numbered</i>
                        <input key={this.props.id + 'truckNumber'} onChange={(e) => this.inputChange('number', e)} value={this.state.obj.number !== 0 ? this.state.obj.number : ''} placeholder="# Truck Number" id="truck_number" type="number" className="validate" />
                        <label className="active" htmlFor="truck_number"># Truck Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">text_format</i>
                        <input key={this.props.id + 'plateNumber'} style={{ textTransform: 'uppercase' }} onChange={(e) => this.inputChange('plateNumber', e)} value={this.state.obj.plateNumber} placeholder="# Plate Number" id="plate_number" type="text" className="validate" />
                        <label className="active" htmlFor="plate_number"># Plate Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">keyboard_tab</i>
                        <input key={this.props.id + 'truckLength'} onChange={(e) => this.inputChange('lenght', e)} value={this.state.obj.lenght !== '' ? this.state.obj.lenght : ''} placeholder="Truck Length" id="truck_length" type="text" className="validate" />
                        <label className="active" htmlFor="truck_length">Truck Length</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">people</i>
                        <input key={this.props.id + 'numberOfSeats'} onChange={(e) => this.inputChange('numberOfSeats', e)} value={this.state.obj.numberOfSeats !== 0 ? this.state.obj.numberOfSeats : ''} placeholder="Number of seats" id="number_of_seats" type="number" className="validate" />
                        <label className="active" htmlFor="number_of_seats">Number of Seats</label>
                    </div>
                </form>
            </div>
        );
    }
}
