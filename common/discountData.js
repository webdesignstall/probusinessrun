import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

// Required AutoForm setup
// SimpleSchema.extendOptions(['autoform']);

//SimpleSchema.debug = true; //uncomment to help when developing, comment when deploying

const SchemasOfDiscount = {}; // schema for discount data

SchemasOfDiscount.discounts = new SimpleSchema(
    {
        amount: {
            type: Number,
            optional: true
        },
        note: {
            type: String,
            optional: true,
            label: 'Note'
        },
        type: {
            type: String,
            optional: true,
            label: 'Type of discount'
        },
        confirmed: {
            type: Boolean,
            optional: true
        },
        truckNumber: {
            type: String,
            optional: true
        },
        responded: {
            type: Boolean,
            optional: true
        }
    },
    { tracker: Tracker }
);

const DiscountData = {}; // discount data

Meteor.isClient && Template.registerHelper('SchemasOfDiscount', SchemasOfDiscount);
export default Discounts = DiscountData.Discounts = new Mongo.Collection('Discounts');
Discounts.attachSchema(SchemasOfDiscount.discounts);
