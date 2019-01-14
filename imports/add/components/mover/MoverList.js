import React, { Component } from 'react';
import AddButton from '../helpers/AddButton';
import ListRender from '../helpers/ListRender';
import MoverForm from './MoverForm';
import TruckForm from './TruckForm';

export default class MoverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: {
                rank: (this.props.whatToDisplay),
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                email: '',
                ssn: '',
                number: '',
                plateNumber: '',
                lenght: '',
                numberOfSeats: ''
            },
            show: false
        };

        this.stateChanged = this.stateChanged.bind(this);
        this.show = this.show.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            obj: {
                rank: nextProps.whatToDisplay
            }
        });
    }

    stateChanged(obj) {
        this.setState({ obj }, (err) => {
            err ? console.log(err) : 'Xeta tapilmadi';
        });
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
                    {
                        (this.state.obj.rank === 'mover' || this.state.obj.rank === 'officeEmployee')
                            ? <MoverForm show={this.state.show} saveInfo={this.stateChanged} rank={this.state.obj.rank} />
                            : null
                    }
                    {
                        (this.state.obj.rank === 'tablet')
                            ? <TruckForm show={this.state.show} saveInfo={this.stateChanged} rank={this.state.obj.rank} />
                            : null
                    }
                </div>
                <ListRender saveInfo={this.stateChanged} rank={this.state.obj.rank} />
            </div>
        );
    }
}
