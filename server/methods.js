import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import WorkData from '../common/collections_2';
import BonusSettings from '../common/bonusData';
import email from 'emailjs';
import pdfTemplate from './htmlToPDFTemplate';
import AWS from 'aws-sdk';
import pdf from 'html-pdf';
// Set the region
AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'AKIAT6GWTJD2WI5MB5FA',
    secretAccessKey: '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'
});

// Create S3 service object
let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

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
                throw new Meteor.Error('Error', "Can't create information in the database");
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
                        console.error(`id: ${obj._id}`, err);
                        throw new Meteor.Error('Error', "Can't update information. Please contact with the administration");
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
                host: job.companyInfo.smtp,
                ssl: true
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
                    console.error(`id: ${job._id}`, err);
                    throw new Meteor.Error('500', "Can't send email. Please contact system adminstration");
                }
                console.info('Follow up Email succesfully sent to: ' + job.email);
            });
        },
        rate: function(_id, rate) {
            let job = WorkData.findOne({ _id });
            let oldRate = job.customerRate || 0;
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
                console.error(`id: ${_id}`, err);
            });
        },
        saveBonusSettings: function(_id, settings) {
            BonusSettings.update({ _id }, { $set: { options: settings } }, err => {
                if (err) {
                    console.error(`id: ${_id}`, err);
                    throw new Meteor.Error('Error while saving settings');
                }
            });
        },
        saveSmallItemPacking: function(value, what, id) {
            WorkData.update({ _id: id }, { $set: { [what]: value } });
        },
        saveToPdf: function(canvas, id) {
            let htmlTemplate = pdfTemplate(canvas);
            let options = { format: 'Letter' };

            pdf.create(htmlTemplate, options).toStream((err, stream) => {
                if (err) {
                    console.error(`id: ${id}`, err);
                } else {
                    console.info('pdf file created successfully for id:' + id);

                    // call S3 to retrieve upload file to specified bucket
                    var uploadParams = {
                        Bucket: 'probusinessrun.finished.jobs.pdf',
                        Key: id + '.pdf',
                        Body: ''
                    };

                    // Configure the file stream and obtain the upload parameters
                    var fileStream = stream;
                    fileStream.on('error', function(err) {
                        console.error(`File error on id: ${id}`, err);
                    });
                    uploadParams.Body = fileStream;

                    // call S3 to retrieve upload file to specified bucket
                    s3.upload(uploadParams, (err, data) => {
                        if (err) {
                            console.error(`Error to upload file to S3 server on id: ${id}`, err);
                        }
                        if (data) {
                            console.info('Upload Success: pdf for job: ' + id + ' ' + data.Location);
                        }
                    });
                }
            });
        },
        cardHolderPDF: function(canvas, id, nameOfpdf) {
            let htmlTemplate = pdfTemplate(canvas);
            let options = { format: 'Letter' };

            pdf.create(htmlTemplate, options).toStream((err, stream) => {
                if (err) {
                    console.error(`id: ${id}`, err);
                } else {
                    console.info('pdf file created successfully for cardholder in id:' + id);

                    // call S3 to retrieve upload file to specified bucket
                    var uploadParams = {
                        Bucket: 'probusinessrun.finished.jobs.pdf',
                        Key: nameOfpdf,
                        Body: ''
                    };

                    // Configure the file stream and obtain the upload parameters
                    var fileStream = stream;
                    fileStream.on('error', function(err) {
                        console.error(`Error while uploading file on id: ${id}`, err);
                    });
                    uploadParams.Body = fileStream;

                    // call S3 to retrieve upload file to specified bucket
                    s3.upload(uploadParams, (err, data) => {
                        if (err) {
                            console.error(`id: ${id}`, err);
                        }
                        if (data) {
                            console.info('Upload Success: cardholder pdf for job: ' + id + ' ' + data.Location);
                        }
                    });
                }
            });
        },
        createBonusSettings: function() {
            let dateForSettings = `${new Date().getMonth()}/01/${new Date().getFullYear()}`;
            let countFoundedeData = BonusSettings.find({
                date: dateForSettings
            }).fetch();

            if (!(countFoundedeData.length > 0)) {
                BonusSettings.insert({
                    date: dateForSettings,
                    options: [
                        {
                            value: 'limit',
                            name: 'Jobs Limit',
                            bonus: 200
                        },
                        {
                            value: 'items',
                            name: 'Items',
                            bonus: 0
                        },
                        {
                            value: 'studio',
                            name: 'Studio',
                            bonus: 0
                        },
                        {
                            value: '1_bedroom',
                            name: '1 Bedroom',
                            bonus: 0
                        },
                        {
                            value: '2_bedroom_small',
                            name: '2 Bedroom (small size, few items)',
                            bonus: 0
                        },
                        {
                            value: '2_bedroom_avg',
                            name: '2 Bedroom (avg. size, avg. items)',
                            bonus: 0
                        },
                        {
                            value: '2_bedroom_large',
                            name: '2 Bedroom (large size, many items)',
                            bonus: 0
                        },
                        {
                            value: '3_bedroom_avg',
                            name: '3 Bedroom (avg. size, avg. items)',
                            bonus: 0
                        },
                        {
                            value: '3_bedroom_large',
                            name: '3 Bedroom (large size, many items)',
                            bonus: 0
                        },
                        {
                            value: '4_bedrooom_avg',
                            name: '4 Bedrooms (avg. size, avg. items)',
                            bonus: 0
                        },
                        {
                            value: '4_bedroom_large',
                            name: '4 Bedrooms (large size, many items)',
                            bonus: 0
                        },
                        {
                            value: '5_bedroom_avarage',
                            name: '5 Bedrooms (avarage size, avg items)',
                            bonus: 0
                        },
                        {
                            value: 'commercial_sml',
                            name: 'Commercial (small size, few items)',
                            bonus: 0
                        },
                        {
                            value: 'commercial_avg',
                            name: 'Commercial (avg. size, avg. items)',
                            bonus: 0
                        },
                        {
                            value: 'commercial_large',
                            name: 'Commercial (large size, many items)',
                            bonus: 0
                        },
                        {
                            value: 'long_distance_moves',
                            name: 'Long Distance Moves',
                            bonus: 0
                        }
                    ]
                });
            }
        }
    });
}
