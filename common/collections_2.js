import { Schemas } from './work';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

const Collections = {};

Meteor.isClient && Template.registerHelper('Collections', Collections);
let PromoCodes = Collections.PromoCodes = new Mongo.Collection('PromoCodes');

export default WorkData = Collections.WorkData = new Mongo.Collection('WorkData');
export { PromoCodes };
WorkData.attachSchema(Schemas.workSchema);
