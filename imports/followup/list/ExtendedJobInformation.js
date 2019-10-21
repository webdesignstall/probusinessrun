import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../../common/collections_2';
import swal from 'sweetalert';
import { Tracker } from 'meteor/tracker';

import ArrivalWindow from '../../../client/templates/quote/ArrivalWindow';
import Addresses from '../../../client/templates/quote/Addresses';
import PaymentOptions from '../../../client/templates/quote/PaymentOptions';
import TempTrucks from '../../../client/templates/quote/TempTrucks';
import FollowUps from './FollowUps';
import FinalNote from './FinalNote';
import MovingSize from '../../../client/templates/quote/MovingSize';
import QuoteExpiration from '../../../client/templates/quote/QuoteExpariation';
import TakenBy from '../../../client/templates/quote/TakenBy';
import CompanySelector from '../../../client/templates/quote/CompanySelector';
import NumberOfUsers from '../../../client/templates/quote/NumberOfUsers';
import NewAppointment from '../../../client/templates/quote/NewAppointment';
import AdditionalInfo from '../../../client/templates/quote/AdditionalInfo';
import CustomerContactInfo from '../../../client/templates/quote/CustomerContactInfo';
import AdditionalContact from '../../../client/templates/quote/AdditionalContact';
import WorkDate from '../../../client/templates/quote/WorkDate';
import SourceOfLeads from '../../../client/templates/quote/SourceOfLeads';
import SmallItemPacking from '../../../client/templates/quote/SmallItemPacking';
import LargeItemFee from '../../../client/templates/quote/LargeItemFee';
import TravelFee from '../../../client/templates/quote/TravelFee';
import Deposit from '../../../client/templates/quote/Deposit';
import DoubleDriveTime from '../../../client/templates/quote/DoubleDriveTime';
import JobStatus from '../../../client/templates/quote/JobStatus';
import NoteForCustomerService from '../../../client/templates/quote/NoteForCustomerService';
import NoteForMovers from '../../../client/templates/quote/NoteForMovers';
import NoteForYourMove from '../../../client/templates/quote/NoteForYourMove';
import Button from '../../../client/templates/quote/Button';

/*global moment*/

export default class ExtendedJobInformation extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            job: {}
        };
    }

    workData(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            this.workData(job._id);
            this.setState({
                job
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    update() {
        Session.set('loading', true);
        let doc = Session.get('job_');
        doc.followUp && doc.followUp.length > 0 && doc.followUp[doc.followUp.length - 1].note === '' && doc.followUp.pop();

        Meteor.call('updateWork', doc, err => {
            err
                ? (console.error(err),
                swal({
                    title: 'Error!',
                    text: 'Reason: ' + err.message,
                    icon: 'error',
                    button: 'OK'
                }),
                Session.set('loading', false))
                : (swal({
                    title: 'Success!',
                    text: 'Information updated successfully',
                    icon: 'success',
                    button: 'OK'
                }),
                Session.set('loading', false));
        });
    }

    sendQuote() {
        let doc = Session.get('job_');
        doc.emailSentDate = new Date();
        doc.emailSent = true;

        Meteor.call('updateWork', doc, err => {
            if (err) {
                console.error(err);
                swal({
                    title: 'Error!',
                    text: 'Unable save job info: ' + err.message,
                    icon: 'error',
                    button: 'OK'
                });
            } else {
                swal({
                    title: 'Success!',
                    text: 'Information updated successfully',
                    icon: 'success',
                    button: 'OK'
                }).then(() => {
                    Meteor.call('emailGonder', doc, err => {
                        if (err) {
                            console.error(err);
                            swal({
                                title: 'Error!',
                                text: 'Something went wrong. Can\'t send quote email. Reason: ' + err.message,
                                icon: 'error',
                                button: 'OK'
                            });
                            delete doc.emailSentDate;
                            delete doc.emailSent;
                            Meteor.call('updateWork', doc);
                        } else {
                            Session.set('loading', false);
                            swal({
                                title: 'Success!',
                                text: 'Quote sent successfully',
                                icon: 'success',
                                button: 'OK'
                            }),
                            Session.set('loading', false);
                            Session.set('job_', doc);
                        }
                    });
                });
            }
        });
    }

    render() {
        let { _id, quoteDate, jobNumber } = this.state.job;
        return (
            <div className={Session.get('ExtendedJobInformation') === _id ? 'row' : 'hide'}>
                <hr />
                CONTACT INFORMATION <br />
                <div className="row">
                    <CustomerContactInfo />
                </div>
                <div className="row">
                    <AdditionalContact />
                </div>
                <div className="row">
                    <hr />
                    MOVING INFORMATION <br />
                    <div className="col s12 m3 l3">
                        <ArrivalWindow />
                    </div>
                    <div className="col s12 m2 l2">
                        <WorkDate />
                    </div>
                    <div className="col s12 m3 l3">
                        <label htmlFor="quoteDate">First Contact Date</label>
                        <input
                            id="quoteDate"
                            disabled
                            defaultValue={(quoteDate && moment(quoteDate).format('D MMMM YYYY hh:mm a')) || ''}
                        />
                    </div>
                    <div className="col s12 m2 l2">
                        <label htmlFor="jobNumber">Job Number</label>
                        <input id="jobNumber" disabled defaultValue={jobNumber} />
                    </div>
                    <div className="col s12 m2 l2">
                        <SourceOfLeads />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <Addresses />
                </div>
                <div className="row">
                    <div className="col s12 m2 l2">
                        <SmallItemPacking />
                    </div>
                    <div className="col s12 m2 l2">
                        <LargeItemFee />
                    </div>
                    <div className="col s12 m2 l2">
                        <TravelFee />
                    </div>
                    <div className="col s12 m2 l2">
                        <Deposit />
                    </div>
                    <div className="col s12 m2 l2">
                        <DoubleDriveTime />
                    </div>
                    <div className="col s12 m2 l2">
                        <JobStatus />
                    </div>
                </div>
                <div className="row">
                    <PaymentOptions />
                </div>
                <div className="row">
                    <TempTrucks />
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <NoteForCustomerService />
                    </div>
                    <div className="col s12 m4 l4">
                        <NoteForMovers />
                    </div>
                    <div className="col s12 m4 l4">
                        <NoteForYourMove />
                    </div>
                </div>
                <div className="row">
                    <AdditionalInfo />
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <FinalNote />
                    </div>
                    <div className="col s12 m4 l4">
                        <MovingSize />
                    </div>
                    <div className="col s12 m4 l4">
                        <TakenBy />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <QuoteExpiration />
                    </div>
                    <div className="col s12 m4 l4">
                        <CompanySelector />
                    </div>
                    <div className="col s12 m4 l4">
                        <NumberOfUsers />
                    </div>
                </div>
                <div className="row">
                    <FollowUps followUpList={this.state.job.followUp} />
                </div>
                <div className="row center-align">
                    <Button func={this.update} text="Update / Save" />
                    <Button func={this.sendQuote} text="Send Quote" color="yellow darken-2 black-text" />
                    {this.state.job.status === 'won' ? <NewAppointment /> : ''}
                </div>
            </div>
        );
    }
}

ExtendedJobInformation.propTypes = {
    job: PropTypes.object.isRequired
};
