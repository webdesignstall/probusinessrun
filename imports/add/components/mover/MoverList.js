import React, { Component } from 'react';
import AddButton from '../helpers/AddButton';
import ListRender from '../helpers/ListRender';
import MoverForm from './MoverForm';

export default class MoverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: {
                rank: 'mover',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                email: '',
                ssn: '',
                truckNumber: '',
                truckPlateNumber: '',
                truckLenght: '',
                numberOfSeats: ''
            },
            show: false
        };

        this.stateChanged = this.stateChanged.bind(this);
        this.show = this.show.bind(this);
    }

    stateChanged(obj) {
        this.setState({ obj });
    }

    show(res) {
        this.setState({
            show: res
        });
    }

    render() {
        return (
            <div className="div">
                <div className="employee--add-button card__">
                    <AddButton obj={this.state.obj} show={this.show} />
                    <MoverForm show={this.state.show} saveInfo={this.stateChanged} />
                </div>
                <ListRender rank='mover' />
            </div>
        );
    }
}
