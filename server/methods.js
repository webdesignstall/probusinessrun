import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import WorkData from '../common/collections_2';
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
                throw new Meteor.Error(
                    'Error',
                    'Can\'t create information in the database'
                );
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
                        throw new Meteor.Error(
                            'Error',
                            'Can\'t update information. Please contact with the administration'
                        );
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
                subject: `${diff} more ${diff === 1 ? 'day' : 'days'}! Job #${
                    job.jobNumber
                }`,
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
                    throw new Meteor.Error(
                        '500',
                        'Can\'t send email. Please contact system adminstration'
                    );
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
            WorkData.update(
                { _id },
                { $set: { customerRate: rate, updates: oldJobUpdates } },
                err => {
                    console.error(err);
                }
            );
        },
        saveToPdf: function(canvas, id) {
            let htmlTemplate = pdfTemplate(canvas);
            let options = { format: 'Letter' };
            let job = WorkData.findOne({ _id: id });

            pdf.create(htmlTemplate, options).toStream((err, stream) => {
                if (err) {
                    console.error(err);
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
                        console.error('File Error', err);
                    });
                    uploadParams.Body = fileStream;

                    // call S3 to retrieve upload file to specified bucket
                    s3.upload(uploadParams, (err, data) => {
                        if (err) {
                            console.error('Error', err);
                        }
                        if (data) {
                            console.info(
                                'Upload Success: pdf for job: ' + id + ' ' + data.Location
                            );
                        }
                    });
                }
            });
        }
    });
}
