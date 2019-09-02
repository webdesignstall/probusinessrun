import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import AdditionalContacts from '../../../client/templates/quote/AdditionalContact';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
import ArrivalWindow from '../../../client/templates/quote/ArrivalWindow';
import Addresses from '../../../client/templates/quote/Addresses';
import PaymentOptions from './PaymentOptions';
import TempTrucks from '../../../client/templates/quote/TempTrucks';
import FollowUps from './FollowUps';
import FinalNote from './FinalNote';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import MovingSize from '../../../client/templates/quote/MovingSize';
import QuoteExpiration from '../../../client/templates/quote/QuoteExpariation';
import TakenBy from '../../../client/templates/quote/TakenBy';
import CompanySelector from '../../../client/templates/quote/CompanySelector';
import NumberOfUsers from '../../../client/templates/quote/NumberOfUsers';
import NewAppointment from '../../../client/templates/quote/NewAppointment';
import AdditionalInfo from '../../../client/templates/quote/AdditionalInfo';

import UpdateList from './UpdateList';

/*global $ moment*/

export default class ExtendedJobInformation extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            job: {}
        };

        this.smallItemCheck = React.createRef();

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.sendQuote = this.sendQuote.bind(this);
        this.gasFeeClickHandler = this.gasFeeClickHandler.bind(this);
    }

    workData(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    updateJob(obj) {
        let oldInfo = this.state.job;
        oldInfo.workDate = document.getElementById('quote-date-picker-followup').value;
        let job = Object.assign(oldInfo, obj);

        this.setState({
            job
        });
    }

    UNSAFE_componentWillMount() {
        this.props.loading();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            job: this.workData(nextProps.job._id)[0]
        });
    }

    componentDidMount() {
        let job = this.workData(this.props.job._id)[0];
        this.setState(
            {
                job
            },
            () => this.datePicker(this.state.job.workDate)
        );

        Session.set('companyInfo', job.companyInfo);

        // small item packing
        let element = document.getElementById('small_item_pack_followup' + this.state.job._id);
        element
            ? this.state.job.smallItemPacking == -1
                ? ((document.getElementById('small_item_pack_followup_check' + this.state.job._id).checked = true),
                (element.disabled = true))
                : ((document.getElementById('small_item_pack_followup_check' + this.state.job._id).checked = false),
                (element.disabled = false))
            : null;
        this.props.loading();
    }

    componentDidUpdate() {
        this.datePicker(this.state.job.workDate);
        // small item packing

        let element = document.getElementById('small_item_pack_followup' + this.state.job._id);
        document.getElementById('small_item_pack_followup_check' + this.state.job._id)
            ? this.state.job.smallItemPacking == -1
                ? ((document.getElementById('small_item_pack_followup_check' + this.state.job._id).checked = true),
                (element.disabled = true))
                : ((document.getElementById('small_item_pack_followup_check' + this.state.job._id).checked = false),
                (element.disabled = false))
            : null;
    }

    doubleDrive(value) {
        return (
            <React.Fragment>
                <label className="active" htmlFor="double_drive_time_followup">
                    Double Drive Time
                </label>
                <select
                    onChange={e => this.onChangeHandler(e, 'doubleDrive')}
                    className="browser-default"
                    name="double drive time"
                    id="double_drive_time_followup"
                    value={value || 'false'}>
                    <option value="false" disabled>
                        Select double drive
                    </option>
                    <option value="waived">No</option>
                    <option value="yes">Yes</option>
                    <option value="notSure">Not Sure</option>
                </select>
            </React.Fragment>
        );
    }

    datePicker(date) {
        $('#quote-date-picker-followup').datepicker();
        $(function() {
            $('#quote-date-picker-followup').datepicker('setDate', new Date(date));
        });
    }

    onChangeHandler(e, what) {
        let workDate = document.getElementById('quote-date-picker-followup').value;
        let job = this.state.job;
        job.workDate = workDate;
        let value = '';
        let regex = new RegExp(/^\d+$/);
        if (what === 'phoneNumber' || what === 'phoneAdditional') {
            if (regex.test(e.target.value)) {
                value = e.target.value;

                job[what] = value;

                this.setState({
                    job
                });
            }
        } else {
            value = e.target.value;
            job[what] = value;

            this.setState({
                job
            });
        }
    }

    jobStatus(status) {
        let color = '#A1A7A7';

        switch (this.state.job.status) {
        case 'inProgress':
            color = '#ffd32a';
            break;
        case 'won':
            color = '#4cd137';
            break;
        case 'lost':
            color = '#e84118';
            break;
        case 'cancelled':
            color = '#bdc3c7';
            break;
        default:
            color = '#F17721';
        }

        return (
            <React.Fragment>
                <label className="active" htmlFor="jobStatus_followup">
                    Status <span style={{ color: color }}>&#9673;</span>
                </label>
                <select
                    onChange={e => this.onChangeHandler(e, 'status')}
                    className="browser-default"
                    name="jobStatus"
                    id="jobStatus_followup"
                    value={status}>
                    <option value="inProgress">In Progress</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </React.Fragment>
        );
    }

    gasFeeClickHandler() {
        let job = this.state.job;
        job.gasFee = job.gasFee < 0 ? 0 : -0.01;

        this.setState({
            job
        });
    }

    saveJob() {
        Session.set('loading', true);
        let workDate = document.getElementById('quote-date-picker-followup').value;
        workDate = moment(workDate).format('MM/DD/YYYY');
        let doc = this.state.job;
        doc.workDate = workDate;
        doc.followUp && doc.followUp.length > 0 && doc.followUp[doc.followUp.length - 1].note === '' && doc.followUp.pop();
        doc.companyInfo = Session.get('companyInfo');
        doc.numberOfWorkers = Number(document.querySelector('#iscinin-sayi').value);
        doc.additionalInfo = Session.get('additionalInfo');

        // doc.ip = Session.get('ip');
        delete doc.quoteExpirationDate;

        // let ip = '';
        // getUserIP().then(ip_ => ((ip = ip_), console.log(ip)));

        // doc.ip = ip;

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
                // Session.set('is', ''),
                // Session.set('ExtendedJobInformation', ''),
                Session.set('loading', false));
        });
    }

    sendQuote() {
        if (!confirm('Are you sure to send quote email to customer?')) {
            throw new Error('Email doesn\'t send to customer');
        }

        let workDate = document.getElementById('quote-date-picker-followup').value;
        let doc = this.state.job;
        doc.workDate = workDate;
        doc.quote = true;
        doc.isFollowUp = true;
        doc.confirmed = false;
        doc.followUp && doc.followUp.length > 0 && doc.followUp[doc.followUp.length - 1].note === '' && doc.followUp.pop();
        doc.emailSent = true;
        doc.emailSentDate = new Date();
        doc.additionalInfo = Session.get('additionalInfo');

        let objNew = {
            _id: doc._id,
            firstName: doc.clientFirstName,
            lastName: doc.clientLastName,
            phone: doc.phoneNumber,
            phoneAdditional: doc.phoneAdditional,
            email: doc.email,
            addresses: doc.addresses,
            movingDateConverted: doc.workDate,
            workMustBeginTime: doc.workMustBeginTime,
            price: doc.price,
            minimumLaborTime: doc.laborTime,
            hourlyRatesCash: doc.hourlyRatesCash,
            hourlyRatesCard: doc.hourlyRatesCard,
            companyInfo: doc.companyInfo,
            doubleDrive: doc.doubleDrive,
            gasFee: doc.gasFee,
            smallPackingItems: doc.smallItemPacking,
            largeItemFee: doc.largeItemFee,
            movingSize: doc.movingSize,
            trucksTemp: doc.trucksTemp,
            flatRate: doc.flatRate[0].isTrue,
            flatRateCash: doc.flatRate[0].cashAmount,
            flatRateCard: doc.flatRate[0].cardAmount,
            jobNumber: doc.jobNumber,
            numberOfWorkers: doc.numberOfWorkers,
            additionalContacts: doc.additionalContacts,
            emailSent: true,
            additionalInfo: doc.additionalInfo,
            noteForYourMove: doc.noteForYourMove
        };

        let ip = '';
        // ip = getUserIP();
        doc.ip = ip;

        Meteor.call('updateWork', doc, err => {
            if (err) {
                swal({
                    title: 'Error!',
                    text: 'Something went wrong. Can\'t send quote email. Reason: ' + err.message,
                    icon: 'error',
                    button: 'OK'
                });
                Session.set('loading', false);
            } else {
                Meteor.call('emailGonder', objNew, err => {
                    err
                        ? (console.error(err),
                        swal({
                            title: 'Error!',
                            text: 'Something went wrong. Can\'t send quote email. Reason: ' + err.message,
                            icon: 'error',
                            button: 'OK'
                        }),
                        Session.set('loading', false))
                        : (swal({
                            title: 'Success!',
                            text: 'Quote sent successfully',
                            icon: 'success',
                            button: 'OK'
                        }),
                        Session.set('is', ''),
                        Session.set('ExtendedJobInformation', ''));
                });
            }
        });
    }

    render() {
        return (
            <div className={Session.get('ExtendedJobInformation') === this.state.job._id ? 'row' : 'hide'}>
                <hr />
                CONTACT INFORMATION <br />
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="first_name_followUp">
                        First Name
                    </label>
                    <input
                        onChange={e => this.onChangeHandler(e, 'clientFirstName')}
                        type="text"
                        id="first_name_followUp"
                        value={this.state.job.clientFirstName || ''}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="last_name_followUp">
                        Last Name
                    </label>
                    <input
                        onChange={e => this.onChangeHandler(e, 'clientLastName')}
                        type="text"
                        id="last_name_followUp"
                        value={this.state.job.clientLastName || ''}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="phone_number_followUp">
                        Phone Number
                    </label>
                    <input
                        onChange={e => this.onChangeHandler(e, 'phoneNumber')}
                        type="text"
                        id="phone_number_followUp"
                        value={this.state.job.phoneNumber || ''}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="additional_phone_number_followUp">
                        Additional Phone
                    </label>
                    <input
                        onChange={e => this.onChangeHandler(e, 'phoneAdditional')}
                        type="text"
                        id="additional_phone_number_followUp"
                        value={this.state.job.phoneAdditional || ''}
                    />
                </div>
                <div className="col s12 m4 l4">
                    <label className="active" htmlFor="email_followUp">
                        E-mail
                    </label>
                    <input
                        onChange={e => this.onChangeHandler(e, 'email')}
                        type="email"
                        id="email_followUp"
                        value={this.state.job.email || ''}
                    />
                </div>
                <div className="col s12 m12 l12">
                    <AdditionalContacts updateJob={this.updateJob} contacts={this.state.job.additionalContacts || []} />
                </div>
                <div className="clear padding5px" />
                <div className="row">
                    MOVING INFORMATION <br />
                    <div id="moving-time--followup" className="input-field valideyn col s12 m3 l3">
                        <ArrivalWindow update={true} updateJob={this.updateJob} />
                    </div>
                    <div className="col s12 m6 l2">
                        <label className="active" htmlFor="quote-date-picker-followup">
                            Moving Date
                        </label>
                        <input
                            onChange={e => this.onChangeHandler(e, 'workDate')}
                            id="quote-date-picker-followup"
                            className="xx"
                            type="text"
                            placeholder=""
                            value={this.state.job.workDate || ''}
                        />
                    </div>
                    <div className="col s12 m3 l3">
                        <label className="active" htmlFor={'first_contact_date_followup' + Session.get('is')}>
                            First Contact Date
                        </label>
                        <input
                            type="text"
                            id={'first_contact_date_followup' + Session.get('is')}
                            disabled={true}
                            value={moment(new Date(this.state.job.quoteDate)).format('D MMMM YYYY hh:mm a') || ''}
                        />
                    </div>
                    <div className="col s12 m3 l2">
                        <label className="active" htmlFor={'job_number_followup' + Session.get('is')}>
                            Job Number
                        </label>
                        <input
                            disabled={true}
                            type="text"
                            id={'job_number_followup' + Session.get('is')}
                            value={this.state.job.jobNumber || ''}
                        />
                    </div>
                    <div className="col s12 m3 l2">
                        <label className="active" htmlFor="source_of_leads_followup">
                            Source of Leads
                        </label>
                        <select
                            className="browser-default"
                            onChange={e => this.onChangeHandler(e, 'sourceOfLeads')}
                            value={this.state.job.sourceOfLeads}
                            name="source_of_leads_followup"
                            id="source_of_leads_followup">
                            <option value="call">Call</option>
                            <option value="e-mail">Email</option>
                            <option value="yelp">Yelp</option>
                            <option value="thumbtack">Thumbtack</option>
                            <option value="text">Text</option>
                            <option value="groupon">Groupon</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="col s12 m12 l12">
                        <div className="cardBorder relative">
                            <div id={'addresses_followup' + this.state.job._id} className="input-field valideyn">
                                <Addresses updateJob={this.updateJob} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 l2">
                            <label className="active" htmlFor={'small_item_pack_followup_check' + this.state.job._id}>
                                Small item packing
                                <i className="lime-text lighten-5 black">
                                    [Yes
                                    <input
                                        id={'small_item_pack_followup_check' + this.state.job._id}
                                        type="checkbox"
                                        ref={this.smallItemCheck}
                                        onClick={() => {
                                            let element = document.getElementById(
                                                'small_item_pack_followup' + this.state.job._id
                                            );
                                            element.value == -1 ? (element.value = '') : (element.value = -1);
                                            element.disabled = !element.disabled;

                                            let job = this.state.job;
                                            job.smallItemPacking = element.value;
                                            this.setState({
                                                job
                                            });
                                        }}
                                    />
                                    ]
                                </i>
                            </label>
                            <input
                                onChange={e => this.onChangeHandler(e, 'smallItemPacking')}
                                id={'small_item_pack_followup' + this.state.job._id}
                                className="xx"
                                type="number"
                                value={this.state.job.smallItemPacking || ''}
                                placeholder="0"
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label className="active" htmlFor={'large_item_fee_followup' + Session.get('is')}>
                                Large Item Fee
                            </label>
                            <input
                                onChange={e => this.onChangeHandler(e, 'largeItemFee')}
                                type="number"
                                id={'large_item_fee_followup' + Session.get('is')}
                                value={this.state.job.largeItemFee || ''}
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label className="active" htmlFor={'gas_fee_followup' + this.state.job._id}>
                                Travel Fee
                                <i className="lime-text lighten-5 black">
                                    [ Not sure?{' '}
                                    <input
                                        id="gas_fee_check_followup"
                                        type="checkbox"
                                        checked={this.state.job.gasFee == -0.01}
                                        onChange={this.gasFeeClickHandler}
                                    />
                                    ]
                                </i>
                            </label>
                            <input
                                onChange={e => this.onChangeHandler(e, 'gasFee')}
                                disabled={this.state.job.gasFee == -0.01}
                                id={'gas_fee_followup' + this.state.job._id}
                                value={this.state.job.gasFee || ''}
                                className="xx"
                                type="number"
                                placeholder="0"
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label className="active" htmlFor={'deposit_followup' + Session.get('is')}>
                                Deposit
                            </label>
                            <input
                                onChange={e => this.onChangeHandler(e, 'deposit')}
                                type="number"
                                id={'deposit_followup' + this.state.job._id}
                                value={this.state.job.deposit || ''}
                            />
                        </div>
                        <div className="col s12 m6 l2">{this.doubleDrive(this.state.job.doubleDrive || 'false')}</div>
                        <div className="col s12 m3 l2">{this.jobStatus(this.state.job.status)}</div>
                    </div>
                    <div className="row">
                        <PaymentOptions job={this.state.job} updateJob={this.updateJob} />
                    </div>
                    <div className="row">
                        <TempTrucks update={true} updateJob={this.updateJob} />
                    </div>
                    <div className="row">
                        <div className="col s12 m4 l4">
                            <label className="active" htmlFor="textarea2_followup">
                                Note for Customer Service
                            </label>
                            <textarea
                                style={{ height: '100px' }}
                                onChange={e => this.onChangeHandler(e, 'comment')}
                                id="textarea2_followup"
                                value={this.state.job.comment}
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="col s12 m4 l4">
                            <label className="active" htmlFor="textarea2_followup">
                                Note for Movers
                            </label>
                            <textarea
                                style={{ height: '100px' }}
                                onChange={e => this.onChangeHandler(e, 'noteForMovers')}
                                id="textarea2_followup"
                                value={this.state.job.noteForMovers}
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="col s12 m4 l4">
                            <label className="active" htmlFor="note_for_your_move_followUp">
                                Note for Your Move
                            </label>
                            <textarea
                                style={{ height: '100px' }}
                                onChange={e => this.onChangeHandler(e, 'noteForYourMove')}
                                id="note_for_your_move_followUp"
                                value={this.state.job.noteForYourMove}
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="col s12 m12 l12">
                            <AdditionalInfo />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m3 l3">
                            <label className="active">Final Note</label>
                            <FinalNote
                                finalNote={
                                    this.state.job.finalNote || {
                                        reason: '',
                                        other: false,
                                        otherNote: ''
                                    }
                                }
                                updateJob={this.updateJob}
                            />
                        </div>
                        <div className="col s12 m3 l3">
                            <label className="active">Moving Size</label>
                            <MovingSize updateJob={this.updateJob} />
                        </div>
                        <div className="col s12 m3 l3">
                            <TakenBy id={this.state.job.takenBy} update={true} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m3 l3">
                            <QuoteExpiration />
                        </div>
                        <div className="col s12 m3 l3">
                            <label htmlFor="select-company">Company</label>
                            <CompanySelector value={this.state.job.companyInfo && this.state.job.companyInfo.name} />
                        </div>
                        <div className="col s12 m3 l3">
                            <label htmlFor="select-company">Number of movers</label>
                            <NumberOfUsers />
                        </div>
                    </div>
                    <div className="row">
                        <FollowUps followUpList={this.state.job.followUp} updateJob={this.updateJob} />
                    </div>
                </div>
                <div className="clear" />
                <div className="row center-align" style={{ paddingTop: '20px' }}>
                    <a
                        className="waves-effect waves-light btn blue"
                        onClick={this.saveJob}
                        style={{ marginRight: '10px', color: 'black' }}>
                        <i className="material-icons left">update</i>
                        Update / Save
                    </a>
                    <a
                        onClick={this.sendQuote}
                        className="waves-effect waves-light btn amber"
                        style={{ marginRight: '10px', color: 'black' }}>
                        <i
                            style={{
                                color: this.state.job.quote ? '#77AB64' : '#D64F2D'
                            }}
                            className="material-icons left">
                            send
                        </i>
                        Send Quote
                    </a>
                    {this.state.job.status !== 'inProgress' ? <NewAppointment /> : ''}
                </div>
                {this.state.job.updates && this.state.job.updates.length > 0 ? (
                    <UpdateList updates={this.state.job.updates} />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

ExtendedJobInformation.propTypes = {
    job: PropTypes.object.isRequired
};
