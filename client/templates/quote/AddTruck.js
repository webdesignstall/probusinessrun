import React from 'react';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import WorkData from './../../../common/collections_2';
import { Tracker } from 'meteor/tracker';

export default class AddTruck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: [], //assigned trucks
            trucksBase: [] //trucks in the company base
        };

        this.renderTruckList = this.renderTruckList.bind(this);
        this.deleteTruck = this.deleteTruck.bind(this);
        this.addTruckC = this.addTruckC.bind(this);
        this.addTruckCList = this.addTruckCList.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let trucks = Session.get('job_').trucks || [];
            let trucksBase = Meteor.users.find({ 'profile.rank': 'tablet' }).fetch() || [];

            this.setState({
                trucks,
                trucksBase
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    deleteTruck(nomre) {
        let trucks = this.state.trucks;
        trucks.splice(nomre, 1);

        this.setState(
            {
                trucks
            },
            () => {
                let job = Session.get('job_');
                job.trucks = trucks;
                Session.set('job_', job);
            }
        );
    }

    addTruckC() {
        this.setState(prevState => {
            let trucks = prevState.trucks;
            trucks.push({ truck: 400 });
            return { trucks };
        });
    }

    renderTruckList() {
        return this.state.trucksBase.map(truck => {
            return (
                <option key={truck._id} value={truck.profile.number}>
                    #{truck.profile.number} - {truck.profile.size}
                </option>
            );
        });
    }

    changeHandler(e, index) {
        let value = e.target.value;
        this.setState(
            prevState => {
                let trucks = prevState.trucks;
                trucks[index].truck = value;
                return { trucks };
            },
            () => {
                let job = Session.get('job_');
                job.trucks = this.state.trucks;

                Session.set('job_', job);
            }
        );
    }

    addTruckCList() {
        return this.state.trucks.map((truck, index) => {
            return (
                <div id={'trucksAssigned' + index} key={'trucksAssigned' + index} className="input-field col s6 m6 l6 valideyn">
                    <select
                        ref={selected => (this.selected = selected)}
                        onChange={e => this.changeHandler(e, index)}
                        className="browser-default truck-select col s10 m10 l10"
                        value={truck.truck < 100 ? truck.truck : 'no_truck'}>
                        <option value="no_truck" disabled={true}>
                            Choose truck size
                        </option>
                        {this.renderTruckList()}
                    </select>
                    <i className="material-icons isare col s2 m2 l2 truck-delete" onClick={() => this.deleteTruck(index)}>
                        delete_forever
                    </i>
                </div>
            );
        });
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
