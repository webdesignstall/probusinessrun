import React, { Component } from 'react';
import { Session } from 'meteor/session';

import CustomerContactInfo from '../CustomerContactInfo';
import AdditionalContact from '../AdditionalContact';
import WorkDate from '../WorkDate';
import TakenBy from '../TakenBy';
import QuoteExpiration from '../QuoteExpariation';
import Addresses from '../Addresses';
import ArrivalWindow from '../ArrivalWindow';
import SmallItemPacking from '../SmallItemPacking';
import LargeItemFee from '../LargeItemFee';
import TravelFee from '../TravelFee';
import Deposit from '../Deposit';
import PaymentOptions from '../PaymentOptions';
import CompanySelector from '../CompanySelector';
import MovingSize from '../MovingSize';
import DoubleDriveTime from '../DoubleDriveTime';
import NumberOfUsers from '../NumberOfUsers';
import JobStatus from '../JobStatus';
import TempTrucks from '../TempTrucks';
import RenderEmployees from '../RenderEmployees';
import AddTruck from '../AddTruck';
import NoteForCustomerService from '../NoteForCustomerService';
import NoteForMovers from '../NoteForMovers';
import NoteForYourMove from '../NoteForYourMove';
import Button from '../Button';
import AdditionalInfo from '../AdditionalInfo';
import { Meteor } from 'meteor/meteor';
import Alert from '../../../../imports/alertMessage/Alert';
import WorkData from '../../../../common/collections_2';
import NewAppointment from '../NewAppointment';

/*global moment*/

export default class EditCalendarQuote extends Component {
    save(enableButtons) {
        let job = Session.get('job_');

        Meteor.call('updateWork', job, err => {
            if (err) {
                console.error(err);
                Alert('error', 'Can\'t save information');
                enableButtons();
            } else {
                Alert('success', 'Information saved successfully');
                enableButtons();

                let isler = document.getElementsByClassName('work-list-show');
                let i = 0;

                for (i; i < isler.length; i++) {
                    let moverIndigator = isler[i].getElementsByClassName('mover--status')[0];
                    let truckIndigator = isler[i].getElementsByClassName('truck--status')[0];
                    let id = isler[i].id;
                    if (id !== '' && id !== null && id !== undefined) {
                        let is = WorkData.findOne({ _id: id });
                        let shouldSelectMovers = is.numberOfWorkers || 0;
                        let shouldSelectTrucks = (is.trucksTemp && is.trucksTemp.length) || 0;
                        let selectedMovers = (is.workers && is.workers.length) || 0;
                        let selectedTruck = (is.trucks && is.trucks.length) || 0;

                        truckIndigator.classList.remove('sari');
                        truckIndigator.classList.remove('qirmizi');
                        truckIndigator.classList.remove('yasil');
                        moverIndigator.classList.remove('sari');
                        moverIndigator.classList.remove('qirmizi');
                        moverIndigator.classList.remove('yasil');

                        selectedMovers < shouldSelectMovers && selectedMovers > 0
                            ? moverIndigator.classList.add('sari')
                            : selectedMovers === shouldSelectMovers && selectedMovers > 0
                                ? moverIndigator.classList.add('yasil')
                                : selectedMovers > shouldSelectMovers && shouldSelectMovers === 0
                                    ? moverIndigator.classList.add('yasil')
                                    : null;
                        selectedTruck < shouldSelectTrucks && selectedTruck > 0
                            ? truckIndigator.classList.add('sari')
                            : selectedTruck === shouldSelectTrucks && selectedTruck > 0
                                ? truckIndigator.classList.add('yasil')
                                : selectedTruck > shouldSelectTrucks && shouldSelectTrucks === 0
                                    ? truckIndigator.classList.add('yasil')
                                    : null;
                    }
                }
            }
        });
    }

    resendQuote(enableButtons) {
        let job = Session.get('job_');

        Meteor.call('emailGonder', job, err => {
            if (err) {
                console.error(err);
                Alert('error', 'Can\'t send quote');
                enableButtons();
            } else {
                Alert('success', 'Quote sent successfully');
                enableButtons();
            }
        });
    }

    resendConfirmation(enableButtons) {
        let job = Session.get('job_');

        Meteor.call('confirmationGonder', job, err => {
            if (err) {
                console.error(err);
                Alert('error', 'Can\'t send confirmation');
                enableButtons();
            } else {
                Alert('success', 'Confirmation sent successfully');
                enableButtons();
            }
        });
    }

    forSupervisor(enableButtons) {
        let job = Session.get('job_');

        Meteor.call('supervisorEmail', job, err => {
            if (err) {
                console.error(err);
                Alert('error', 'Can\'t send email to supervisor');
                enableButtons();
            } else {
                Alert('success', 'Email sent to supervisor successfully');
                enableButtons();
            }
        });
    }

    render() {
        let { quoteDate, jobNumber } = Session.get('job_');
        return (
            <div>
                <div className="row">
                    <CustomerContactInfo />
                </div>
                <div className="row">
                    <AdditionalContact />
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <WorkDate />
                    </div>
                    <div className="col s12 m4 l4">
                        <TakenBy />
                    </div>
                    <div className="col s12 m4 l4">
                        <QuoteExpiration />
                    </div>
                </div>
                <div className="row">
                    <Addresses />
                </div>
                <div className="row">
                    <div className="col s12 m6 l6">
                        <ArrivalWindow />
                    </div>
                    <div className="col s12 m6 l6">
                        <div className="col s12 m6 l6">
                            <SmallItemPacking />
                        </div>
                        <div className="col s12 m6 l6">
                            <LargeItemFee />
                        </div>
                        <div className="col s12 m6 l6">
                            <TravelFee />
                        </div>
                        <div className="col s12 m6 l6">
                            <Deposit />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <PaymentOptions />
                </div>
                <div className="row">
                    <div className="col s12 m4 l4">
                        <CompanySelector />
                    </div>
                    <div className="col s12 m4 l4">
                        <MovingSize />
                    </div>
                    <div className="col s12 m4 l4">
                        <label htmlFor="quoteDate">First Contact Date</label>
                        <input id="quoteDate" disabled defaultValue={moment(quoteDate).format('D MMMM YYYY hh:mm a') || ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        <label htmlFor="jobNumber">Job Number</label>
                        <input id="jobNumber" disabled defaultValue={jobNumber || ''} />
                    </div>
                    <div className="col s12 m3 l3">
                        <DoubleDriveTime />
                    </div>
                    <div className="col s12 m3 l3">
                        <NumberOfUsers />
                    </div>
                    <div className="col s12 m3 l3">
                        <JobStatus />
                    </div>
                </div>
                <div className="row">
                    <TempTrucks />
                </div>
                <div className="iscilerin-siyahisi row">
                    <div className="basliq">ASSIGN MOVERS</div>
                    <div id="iscilerinSiyahisiRender">
                        <RenderEmployees />
                    </div>
                </div>
                <div className="row">
                    <AddTruck />
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
                <div className="row center-align">
                    <Button text="Save" disable={true} color="" func={this.save} />
                    <Button text="Resend Quote" disable={true} color="orange darken-2" func={this.resendQuote} />
                    <Button text="Resend Confirmation" disable={true} color="orange darken-2" func={this.resendConfirmation} />
                    <Button text="For Supervasior" disable={true} color="red darken-1" func={this.forSupervisor} />
                    <NewAppointment />
                </div>
            </div>
        );
    }
}
