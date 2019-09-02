import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import WorkData from '../common/collections_2';
import email from 'emailjs';

/*global moment*/

if (Meteor.isServer) {
    Meteor.methods({
        // remove user
        removeUser: function(id) {
            Meteor.users.remove(id);
        },
        // add user
        addUserOrTruck: function(obj) {
            let userInfo = Accounts.createUser(obj);
            if (userInfo) {
                return userInfo;
            } else {
                throw new Meteor.Error('Error', 'Can\'t create information in the database');
            }
        },
        updateUserOrTruck: function(id, obj) {
            Meteor.users.update(
                { _id: id },
                {
                    $set: {
                        profile: obj
                    }
                },
                err => {
                    if (err) {
                        console.error(err);
                        throw new Meteor.Error('Error', 'Can\'t update information. Please contact with the administration');
                    }
                }
            );
        },
        checkId: function(id) {
            let list = WorkData.find({ _id: id }).fetch();
            if (list.length > 0) {
                return list[0];
            } else {
                return false;
            }
        },
        officeEmployees: function() {
            return Meteor.users.find({ 'profile.rank': 'officeEmployee' }).fetch();
        },
        employees: function() {
            return Meteor.users.find({}).fetch();
        },
        findJobEx: function(param) {
            let data = WorkData.find(param || {}).fetch();
            return data;
        },
        findJobNumber: function(jobNumber) {
            return WorkData.findOne({ jobNumber });
        },
        findJobID: function(_id) {
            return WorkData.findOne({ _id });
        },
        followUpEmail: function(job, template) {
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp
                // ssl: true
            });

            let workDate = moment(job.workDate);
            let today = moment(new Date());

            let diff = workDate.diff(today, 'days');

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: `${diff} more ${diff === 1 ? 'day' : 'days'}! Job #${job.jobNumber}`,
                attachment: [
                    {
                        data: template,
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err) {
                if (err) {
                    console.error(err);
                    throw new Meteor.Error('500', 'Can\'t send email. Please contact system adminstration');
                }
                console.info('Follow up Email succesfully sent to: ' + job.email);
            });
        },
        rate: function(_id, rate, oldRate) {
            let job = WorkData.findOne({ _id });
            let oldJobUpdates = job.updates || [];
            let updates = {
                by: Meteor.userId(),
                date: new Date(),
                changes: [
                    {
                        kind: 'E',
                        path: ['customerRate'],
                        lhs: oldRate,
                        rhs: rate
                    }
                ]
            };
            oldJobUpdates.push(updates);
            WorkData.update({ _id }, { $set: { customerRate: rate, updates: oldJobUpdates } }, err => {
                console.error(err);
            });
        }
    });
}
