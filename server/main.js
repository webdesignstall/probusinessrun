/*global process*/
import { Meteor } from 'meteor/meteor';
import email from 'emailjs';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';
import EmailContent from './EmailContent';
import ConfirmationEmail from './ConfirmationEmail';
import supervisorEmailContent from './supervisorEmailContent';
import squareConnect from 'square-connect';

import DifferenceCalculator from './DifferenceCalculator';
import depositPaymentEmail from './depositPaymentEmail';
import pdfToCustomer from './pdfToCustomer';

let config = require('../imports/helpers/config.json');

Meteor.startup(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    // const originalMeteorDebug = Meteor._debug;
    // Meteor._debug = (message, stack) => {
    //     if (Meteor.isDevelopment) {
    //         console.log('===== message =====', message);
    //         console.log('===== stack =====', stack);
    //     }

    //     return originalMeteorDebug.apply(this, arguments);
    // };

    WorkData.update(
        { addressExt: { $exists: false } },
        {
            $set: {
                addressExt: [
                    { checked: '', staris: '' },
                    { checked: '', staris: '' },
                    { checked: '', staris: '' },
                    { checked: '', staris: '' },
                    { checked: '', staris: '' }
                ]
            }
        },
        { multi: true }
    );
    // Set Square Connect credentials
    let defaultClient = squareConnect.ApiClient.instance;

    // Configure OAuth2 access token for authorization: oauth2
    let oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = config.squareAccessToken;

    // prepare mailing server
    process.env.MAIL_URL =
        'smtp://postmaster%40probusinessrun.com:6d0eb775d8a76c5f1efd0b02030ea3fa-e89319ab-67f4f8af@smtp.mailgun.org:587';
    // code to run on server at startup
    Meteor.publish('userData', function() {
        if ((this.userId && Meteor.user().profile.rank === 'admin') || Meteor.user().profile.rank === 'officeEmployee') {
            return Meteor.users.find({
                'profile.rank': 'mover'
            });
        } else {
            this.ready();
        }
    });
    Meteor.publish('tabletData', function() {
        if ((this.userId && Meteor.user().profile.rank === 'admin') || Meteor.user().profile.rank === 'officeEmployee') {
            return Meteor.users.find({
                'profile.rank': 'tablet'
            });
        } else {
            this.ready();
        }
    });

    // const promoCode = PromoCodes.find({}).fetch();
    // promoCode && promoCode.length < 1 ? PromoCodes.insert({
    //     list: ['zumka']
    // }) : ''
});

if (Meteor.isServer) {
    Meteor.methods({
        // duymeniVurma: function (id) {
        // //     WorkData.update(id, {
        // //         $set: {
        // //             clientName: Math.random()
        // //         }
        // //     });
        // // },

        isiSilmek: function(id) {
            WorkData.remove(id);
        },

        isciniSilmek: function(id) {
            Meteor.users.remove(id);
        },

        quotaniBazayaElaveEt: function(doc) {
            doc.statusChange = new Date();
            return WorkData.insert(doc, (err, id) => {
                if (err) {
                    console.error(`id: ${doc._id}`, err);
                    throw new Meteor.Error(
                        'Can not create new job',
                        'Error while creating new job. Pls Contact with the help desk. Reason: ' + err.message
                    );
                } else {
                    return id;
                }
            });
        },

        emailGonder: function(job) {
            // server connection
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                host: job.companyInfo.smtp,
                timeout: 60000,
                ssl: true
                // authentication: ['PLAIN', 'LOGIN', 'CRAM-MD5', 'XOAUTH2']
            });

            //sending email
            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: `Guaranteed Moving Estimate for ${job.clientFirstName || ' '} ${job.clientLastName || ''}`,
                attachment: [
                    {
                        data: EmailContent(job),
                        alternative: true
                    }
                ]
            };

            this.x = false;

            server.send(message, function(err) {
                if (err) {
                    console.error(`id: ${job._id}`, err);
                    throw new Meteor.Error("Can't send email", 'Impossible send email. Contact system administration');
                } else {
                    console.info('Email successfully sent to: ' + job.email);
                }
            });
        },

        confirmationGonder: function(job) {
            WorkData.update(job._id, {
                $set: {
                    clientFirstName: job.clientFirstName,
                    quote: false,
                    isFollowUp: true,
                    confirmed: true
                }
            });

            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                ssl: true
            });

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: `Moving Confirmation for ${job.clientFirstName || ''} ${job.clientLastName || ''}`,
                attachment: [
                    {
                        data: ConfirmationEmail(job),
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err) {
                err ? console.error(`id: ${job._id}`, err) : console.info('Email succesfully sent to: ' + job.email);
            });
        },

        saveEmployeeInfo: function(isinIdsi, value, iscininIdsi) {
            WorkData.update({ _id: isinIdsi, 'workers.id': iscininIdsi }, { $set: { 'workers.$.payed': value } });
        },

        updateWork: function(doc) {
            // console.log('Update information: ' + doc.ip + ' :', doc);

            if (doc.status === 'lost' && (doc.finalNote === 'none' || doc.finalNote === undefined)) {
                throw new Meteor.Error('Please select final note for lost job');
            }

            let job = WorkData.findOne({ _id: doc._id });
            let updates_ = doc.updates;
            let updates__ = job.updates;

            delete doc.updates;
            delete job.updates;

            // find differences
            let diff = DifferenceCalculator(job, doc);
            doc.updates = updates_;
            job.updates = updates__;
            if (diff && diff.length > 0) {
                // create object inside all information about changes
                let update = {
                    by: Meteor.userId() ? Meteor.userId() : 'customer',
                    date: new Date(),
                    changes: diff
                };

                // push update information into the doc
                if (job.updates) {
                    job.updates.push(update);
                    doc.updates = job.updates;
                } else {
                    doc.updates = [];
                    doc.updates.push(update);
                }
            }

            doc.status !== job.status ? (doc.statusChange = new Date()) : null;
            doc.status === 'won' && !doc.wonDate ? (doc.wonDate = new Date()) : null;
            doc.lastChange = new Date();

            WorkData.update(
                { _id: doc._id },
                {
                    $set: doc
                },
                function(error, result) {
                    if (error) {
                        console.error(`id: ${doc._id}`, error);
                        throw new Meteor.Error('Error updating', 'Reason: ' + error.message);
                    } else {
                        // console.info(result);
                    }
                }
            );
        },
        supervisorEmail: function(job) {
            console.log(job.flatRate);
            let server = email.server.connect({
                user: 'info@cheapmoverslosangeles.com',
                // user: job.companyInfo.email,
                // user: 'lamovingjobs@gmail.com',
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                ssl: true
            });

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' info@cheapmoverslosangeles.com',
                // from: job.companyInfo.name + ' ' + job.companyInfo.email,
                // to: 'movinglosangeles111@gmail.com',
                // to: 'joseph.khalilov@gmail.com',
                to: 'lamovingjobs@gmail.com',
                subject: 'Confirmation email',
                attachment: [
                    {
                        data: supervisorEmailContent(job),
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err) {
                if (err) {
                    console.error(`id: ${job._id}`, err);
                    throw new Meteor.Error('Impossible to send email to supervisor');
                } else {
                    console.info('Email successfully sent to supervisor');
                }
            });
        },
        pdfToCustomer: function(job, url) {
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                ssl: true
            });

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Copy of the contract for your move on ' + job.workDate,
                attachment: [
                    {
                        data: pdfToCustomer(url),
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err) {
                if (err) {
                    console.error(`id: ${job._id}`, err);
                    throw new Meteor.Error('Impossible to send contract email to customer');
                } else {
                    console.info('Email successfully sent to customer');
                }
            });
        },
        updateDiscount: function(doc, id) {
            Discounts.update(
                { _id: id },
                {
                    $set: doc
                },
                function(error, result) {
                    error ? console.error(`id: ${doc._id}`, error) : null;
                }
            );
        },

        removeDiscount: function(id) {
            Discounts.remove(id);
        },

        sendPaymentConfirmationEmail: function(obj) {
            let server = email.server.connect({
                user: 'info@cheapmoverslosangeles.com',
                // user: 'info@movingcompanylosangeles.com',
                password: 'MCla7724!',
                timeout: 60000,
                host: 'mail.cheapmoverslosangeles.com',
                ssl: true
            });

            let message = {
                // user: 'info@movingcompanylosangeles.com',
                text: ' ',
                from: 'ProBusinessRun <info@movingcompanylosangeles.com>',
                to: 'lamovingcom@gmail.com',
                subject: `${obj.clientFirstName} ${obj.clientLastName} payed $${obj.amount} deposit. Job Number:  ${obj.jobNumber}`,
                attachment: [
                    {
                        data: depositPaymentEmail(obj),
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err) {
                err
                    ? console.error(`id: ${obj._id}`, err)
                    : console.info('Info about payment successfully sent to administration email');
            });
        },
        emailToCardHolder: function(obj) {
            let server = email.server.connect({
                user: obj.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: obj.companyInfo.smtp,
                ssl: true
            });

            //sending email
            let message = {
                text: ' ',
                from: obj.companyInfo.name + ' <info@cheapmoverslosangeles.com>',
                to: obj.cardHolderInfo.email,
                subject: `Your have a request from ${obj.firstName} ${obj.lastName}`,
                attachment: [
                    {
                        data: `<!DOCTYPE html>
<html>
<head>
<title>Parcel Sandbox</title>
<meta charset="UTF-8">
</head>
<body>
<div>
<p>
Hello ${obj.cardHolderInfo.firstName} ${obj.cardHolderInfo.lastName},<br>
We have a move scheduled for ${obj.firstName} ${obj.lastName} on
${obj.movingDate}.<br>
${obj.firstName} ${obj.lastName}, wants you to pay for his/her moving
service bill. If you agree please go to the link and complete the form
in order to make the payment.<br>
</p>
<a id="app" href="http://probusinessrun.com/cardholder/${obj._id}" style="border: 1px solid rgb(160, 190, 255);padding: 3px 15px;border-radius: 4px;font-family: monospace;cursor: pointer;background-color: rgb(220, 245, 253);color: blue;text-decoration: none;">
click here continue to process
</a>
<p>
Thank you for your cooperation!<br>
${obj.companyInfo.name}<br>
${obj.companyInfo.phoneNumber}<br>
${obj.companyInfo.url}<br>
${obj.companyInfo.email}<br>
</p>
</div>
</body>
</html>
`,
                        alternative: true
                    }
                ]
            };

            server.send(message, function(err, message) {
                if (err) {
                    console.error(`Error while trying send email to cardholder. id: ${obj._id}` + err);
                    throw new Meteor.Error(
                        'Impossible to send email',
                        'Problem while sending email. Please chack email address.'
                    );
                } else {
                    console.info('Info about payment successfully sent to ' + obj.cardHolderInfo.email + ' email');
                }
            });
        }
    });
}

// Meteor ozu email gonderme
// Email.send({
//     to: 'joseph.khalilov@gmail.com',
//     from: 'from.address@email.com',
//     subject: 'Example Email',
//     text: 'The contents of our email in plain text.'
// });
