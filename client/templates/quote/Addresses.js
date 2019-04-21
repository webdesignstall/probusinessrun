import React from 'react';
import { Tracker } from 'meteor/tracker';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

export default class Addresses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfvalue: ['', ''],
        };

        this.renderAddressFields = this.renderAddressFields.bind(this);
        this.addMore = this.addMore.bind(this);
        this.resetComponent = this.resetComponent.bind(this);
        // this.inputChangeHandler = this.inputChangeHandler.bind(this)
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            let isId = Session.get('is');
            let isInfo = WorkData.findOne(isId);

            Session.get('reset') ? this.resetComponent() : null;

            isInfo && isInfo.addresses.length > 0
                ? this.setState({ arrayOfvalue: isInfo.addresses }, () => {
                    this.props.updateJob &&
                          this.props.updateJob({
                              addresses: this.state.arrayOfvalue,
                          });
                })
                : this.setState({
                    arrayOfvalue: ['', ''],
                });
        });
    }

    resetComponent() {
        this.setState(
            {
                arrayOfvalue: ['', ''],
            },
            () => {
                this.props.updateJob &&
                    this.props.updateJob({
                        addresses: this.state.arrayOfvalue,
                    });
            },
        );
        // this.forceUpdate();
    }

    componentWillUnmount() {
        this.x.stop();
    }

    inputChangeHandler(i) {
        let arrayOfvalue = [...this.state.arrayOfvalue];
        arrayOfvalue[i] = event.target.value;
        this.setState({ arrayOfvalue }, () => {
            this.props.updateJob &&
                this.props.updateJob({
                    addresses: this.state.arrayOfvalue,
                });
        });
    }

    deleteAddress(id) {
        document.getElementById(id).remove();
    }

    renderAddressFields() {
        return this.state.arrayOfvalue.map((el, i) => (
            <div key={i} id={i + '_id'} className="input-field valideyn col s12 m6 l6">
                <i className="material-icons isare">location_on</i>
                <input
                    key={i}
                    className="addresses"
                    type="text"
                    placeholder=""
                    value={this.state.arrayOfvalue[i]}
                    onChange={this.inputChangeHandler.bind(this, i)}
                />
                <i className="material-icons sag delete-address animated" onClick={() => this.deleteAddress(i + '_id')}>
                    delete_forever
                </i>
                <label className="active" htmlFor="movingFrom">
                    {'Address #' + (i + 1)}
                </label>
            </div>
        ));
    }
    // add functionality to the multi address
    addMore() {
        this.setState(
            prevState => ({
                arrayOfvalue: [...prevState.arrayOfvalue, ''],
            }),
            () => {
                this.props.updateJob &&
                    this.props.updateJob({
                        addresses: this.state.arrayOfvalue,
                    });
            },
        );
    }

    render() {
        return (
            <div className="addresses">
                <div>
                    <span
                        style={{
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            position: 'absolute',
                            top: '-27px',
                        }}>
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
            </div>
        );
    }
}

Addresses.propTypes = {
    updateJob: PropTypes.func,
};
