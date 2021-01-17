import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

import CustomerContactInfo from './CustomerContactInfo';
import AdditionalContact from './AdditionalContact';
import WorkDate from './WorkDate';
import ArrivalWindow from './ArrivalWindow';
import TakenBy from './TakenBy';
import SourceOfLeads from './SourceOfLeads';
import Addresses from './Addresses';
import SmallItemPacking from './SmallItemPacking';
import LargeItemFee from './LargeItemFee';
import TravelFee from './TravelFee';
import Deposit from './Deposit';
import PaymentOptions from './PaymentOptions';
import DoubleDriveTime from './DoubleDriveTime';
import NumberOfUsers from './NumberOfUsers';
import MovingSize from './MovingSize';
import CompanySelector from './CompanySelector';
import JobNumber from './JobNumber';
import QuoteExpariation from './QuoteExpariation';
import CustomerPriority from './CustomerPriority';
import TempTrucks from './TempTrucks';
import NoteForCustomerService from './NoteForCustomerService';
import NoteForMovers from './NoteForMovers';
import NoteForYourMove from './NoteForYourMove';
import AdditionalInfo from './AdditionalInfo';
import Button from './Button';
import jobNumberCreator from './JobNumberCreator';
import StairsFee from './StairsFee';

export default class QuoteMainPage extends Component {
    componentDidMount() {
        Session.set('job_', {
            takenBy: Meteor.userId(),
            sourceOfLeads: 'call',
            quoteDate: new Date()
        });
        jobNumberCreator();
        Meteor.call('createBonusSettings');
    }

    clickHandle(status, email, enableButtons, sendQuote) {
        Session.set('loading', true);
        let job = Session.get('job_');
        if ((!job.email || job.email === '') && sendQuote) {
            swal({
                title: 'Email is empty',
                text: 'Please fill email before continue',
                icon: 'error'
            });
            enableButtons();
            return new Error();
        }
        job.status = status;
        sendQuote ? (job.emailSentDate = new Date()) : null;
        sendQuote ? (job.emailSent = true) : null;

        Meteor.call('quotaniBazayaElaveEt', job, err => {
            if (err) {
                console.error(err);
                enableButtons();
                swal({
                    title: 'Impossible add job to database',
                    text: err.message,
                    icon: 'error'
                });
            } else {
                Session.set('job_', {
                    takenBy: Meteor.userId(),
                    sourceOfLeads: 'call',
                    quoteDate: new Date()
                });
                jobNumberCreator();
                enableButtons();
                swal({
                    title: 'Success',
                    text: 'Job added to database successfully',
                    icon: 'success'
                }).then(() => {
                    if (email) {
                        job.emailSentDate = new Date();
                        job.emailSent = true;
                        Meteor.call('emailGonder', job, (err, res) => {
                            if (err) {
                                swal({
                                    title: 'Impossible send email to work job number: ' + job.jobNumber,
                                    text: err.message,
                                    icon: 'error'
                                });
                            } else {
                                swal({
                                    title: 'Success',
                                    text: 'Email sent to ' + job.email + ' successfully',
                                    icon: 'success'
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <CustomerContactInfo />
                </div>
                <div className="row">
                    <AdditionalContact />
                </div>
                <div className="row">
                    <div className="col s12 m6 l3">
                        <WorkDate />
                    </div>
                    <div className="col s12 m6 l3">
                        <ArrivalWindow />
                    </div>
                    <div className="col s12 m6 l3">
                        <TakenBy />
                    </div>
                    <div className="col s12 m6 l3">
                        <SourceOfLeads />
                    </div>
                </div>
                <div className="row">
                    <Addresses />
                </div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        <SmallItemPacking />
                    </div>
                    <div className="col s12 m2 l2">
                        <LargeItemFee />
                    </div>
                    <div className="col s12 m3 l3">
                        <TravelFee />
                    </div>
                    <div className="col s12 m2 l2">
                        <Deposit />
                    </div>
                    <div className="col s12 m2 l2">
                        <StairsFee />
                    </div>
                </div>
                <div className="row">
                    <PaymentOptions />
                </div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        <DoubleDriveTime />
                    </div>
                    <div className="col s12 m3 l3">
                        <NumberOfUsers />
                    </div>
                    <div className="col s12 m6 l6">
                        <MovingSize />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6 l6">
                        <CompanySelector />
                    </div>
                    <div className="col s12 m6 l6">
                        <div className="col s12 m4 l4">
                            <JobNumber />
                        </div>
                        <div className="col s12 m4 l4">
                            <QuoteExpariation />
                        </div>
                        <div className="col s12 m4 l4">
                            <CustomerPriority />
                        </div>
                    </div>
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
                <div className="center-align">
                    <Button
                        color="grey darken-1"
                        func={function(enableButtons) {
                            Session.set('job_', {
                                takenBy: Meteor.userId(),
                                sourceOfLeads: 'call',
                                quoteDate: new Date()
                            });
                            enableButtons();
                            jobNumberCreator();
                        }}
                        text="Reset"
                    />
                    <Button
                        color="green darken-1"
                        func={enableButtons => this.clickHandle('inProgress', true, enableButtons, true)}
                        text="Send quote & save"
                    />
                    <Button
                        color="yellow black-text"
                        func={enableButtons => this.clickHandle('inProgress', false, enableButtons)}
                        text="follow up"
                    />
                    <Button
                        color="blue darken-1"
                        func={enableButtons => this.clickHandle('won', false, enableButtons)}
                        text="Add To Calendar as confirmed job"
                    />
                </div>
            </div>
        );
    }
}
