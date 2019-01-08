import React from 'react';
import { Tracker } from 'meteor/tracker';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class Addresses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfvalue: ['', '']
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

            isInfo && isInfo.addresses.length > 0
                ? this.setState({ arrayOfvalue: isInfo.addresses })
                : null;
        });
    }

    resetComponent() {
        this.setState({
            arrayOfvalue: ['', '']
        });
        // this.forceUpdate();
    }

    componentWillUnmount() {
        this.x.stop();
    }

    inputChangeHandler(i) {
        let arrayOfvalue = [...this.state.arrayOfvalue];
        arrayOfvalue[i] = event.target.value;
        this.setState({ arrayOfvalue });
    }

    deleteAddress(id) {
        document.getElementById(id).remove();
    }

    renderAddressFields() {
        return (
            this.state.arrayOfvalue.map((el, i) =>
                <div key={i} id={i + '_id'} className="input-field valideyn col s12 m6 l6">
                    <i className="material-icons isare">location_on</i>
                    <input key={i} className="addresses" type="text" placeholder="" value={this.state.arrayOfvalue[i]} onChange={this.inputChangeHandler.bind(this, i)} />
                    <i className="material-icons sag delete-address animated" onClick={() => this.deleteAddress(i + '_id')}>delete_forever</i>
                    <label className="active" htmlFor="movingFrom">{'Address #' + (i + 1)}</label>
                </div>
            )
        );
    }
    // add functionality to the multi address 
    addMore() {
        this.setState(prevState => ({
            arrayOfvalue: [...prevState.arrayOfvalue, '']
        }));
    }

    render() {
        return (
            <div>
                <div>
                    Addresses
                    <div className="addMoreAddress cardBorder" onClick={this.addMore}>
                        <div className="relative">
                            <span>Add More</span>
                            <i className="ikonka material-icons">
                                add_circle
                            </i>
                        </div>
                    </div>
                </div>
                <hr />
                {this.renderAddressFields()}
            </div>
        );
    }
}
