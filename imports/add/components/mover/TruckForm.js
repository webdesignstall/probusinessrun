import React, { Component } from 'react';

export default class TruckForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            truckNumber: 0,
            plateNumber: '',
            truckLength: '',
            numberOfSeats: 0
        };

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(whatToChange, e) {
        this.setState({
            [whatToChange]: e.target.value
        });
    }


    render() {
        return (
            <div className={this.props.show ? 'row' : 'hide'} >
                <hr />
                <form id="truck_form" >
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">format_list_numbered</i>
                        <input onChange={(e) => this.inputChange('truckNumber', e)} placeholder="# Truck Number" id="truck_number" type="text" className="validate" />
                        <label className="active" htmlFor="truck_number"># Truck Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">text_format</i>
                        <input onChange={(e) => this.inputChange('plateNumber', e)} placeholder="# Plate Number" id="plate_number" type="text" className="validate" />
                        <label className="active" htmlFor="plate_number"># Plate Number</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">keyboard_tab</i>
                        <input onChange={(e) => this.inputChange('truckLength', e)} placeholder="Truck Length" id="truck_length" type="text" className="validate" />
                        <label className="active" htmlFor="truck_length">Truck Length</label>
                    </div>
                    <div className="input-field valideyn col s12 m6 l3">
                        <i className="material-icons isare">people</i>
                        <input onChange={(e) => this.inputChange('numberOfSeats', e)} placeholder="Number of seats" id="number_of_seats" type="text" className="validate" />
                        <label className="active" htmlFor="number_of_seats">Nnumber of Seats</label>
                    </div>
                </form>
            </div>
        );
    }
}
