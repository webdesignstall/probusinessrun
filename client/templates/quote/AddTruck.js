import React from 'react';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import WorkData from './../../../common/collections_2';

export default class AddTruck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: [],
            truckList: [],
            trucks: [],
            silinesi: []
        };

        this.renderTruckList = this.renderTruckList.bind(this);
        this.deleteTruck = this.deleteTruck.bind(this);
        this.addTruckC = this.addTruckC.bind(this);
        this.addTruckCList = this.addTruckCList.bind(this);
    }

    componentDidMount() {
        let truckList;
        this.setState({
            key: []
        });
        Session.set('is', '');

        truckList = Meteor.users
            .find(
                {
                    'profile.rank': 'tablet'
                },
                {
                    sort: {
                        'profile.number': 1
                    }
                }
            )
            .fetch();

        if (Session.get('is') != '') {
            const isinNomresi = Session.get('is');
            const ish = WorkData.find({ _id: isinNomresi }).fetch();
            this.setState({
                key: ish[0].trucks
            });
        }

        this.setState({
            truckList
        });
    }

    deleteTruck(nomre) {
        document.getElementById(nomre).remove();
    }

    addTruckC() {
        this.setState(prevState => {
            return { key: prevState.key.concat([new Date().getTime()]) };
        });
    }

    renderTruckList() {
        return this.state.truckList.map(truck => {
            return (
                <option key={truck._id} value={truck.profile.number}>
                    #{truck.profile.number} - {truck.profile.size}
                </option>
            );
        });
    }

    addTruckCList() {
        if (this.state.key.length > 0) {
            return this.state.key.map(key => {
                let nomre = key.toString();
                return (
                    <div id={nomre} key={key} className="input-field col s6 m6 l6 valideyn">
                        <select
                            ref={selected => (this.selected = selected)}
                            className="browser-default truck-select col s10 m10 l10"
                            defaultValue={key < 100 ? key : 'no_truck'}>
                            <option value="no_truck" disabled={true}>
                                Choose truck size
                            </option>
                            {this.renderTruckList()}
                        </select>
                        <i className="material-icons isare col s2 m2 l2 truck-delete" onClick={() => this.deleteTruck(nomre)}>
                            delete_forever
                        </i>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div id="xumba" className="valideyn col s12 m12 l12 add-truck-root">
                <div className="merkez">
                    <a className="waves-effect waves-light btn" onClick={() => this.addTruckC()}>
                        ASSIGN TRUCKS +
                    </a>
                </div>
                <div className="clear" />
                {this.addTruckCList()}
            </div>
        );
    }
}

Template.updateQuote.onDestroyed(function() {
    Session.set('is', '');
});
