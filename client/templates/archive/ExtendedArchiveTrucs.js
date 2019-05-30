import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExtendedArchiveTrucks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trucks: []
        };

        this.trucks = this.trucks.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            trucks: nextProps.trucks
        });
    }

    componentDidMount() {
        let trucks = this.props.trucks;

        this.setState({
            trucks
        });
    }

    trucks() {
        return this.state.trucks.map((truck, index) => {
            return (
                <button key={'archiveListTrucks' + index}>
                    #{truck.profile.number} {truck.profile.lenght}{' '}
                    {truck.profile.plateNumber}
                </button>
            );
        });
    }

    render() {
        return (
            <div className="col s12 m3 l3">
                <div className="archive-card-main">
                    <div className="card-content black-text">
                        <span className="card-title">Trucks</span>
                        <p>{this.trucks()}</p>
                    </div>
                </div>
            </div>
        );
    }
}

ExtendedArchiveTrucks.propTypes = {
    trucks: PropTypes.array.isRequired
};
