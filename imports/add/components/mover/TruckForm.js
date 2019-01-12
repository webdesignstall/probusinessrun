import React, { Component } from 'react';

export default class TruckForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            truckNumber: 0,
            firstName: 'Truck',
            lastName: '',
            plateNumber: '',
            truckLength: '',
            numberOfSeats: 0
        };

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(whatToChange, e) {
        this.setState({
            [whatToChange]: e.target.value
        }, () => {
            this.props.saveInfo(this.state);
        });

        whatToChange === 'truckNumber'
            ? this.setState({
                lastName: e.target.value
            }, () => {
                this.props.saveInfo(this.state);
            })
            : null;
    }


    render() {
        return (
            <div className={this.props.show ? 'row' : 'hide'} >
                <hr />
                <form id="truck_form" >
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">format_list_numbered</i>
                        <input onChange={(e) => this.inputChange('truckNumber', e)} value={this.state.truckNumber !== 0 ? this.state.truckNumber : ''} placeholder="# Truck Number" id="truck_number" type="number" className="validate" />
                        <label className="active" htmlFor="truck_number"># Truck Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">text_format</i>
                        <input style={{ textTransform: 'uppercase' }} onChange={(e) => this.inputChange('plateNumber', e)} value={this.state.plateNumber !== '' ? this.state.plateNumber : ''} placeholder="# Plate Number" id="plate_number" type="text" className="validate" />
                        <label className="active" htmlFor="plate_number"># Plate Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">keyboard_tab</i>
                        <input onChange={(e) => this.inputChange('truckLength', e)} value={this.state.truckLength !== '' ? this.state.truckLength : ''} placeholder="Truck Length" id="truck_length" type="text" className="validate" />
                        <label className="active" htmlFor="truck_length">Truck Length</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">people</i>
                        <input onChange={(e) => this.inputChange('numberOfSeats', e)} value={this.state.numberOfSeats !== 0 ? this.state.numberOfSeats : ''} placeholder="Number of seats" id="number_of_seats" type="number" className="validate" />
                        <label className="active" htmlFor="number_of_seats">Nnumber of Seats</label>
                    </div>
                </form>
            </div>
        );
    }
}
