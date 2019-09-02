import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

//SimpleSchema.debug = true; //uncomment to help when developing, comment when deploying

export const Schemas = {};

Meteor.isClient && Template.registerHelper('Schemas', Schemas);

Schemas.workSchema = new SimpleSchema(
    {
        clientFirstName: {
            type: String,
            label: 'Client First Name',
            max: 200,
            optional: true,
            autoform: {
                class: ''
            }
        },
        clientLastName: {
            type: String,
            label: 'Client Last Name',
            max: 200,
            optional: true,
            autoform: {
                class: ''
            }
        },
        workDate: {
            type: String,
            label: 'Moving Date',
            optional: true,
            autoform: {
                class: '',
                placeholder: 'Click and select date'
            }
        },
        phoneNumber: {
            type: String,
            optional: true
        },
        phoneAdditional: {
            type: String,
            label: 'Additional Phone number',
            optional: true
        },
        addresses: {
            type: Array
        },
        'addresses.$': {
            type: String,
            optional: true,
            label: 'Addresses',
            minCount: 1
        },
        workers: {
            type: Array,
            optional: true
        },
        'workers.$': {
            type: Object,
            optional: true
        },
        'workers.$.id': {
            type: String,
            label: 'Worker ID',
            optional: true,
            minCount: 1,
            autoValue: function() {
                let iscilerinBazasi = this.value;
                let ikiNoqteninYeri;
                let tamId;
                if (iscilerinBazasi) {
                    ikiNoqteninYeri = iscilerinBazasi.indexOf(':') + 1;
                    tamId = iscilerinBazasi.substr(ikiNoqteninYeri, iscilerinBazasi.length).trim();
                }

                return tamId;
            }
        },
        numberOfWorkers: {
            type: Number,
            optional: true
        },
        comment: {
            type: String,
            optional: true
        },
        trucks: {
            type: Array,
            optional: true
        },
        'trucks.$': {
            type: Object,
            optional: true
        },
        'trucks.$.truck': {
            type: Number,
            optional: true
        },
        price: {
            type: Number,
            label: 'Price',
            optional: true
        },
        workTime: {
            type: Number,
            label: 'How long it will take to finish work',
            optional: true
        },

        // Isin baslama araliqi
        workMustBeginTime: {
            type: Array,
            optional: true,
            label: 'Arriving time window'
        },
        'workMustBeginTime.$': {
            type: String
        },
        // should it display in quote menu
        quote: {
            type: Boolean,
            optional: true
        },
        // is the job confirmed
        confirmed: {
            type: Boolean,
            optional: true,
            autoform: {
                type: 'hidden',
                display: 'none'
            }
        },
        isFollowUp: {
            type: Boolean,
            optional: true
        },
        company: {
            type: String,
            autoValue: function() {
                return this.userId;
            },
            autoform: {
                type: 'hidden',
                display: 'none'
            },
            optional: true
        },
        packDate: {
            type: Date,
            label: 'Packing date',
            optional: true
        },
        jobNumber: {
            type: String,
            label: 'Job Number'
        },
        email: {
            type: String,
            label: 'Email',
            optional: true
        },
        movingSize: {
            type: String,
            label: 'Moving size',
            optional: true
        },
        numberOfTheCompanyMovers: {
            type: Number,
            optional: true,
            label: 'Number of the company movers'
        },
        note: {
            type: String,
            optional: true
        },
        startTime: {
            type: Date,
            label: 'Work start time',
            optional: true
        },
        finishTime: {
            type: Date,
            label: 'Work start time',
            optional: true
        },
        totalWorkTime: {
            type: Number,
            label: 'Total worked time',
            optional: true
        },
        totalWorkHours: {
            type: Number,
            label: 'Total worked hours',
            optional: true
        },
        breakTime: {
            type: Array,
            label: 'Driving time',
            optional: true
        },
        'breakTime.$': {
            type: Object,
            optional: true
        },
        'breakTime.$.startTime': {
            type: Date,
            optional: true
        },
        'breakTime.$.endTime': {
            type: Date,
            optional: true
        },
        'breakTime.$.totalTime': {
            type: Number,
            optional: true
        },
        drivingTime: {
            type: Array,
            label: 'Driving time',
            optional: true
        },
        'drivingTime.$': {
            type: Object,
            optional: true
        },
        'drivingTime.$.startTime': {
            type: Date,
            optional: true
        },
        'drivingTime.$.endTime': {
            type: Date,
            optional: true
        },
        'drivingTime.$.totalTime': {
            type: Number,
            optional: true
        },
        initSign: {
            type: String,
            optional: true
        },
        initFullName: {
            type: String,
            optional: true
        },
        initSignDate: {
            type: Date,
            optional: true
        },
        finalSign: {
            type: String,
            optional: true
        },
        finalEmployeeSign: {
            type: String,
            optional: true
        },
        totalBreakTime: {
            type: Number,
            optional: true
        },
        totalDrivingTime: {
            type: Number,
            optional: true
        },
        totalDoubleDrive: {
            type: Number,
            optional: true
        },
        payedCash: {
            type: Number,
            optional: true
        },
        payedCard: {
            type: Number,
            optional: true
        },
        muveqqetiYaddas: {
            type: Date,
            optional: true
        },
        hourlyRatesCash: {
            type: Number,
            optional: true,
            label: 'Hourly rates'
        },
        hourlyRatesCard: {
            type: Number,
            optional: true,
            label: 'Hourly rates'
        },
        laborTime: {
            type: Number,
            optional: true,
            label: 'Minimum labor time'
        },
        gasFee: {
            type: Number,
            optional: true,
            label: 'Travel Fee'
        },
        doubleDrive: {
            type: String,
            optional: true,
            label: 'Double Drive'
        },
        deposit: {
            type: Number,
            optional: true
        },
        smallItemPacking: {
            type: Number,
            optional: true,
            label: 'Small Item Packing'
        },
        largeItemFee: {
            type: Number,
            optional: true,
            label: 'Large item fee'
        },
        cardPayed: {
            type: Number,
            optional: true,
            label: 'Card payed amount'
        },
        cashPayed: {
            type: Number,
            optional: true,
            label: 'Cash payed amount'
        },
        finished: {
            type: Boolean,
            optional: true
        },
        initialSignAlphabet: {
            type: String,
            optional: true
        },
        requirementEntirely: {
            type: Boolean,
            optional: true
        },
        threeDayPrior: {
            type: Boolean,
            optional: true
        },
        lastSignCustomer: {
            type: String,
            optional: true
        },
        lastSignEmployee: {
            type: String,
            optional: true
        },
        companyInfo: {
            type: Object,
            optional: false
        },
        'companyInfo.name': {
            type: String,
            optional: false
        },
        'companyInfo.phoneNumber': {
            type: String,
            optional: false
        },
        'companyInfo.url': {
            type: String,
            optional: false
        },
        'companyInfo.email': {
            type: String,
            optional: false
        },
        'companyInfo.smtp': {
            type: String,
            optional: true
        },
        'companyInfo.userName': {
            type: String,
            optional: true
        },
        'companyInfo.password': {
            type: String,
            optional: true
        },
        'companyInfo.key': {
            type: String,
            optional: true
        },
        wardrobeBoxes: {
            type: Number,
            optional: true
        },
        movingBlankets: {
            type: Number,
            optional: true
        },
        packingPaperBundles: {
            type: Number,
            optional: true
        },
        bundleWrapRoll: {
            type: Number,
            optional: true
        },
        smallBoxes: {
            type: Number,
            optional: true
        },
        mediumBoxes: {
            type: Number,
            optional: true
        },
        largeBoxes: {
            type: Number,
            optional: true
        },
        emailSent: {
            type: Boolean,
            optional: true
        },
        emailSentDate: {
            type: Date,
            optional: true
        },
        trucksTemp: {
            type: Array,
            optional: true
        },
        'trucksTemp.$': {
            type: Object,
            optional: true
        },
        'trucksTemp.$.size': {
            type: String,
            optional: true
        },
        'trucksTemp.$.qty': {
            type: Number,
            optional: true
        },
        flatRate: {
            type: Array,
            label: 'Driving time',
            optional: true
        },
        'flatRate.$': {
            type: Object,
            optional: true
        },
        'flatRate.$.isTrue': {
            type: Boolean,
            optional: true
        },
        'flatRate.$.cashAmount': {
            type: Number,
            optional: true
        },
        'flatRate.$.cardAmount': {
            type: Number,
            optional: true
        },
        additionalSignature: {
            type: Array,
            optional: true
        },
        'additionalSignature.$': {
            type: Object,
            optional: true
        },
        'additionalSignature.$.date': {
            type: Date,
            optional: true
        },
        'additionalSignature.$.fullname': {
            type: String,
            optional: true
        },
        'additionalSignature.$.signature': {
            type: String,
            optional: true
        },
        'additionalSignature.$.typeId': {
            type: String,
            optional: true
        },
        discount: {
            type: Array,
            optional: true
        },
        'discount.$': {
            type: Object,
            optional: true
        },
        'discount.$.type': {
            type: String,
            optional: true
        },
        'discount.$.amount': {
            type: Number,
            optional: true
        },
        'discount.$.signature': {
            type: String,
            optional: true
        },
        'discount.$.date': {
            type: Date,
            optional: true
        },
        'discount.$.fullname': {
            type: String,
            optional: true
        },
        'discount.$.note': {
            type: String,
            optional: true
        },
        additionalCharge: {
            type: Array,
            optional: true
        },
        'additionalCharge.$': {
            type: Object,
            optional: true
        },
        'additionalCharge.$.fullname': {
            type: String,
            optional: true
        },
        'additionalCharge.$.reason': {
            type: String,
            optional: true
        },
        'additionalCharge.$.signature': {
            type: String,
            optional: true
        },
        'additionalCharge.$.date': {
            type: Date,
            optional: true
        },
        'additionalCharge.$.amount': {
            type: Number,
            optional: true
        },
        takenBy: {
            type: String,
            optional: false
        },
        drivingClicked: {
            type: Boolean,
            defaultValue: false
        },
        breakClicked: {
            type: Boolean,
            defaultValue: false
        },
        additionalContacts: {
            type: Array,
            optional: true
        },
        'additionalContacts.$': {
            type: Object,
            optional: true
        },
        'additionalContacts.$.firstName': {
            type: String,
            optional: true
        },
        'additionalContacts.$.lastName': {
            type: String,
            optional: true
        },
        'additionalContacts.$.phoneNumber': {
            type: String,
            optional: true
        },
        'additionalContacts.$.additionalPhoneNumber': {
            type: String,
            optional: true
        },
        quoteDate: {
            type: Date,
            optional: false
        },
        checks: {
            type: Object,
            optional: true
        },
        'checks.packMater': {
            type: Boolean,
            optional: true
        },
        'checks.cargoIsSubject': {
            type: Boolean,
            optional: true
        },
        'checks.myResponsibility': {
            type: Boolean,
            optional: true
        },
        initialized: {
            type: Boolean,
            optional: true
        },
        sourceOfLeads: {
            type: String,
            optional: true
        },
        status: {
            type: String,
            optional: true
        },
        followUp: {
            type: Array,
            optional: true
        },
        'followUp.$': {
            type: Object,
            optional: true
        },
        'followUp.$.note': {
            type: String,
            optional: true
        },
        'followUp.$.date': {
            type: Date,
            optional: true
        },
        finalNote: {
            type: Object,
            optional: true
        },
        'finalNote.reason': {
            type: String,
            optional: true
        },
        'finalNote.other': {
            type: Boolean,
            optional: true
        },
        'finalNote.otherNote': {
            type: String,
            optional: true
        },
        totalDistance: {
            type: Number,
            optional: true
        },
        valuationOption: {
            type: Object,
            optional: true
        },
        'valuationOption.initial': {
            type: String,
            optional: true
        },
        'valuationOption.typeNumber': {
            type: Number,
            optional: true
        },
        isPayed: {
            type: Boolean,
            optional: true
        },
        quoteExpirationDate: {
            type: Date,
            optional: true
        },
        expireHour: {
            type: Number,
            optional: true
        },
        lastChange: {
            type: Date,
            optional: true
        },
        statusChange: {
            type: Date,
            optional: true
        },
        noteForYourMove: {
            type: String,
            optional: true
        },
        additionalInfo: {
            type: Array,
            optional: true
        },
        'additionalInfo.$': {
            type: String,
            optional: true
        },
        wonDate: {
            type: Date,
            optional: true
        },
        cardHolderInfo: {
            type: Object,
            optional: true
        },
        'cardHolderInfo.email': {
            type: String,
            optional: true
        },
        'cardHolderInfo.firstName': {
            type: String,
            optional: true
        },
        'cardHolderInfo.lastName': {
            type: String,
            optional: true
        },
        'cardHolderInfo.typedFirstName': {
            type: String,
            optional: true
        },
        'cardHolderInfo.typedLastName': {
            type: String,
            optional: true
        },
        'cardHolderInfo.nameOnCard': {
            type: String,
            optional: true
        },
        'cardHolderInfo.billingAddress': {
            type: String,
            optional: true
        },
        'cardHolderInfo.creditCardType': {
            type: String,
            optional: true
        },
        'cardHolderInfo.creditCardNumber': {
            type: Number,
            optional: true
        },
        'cardHolderInfo.expirationDate': {
            type: String,
            optional: true
        },
        'cardHolderInfo.cardId': {
            type: String,
            optional: true
        },
        'cardHolderInfo.cardFront': {
            type: String,
            optional: true
        },
        'cardHolderInfo.cardBack': {
            type: String,
            optional: true
        },
        'cardHolderInfo.cardHolderId': {
            type: String,
            optional: true
        },
        'cardHolderInfo.agreement': {
            type: Boolean,
            optional: true
        },
        finishedJobPDF: {
            type: String,
            optional: true
        },
        ip: {
            type: String,
            optional: true
        },
        updates: {
            type: Array,
            optional: true
        },
        'updates.$': {
            type: Object,
            optional: true,
            blackbox: true
        },
        label: {
            type: Object,
            optional: true
        },
        'label.name': {
            type: String,
            optional: true
        },
        'label.color': {
            type: String,
            optional: true
        },
        customerRate: {
            type: Number,
            optional: true
        },
        noteForMovers: {
            type: String,
            optional: true
        }
    },
    { tracker: Tracker }
);
