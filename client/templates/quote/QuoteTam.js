import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import WorkData from './../../../common/collections_2';
import MovingSize from './MovingSize';
import NumberOfUsers from './NumberOfUsers';
import RenderEmployees from './RenderEmployees';
import UpdateAddTruck from './UpdateAddTruck';
import UpdateArrivalTime from './UpdateArrivalTime';
import UpdateDoubleDrive from './UpdateDoubleDrive';
import TempTruck from './TempTrucks';
import Addresses from './Addresses';


export default class QuoteTam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baza: []
        };
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            const melumatlar = WorkData.find({ quote: true }).fetch();
            this.setState({
                baza: melumatlar
            });
            console.log(melumatlar);

        });
    }

    setWorkId(id) {
        document.querySelector('#quoteTam').classList.add('hide');
        Session.set('is', id);
        document.querySelector('#updateQuote2').classList.remove('hide');
        ReactDOM.render(<UpdateAddTruck />, document.querySelector('#truck-list-update'));
        ReactDOM.render(<UpdateArrivalTime />, document.getElementById('update_time_window'));
        ReactDOM.render(<NumberOfUsers />, document.getElementById('number-of-movers2'));
        ReactDOM.render(<MovingSize />, document.getElementById('moving-size'));
        ReactDOM.render(<UpdateDoubleDrive />, document.getElementById('double-drive-time-update'));
        ReactDOM.render(<RenderEmployees />, document.getElementById('iscilerinSiyahisiRender'));
        ReactDOM.render(<TempTruck update={true} />, document.querySelector('#tempTruckUpdate'))
        ReactDOM.render(<Addresses />, document.querySelector('#addressesIdUpdate'))
        $(document).ready(function () {
            $('select').material_select();
        });
        let jobSmallItemPacking = WorkData.findOne({ _id: Session.get('is') }).smallItemPacking;
        jobSmallItemPacking == -1
            ? (
                document.getElementById('smallItemPackUpdate').checked = true,
                document.getElementById('small_item_pack_2').disabled = true
            )
            : document.getElementById('smallItemPackUpdate').checked = false;
    }

    renderQuotes() {
        return (
            this.state.baza.map((quotes) => {
                return (
                    <a key={quotes._id} href="#" className="collection-item" onClick={() => this.setWorkId(quotes._id)}>
                        <span className="tarix-in-list">{quotes.workDate}</span>
                        <span className="tarix-in-list green">{quotes.jobNumber}</span>
                        <span>{quotes.clientFirstName} {quotes.clientLastName}</span>
                    </a>
                );
            })
        );
    }

    render() {
        return (
            <div>
                <div className="collection">
                    {this.renderQuotes()}
                </div>
            </div>
        );
    }
}

Template.quoteTam.onRendered(function () {
    ReactDOM.render(<QuoteTam />, document.getElementById('quoteTam'));
});
