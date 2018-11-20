import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';

export default class TempTrucks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: this.props.update,
            tracks: [],
            clicked: []
        };

        this.addClicked = this.addClicked.bind(this);
    }

    componentWillMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('tabletData');
            const tablets = Meteor.users.find({ 'profile.company': Meteor.userId(), 'profile.rank': 'tablet' }).fetch();
            let secilmisIs = null;

            if (this.state.update) {
                let isinOzu = Session.get('is');
                secilmisIs = WorkData.findOne({ _id: isinOzu });
            }

            if (secilmisIs) {
                this.setState({
                    clicked: secilmisIs.trucksTemp
                });
            }

            this.setState({
                tracks: tablets
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    addClicked(melumat) {
        let baza = this.state.clicked;
        let indexi = baza.indexOf(melumat);
        if (indexi === -1) {
            baza.push(melumat);
            this.setState({
                clicked: baza
            }, () => {
                Session.set('trucklar', baza);
            });
        } else {
            baza.splice(indexi, 1);
            this.setState({
                clicked: baza
            }, () => {
                Session.set('trucklar', baza);
            });
        }
    }

    renderTrauckNames() {
        return (
            this.state.tracks.map((truck) => {
                return (<a className={this.state.clicked.indexOf(truck._id) > -1 ? 'goy' : ''} key={truck._id} href="#" onClick={() => this.addClicked(truck._id)} >Truck #{truck.profile.number} {truck.profile.size}</a>);
            })
        );
    }

    render() {
        return (
            <div>
                {this.renderTrauckNames()}
            </div>
        );
    }
}