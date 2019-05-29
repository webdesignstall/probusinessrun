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
// import UpdateArrivalTime from './UpdateArrivalTime';
import UpdateDoubleDrive from './UpdateDoubleDrive';
import TempTruck from './TempTrucks';
import Addresses from './Addresses';
import TakenBy from './TakenBy';
import ArrivalWindow from './ArrivalWindow';
import AdditionalContact from './AdditionalContact';
import QuoteExpiration from './QuoteExpariation';

/*global $, moment*/

export default class QuoteTam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baza: []
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            // Meteor.subscribe('workSchema');
            const melumatlar = WorkData.find({
                quote: true,
                isFollowUp: true
            }).fetch();
            this.setState({
                baza: melumatlar
            });
        });
    }

    setWorkId(id, additionalContacts) {
        console.log('Bura render oldu');
        document.querySelector('#quoteTam').classList.add('hide');
        Session.set('is', id);
        Session.set('additionalContacts', additionalContacts);
        let x = WorkData.findOne({ _id: Session.get('is') });
        document.querySelector('#updateQuote2').classList.remove('hide');
        ReactDOM.render(
            <UpdateAddTruck />,
            document.querySelector('#truck-list-update')
        );
        ReactDOM.render(
            <ArrivalWindow update={true} />,
            document.getElementById('update_time_window')
        );
        ReactDOM.render(
            <NumberOfUsers />,
            document.getElementById('number-of-movers2')
        );
        ReactDOM.render(<MovingSize />, document.getElementById('moving-size'));
        ReactDOM.render(
            <UpdateDoubleDrive />,
            document.getElementById('double-drive-time-update')
        );
        ReactDOM.render(
            <RenderEmployees />,
            document.getElementById('iscilerinSiyahisiRender')
        );
        ReactDOM.render(
            <TempTruck update={true} />,
            document.querySelector('#tempTruckUpdate')
        );
        ReactDOM.render(
            <Addresses />,
            document.querySelector('#addressesIdUpdate')
        );
        ReactDOM.render(
            <QuoteExpiration />,
            document.querySelector('#quoteExpireDateUpdate')
        );
        ReactDOM.render(
            <AdditionalContact contacts={x.additionalContacts} />,
            document.querySelector('#additional-contact-update')
        );
        let takenById = x.takenBy;
        ReactDOM.render(
            <TakenBy id={takenById} update={true} />,
            document.getElementById('takenBy--update')
        );
        $(document).ready(function() {
            $('select').material_select();
        });
        let jobSmallItemPacking = WorkData.findOne({ _id: Session.get('is') })
            .smallItemPacking;
        jobSmallItemPacking == -1
            ? ((document.getElementById('smallItemPackUpdate').checked = true),
            (document.getElementById('small_item_pack_2').disabled = true))
            : (document.getElementById('smallItemPackUpdate').checked = false);

        $('#quote-date-picker_2').datepicker();
        $(function() {
            $('#quote-date-picker_2').datepicker('setDate', x.workDate);
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderQuotes() {
        return this.state.baza.map(quotes => {
            return (
                <a
                    key={quotes._id}
                    href="#"
                    className="collection-item"
                    onClick={() =>
                        this.setWorkId(quotes._id, quotes.additionalContacts)
                    }>
                    <span className="tarix-in-list">{quotes.workDate}</span>
                    <span className="tarix-in-list green">
                        {quotes.jobNumber}
                    </span>
                    <span>
                        {quotes.clientFirstName} {quotes.clientLastName}
                    </span>
                    <span
                        className="tarix-in-list sag deep-purple darken-1"
                        style={{
                            padding: '3px 10px 2px',
                            marginTop: '-2px',
                            borderRadius: '15px'
                        }}>
                        {moment(quotes.quoteDate).format('MM/DD/YYYY hh:mm a')}
                    </span>
                </a>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="collection">{this.renderQuotes()}</div>
            </div>
        );
    }
}

Template.quoteTam.onRendered(function() {
    ReactDOM.render(<QuoteTam />, document.getElementById('quoteTam'));
});
