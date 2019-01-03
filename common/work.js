import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

//SimpleSchema.debug = true; //uncomment to help when developing, comment when deploying

export const Schemas = {};

Meteor.isClient && Template.registerHelper('Schemas', Schemas);

//todo isin bolmelerini doldur
Schemas.workSchema = new SimpleSchema({
    clientFirstName: {
        type: String,
        label: 'Client First Name',
        max: 200,
        autoform: {
            class: ''
        }
    },
    clientLastName: {
        type: String,
        label: 'Client Last Name',
        max: 200,
        autoform: {
            class: ''
        }
    },
    workDate: {
        type: String,
        label: 'Moving Date',
        // optional: true,
        autoform: {
            class: '',
            placeholder: 'Click and select date'
        }
    },
    phoneNumber: {
        type: Number,
    },
    'phoneAdditional': {
        type: Number,
        label: 'Additional Phone number',
        optional: true
    },
    addresses: {
        type: Array,
    },
    'addresses.$': {
        type: String,
        label: 'Addresses',
        minCount: 1
    },
    workers: {
        type: Array,
        optional: true,
    },
    'workers.$': {
        type: Object,
        optional: true,
    },
    'workers.$.id': {
        type: String,
        label: 'Worker ID',
        minCount: 1,
        autoValue: function () {
            let iscilerinBazasi = this.value;
            let ikiNoqteninYeri;
            let tamId;
            if (iscilerinBazasi) {
                ikiNoqteninYeri = iscilerinBazasi.indexOf(':') + 1;
                tamId = iscilerinBazasi.substr(ikiNoqteninYeri, iscilerinBazasi.length).trim();

            }

            return (tamId);
        }
    },
    numberOfWorkers: {
        type: Number,
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
        type: String,
        label: 'Arriving time window',
    },
    //quote olduqunu tesdiqleyir
    quote: {
        type: Boolean,
        optional: true
    },
    company: {
        type: String,
        autoValue: function () {
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
        label: 'Email'
    },
    movingSize: {
        type: String,
        label: 'Moving size'
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
    //quote edildikden sonra bunun true olmasi gerekir ve confirmationu gozlemek qalir
    //confirmationdan sonra 
    confirmed: {
        type: Boolean,
        autoform: {
            type: 'hidden',
            display: 'none'
        }
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
        optional: true,
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
        optional: true,
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
    'muveqqetiYaddas': {
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
        label: 'Gas fee'
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
        optional: true
    },
    'companyInfo.name': {
        type: String,
    },
    'companyInfo.email': {
        type: String,
        optional: true
    },
    'companyInfo.smtp': {
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
    'wardrobeBoxes': {
        type: Number,
        optional: true
    },
    'movingBlankets': {
        type: Number,
        optional: true
    },
    'packingPaperBundles': {
        type: Number,
        optional: true
    },
    'bundleWrapRoll': {
        type: Number,
        optional: true
    },
    'smallBoxes': {
        type: Number,
        optional: true
    },
    'mediumBoxes': {
        type: Number,
        optional: true
    },
    'largeBoxes': {
        type: Number,
        optional: true
    },
    'emailSent': {
        type: Boolean,
        optional: true
    },
    'trucksTemp': {
        type: Array,
        optional: true
    },
    'trucksTemp.$': {
        type: String,
        optional: true
    },
    flatRate: {
        type: Array,
        label: 'Driving time',
        optional: true
    },
    'flatRate.$': {
        type: Object,
        optional: true,
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
        optional: true,
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
    }
}, { tracker: Tracker });
