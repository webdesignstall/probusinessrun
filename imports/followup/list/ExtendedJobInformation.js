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

/*global $ moment*/

export default class ExtendedJobInformation extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
        };

        this.smallItemCheck = React.createRef();

        this.changeStatus = this.changeStatus.bind(this);
    }

    workData(id) {
        return WorkData.find({ _id: id }).fetch();
    }

    componentDidMount() {
        let job = this.workData(this.props.job._id)[0];
        this.setState({
            job,
        });

        this.datePicker();

        // small item packing
        let element = document.getElementById('small_item_pack_followup' + this.state.job._id);
        this.state.job.smallItemPacking == -1
            ? ((document.getElementById(
                'small_item_pack_followup_check' + this.state.job._id,
            ).checked = true),
                (element.disabled = true))
            : ((document.getElementById(
                'small_item_pack_followup_check' + this.state.job._id,
            ).checked = false),
                (element.disabled = false));

        // gas fee
        if (this.state.job.gasFee == -0.01) {
            document.getElementById('gas_fee_check_followup').checked = true;
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).disabled = true;
        } else {
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).disabled = false;
            document.getElementById('gas_fee_check_followup').checked = false;
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).value = 0;
        }
    }

    componentDidUpdate() {
        this.datePicker();

        // small item packing

        let element = document.getElementById('small_item_pack_followup' + this.state.job._id);
        this.state.job.smallItemPacking == -1
            ? ((document.getElementById(
                'small_item_pack_followup_check' + this.state.job._id,
            ).checked = true),
                (element.disabled = true))
            : ((document.getElementById(
                'small_item_pack_followup_check' + this.state.job._id,
            ).checked = false),
                (element.disabled = false));

        // gas fee
        if (this.state.job.gasFee == -0.01) {
            document.getElementById('gas_fee_check_followup').checked = true;
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).disabled = true;
        } else {
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).disabled = false;
            document.getElementById('gas_fee_check_followup').checked = false;
            document.getElementById('gas_fee_followup' + this.state.job.gasFee).value = 0;
        }
    }

    doubleDrive(value) {
        return (
            <React.Fragment>
                <label className="active" htmlFor="double_drive_time_followup">
                    Double Drive Time
                </label>
                <select
                    className="browser-default"
                    name="double drive time"
                    id="double_drive_time_followup"
                    value={value || false}>
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

    datePicker() {
        $('#quote-date-picker-followup').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false, // Close upon selecting a date,
        });
    }

    changeStatus(e, what) {
        let job = this.state.job;
        job[what] = e.target.value;
        this.setState({
            job,
        });
    }

    jobStatus(status) {
        let color = '#A1A7A7';

        switch (this.state.job.status) {
            case 'inProgress':
                color = '#F6C344';
                break;
            case 'won':
                color = '#1EBE78';
                break;
            case 'lost':
                color = '#F17721';
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
                    onChange={e => this.changeStatus(e, 'status')}
                    className="browser-default"
                    name="jobStatus"
                    id="jobStatus_followup"
                    value={status}>
                    <option value="inProgress">In Progress</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                </select>
            </React.Fragment>
        );
    }

    saveJob() {
        let doc = {
            clientFirstName,
            clientLastName,
            phoneNumber,
            phoneAdditional,
            addresses: [],
            numberOfWorkers,
            comment,
            price,
            workMustBeginTime: [],
            quote,
            company,
        };
    }

    render() {
        return (
            <div
                className={
                    Session.get('ExtendedJobInformation') === this.state.job._id ? 'row' : 'hide'
                }>
                <hr />
                CONTACT INFORMATION <br />
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="first_name_followUp">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name_followUp"
                        value={this.state.job.clientFirstName}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="last_name_followUp">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name_followUp"
                        value={this.state.job.clientLastName}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="phone_number_followUp">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        id="phone_number_followUp"
                        value={this.state.job.phoneNumber}
                    />
                </div>
                <div className="col s12 m2 l2">
                    <label className="active" htmlFor="additional_phone_number_followUp">
                        Additional Phone
                    </label>
                    <input
                        type="number"
                        id="additional_phone_number_followUp"
                        value={this.state.job.phoneAdditional}
                    />
                </div>
                <div className="col s12 m4 l4">
                    <label className="active" htmlFor="email_followUp">
                        E-mail
                    </label>
                    <input type="email" id="email_followUp" value={this.state.job.email} />
                </div>
                <div className="col s12 m12 l12">
                    <AdditionalContacts contacts={this.state.job.additionalContacts} />
                </div>
                <div className="clear padding5px" />
                <div className="row">
                    MOVING INFORMATION <br />
                    <div id="moving-time--followup" className="input-field valideyn col s12 m3 l3">
                        <ArrivalWindow update={true} />
                    </div>
                    <div className="col s12 m6 l2">
                        <label className="active" htmlFor="quote-date-picker-followup">
                            Moving Date
                        </label>
                        <input
                            id="quote-date-picker-followup"
                            className="xx"
                            type="text"
                            placeholder=""
                            value={this.state.job.workDate}
                        />
                    </div>
                    <div className="col s12 m3 l3">
                        <label
                            className="active"
                            htmlFor={'first_contact_date_followup' + Session.get('is')}>
                            First Contact Date
                        </label>
                        <input
                            type="text"
                            id={'first_contact_date_followup' + Session.get('is')}
                            value={moment(this.state.job.quoteDate).format('d MMMM YYYY hh:mm a')}
                        />
                    </div>
                    <div className="col s12 m3 l2">
                        <label
                            className="active"
                            htmlFor={'job_number_followup' + Session.get('is')}>
                            Job Number
                        </label>
                        <input
                            disabled={true}
                            type="text"
                            id={'job_number_followup' + Session.get('is')}
                            value={this.state.job.jobNumber}
                        />
                    </div>
                    <div className="col s12 m3 l2">
                        <label className="active" htmlFor="source_of_leads_followup">
                            Source of Leads
                        </label>
                        <select
                            className="browser-default"
                            onChange={e => this.changeStatus(e, 'sourceOfLeads')}
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
                            <div
                                id={'addresses_followup' + this.state.job._id}
                                className="input-field valideyn">
                                <Addresses />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 l2">
                            <label
                                className="active"
                                htmlFor={'small_item_pack_followup_check' + this.state.job._id}>
                                Small item packing
                                <input
                                    id={'small_item_pack_followup_check' + this.state.job._id}
                                    type="checkbox"
                                    ref={this.smallItemCheck}
                                    onClick={() => {
                                        let element = document.getElementById(
                                            'small_item_pack_followup' + this.state.job._id,
                                        );
                                        element.value == -1
                                            ? (element.value = '')
                                            : (element.value = -1);
                                        element.disabled = !element.disabled;
                                    }}
                                />
                            </label>
                            <input
                                id={'small_item_pack_followup' + this.state.job._id}
                                className="xx"
                                type="number"
                                value={this.state.job.smallItemPacking}
                                placeholder="0"
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label
                                className="active"
                                htmlFor={'large_item_fee_followup' + Session.get('is')}>
                                Large Item Fee
                            </label>
                            <input
                                type="text"
                                id={'large_item_fee_followup' + Session.get('is')}
                                value={this.state.job.largeItemFee}
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label
                                className="active"
                                htmlFor={'gas_fee_followup' + this.state.job.gasFee}>
                                Gas Fee
                                <i className="lime-text lighten-5 black">
                                    [ Not sure?{' '}
                                    <input
                                        id="gas_fee_check_followup"
                                        type="checkbox"
                                        onClick={() => {
                                            if (
                                                !document.getElementById(
                                                    'gas_fee_followup' + this.state.job.gasFee,
                                                ).disabled
                                            ) {
                                                document.getElementById(
                                                    'gas_fee_followup' + this.state.job.gasFee,
                                                ).value = -0.01;
                                                document.getElementById(
                                                    'gas_fee_followup' + this.state.job.gasFee,
                                                ).disabled = true;
                                            } else {
                                                document.getElementById(
                                                    'gas_fee_followup' + this.state.job.gasFee,
                                                ).disabled = false;
                                                document.getElementById(
                                                    'gas_fee_followup' + this.state.job.gasFee,
                                                ).value = 0;
                                            }
                                        }}
                                    />
                                    ]
                                </i>
                            </label>
                            <input
                                id={'gas_fee_followup' + this.state.job.gasFee}
                                value={this.state.job.gasFee}
                                className="xx"
                                type="number"
                                placeholder="0"
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            <label
                                className="active"
                                htmlFor={'deposit_followup' + Session.get('is')}>
                                Deposit
                            </label>
                            <input
                                type="text"
                                id={'deposit_followup' + Session.get('is')}
                                value={this.state.job.deposit}
                            />
                        </div>
                        <div className="col s12 m6 l2">
                            {this.doubleDrive(this.state.job.doubleDrive)}
                        </div>
                        <div className="col s12 m3 l2">{this.jobStatus(this.state.job.status)}</div>
                    </div>
                    <div className="row">
                        <PaymentOptions job={this.state.job} />
                    </div>
                    <div className="row">
                        <TempTrucks update={true} />
                    </div>
                    <div className="row">
                        <div className="col s12 m6 l6">
                            <label className="active" htmlFor="textarea2_followup">
                                Comment
                            </label>
                            <textarea
                                id="textarea2_followup"
                                value={this.state.job.comment}
                                className="materialize-textarea"
                            />
                        </div>
                        <div className="col s12 m6 l6">
                            <FinalNote finalNote={this.state.job.finalNote || {
                                reason: '',
                                other: false,
                            }} />
                        </div>
                    </div>
                    <div className="row">
                        <FollowUps followUpList={this.state.job.followUp} />
                    </div>
                </div>
                <div className="clear" />
                <div className="row center-align" style={{ paddingTop: '20px' }}>
                    <a
                        className="waves-effect waves-light btn amber"
                        onClick={this.saveJob}
                        style={{ marginRight: '10px', color: 'black' }}>
                        <i className="material-icons left">update</i>
                        Update / Save
                    </a>
                    <a className="waves-effect waves-light btn teal">
                        <i className="material-icons left">send</i>
                        Send Quote
                    </a>
                </div>
            </div>
        );
    }
}

ExtendedJobInformation.propTypes = {
    job: PropTypes.object.isRequired,
};
