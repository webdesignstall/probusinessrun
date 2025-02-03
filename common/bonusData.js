import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

// Required AutoForm setup
// SimpleSchema.extendOptions(['autoform']);

//SimpleSchema.debug = true; //uncomment to help when developing, comment when deploying

const SchemaOfBonusSettings = {}; // schema for discount data

SchemaOfBonusSettings.bonusSettings = new SimpleSchema(
    {
        date: {
            type: String,
            optional: false,
            label: 'Month of assigned settings'
        },
        options: {
            type: Array,
            optional: false,
            label: 'All options data for bonuses'
        },
        'options.$': {
            type: Object,
            optional: false
        },
        'options.$.value': String,
        'options.$.name': String,
        'options.$.bonus': Number
    },
    { tracker: Tracker }
);

const DiscountData = {}; // discount data

Meteor.isClient && Template.registerHelper('SchemaOfBonusSettings', SchemaOfBonusSettings);
let BonusSettings = null;
export default BonusSettings = DiscountData.BonusSettings = new Mongo.Collection('BonusSettings');
BonusSettings.attachSchema(SchemaOfBonusSettings.bonusSettings);
