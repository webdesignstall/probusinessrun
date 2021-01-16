import React from 'react';
import { Tracker } from 'meteor/tracker';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import swal from 'sweetalert';
import StairInfo from './StairInfo';
import PetsInfo from './PetsInfo';

/*global google*/

export default class Addresses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfvalue: ['', ''],
            distance: 0,
            pickup: {},
            dropoff: {}
        };

        this.renderAddressFields = this.renderAddressFields.bind(this);
        this.addMore = this.addMore.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.handleLoadAutoComplete = this.handleLoadAutoComplete.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.calculateDistance = this.calculateDistance.bind(this);
        // this.inputChangeHandler = this.inputChangeHandler.bind(this)
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');

            !job.addresses ? this.setState({ arrayOfvalue: ['', ''] }) : null;

            job.addresses && job.addresses.length > 0
                ? this.setState({ arrayOfvalue: job.addresses })
                : this.setState({
                      arrayOfvalue: ['', '']
                  });

            Array.isArray(job.fromTo) &&
                job.fromTo.length > 0 &&
                job.fromTo.map((fromto, index) => {
                    typeof fromto === 'string' &&
                        this.setState(prevState => {
                            let oldfromto = prevState[fromto];

                            oldfromto[index + fromto] = true;
                            return oldfromto;
                        });
                });
        });
    }

    calculateDistance() {
        this.timeOut = null;
        let this_ = this;
        function callback(response, status) {
            if (status === 'OK') {
                let distancies = [];
                response.rows.map((row, index) => {
                    let value = row.elements[index].distance.value;
                    distancies.push(value);
                });
                let totalInMeter = 0;
                let distance = 0;
                distancies.map(distance => {
                    totalInMeter += distance;
                });
                distance = parseFloat((totalInMeter / 1609.34).toFixed(2));
                this_.setState({
                    distance
                });
            } else {
                swal({
                    title: 'Error!',
                    text: 'Reason: Be sure that there are 2 addresses or addresses are connected with drivible road',
                    icon: 'error',
                    button: 'OK'
                });
            }
        }

        let isClaculatable =
            this.state.arrayOfvalue.length >= 2 &&
            this.state.arrayOfvalue[0].trim() !== '' &&
            this.state.arrayOfvalue[1].trim() !== '';
        if (isClaculatable) {
            let addresses = [...this.state.arrayOfvalue];
            let service = new google.maps.DistanceMatrixService();
            let origins = [...addresses];
            origins.pop();
            let destinations = [...addresses];
            destinations.shift();

            service.getDistanceMatrix(
                {
                    origins,
                    destinations,
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    drivingOptions: {
                        departureTime: new Date(Date.now() + 0), // for the time N milliseconds from now.
                        trafficModel: 'pessimistic'
                    },
                    avoidHighways: false,
                    avoidTolls: false
                },
                callback
            );
        } else {
            swal({
                title: 'Error!',
                text: 'Reason: Be sure that there are 2 addresses or addresses are connected with drivible road',
                icon: 'error',
                button: 'OK'
            });
        }
    }

    componentWillUnmount() {
        this.x.stop();
    }

    setSession(what, value) {
        let job = Session.get('job_');
        job[what] = value;
        Session.set('job_', job);
    }

    interval(what, value) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setSession(what, value), 500);
    }

    inputChangeHandler(i) {
        let arrayOfvalue = [...this.state.arrayOfvalue];
        arrayOfvalue[i] = event.target.value;
        this.setState({ arrayOfvalue }, () => {
            this.interval('addresses', arrayOfvalue);
        });
    }

    deleteAddress(index) {
        let oldArray = this.state.arrayOfvalue;
        oldArray.splice(index, 1);
        this.setState(
            {
                arrayOfvalue: oldArray
            },
            () => {
                this.interval('addresses', oldArray);
            }
        );
    }

    togglePickUpDropOff(value, key, index) {
        this.setState(
            prevState => {
                let oldkey = prevState[key];
                if (oldkey[value]) {
                    delete oldkey[value];

                    return oldkey;
                } else {
                    oldkey[value] = true;
                    return oldkey;
                }
            },
            () => {
                let job = Session.get('job_');
                Array.isArray(job.fromTo) ? '' : (job.fromTo = []);
                if (job.fromTo[index]) {
                    job.fromTo[index] = key;
                    Session.set('job_', job);
                } else {
                    job.fromTo[index] = null;
                    Session.set('job_', job);
                }
            }
        );
    }

    renderAddressFields() {
        let { dropoff, pickup, arrayOfvalue } = this.state;
        return arrayOfvalue.map((el, i) => (
            <div key={i} id={i + '_id'} className="input-field valideyn col s12 m6 l6 address_list">
                <i className="material-icons isare">location_on</i>
                <input
                    id={'addressInputId' + i}
                    key={'addresslerForGoogle' + i}
                    className="addresses"
                    type="text"
                    placeholder=""
                    value={arrayOfvalue[i]}
                    onChange={this.inputChangeHandler.bind(this, i)}
                />
                <i className="material-icons sag delete-address animated" onClick={() => this.deleteAddress(i)}>
                    delete_forever
                </i>
                <label className="active droppicklabel" htmlFor="movingFrom">
                    <div
                        className="inlineblock droppick"
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        <label htmlFor={i + 'pickup'}>Pick up</label>
                        <input
                            id={i + 'pickup'}
                            disabled={dropoff[i + 'dropoff']}
                            checked={!!pickup[i + 'pickup']}
                            type="checkbox"
                            onChange={() => this.togglePickUpDropOff(i + 'pickup', 'pickup', i)}
                        />
                    </div>{' '}
                    <div className="inlineblock droppick">
                        <label htmlFor={i + 'dropoff'}>Drop Off</label>
                        <input
                            id={i + 'dropoff'}
                            checked={!!dropoff[i + 'dropoff']}
                            disabled={pickup[i + 'pickup']}
                            type="checkbox"
                            onChange={() => this.togglePickUpDropOff(i + 'dropoff', 'dropoff', i)}
                        />
                    </div>
                </label>
                <StairInfo index={i} />
            </div>
        ));
    }
    // add functionality to the multi address
    addMore() {
        this.setState(
            prevState => ({
                arrayOfvalue: [...prevState.arrayOfvalue, '']
            }),
            () => {
                this.interval('addresses', this.state.arrayOfvalue);
                let index = this.state.arrayOfvalue.length - 1;
                this.setGoogleAutoComplete(index);
            }
        );
    }

    handlePlaceSelect(id, address, formattedAddress) {
        if (address) {
            this.setState(prevState => {
                let arrayOfvalue = prevState.arrayOfvalue;
                arrayOfvalue[id] = formattedAddress;

                this.interval('addresses', arrayOfvalue);

                return {
                    arrayOfvalue
                };
            });
        }
    }

    setGoogleAutoComplete(index) {
        let input = document.getElementById('addressInputId' + index);
        let autoComplete = new google.maps.places.Autocomplete(input);
        autoComplete.addListener('place_changed', () => {
            let addressObject = autoComplete.getPlace();
            let address = addressObject.address_components;
            let formattedAddress = addressObject.formatted_address;

            this.handlePlaceSelect(index, address, formattedAddress);
        });
    }

    handleLoadAutoComplete() {
        this.state.arrayOfvalue.map((value, index) => {
            let input = document.getElementById('addressInputId' + index);
            let autoComplete = new google.maps.places.Autocomplete(input);
            autoComplete.addListener('place_changed', () => {
                let addressObject = autoComplete.getPlace();
                let address = addressObject.address_components;
                let formattedAddress = addressObject.formatted_address;

                this.handlePlaceSelect(index, address, formattedAddress);
            });
        });
    }

    render() {
        return (
            <div className="cardBorder relative ">
                <div id="addressesId" className="input-field valideyn  addresses_">
                    <div>
                        <span
                            style={{
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                                position: 'absolute',
                                top: '-27px'
                            }}
                        >
                            ADDRESSES
                        </span>
                        <div className="addMoreAddress-button addMoreAddress" onClick={this.addMore}>
                            <div className="relative">
                                <span>Add More</span>
                                <i className="ikonka material-icons" style={{ left: '87px' }}>
                                    add_circle
                                </i>
                            </div>
                        </div>
                    </div>
                    <hr style={{ marginTop: '30px' }} />
                    {this.renderAddressFields()}
                    <div className="totalDistance col s12 m3 l3">
                        <span className="totalDistance_button" onClick={this.calculateDistance}>
                            Calculate Total Distance
                        </span>
                        <span className="totalDistance_distance">{this.state.distance} mi</span>
                    </div>
                    <div className="col s12 m2 l2">
                        <PetsInfo />
                    </div>
                    <div className="clear" />
                    <Script
                        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBjRe1_nLcLGv0S6z0r2nxtEzKhqf3Ecco&libraries=places"
                        onLoad={this.handleLoadAutoComplete}
                    />
                </div>
            </div>
        );
    }
}

Addresses.propTypes = {
    updateJob: PropTypes.func
};
