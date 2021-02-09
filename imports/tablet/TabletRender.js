import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import SignaturePad from 'signature_pad';
import WorkData from '../../common/collections_2';
import html2canvas from 'html2canvas';

import TabletIsList from './TabletIsList';
import AdditionalSignature from './AdditionalSignature';
import AddedAdditionalSignaturesRender from './AddedAdditionalSignaturesRender';
import AddedDiscountRender from './AddedDiscountRender';
import AdditionalChargesRender from './AdditionalChargesRender';
import AdditionalContactsRender from './AdditionalContactsRender';
import Survey from './Survey';
import CcForm from './CcForm';

/*global moment, $*/

let odenilmelidir = 0;

export default class TabletRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movingSizeList: {
                items: 'Items',
                studio: 'Studio',
                '1_bedroom': '1 Bedroom',
                '2_bedroom_small': '2 Bedroom (small size, few items)',
                '2_bedroom_avg': '2 Bedroom (avg. size, avg. items)',
                '2_bedroom_large': '2 Bedroom (large size, many items)',
                '3_bedroom_avg': '3 Bedroom (avg. size, avg. items)',
                '3_bedroom_large': '3 Bedroom (large size, many items)',
                '4_bedrooom_avg': '4 Bedroom (avg. size, avg. items)',
                '4_bedroom_large': '4 Bedroom (large size, many items)',
                '5_bedroom_avarage': '5 Bedrooms (avarage size, avg items)',
                commercial_sml: 'Commercial (small size, few items)',
                commercial_avg: 'Commercial (avg. size, avg. items)',
                commercial_large: 'Commercial (large size, many items)',
                long_distance_moves: 'Long Distance Moves'
            },
            valuePaperBundles: 0,
            paperBundles: 0,
            valueWardrobeBoxes: 0,
            wardrobeBoxes: 0,
            valueMovingBlankets: 0,
            movingBlankets: 0,
            valueWrapRoll: 0,
            wrapRoll: 0,
            valueSmallBoxes: 0,
            smallBoxes: 0,
            valueMediumBoxes: 0,
            mediumBoxes: 0,
            valueLargeBoxes: 0,
            largeBoxes: 0,
            totalPul: 0,
            payCard: 0,
            payCash: 0,
            goster: false,
            initSign: '',
            lastSign: '',
            cashPayed: 0,
            cardPayed: 0,
            finished: false,
            requirementEntirely: false,
            threeDayPrior: true,
            initialSignAlphabet: '',
            additionalSignatiure: false,
            discount: [],
            additionalCharge: [],
            vurulmusIs: [
                {
                    _id: 'MKqnYLC8bHzNFsQBR',
                    quote: true,
                    clientFirstName: 'Yusif',
                    clientLastName: 'Khalilov',
                    phoneNumber: ['9176079419'],
                    email: 'admin@admin.az',
                    addresses: ['dashjjkhasdjahkd', 'sadhkajdhsjkahda'],
                    workers: [],
                    workDate: '03/23/2018',
                    movingSize: '2_bedroom_avg',
                    confirmed: false,
                    workMustBeginTime: '09:00',
                    truckNumber: 6,
                    price: 4500,
                    jobNumber: '0rryh',
                    hourlyRates: 45,
                    laborTime: 3,
                    gasFee: 60,
                    company: 'ukqBneo88GuHj3ETe'
                }
            ],
            additionalSignatureList: [
                {
                    id: '1additionalSignature',
                    title: 'WAIVER AND RELEASE OF LIABILITY FOR HAVING RIDE IN TRUCK',
                    content: `I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES
                        ASSOCIATED WITH THIS EVENT, including by way of example and not limitation, any risks that may
                        arise from negligence or carelessness on the part of the persons or entities being released, from dangerous
                        or defective equipment or property owned, maintained, or controlled by them, or because of their possible
                        liability without fault.
                        I certify that I am physically fit, have sufficiently prepared or trained for participation in this activity, and
                        have not been advised to not participate by a qualified medical professional.I certify that there are no
                        health - related reasons or problems which preclude my participation in this activity.
                        I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders,
                        sponsors, and organizers of the activity in which I may participate, and that it will govern my actions and
                        responsibilities at said activity.
                        In consideration of my application and permitting me to participate in this activity, I hereby take action for
                        myself, my executors, administrators, heirs, next of kin, successors, and assigns as follows:
                        (A) I WAIVE, RELEASE, AND DISCHARGE from any and all liability, including but not limited to,
                        liability arising from the negligence or fault of the entities or persons released, for my death, disability,
                        personal injury, property damage, property theft, or actions of any kind which may hereafter occur to
                        me including my traveling to and from this activity, THE FOLLOWING ENTITIES OR PERSONS:
                        Movers Legion, Inc and it’s DBA’s and / or their directors, officers, employees, volunteers,
                        representatives, and agents, and the activity holders, sponsors, and volunteers;
                        (B) INDEMNIFY, HOLD HARMLESS, AND PROMISE NOT TO SUE the entities or persons
                        mentioned in this paragraph from any and all liabilities or claims made as a result of participation in
                        this activity, whether caused by the negligence of release or otherwise.
                        I acknowledge that Movers Legion, INC and DBA’s and their directors, officers, volunteers,
                        representatives, and agents are NOT responsible for the errors, omissions, acts, or failures to act of any
                        party or entity conducting a specific activity on their behalf.
                        I acknowledge that this activity may involve a test of a person's physical and mental limits and carries with
                        it the potential for death, serious injury, and property loss.The risks include, but are not limited to, those
                        caused by terrain, facilities, temperature, weather, condition of participants, equipment, vehicular traffic,
                        lack of hydration, and actions of other people including, but not limited to, participants, volunteers,
                            monitors, and / or producers of the activity.These risks are not only inherent to participants, but are also
                        present for volunteers.
                                    I hereby consent to receive medical treatment which may be deemed advisable in the event of injury,
                        accident, and / or illness during this activity.
                        I understand while participating in this activity, I may be photographed.I agree to allow my photo, video,
                        or film likeness to be used for any legitimate purpose by the activity holders, producers, sponsors,
                            organizers, and assigns.
                        The Accident Waiver and Release of Liability Form shall be construed broadly to provide a release and
                        waiver to the maximum extent permissible under applicable law.
                        I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENT.
                        I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN IT OF
                    MY OWN FREE WILL.`
                },
                {
                    id: '2additionalSignature',
                    title: 'WAIVER AND RELEASE OF LIABILITY FOR UNWRAPPED ITEMS',
                    content: `I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES
ASSOCIATED WITH THIS EVENT, including by way of example and not limitation, any risks that may
arise from negligence or carelessness on the part of the persons or entities being released, from dangerous
or defective equipment or property owned, maintained, or controlled by them, or because of their possible
liability without fault.
I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders,
sponsors, and organizers of the activity in which I may participate, and that it will govern my actions and
responsibilities at said activity.
In consideration of my application and permitting me to participate in this activity, I hereby take action for
myself, my executors, administrators, heirs, next of kin, successors, and assigns as follows:
(A) I WAIVE, RELEASE, AND DISCHARGE from any and all liability, including but not limited to,
liability arising from the negligence or fault of the entities or persons released, for my furniture or
any items that I won’t wrap it professionally with protection supplies, THE FOLLOWING
ENTITIES OR PERSONS: Movers Legion, Inc and it’s DBA’s and/or their directors, officers,
employees, volunteers, representatives, and agents, and the activity holders, sponsors, and
volunteers;
(B) I understand that having furniture or any household goods transporting without protections can
cause damage, scratches, dents, etc.
(C) INDEMNIFY, HOLD HARMLESS, AND PROMISE NOT TO SUE the entities or persons
mentioned in this paragraph from any and all liabilities or claims made as a result of participation in
this activity, whether caused by the negligence of release or otherwise.
I acknowledge that Movers Legion, INC and DBA’s and their directors, officers, volunteers,
representatives, and agents are NOT responsible for the errors, omissions, acts, or failures to act of any
party or entity conducting a specific activity on their behalf.
The Accident Waiver and Release of Liability Form shall be construed broadly to provide a release and
waiver to the maximum extent permissible under applicable law.
I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENT.
I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN IT OF
MY OWN FREE WILL.`
                },
                {
                    id: '3additionalSignature',
                    title: 'WAIVER AND RELEASE OF LIABILITY FOR NARROW HALLWAY, STAIRCASE, DOOR.ETC',
                    content: `I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES
ASSOCIATED WITH THIS EVENT, including by way of example and not limitation, any risks that may
arise from negligence or carelessness on the part of the persons or entities being released, from dangerous
or defective equipment or property owned, maintained, or controlled by them, or because of their possible
liability without fault.
I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders,
sponsors, and organizers of the activity in which I may participate, and that it will govern my actions and
responsibilities at said activity.
In consideration of my application and permitting me to participate in this activity, I hereby take action for
myself, my executors, administrators, heirs, next of kin, successors, and assigns as follows:
(A) I WAIVE, RELEASE, AND DISCHARGE from any and all liability, including but not limited to,
liability arising from the negligence or fault of the entities or persons released, for my household
goods and property, door or frame, wall or hallway or any related items to the property, THE
FOLLOWING ENTITIES OR PERSONS: Movers Legion, Inc and it’s DBA’s and/or their
directors, officers, employees, volunteers, representatives, and agents, and the activity holders,
sponsors, and volunteers;
(B) I understand that moving bulky household good true to narrow places can cause damage,
scratches, dents, etc. to my items and property and I take full responsibility for it.
(C) INDEMNIFY, HOLD HARMLESS, AND PROMISE NOT TO SUE the entities or persons
mentioned in this paragraph from any and all liabilities or claims made as a result of participation in
this activity, whether caused by the negligence of release or otherwise.
I acknowledge that Movers Legion, INC and DBA’s and their directors, officers, volunteers,
representatives, and agents are NOT responsible for the errors, omissions, acts, or failures to act of any
party or entity conducting a specific activity on their behalf.
The Accident Waiver and Release of Liability Form shall be construed broadly to provide a release and
waiver to the maximum extent permissible under applicable law.
I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENT.
I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN IT OF
MY OWN FREE WILL`
                },
                {
                    id: '4additionalSignature',
                    title: 'WAIVER AND RELEASE OF LIABILITY FOR PRERAPPED ITEMS',
                    content: `I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES
ASSOCIATED WITH THIS EVENT, including by way of example and not limitation, any risks that may
arise from negligence or carelessness on the part of the persons or entities being released, from dangerous
or defective equipment or property owned, maintained, or controlled by them, or because of their possible
liability without fault.
I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders,
sponsors, and organizers of the activity in which I may participate, and that it will govern my actions and
responsibilities at said activity.
In consideration of my application and permitting me to participate in this activity, I hereby take action for
myself, my executors, administrators, heirs, next of kin, successors, and assigns as follows:
(A) I WAIVE, RELEASE, AND DISCHARGE from any and all liability, including but not limited to,
liability arising from the negligence or fault of the entities or persons released, for my furniture or
any household goods items that was wrapped by me or other people or company, THE
FOLLOWING ENTITIES OR PERSONS: Movers Legion, Inc and it’s DBA’s and/or their
directors, officers, employees, volunteers, representatives, and agents, and the activity holders,
sponsors, and volunteers;
(B) I understand that if any items were packed unprofessionally can cause damage to the items and I
understand that my current movers are not taking any responsibility for prewrapped items.
(C) INDEMNIFY, HOLD HARMLESS, AND PROMISE NOT TO SUE the entities or persons
mentioned in this paragraph from any and all liabilities or claims made as a result of participation in
this activity, whether caused by the negligence of release or otherwise.
I acknowledge that Movers Legion, INC and DBA’s and their directors, officers, volunteers,
representatives, and agents are NOT responsible for the errors, omissions, acts, or failures to act of any
party or entity conducting a specific activity on their behalf.
The Accident Waiver and Release of Liability Form shall be construed broadly to provide a release and
waiver to the maximum extent permissible under applicable law.
I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENT.
I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN IT OF
MY OWN FREE WILL`
                }
            ],
            additionalSignature: [],
            totalAdditionalChargeAmount: 0,
            drivingClicked: false,
            breakClicked: false,
            started: false,
            startFullName: '',
            initSignature: false,
            initSignDate: new Date(),
            checks: {
                packMater: false,
                cargoIsSubject: false,
                myResponsibility: false
            },
            initialized: false,
            valuationOption: {
                initial: '',
                typeNumber: 0
            },
            isPayed: false,
            finishJobButton: false,
            showFinish1: false,
            showFinish2: false,
            survey: true,
            ccForm: false
        };

        this.requirementEntirely = this.requirementEntirely.bind(this);
        this.initialAlphabet = this.initialAlphabet.bind(this);
        this.finishJob = this.finishJob.bind(this);
        this.activateStart = this.activateStart.bind(this);
        this.hesabla = this.hesabla.bind(this);
        this.check = this.check.bind(this);
        this.largeBoxes = this.largeBoxes.bind(this);
        this.mediumBoxes = this.mediumBoxes.bind(this);
        this.smallBoxes = this.smallBoxes.bind(this);
        this.wrapRoll = this.wrapRoll.bind(this);
        this.movingBlankets = this.movingBlankets.bind(this);
        this.wardrobeBoxes = this.wardrobeBoxes.bind(this);
        this.paperBundles = this.paperBundles.bind(this);
        this.saveSignature = this.saveSignature.bind(this);
        this.renderAddresses = this.renderAddresses.bind(this);
        this.startFullName = this.startFullName.bind(this);
        this.changeBasicValuation = this.changeBasicValuation.bind(this);
        this.markPayed = this.markPayed.bind(this);
        this.finishSurvey = this.finishSurvey.bind(this);
        this.totalCalculate = this.totalCalculate.bind(this);
    }

    requirementEntirely(param, whichState) {
        this.setState({
            [whichState]: param
        });
    }

    initialAlphabet(e) {
        this.setState({
            initialSignAlphabet: e.target.value
        });
    }

    saveSignature(which, information) {
        let newList = this.state[which].concat(information);
        this.setState({
            [which]: newList
        });

        let doc = {
            _id: Session.get('tabletIsId'),
            [which]: newList // save additional signature
        };

        Meteor.call('updateWork', doc);
    }

    finishJob() {
        let x = document.querySelectorAll('.need_collapse');
        let l = 0;
        for (l; l < x.length; l++) {
            x[l].classList.remove('hide');
        }
        let htmlOfCanvas = document.body;
        html2canvas(htmlOfCanvas).then(canvas => {
            let png = canvas.toDataURL('image/png');

            let doc = {
                _id: Session.get('tabletIsId'),
                cardPayed: this.state.payCard,
                cashPayed: this.state.payCash,
                lastSignCustomer: this.signaturePad.toDataURL(),
                lastSignEmployee: this.signaturePad2.toDataURL(),
                finished: true,
                wardrobeBoxes: this.state.valueWardrobeBoxes,
                movingBlankets: this.state.valueMovingBlankets,
                packingPaperBundles: this.state.valuePaperBundles,
                bundleWrapRoll: this.state.valueWrapRoll,
                smallBoxes: this.state.valueSmallBoxes,
                mediumBoxes: this.state.valueMediumBoxes,
                largeBoxes: this.state.valueLargeBoxes
            };

            let job = WorkData.findOne({ _id: Session.get('tabletIsId') });
            Meteor.call('updateWork', doc, () => {
                Meteor.call('saveToPdf', png, Session.get('tabletIsId'), () => {
                    let url = 'https://s3-us-west-1.amazonaws.com/probusinessrun.finished.jobs.pdf/' + job._id + '.pdf';
                    Meteor.call('pdfToCustomer', job, url);
                });
            });
        });
    }

    activateStart() {
        let sign = this.signaturePad3.toDataURL();
        if (!this.signaturePad3.isEmpty()) {
            this.setState({
                initSign: sign
            });
        }

        Session.set('payed', true);

        let doc = {
            _id: Session.get('tabletIsId'),
            initialSignAlphabet: this.state.initialSignAlphabet,
            initSign: sign,
            requirementEntirely: this.state.requirementEntirely || false,
            threeDayPrior: this.state.threeDayPrior || false,
            initFullName: this.state.startFullName,
            initSignDate: new Date(),
            initialized: true,
            valuationOption: this.state.valuationOption,
            checks: {
                packMater: this.state.packMater,
                cargoIsSubject: this.state.cargoIsSubject,
                myResponsibility: this.state.myResponsibility
            }
        };
        Meteor.call('updateWork', doc);
    }

    calculateAmount() {
        if (this.state.vurulmusIs.length > 0) {
            this.totalDiscountTime = 0;
            this.totalDiscountAmount = 0;
            this.totalDiscountPercent = 0;
            this.totalAdditionalChargeAmount = 0;

            this.state.discount && this.state.discount.length > -1
                ? this.state.discount
                      .filter(discount => discount.type === 'time')
                      .map(discount => (this.totalDiscountTime += discount.amount))
                : null;

            this.state.discount && this.state.discount.length > -1
                ? this.state.discount
                      .filter(discount => discount.type === 'amount')
                      .map(discount => (this.totalDiscountAmount += discount.amount))
                : null;

            this.state.discount && this.state.discount.length > -1
                ? this.state.discount
                      .filter(discount => discount.type === 'percent')
                      .map(discount => (this.totalDiscountPercent += discount.amount))
                : null;

            this.state.additionalCharge.map(charge => {
                this.totalAdditionalChargeAmount += charge.amount;
            });

            let workData = this.state.vurulmusIs.length > 0 ? this.state.vurulmusIs[0] : null;
            let percentDiscount = Number(this.totalDiscountPercent) || 0; // % discount
            let cashDiscount = Number(this.totalDiscountAmount) || 0; // $ amount discount
            let timeDiscount = Number(this.totalDiscountTime) / 60 || 0; // time amount hours
            let flatRateIsTrue = workData.flatRate ? workData.flatRate[0].isTrue : false; // flat rate var ?
            let flatCashAmount = workData.flatRate && flatRateIsTrue ? Number(workData.flatRate[0].cashAmount) : 0; // flat cash amount
            let flatCardAmount = workData.flatRate && flatRateIsTrue ? Number(workData.flatRate[0].cardAmount) : 0; // flat card amount
            let cashRate = Number(workData.hourlyRatesCash) || 0; // cash rate
            let cardRate = Number(workData.hourlyRatesCard) || 0; // card rate
            let startToFinishTime = Math.ceil(workData.totalWorkTime / 0.25) * 0.25; // SF start to finish time included break and driving time 15 minutes interval
            let laborTime = Number(workData.laborTime) || 0; // LT minimum labor time
            let breakTimeTotal = Number(workData.totalBreakTime) || 0; // BT total break time
            let isDoubleDrive = workData.doubleDrive === 'yes'; // double drive true
            let drivingTime = Number(workData.totalDrivingTime) || 0; // DT driving time
            let totalWorkedHours = startToFinishTime - drivingTime - breakTimeTotal; // TWH total worked hours (labor time)

            // no double drive
            startToFinishTime = totalWorkedHours + drivingTime;

            // time calculation in flat rate
            this.lessThanLabor = false;
            flatRateIsTrue
                ? startToFinishTime < laborTime
                    ? ((startToFinishTime = laborTime), (this.lessThanLabor = true), (totalWorkedHours = 0), (drivingTime = 0))
                    : ((totalWorkedHours = startToFinishTime - laborTime), (drivingTime = 0))
                : null;

            // DDT is true and work time less than labor time or opposite
            isDoubleDrive && totalWorkedHours <= laborTime
                ? ((startToFinishTime = laborTime + drivingTime * 2), (totalWorkedHours = laborTime))
                : (startToFinishTime = totalWorkedHours + drivingTime * 2);

            !isDoubleDrive && !flatRateIsTrue && totalWorkedHours <= laborTime
                ? ((totalWorkedHours = laborTime), (drivingTime = 0), (startToFinishTime = laborTime))
                : null;

            this.totalWorkLaborTime = (totalWorkedHours + drivingTime + (isDoubleDrive ? drivingTime : 0)).toFixed(2);

            let gasFee = Number(workData.gasFee) || 0;
            let extraLargeItemFee = Number(workData.largeItemFee) || 0;
            let smallItemPacking = Number(workData.smallItemPacking) || 0;
            let additionalCharges = Number(this.totalAdditionalChargeAmount) || 0;
            let packingSupplies = this.state.totalPul;

            // total additional charges
            additionalCharges +=
                (gasFee && gasFee > 0 ? gasFee : 0) +
                (extraLargeItemFee && extraLargeItemFee > 0 ? extraLargeItemFee : 0) +
                (smallItemPacking > 0 ? smallItemPacking : 0) +
                packingSupplies;
            // this.payCash ve this.payCard calculation
            this.payCash = (
                (flatCashAmount + totalWorkedHours * cashRate + drivingTime * cashRate - cashDiscount) *
                    ((100 - percentDiscount) / 100) +
                (isDoubleDrive ? drivingTime * cashRate : 0) +
                additionalCharges -
                timeDiscount * cashRate
            ).toFixed(2);
            this.payCard = (
                (flatCardAmount + totalWorkedHours * cardRate + drivingTime * cardRate - cashDiscount) *
                    ((100 - percentDiscount) / 100) +
                (isDoubleDrive ? drivingTime * cardRate : 0) +
                additionalCharges -
                timeDiscount * cardRate
            ).toFixed(2);
        }
    }

    hesabla(inputType, e) {
        let workData = this.state.vurulmusIs.length > 0 ? this.state.vurulmusIs[0] : null;
        let inputAmount = Number(e.target.value);
        let typeOfPayment = inputType;
        let amountOf = 0;
        let deposit = workData.deposit;

        if (typeOfPayment === 'cash') {
            if (inputAmount < 0 || inputAmount === 0) {
                odenilmelidir = (this.payCard - deposit).toFixed(2);
                this.setState({
                    payCard: this.payCard - deposit,
                    payCash: 0
                });
            } else if (inputAmount >= this.payCash - deposit) {
                inputAmount = this.payCash - deposit;
                this.setState(
                    {
                        payCard: 0,
                        payCash: inputAmount
                    },
                    () => {
                        document.getElementById('mark-as-payed').classList.remove('disabled');
                    }
                );
            } else {
                amountOf = ((this.payCash - deposit - inputAmount) / (this.payCash - deposit)) * (this.payCard - deposit);
                amountOf = amountOf.toFixed(2);
                // document.getElementById('mark-as-payed').classList.add('disabled');
                odenilmelidir = amountOf;
                this.setState({
                    payCard: amountOf,
                    payCash: inputAmount
                });
            }
        } else {
            if (inputAmount < 0 || inputAmount === 0) {
                this.setState({
                    payCard: 0,
                    payCash: this.payCash - deposit
                });
            } else if (inputAmount >= this.payCard - deposit) {
                inputAmount = this.payCard - deposit;
                odenilmelidir = inputAmount.toFixed(2);
                this.setState(
                    {
                        payCard: inputAmount,
                        payCash: 0
                    },
                    () => {
                        document.getElementById('mark-as-payed').classList.remove('disabled');
                    }
                );
            } else {
                amountOf = ((this.payCard - deposit - inputAmount) / (this.payCard - deposit)) * (this.payCash - deposit);
                amountOf = amountOf.toFixed(2);
                // document.getElementById('mark-as-payed').classList.add('disabled');
                odenilmelidir = inputAmount.toFixed(2);
                this.setState({
                    payCard: inputAmount,
                    payCash: amountOf
                });
            }
        }
    }

    check(which) {
        this.setState(
            prevState => {
                return {
                    [which]: !prevState[which]
                };
            },
            () => {
                this.state.packMater && this.state.cargoIsSubject && this.state.myResponsibility
                    ? this.setState({
                          goster: true
                      })
                    : this.setState({
                          goster: false
                      }); // Update information in the database
            }
        );
    }

    markPayed() {
        if (confirm('Are you sure that everything is calculated right and Fully payed?')) {
            document.querySelector('#finel_step').classList.remove('hide');
            let doc = {
                _id: Session.get('tabletIsId'),
                cardPayed: this.state.payCard,
                cashPayed: this.state.payCash,
                wardrobeBoxes: this.state.valueWardrobeBoxes,
                movingBlankets: this.state.valueMovingBlankets,
                packingPaperBundles: this.state.valuePaperBundles,
                bundleWrapRoll: this.state.valueWrapRoll,
                smallBoxes: this.state.valueSmallBoxes,
                mediumBoxes: this.state.valueMediumBoxes,
                largeBoxes: this.state.valueLargeBoxes,
                isPayed: true
            };

            Meteor.call('updateWork', doc);
        }
    }

    largeBoxes(e) {
        let value_ = e.target.value;

        this.setState({
            valueLargeBoxes: e.target.value,
            largeBoxes: 4 * e.target.value
        });
        this.saveInformationToDatabase(value_, 'largeBoxes');
    }

    mediumBoxes(e) {
        let value_ = e.target.value;

        this.setState(
            {
                valueMediumBoxes: e.target.value,
                mediumBoxes: 3 * e.target.value
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'mediumBoxes');
    }

    smallBoxes(e) {
        let value_ = e.target.value;
        this.setState(
            {
                valueSmallBoxes: e.target.value,
                smallBoxes: 2 * e.target.value
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'smallBoxes');
    }

    wrapRoll(e) {
        let value_ = e.target.value;

        this.setState(
            {
                valueWrapRoll: e.target.value,
                wrapRoll: 45 * e.target.value
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'bundleWrapRoll');
    }

    movingBlankets(e) {
        let value_ = e.target.value;

        this.setState(
            {
                valueMovingBlankets: value_,
                movingBlankets: 15 * value_
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'movingBlankets');
    }

    saveInformationToDatabase(value, what) {
        clearTimeout(this.test);
        let id = Session.get('tabletIsId');

        this.timeout = 500;
        this.test = setTimeout(() => {
            Meteor.call('saveSmallItemPacking', value, what, id);
        }, this.timeout);
    }

    totalCalculate() {
        this.setState({
            totalPul:
                this.state.largeBoxes +
                this.state.smallBoxes +
                this.state.mediumBoxes +
                this.state.wrapRoll +
                this.state.movingBlankets +
                this.state.wardrobeBoxes +
                this.state.paperBundles
        });
    }

    wardrobeBoxes(e) {
        let value_ = e.target.value;

        this.setState(
            {
                valueWardrobeBoxes: value_,
                wardrobeBoxes: 15 * value_
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'wardrobeBoxes');
    }

    paperBundles(e) {
        let value_ = e.target.value;

        this.setState(
            {
                valuePaperBundles: value_,
                paperBundles: 25 * value_
            },
            this.totalCalculate()
        );

        this.saveInformationToDatabase(value_, 'packingPaperBundles');
    }

    componentDidMount() {
        this.timeout = null;

        this.x = Tracker.autorun(() => {
            // Meteor.subscribe('workSchema');
            // Meteor.subscribe('fullUser');
            const isRender = WorkData.find({
                _id: Session.get('tabletIsId')
            }).fetch();

            let ccForm = Session.get('ccForm');
            this.setState({
                ccForm
            });

            if (isRender.length > 0) {
                let isFinished = isRender[0].finished;
                let startFullName = isRender[0].initFullName;
                let initSignDate = isRender[0].initSignDate || new Date();
                let valuationOption = isRender[0].valuationOption
                    ? isRender[0].valuationOption
                    : {
                          initial: '',
                          typeNumber: 0
                      };
                let checks = isRender[0].checks || {
                    packMater: false,
                    cargoIsSubject: false,
                    myResponsibility: false
                };

                this.setState({
                    valuationOption
                });

                if (checks.packMater && checks.cargoIsSubject && checks.myResponsibility) {
                    this.setState({
                        goster: true
                    });
                } else {
                    this.setState({
                        goster: false
                    });
                }
                if (isFinished) {
                    // this.deactivateAll();
                    this.setState({
                        finished: true
                    });
                } else {
                    // this.activateAll();
                    this.setState({
                        finished: false
                    });
                }

                this.setState(
                    {
                        vurulmusIs: isRender,
                        startFullName,
                        initSignDate,
                        packMater: checks.packMater,
                        cargoIsSubject: checks.cargoIsSubject,
                        myResponsibility: checks.myResponsibility,
                        initialized: isRender[0].initialized,
                        valueWardrobeBoxes: isRender[0].wardrobeBoxes || 0,
                        wardrobeBoxes: isRender[0].wardrobeBoxes * 15 || 0,
                        valueMovingBlankets: isRender[0].movingBlankets || 0,
                        movingBlankets: isRender[0].movingBlankets * 15 || 0,
                        valuePaperBundles: isRender[0].packingPaperBundles || 0,
                        paperBundles: isRender[0].packingPaperBundles * 25 || 0,
                        valueWrapRoll: isRender[0].bundleWrapRoll || 0,
                        wrapRoll: isRender[0].bundleWrapRoll * 45 || 0,
                        valueSmallBoxes: isRender[0].smallBoxes || 0,
                        smallBoxes: isRender[0].smallBoxes * 2 || 0,
                        valueMediumBoxes: isRender[0].mediumBoxes || 0,
                        mediumBoxes: isRender[0].mediumBoxes * 3 || 0,
                        valueLargeBoxes: isRender[0].largeBoxes || 0,
                        largeBoxes: isRender[0].largeBoxes * 4 || 0,
                        survey: !isRender[0].cardHolderInfo
                    },

                    () => {
                        let is = this.state.vurulmusIs[0];

                        this.setState({
                            totalPul:
                                this.state.largeBoxes +
                                this.state.smallBoxes +
                                this.state.mediumBoxes +
                                this.state.wrapRoll +
                                this.state.movingBlankets +
                                this.state.wardrobeBoxes +
                                this.state.paperBundles,
                            drivingClicked: is.drivingClicked || false,
                            breakClicked: is.breakClicked || false,
                            started: is.startTime && is.startTime !== '',
                            initSign: is.initSign,
                            initialSignAlphabet: is.initialSignAlphabet,
                            requirementEntirely: is.requirementEntirely,
                            threeDayPrior: is.threeDayPrior,
                            additionalSignature:
                                is.additionalSignature && is.additionalSignature.length > 0 ? is.additionalSignature : [],
                            discount: is.discount && is.discount.length > 0 ? is.discount : [],
                            additionalCharge: is.additionalCharge && is.additionalCharge.length > 0 ? is.additionalCharge : []
                        });
                    }
                );
            }

            //before beginning customer sign
            let canvas3 = document.querySelector('#signature-pad-before-start');
            this.canvas3 = canvas3;
            this.signaturePad3 = new SignaturePad(canvas3, {
                minWidth: 1,
                maxWidth: 3,
                dotSize: 1,
                penColor: '#000000',
                onEnd: () => {
                    this.setState({
                        initSignature: true
                    });
                }
            });

            let cancelButton3 = document.querySelector('#clear3');
            cancelButton3.addEventListener('click', () => {
                this.signaturePad3.clear();
                this.setState({
                    initSignature: false
                });
            });

            // in the end sign
            let canvas = document.querySelector('#signature-pad1');
            this.signaturePad = new SignaturePad(canvas, {
                minWidth: 1,
                maxWidth: 3,
                dotSize: 1,
                penColor: '#000000',
                onEnd: () => {
                    this.setState({
                        showFinish1: true
                    });
                }
            });

            let cancelButton = document.querySelector('#clear');
            cancelButton.addEventListener('click', () => {
                this.signaturePad.clear();
                this.setState({
                    showFinish1: false
                });
            });

            // in the end sign
            let canvas2 = document.querySelector('#signature-pad');
            this.signaturePad2 = new SignaturePad(canvas2, {
                minWidth: 1,
                maxWidth: 3,
                dotSize: 1,
                penColor: '#000000',
                onEnd: () => {
                    this.setState({
                        showFinish2: true
                    });
                }
            });

            let cancelButton2 = document.querySelector('#clear2');
            cancelButton2.addEventListener('click', () => {
                this.signaturePad2.clear();

                this.setState({
                    showFinish2: false
                });
            });
        });

        this.setState({
            totalPul: this.state.largeBoxes
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    vaxtiBaslat(id) {
        Meteor.call('setWorkBeganTimex', id);
    }

    vaxtiDayandir(id) {
        Meteor.call('setWorkStopTime', id);
    }

    drivingTime(id) {
        Meteor.call('setDrivingTime', id);
        this.setState(prevState => {
            let { drivingTimeStop } = prevState;
            drivingTimeStop = !drivingTimeStop;

            return {
                drivingTimeStop
            };
        });
    }

    drivingTimeStop(id) {
        Meteor.call('drivingTimeStop', id);
        this.setState(prevState => {
            let { drivingTimeStop } = prevState;
            drivingTimeStop = !drivingTimeStop;

            return {
                drivingTimeStop
            };
        });
    }

    breatTime(id) {
        Meteor.call('breakTime', id);
    }

    breakTimeStop(id) {
        Meteor.call('breakTimeStop', id);
    }

    renderWorkTime() {
        if (this.state.vurulmusIs[0].startTime) {
            document.getElementById('start-work').classList.add('disabled');
            let is = this.state.vurulmusIs[0];

            return <div className="work-time-event">Time Starts: {moment(is.startTime).format('hh:mm A')}</div>;
        }
    }

    deactivateAll() {
        let inputs = document.getElementsByTagName('input');
        let buttons = document.getElementsByClassName('btn');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('disabled');
        }
    }

    activateAll() {
        let inputs = document.getElementsByTagName('input');
        let buttons = document.getElementsByClassName('btn');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('disabled');
        }
    }

    renderDrivingTime() {
        if (this.state.vurulmusIs[0].drivingTime) {
            let number = 2000;
            return this.state.vurulmusIs[0].drivingTime.map(function(driving) {
                number = number + 1;
                return (
                    <div key={number} className="driving-time-event">
                        Driving: {moment(driving.startTime).format('hh:mm A')} - {moment(driving.endTime).format('hh:mm A')}
                    </div>
                );
            });
        }
    }

    renderBreakTime() {
        if (this.state.vurulmusIs[0].breakTime) {
            let number = 3000;
            return this.state.vurulmusIs[0].breakTime.map(function(breaks) {
                number = number + 1;
                return (
                    <div key={number} className="break-time-event">
                        Break: {moment(breaks.startTime).format('hh:mm A')} - {moment(breaks.endTime).format('hh:mm A')}
                    </div>
                );
            });
        }
    }

    renderFinishTime() {
        if (this.state.vurulmusIs[0].finishTime) {
            document.getElementById('stop-work').classList.add('disabled');
            document.getElementById('driving-start').classList.add('disabled');
            document.getElementById('driving-stop').classList.add('disabled');
            document.getElementById('break-start').classList.add('disabled');
            document.getElementById('break-stop').classList.add('disabled');

            let is = this.state.vurulmusIs[0];
            return <div className="work-time-event">Time Ends: {moment(is.finishTime).format('hh:mm A')}</div>;
        }
    }

    round(number, precision) {
        var shift = function(number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }
            var numArray = ('' + number).split('e');
            return +(numArray[0] + 'e' + (numArray[1] ? +numArray[1] + precision : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    }

    componentDidUpdate() {
        this.renderAddresses();
    }

    renderAddresses() {
        return this.state.vurulmusIs[0].addresses.map((workAddress, index) => {
            return (
                <div key={index + 'address'} className="col s6 m6 l6">
                    <div className="card__">
                        <div>
                            <div className="cardTitle">Address #{index + 1}</div>
                            <div className="cardInner">{workAddress}</div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    startFullName(e) {
        this.setState({
            startFullName: e.target.value
        });
    }

    changeBasicValuation(index, e) {
        let value = e.target.value;
        this.setState({
            valuationOption: {
                initial: value,
                typeNumber: index
            }
        });
    }

    finishSurvey() {
        this.setState({
            survey: false
        });
    }

    render() {
        let is = this.state.vurulmusIs[0];
        let takenById = is.takenBy;
        let takenBy = Meteor.users.find({ _id: takenById }).fetch()[0];
        this.totalSaat = 0;
        this.cardRate = 0;
        this.cashRate = 0;
        this.card = 0;
        this.cash = 0;
        this.elave = 0;
        this.totalAmountCash = 0;
        this.totalAmountCard = 0;
        this.totalAdditionalCharge = 0;
        this.calculateAmount();

        return (
            <React.Fragment>
                <div className={this.state.survey || this.state.ccForm ? '' : 'hide'}>
                    {this.state.survey && <Survey finishSurvey={this.finishSurvey} />}
                    {this.state.ccForm && <CcForm />}
                </div>
                <div id="tablet-is-render_" className={this.state.survey ? 'hide' : 'tabletJobRendered'}>
                    <a href="#" id="close-duymesi-id" className={this.state.survey ? 'hide' : 'close-duymesi'}>
                        CLOSE THIS PAGE X
                    </a>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            <h5>Combined Agreement for Moving Services and Freight Bill</h5>
                        </p>
                        <div className="row">
                            <div className="col s12 m12 l12">
                                <hr />
                            </div>
                        </div>
                        <div id="tabler-yuxari">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="row">
                                                <div className="col s8 m8 l8">
                                                    <div className="card__">
                                                        <div className="card-content">
                                                            Company Name:{' '}
                                                            {is.companyInfo === undefined ? '' : is.companyInfo.name}
                                                            <br />
                                                            <hr />
                                                            License Number: BEARHFTI 0191555
                                                            <br />
                                                            <hr />
                                                            Customer Name: {is.clientFirstName} {is.clientLastName}
                                                            <br />
                                                            <span
                                                                className={
                                                                    is.cardHolderInfo && is.cardHolderInfo.firstName ? '' : 'hide'
                                                                }
                                                            >
                                                                <hr />
                                                                Card Holder Name:{' '}
                                                                {is.cardHolderInfo && is.cardHolderInfo.firstName}{' '}
                                                                {is.cardHolderInfo && is.cardHolderInfo.lastName}
                                                                <br />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="sag card__" style={{ marginRight: '20px' }}>
                                            <tr>
                                                <td className="sag">Order Date:</td>
                                                <td>&nbsp; {is.workDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="sag">Move Date:</td>
                                                <td>&nbsp; {is.workDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="sag">Pack Date:</td>
                                                <td>&nbsp; {is.workDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="sag">Del Date:</td>
                                                <td>&nbsp; {is.workDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="sag">Taken By:</td>
                                                <td>&nbsp; {takenBy ? takenBy.profile.firstName : ''}</td>
                                            </tr>
                                            <tr>
                                                <td className="sag">Job Number:</td>
                                                <td>&nbsp; {is.jobNumber}</td>
                                            </tr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="clear" />
                            <div className="row">
                                <div style={{ textTransform: 'uppercase' }} className="card__ warning">
                                    SHIPPER (CUSTOMER) IS REQUESTED TO READ THIS DOCUMENT CAREFULLY, INCLUDING TERMS AND
                                    CONDITIONS, BEFORE SIGNING. BY SIGNING THIS CONTRACT, THIS WILL CONFIRM INSTRUCTIONS AND
                                    AUTHORIZE {is.companyInfo === undefined ? '' : is.companyInfo.name} TO MOVE, SHIP, PACK,
                                    STORE, AND/OR PERFORM THE SERVICES HEREIN.
                                </div>
                            </div>
                            <div className="clear" />
                            <div className="row from-to">
                                <div className="row">
                                    {this.renderAddresses()}
                                    <div className="clear" />
                                    <div className="col s6 m6 l6">
                                        <div className="card__">
                                            <div>
                                                <div className="cardTitle">Customer Main Number:</div>
                                                <div className="cardInner">{is.phoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s6 m6 l6">
                                        <div className="card__">
                                            <div>
                                                <div className="cardTitle">Customer Secondary Number:</div>
                                                <div className="cardInner">{is.phoneAdditional}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="clear" />
                                    <AdditionalContactsRender contacts={is.additionalContacts || []} />
                                </div>
                            </div>
                            <div className="row from-to">
                                <div className="card__ warning">
                                    NOTE: Additional charges for storage, extra handling, and transportation will accrue if goods
                                    are not promptly accepted
                                </div>
                                <div className="clear" />
                                <div className="card__ xxx">
                                    <div className="row">
                                        <div className="cardTitle">Pricing:</div>
                                        <div className="clear margin-top" />
                                        <div className="col s6 m6 l6">
                                            Number Of Movers: {is.workers && is.workers.length}
                                            <br />
                                            Your Flat Rates:{' '}
                                            {is.flatRate && is.flatRate[0].isTrue
                                                ? '$' +
                                                  is.flatRate[0].cashAmount +
                                                  '(cash)' +
                                                  ' $' +
                                                  is.flatRate[0].cardAmount +
                                                  '(card)'
                                                : 'No'}
                                            <br />
                                            Your Hourly Rates:{' '}
                                            {is.hourlyRatesCash && is.hourlyRatesCard
                                                ? '$' + is.hourlyRatesCash + '(cash)' + ' $' + is.hourlyRatesCard + '(card)'
                                                : 'No'}
                                            <br />
                                            Minimum Labor Time: {is.laborTime} hour(s)
                                            <br />
                                            Moving Size: {this.state.movingSizeList[is.movingSize]}
                                            <br />
                                        </div>
                                        <div className="col s6 m6 l6">
                                            Travel Fee (one time): {is.gasFee && is.gasFee > 0 ? '$' + is.gasFee : 'Waived'}
                                            <br />
                                            Double Drive Time: {is.doubleDrive === 'yes' ? 'Yes' : 'Waived'}
                                            <br />
                                            Extra Large/Heavy Item Fee: {is.largeItemFee > 0 ? '$' + is.largeItemFee : 'No'}
                                            <br />
                                            Small Item Packing Price:{' '}
                                            {is.smallItemPacking && is.smallItemPacking < 0
                                                ? 'Yes'
                                                : is.smallItemPacking && is.smallItemPacking > 0
                                                ? '$' + is.smallItemPacking
                                                : 'No'}
                                            <br />
                                            Not to Exceed Price: ${is.price}
                                            <br />
                                        </div>
                                        <div className="clear" />
                                        <hr />
                                        <div className="card__ valign-wrapper">
                                            <div className="col s6 m6 l6">
                                                I have received the CPUC’s Important Information Booklet
                                            </div>
                                            <div className="col s6 m6 l6">
                                                Initial:
                                                <input
                                                    id="initial_"
                                                    type="text"
                                                    disabled={
                                                        typeof is.initialSignAlphabet === 'string' &&
                                                        is.initialSignAlphabet !== ''
                                                    }
                                                    onChange={this.initialAlphabet}
                                                    value={this.state.initialSignAlphabet}
                                                    placeholder="Write initial here please"
                                                    style={{ textTransform: 'uppercase' }}
                                                />
                                                <span id="importantInformationBooklet_date">
                                                    {moment(
                                                        (is.importantInformationBooklet && is.importantInformationBooklet.date) ||
                                                            new Date()
                                                    ).format('MM/DD/YYYY hh:mm a')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card__ valign-wrapper">
                                            <div className="col s6 m6 l6">Did you choose to waive this requirement entirely?</div>
                                            <div className="col s6 m6 l6 center-align">
                                                <button
                                                    className={
                                                        this.state.requirementEntirely
                                                            ? 'waves-effect waves-light btn'
                                                            : 'waves-effect waves-light btn grey'
                                                    }
                                                    style={
                                                        is.requirementEntirely === true
                                                            ? {
                                                                  border: '2px solid blue'
                                                              }
                                                            : null
                                                    }
                                                    disabled={is.requirementEntirely === true || is.requirementEntirely === false}
                                                    onClick={() => this.requirementEntirely(true, 'requirementEntirely')}
                                                >
                                                    Yes
                                                </button>
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                                <button
                                                    className={
                                                        this.state.requirementEntirely
                                                            ? 'waves-effect waves-light btn grey'
                                                            : 'waves-effect waves-light btn'
                                                    }
                                                    disabled={is.requirementEntirely === true || is.requirementEntirely === false}
                                                    style={
                                                        is.requirementEntirely === false
                                                            ? {
                                                                  border: '2px solid blue'
                                                              }
                                                            : null
                                                    }
                                                    onClick={() => this.requirementEntirely(false, 'requirementEntirely')}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card__ valign-wrapper">
                                            <div className="col s6 m6 l6">
                                                Was the moving date agreed to between you &amp; the carrier less than 3 days prior
                                                to the day of your move?
                                            </div>
                                            <div className="col s6 m6 l6 center-align">
                                                <button
                                                    className={
                                                        (this.state.threeDayPrior ? '' : 'grey') + ' waves-effect waves-light btn'
                                                    }
                                                    disabled={is.threeDayPrior === true || is.threeDayPrior === false}
                                                    style={
                                                        is.threeDayPrior === true
                                                            ? {
                                                                  border: '2px solid blue'
                                                              }
                                                            : null
                                                    }
                                                    onClick={() => this.requirementEntirely(true, 'threeDayPrior')}
                                                >
                                                    Yes
                                                </button>
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                                <button
                                                    className={
                                                        (this.state.threeDayPrior ? 'grey' : '') + ' waves-effect waves-light btn'
                                                    }
                                                    disabled={is.threeDayPrior === true || is.threeDayPrior === false}
                                                    style={
                                                        is.threeDayPrior === false
                                                            ? {
                                                                  border: '2px solid blue'
                                                              }
                                                            : null
                                                    }
                                                    onClick={() => this.requirementEntirely(false, 'threeDayPrior')}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__">
                                    <div className="cardTitle">VALUATION OPTIONS: VALUATION DECLARATION &amp; DISCLAIMER</div>
                                    <tbody>
                                        <tr
                                            style={{
                                                backgroundColor: '#C3D6FF'
                                            }}
                                        >
                                            <th />
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px !important'
                                                }}
                                            >
                                                Initial your choice
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px !important'
                                                }}
                                            >
                                                Transportation
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px !important'
                                                }}
                                            >
                                                Maximum Rate
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px !important'
                                                }}
                                            >
                                                Storage-in-Transit
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px !important'
                                                }}
                                            >
                                                Deductible
                                            </th>
                                        </tr>
                                        <tr
                                            style={{
                                                backgroundColor: '#E6EEFF'
                                            }}
                                        >
                                            <td>Basic: $0.60 cents/lb./art.</td>
                                            <td>
                                                Initial:
                                                <input
                                                    onChange={e => this.changeBasicValuation(0, e)}
                                                    className="initial_x"
                                                    type="text"
                                                    style={{ textTransform: 'uppercase' }}
                                                    disabled={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== ''
                                                    }
                                                    value={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== '' &&
                                                        is.valuationOption.typeNumber === 0
                                                            ? is.valuationOption.initial
                                                            : this.state.valuationOption.typeNumber === 0
                                                            ? this.state.valuationOption.initial
                                                            : ''
                                                    }
                                                />
                                            </td>
                                            <td>No Additional Charge</td>
                                            <td>No Additional Charge</td>
                                            <td>No Additional Charge</td>
                                            <td>No Deductible</td>
                                        </tr>
                                        dshjhkhasdhk
                                        <tr
                                            style={{
                                                backgroundColor: '#C3D6FF'
                                            }}
                                        >
                                            <td>Actual Cash Value</td>
                                            <td>
                                                Initial:
                                                <input
                                                    className="initial_x"
                                                    type="text"
                                                    style={{ textTransform: 'uppercase' }}
                                                    onChange={e => this.changeBasicValuation(1, e)}
                                                    disabled={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== ''
                                                    }
                                                    value={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== '' &&
                                                        is.valuationOption.typeNumber === 1
                                                            ? is.valuationOption.initial
                                                            : this.state.valuationOption.typeNumber === 1
                                                            ? this.state.valuationOption.initial
                                                            : ''
                                                    }
                                                />
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" /> per $100
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" />
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" /> per $100
                                            </td>
                                            <td>Deductible of $250</td>
                                        </tr>
                                        <tr
                                            style={{
                                                backgroundColor: '#E6EEFF'
                                            }}
                                        >
                                            <td>Full Value</td>
                                            <td>
                                                Initial:
                                                <input
                                                    className="initial_x"
                                                    type="text"
                                                    style={{ textTransform: 'uppercase' }}
                                                    onChange={e => this.changeBasicValuation(2, e)}
                                                    disabled={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== ''
                                                    }
                                                    value={
                                                        is.valuationOption &&
                                                        typeof is.valuationOption.initial === 'string' &&
                                                        is.valuationOption.initial !== '' &&
                                                        is.valuationOption.typeNumber === 2
                                                            ? is.valuationOption.initial
                                                            : this.state.valuationOption.typeNumber === 2
                                                            ? this.state.valuationOption.initial
                                                            : ''
                                                    }
                                                />
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" /> per $100
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" />
                                            </td>
                                            <td>
                                                $
                                                <input id="basic_initial" className="initial_x" type="text" /> per $100
                                            </td>
                                            <td>Deductible of $250</td>
                                        </tr>
                                    </tbody>
                                </div>
                                <div className="card__ warning">
                                    CUSTOMER AGREES THAT TITLE TO ALL PACKING MATERIALS AND OTHER PROPERTY SOLD TO CUSTOMER PASSES
                                    TO CUSTOMER PRIOR TO THE TRANSPORTATION OF SUCH PROPERTY TO THE CUSTOMER BY CARRIER. THIS ALSO
                                    MEANS THAT ANY PACKING MATERIALS OR TRASH/DONATION ITEMS ARE YOUR OWN PROPERTY AND, AS SUCH,
                                    CARRIER IS NOT RESPONSIBLE FOR THE DISPOSAL AND/OR REMOVAL OF THESE ITEMS.
                                    <br />
                                    Read and Agree
                                    <input
                                        type="checkbox"
                                        onChange={() => this.check('packMater')}
                                        disabled={this.state.initialized}
                                        checked={this.state.packMater}
                                        className="checked"
                                    />
                                </div>
                                <div className="card__ warning">
                                    NOTE: All cargo is subject to a Mover’s Lien as described by the CPUC until entire amount due
                                    is paid IN FULL. Any loss/damage claims must be received in writing AFTER your move and DO NOT
                                    exempt you from paying the total amount due as outlined above.
                                    <br />
                                    Read and Agree
                                    <input
                                        type="checkbox"
                                        onChange={() => this.check('cargoIsSubject')}
                                        disabled={this.state.initialized}
                                        checked={this.state.cargoIsSubject}
                                        className="checked"
                                    />
                                </div>
                                <div className="card__ warning">
                                    I understand that it’s my responsibility to hold a parking space for the moving truck at each
                                    location. Failure to do so will result in my being held responsible to pay for any, and all,
                                    parking tickets/fines resulting from my negligence to do so.
                                    <br />
                                    Read and Agree
                                    <input
                                        type="checkbox"
                                        onChange={() => this.check('myResponsibility')}
                                        disabled={this.state.initialized}
                                        checked={this.state.myResponsibility}
                                        className="checked"
                                    />
                                </div>
                            </div>
                            {/* ise baslamamisdan qabaq ki sign */}
                            <div className="card__ margin-top">
                                <p className="cardTitle" style={{ textAlign: 'center' }}>
                                    BY SIGNING BELOW, I {is.clientFirstName} {is.clientLastName}, CONFIRM THAT THE INFORMATION
                                    ABOVE IS TRUE AND CORRECT TO THE BEST OF MY KNOWLEDGE. <br />
                                    SHIPPER’S (CUSTOMER’S) SIGNATURE:
                                    <br />
                                    DATE:{' '}
                                    {this.state.initSign
                                        ? moment(this.state.initSignDate).format('MM/DD/YYYY hh:mm a')
                                        : moment(Date()).format('MM/DD/YYYY hh:mm a')}
                                </p>
                                <div className="col s12 m12 l12">
                                    <p>Customer Sign below</p>
                                    <div
                                        className="col s12 m4 l4"
                                        style={{
                                            position: 'absolute',
                                            left: '580px'
                                        }}
                                    >
                                        <input
                                            id="customer-firts-sign"
                                            type="text"
                                            disabled={!!this.state.initSign}
                                            onChange={e => this.startFullName(e)}
                                            value={this.state.startFullName}
                                            style={{ width: '400px' }}
                                            className="validate"
                                            placeholder="Type full name here"
                                        />
                                        <br />
                                        <a
                                            id="submit-sign"
                                            className={
                                                this.state.initSign
                                                    ? 'hide'
                                                    : this.state.initialSignAlphabet !== '' &&
                                                      this.state.valuationOption.initial !== '' &&
                                                      this.state.initSignature &&
                                                      this.state.startFullName &&
                                                      this.state.startFullName !== '' &&
                                                      this.state.goster
                                                    ? 'waves-effect waves-light btn blue'
                                                    : 'waves-effect waves-light btn blue disabled'
                                            }
                                            style={{ width: '400px' }}
                                            onClick={this.activateStart}
                                        >
                                            Submit AND START
                                        </a>
                                    </div>
                                    <div className="wrapper">
                                        <canvas
                                            id="signature-pad-before-start"
                                            className={(this.state.initSign ? 'hide' : '') + ' signature-pad'}
                                            width={400}
                                            height={200}
                                        />
                                        <img
                                            id="init-sign-img"
                                            className={this.state.initSign ? '' : 'hide'}
                                            src={this.state.initSign}
                                            width={400}
                                            height={200}
                                            style={{ zIndex: '0' }}
                                            alt="img"
                                        />
                                    </div>
                                    <a
                                        id="clear3"
                                        style={{ width: '400px' }}
                                        className={(this.state.initSign ? 'hide' : '') + ' waves-effect waves-light btn blue'}
                                    >
                                        Clear
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="clear margin-top" />

                        {/* start, stop, break driving buttons */}
                        <div id="secondStep" className={this.state.initSign ? 'card__' : 'hide card__'}>
                            <div
                                className={
                                    is.isPayed
                                        ? 'card__ additionalSignature center-align hide'
                                        : 'card__ additionalSignature center-align'
                                }
                            >
                                <a
                                    className="waves-effect waves-light btn"
                                    onClick={() =>
                                        this.setState({
                                            additionalSignatiure: !this.state.additionalSignatiure
                                        })
                                    }
                                >
                                    {this.state.additionalSignatiure
                                        ? 'Need additional signature HIDE'
                                        : 'Need additonal signature SHOW'}{' '}
                                </a>
                                <AdditionalSignature
                                    clicked={this.state.additionalSignatiure}
                                    additionalSignatureList={this.state.additionalSignatureList}
                                    saveSignature={this.saveSignature}
                                />
                            </div>
                            <AddedAdditionalSignaturesRender
                                listOfAddedSignature={this.state.additionalSignature}
                                listOfAdditionalSignature={this.state.additionalSignatureList}
                            />
                            <AddedDiscountRender listOfDiscounts={this.state.discount} />
                            <AdditionalChargesRender list={this.state.additionalCharge} />
                            {/* Finish rendering discounts */}
                            <div className="timeline">
                                <div className={is.isPayed ? 'hide' : ''}>
                                    <div className="center-align">
                                        <a
                                            id="start-work"
                                            onClick={() => {
                                                this.vaxtiBaslat(is._id);
                                            }}
                                            className={
                                                this.state.started
                                                    ? 'waves-effect waves-light btn blue disabled'
                                                    : 'waves-effect waves-light btn blue'
                                            }
                                        >
                                            Start Work time
                                        </a>
                                        <a className="waves-effect waves-light btn blue" />
                                        <a
                                            id="stop-work"
                                            onClick={() => {
                                                this.vaxtiDayandir(is._id);
                                            }}
                                            className={
                                                this.state.started &&
                                                (is.finishTime === undefined || is.finishTime === '' || is.finishTime === null) &&
                                                !this.state.drivingClicked &&
                                                !this.state.breakClicked
                                                    ? 'waves-effect waves-light btn red'
                                                    : 'waves-effect waves-light btn red disabled'
                                            }
                                        >
                                            Stop Work time
                                        </a>
                                    </div>
                                    <div className="center-align">
                                        <hr />
                                        Driving time
                                        <br />
                                        <a
                                            id="driving-start"
                                            className={
                                                this.state.drivingClicked || this.state.breakClicked
                                                    ? 'waves-effect waves-light btn blue disabled'
                                                    : 'waves-effect waves-light btn blue'
                                            }
                                            onClick={() => this.drivingTime(is._id)}
                                        >
                                            Start Driving time
                                        </a>
                                        <a className="waves-effect waves-light btn deep-purple lighten-1" />
                                        <a
                                            id="driving-stop"
                                            className={
                                                this.state.drivingClicked
                                                    ? 'waves-effect waves-light btn red'
                                                    : 'waves-effect waves-light btn red disabled'
                                            }
                                            onClick={() => this.drivingTimeStop(is._id)}
                                        >
                                            Stop Driving time
                                        </a>
                                    </div>
                                    <div className="center-align">
                                        <hr />
                                        Break
                                        <br />
                                        <a
                                            id="break-start"
                                            className={
                                                this.state.breakClicked || this.state.drivingClicked
                                                    ? 'waves-effect waves-light btn blue disabled'
                                                    : 'waves-effect waves-light btn blue'
                                            }
                                            onClick={() => this.breatTime(is._id)}
                                        >
                                            Start Break time
                                        </a>
                                        <a className="waves-effect waves-light btn pink" />
                                        <a
                                            id="break-stop"
                                            className={
                                                this.state.breakClicked
                                                    ? 'waves-effect waves-light btn red'
                                                    : 'waves-effect waves-light btn red disabled'
                                            }
                                            onClick={() => this.breakTimeStop(is._id)}
                                        >
                                            Stop Break time
                                        </a>
                                    </div>
                                </div>
                                {this.renderWorkTime()}
                                {this.renderDrivingTime()}
                                {this.renderBreakTime()}
                                {this.renderFinishTime()}
                            </div>
                            <div>
                                <ul className="collection elaveler">
                                    <li className="collection-item">
                                        Wardrobe Boxes:
                                        <span className="sag">
                                            $15 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="wardrobe-boxes"
                                                type="number"
                                                value={this.state.valueWardrobeBoxes ? this.state.valueWardrobeBoxes : ''}
                                                onChange={this.wardrobeBoxes}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.wardrobeBoxes}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Moving Blankets:
                                        <span className="sag">
                                            $15 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="moving-blankets"
                                                type="number"
                                                value={this.state.valueMovingBlankets ? this.state.valueMovingBlankets : ''}
                                                onChange={this.movingBlankets}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.movingBlankets}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Packing Paper Bundles:
                                        <span className="sag">
                                            $25 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="packing-paper-bundles"
                                                type="number"
                                                value={this.state.valuePaperBundles ? this.state.valuePaperBundles : ''}
                                                onChange={this.paperBundles}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.paperBundles}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Bubble Wrap Roll:
                                        <span className="sag">
                                            $45 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="buuble-wrap-roll"
                                                type="number"
                                                value={this.state.valueWrapRoll ? this.state.valueWrapRoll : ''}
                                                onChange={this.wrapRoll}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.wrapRoll}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Small Boxes:
                                        <span className="sag">
                                            $2 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="small-boxes"
                                                type="number"
                                                value={this.state.valueSmallBoxes ? this.state.valueSmallBoxes : ''}
                                                onChange={this.smallBoxes}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.smallBoxes}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Medium Boxes:
                                        <span className="sag">
                                            $3 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="medium-boxes"
                                                type="number"
                                                value={this.state.valueMediumBoxes ? this.state.valueMediumBoxes : ''}
                                                onChange={this.mediumBoxes}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.mediumBoxes}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Large Boxes:
                                        <span className="sag">
                                            $4 x{' '}
                                            <input
                                                disabled={is.isPayed}
                                                id="large-boxes"
                                                type="number"
                                                value={this.state.valueLargeBoxes ? this.state.valueLargeBoxes : ''}
                                                onChange={this.largeBoxes}
                                                placeholder="0"
                                            />{' '}
                                            = ${this.state.largeBoxes}
                                        </span>
                                    </li>
                                    <li className="collection-item">
                                        Total:
                                        <span className="sag">= ${this.state.totalPul || 0}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="collection kolleksiya">
                                    <li className="collection-item blue">
                                        Start to Finish:
                                        <span className="sag">= {is.totalWorkTime ? is.totalWorkTime.toFixed(2) : 0} hours</span>
                                    </li>
                                    <li className="collection-item blue">
                                        Driving Time:
                                        <span className="sag">
                                            ={' '}
                                            {(() => {
                                                if (isNaN(this.round(is.totalDrivingTime, 2))) {
                                                    return 0;
                                                } else {
                                                    return this.round(is.totalDrivingTime, 2);
                                                }
                                            })()}{' '}
                                            hours
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Double Drive Time:
                                        <span className="sag">
                                            ={' '}
                                            {(() => {
                                                if (is.doubleDrive === 'yes') {
                                                    if (isNaN(this.round(is.totalDrivingTime, 2))) {
                                                        return 0;
                                                    } else {
                                                        return this.round(is.totalDrivingTime, 2);
                                                    }
                                                } else {
                                                    return 0;
                                                }
                                            })()}{' '}
                                            hours
                                        </span>
                                    </li>
                                    <li className="collection-item qrm">
                                        Total Breaks Taken:
                                        <span className="sag">
                                            ={' '}
                                            {(() => {
                                                if (isNaN(this.round(is.totalBreakTime, 2))) {
                                                    return 0;
                                                } else {
                                                    return this.round(is.totalBreakTime, 2);
                                                }
                                            })()}{' '}
                                            hours
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Total calculated hours:
                                        <span className="sag">
                                            = {!isNaN(this.totalWorkLaborTime) ? this.totalWorkLaborTime : 0} hours
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Total Small Item Pck Supplies:
                                        <span className="sag">
                                            ={' '}
                                            {is.smallItemPacking && is.smallItemPacking < 0
                                                ? this.state.totalPul > 0
                                                    ? '$' + this.state.totalPul
                                                    : 'Yes'
                                                : is.smallItemPacking > 0
                                                ? '$' + (is.smallItemPacking + (this.state.totalPul ? this.state.totalPul : 0))
                                                : 'Waived'}
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Extra Large/Heavy Item Fee:
                                        <span className="sag">= ${is.largeItemFee}</span>
                                    </li>
                                    <li className={is.gasFee > 0 ? 'collection-item blue' : 'hide'}>
                                        Travel Fee :<span className="sag">= ${is.gasFee}</span>
                                    </li>
                                    <li className={this.totalAdditionalChargeAmount > 0 ? 'collection-item blue' : 'hide'}>
                                        Additional Charge:
                                        <span className="sag">= ${this.totalAdditionalChargeAmount || 0}</span>
                                    </li>
                                    <li
                                        className={
                                            this.totalDiscountAmount > 0 ||
                                            this.totalDiscountPercent > 0 ||
                                            this.totalDiscountPercent > 0
                                                ? 'collection-item blue'
                                                : 'hide'
                                        }
                                    >
                                        Discount:
                                        {this.totalDiscountTime && this.totalDiscountTime > 0 ? (
                                            <span className="sag discountYeri">{this.totalDiscountTime || 0} minutes</span>
                                        ) : (
                                            ''
                                        )}
                                        {this.totalDiscountPercent && this.totalDiscountPercent > 0 ? (
                                            <span className="sag discountYeri">{this.totalDiscountPercent || 0}%</span>
                                        ) : (
                                            ''
                                        )}
                                        {this.totalDiscountAmount && this.totalDiscountAmount > 0 ? (
                                            <span className="sag discountYeri">${this.totalDiscountAmount || 0}</span>
                                        ) : (
                                            ''
                                        )}
                                    </li>
                                    <li className="collection-item blue">
                                        Total amount cash:
                                        <span className="sag">
                                            = $
                                            {(() => {
                                                return isNaN(this.payCash) ? 0 : this.payCash;
                                            })()}
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Total amount card:
                                        <span className="sag">
                                            = $
                                            {(() => {
                                                return isNaN(this.payCard) ? 0 : this.payCard;
                                            })()}
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Deposit Paid:
                                        <span className="sag">= ${is.deposit || 0}</span>
                                    </li>
                                    <li className="collection-item blue">
                                        Grand Total Cash:
                                        <span className="sag">
                                            = $
                                            {!isNaN((this.payCash - is.deposit).toFixed(2))
                                                ? (this.payCash - is.deposit).toFixed(2)
                                                : 0}
                                        </span>
                                    </li>
                                    <li className="collection-item blue">
                                        Grand Total Card:
                                        <span className="sag">
                                            = $
                                            {!isNaN((this.payCard - is.deposit).toFixed(2))
                                                ? (this.payCard - is.deposit).toFixed(2)
                                                : 0}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div id="make-payment" className="card__">
                                <div className="cardTitle">Make the payment</div>
                                <div id="odenis-yeri">
                                    <div id="make-a-payment" className="row center-align">
                                        <div className="card_ col s12 m6 l6 center-align" style={{ height: '144px' }}>
                                            <a className="enter">Enter cash amount</a>
                                            {/* cash payment */}
                                            <div className="input-field">
                                                <input
                                                    id="cash"
                                                    type="number"
                                                    className=""
                                                    disabled={is.isPayed}
                                                    placeholder="enter cash amount"
                                                    onChange={e => this.hesabla('cash', e)}
                                                    value={is.cashPayed || (this.state.payCash > 0 ? this.state.payCash : '')}
                                                />
                                            </div>
                                        </div>
                                        <div className="card_ col s6 m6 l6 center-align" style={{ height: '144px' }}>
                                            <a className="enter">Enter card amount</a>
                                            {/* card payemnt */}
                                            <div className="input-field">
                                                <input
                                                    id="card"
                                                    type="number"
                                                    disabled={is.isPayed}
                                                    placeholder="enter card amount"
                                                    onChange={e => this.hesabla('card', e)}
                                                    value={is.cardPayed || (this.state.payCard > 0 ? this.state.payCard : '')}
                                                />
                                            </div>
                                            <div id="pay-card" className={is.isPayed && 'hide'} />
                                        </div>
                                        <div className="clear" />
                                        <div className="row" style={{ margin: '15px 0 0' }}>
                                            <a
                                                id="mark-as-payed"
                                                className={
                                                    is.isPayed
                                                        ? 'waves-effect waves-light btn disabled'
                                                        : 'waves-effect waves-light btn'
                                                }
                                                onClick={this.markPayed}
                                            >
                                                Mark as fully payed
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id="payed-full" className="center-align gizlet">
                                    <h5>Fully paid!</h5>
                                </div>
                            </div>
                            <div className="clear margin-top" />
                            <div
                                id="finel_step"
                                className={
                                    is.isPayed ? 'card__ center-align darken-2-text' : 'card__ center-align darken-2-text hide'
                                }
                            >
                                <div className="cardTitle red darken-3">
                                    I AGREE THAT MY MOVE IS COMPLETED AND ALL MY BELONGINGS ARE DELIVERED TO MY NEW PLACE.
                                </div>
                                {/* musteri signature */}
                                <div className="col s12 m6 l6">
                                    <p>Customer Sign below</p>
                                    <div className="wrapper">
                                        <canvas
                                            id="signature-pad1"
                                            className={is.lastSignCustomer ? 'hide' : 'signature-pad'}
                                            width={400}
                                            height={200}
                                        />
                                        <img
                                            id="last-sign-customer-img"
                                            className={is.lastSignCustomer ? '' : 'hide'}
                                            src={is.lastSignCustomer}
                                            width={400}
                                            height={200}
                                            style={{ zIndex: '0' }}
                                        />
                                    </div>
                                    <a id="clear" className="waves-effect waves-light btn clearing">
                                        Clear
                                    </a>
                                </div>
                                {/* isi goturenin signature */}
                                <div className="col s12 m6 l6">
                                    <p>Employee Sign below</p>
                                    <div className="wrapper">
                                        <canvas
                                            id="signature-pad"
                                            className={is.lastSignEmployee ? 'hide' : 'signature-pad'}
                                            width={400}
                                            height={200}
                                        />
                                        <img
                                            id="last-sign-employee-img"
                                            className={is.lastSignEmployee ? '' : 'hide'}
                                            src={is.lastSignEmployee}
                                            width={400}
                                            height={200}
                                            style={{ zIndex: '0' }}
                                        />
                                    </div>
                                    <a id="clear2" className="waves-effect waves-light btn clearing">
                                        Clear
                                    </a>
                                </div>
                                <p />
                                <div
                                    className={is.finished ? 'hide' : ' col s12 m12 l12 margin-top'}
                                    style={{ marginBottom: '20px' }}
                                >
                                    <a
                                        className={
                                            this.state.showFinish1 && this.state.showFinish2
                                                ? 'waves-effect waves-light btn blue'
                                                : 'waves-effect waves-light btn blue disabled'
                                        }
                                        onClick={this.finishJob}
                                    >
                                        Finish the Job
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Template.tablet.events({
    'click #close-duymesi-id': function() {
        Session.set('tabletIsId', '');
        ReactDOM.render(<TabletIsList />, document.getElementById('tablet-is-siyahi'));

        $('#tablet-is-siyahi').show();
        $('#tebler-render').hide();

        let inputs = document.getElementsByTagName('input');
        let buttons = document.getElementsByClassName('btn');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('disabled');
        }
    }
});

Template.tablet.onRendered(function() {
    ReactDOM.render(<TabletRender />, document.getElementById('tebler-render'));
});
