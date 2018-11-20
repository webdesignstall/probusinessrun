import {Schemas} from './work';
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Mongo} from 'meteor/mongo';

const Collections = {};

Meteor.isClient && Template.registerHelper('Collections', Collections);

export default WorkData = Collections.WorkData = new Mongo.Collection('WorkData');
WorkData.attachSchema(Schemas.workSchema);
