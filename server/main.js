/*global process*/
import { Meteor } from 'meteor/meteor';
import email from 'emailjs';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';
import PromoCodes from '../common/collections_2';
import EmailContent from './EmailContent';
import ConfirmationEmail from './ConfirmationEmail';
import supervisorEmailContent from './supervisorEmailContent';

Meteor.startup(() => {
    // prepare mailing server
    process.env.MAIL_URL =
        'smtp://postmaster%40probusinessrun.com:6d0eb775d8a76c5f1efd0b02030ea3fa-e89319ab-67f4f8af@smtp.mailgun.org:587';
    // code to run on server at startup
    Meteor.publish('userData', function() {
        if (this.userId && Meteor.user().profile.rank === 'admin') {
            return Meteor.users.find({
                'profile.company': Meteor.userId(),
                'profile.rank': 'mover',
            });
        } else {
            this.ready();
        }
    });
    Meteor.publish('tabletData', function() {
        if (this.userId && Meteor.user().profile.rank === 'admin') {
            return Meteor.users.find({
                'profile.company': Meteor.userId(),
                'profile.rank': 'tablet',
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
        duymeniVurma: function(id) {
            WorkData.update(id, {
                $set: {
                    clientName: Math.random(),
                },
            });
        },

        isiSilmek: function(id) {
            WorkData.remove(id);
        },

        isciniSilmek: function(id) {
            Meteor.users.remove(id);
        },

        quotaniBazayaElaveEt: function(doc) {
            WorkData.insert(doc);
        },

        emailGonder: function(job) {
            // server connection
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                host: job.companyInfo.smtp,
                timeout: 60000,
                // ssl: true,
            });

            //sending email
            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Guaranteed Moving Estimate for ' + job.firstName + ' ' + job.lastName,
                attachment: [
                    {
                        data: EmailContent(job),
                        alternative: true,
                    },
                ],
            };
            this.x = false;

            server.send(message, function(err) {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error('Can\'t send email', 'Impossible send email. Contact system administration');
                } else {
                    console.log('Email successfully sent to: ' + job.email);
                }
            });
        },

        confirmationGonder: function(job) {
            WorkData.update(job._id, {
                $set: {
                    clientFirstName: job.clientFirstName,
                    quote: false,
                    isFollowUp: true,
                    confirmed: true,
                },
            });

            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                // ssl: true
            });

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Confirmation email',
                attachment: [
                    {
                        data: ConfirmationEmail(job),
                        alternative: true,
                    },
                ],
            };

            server.send(message, function(err) {
                err ? console.log(err) : console.log('Email succesfully sent to: ' + job.email);
            });
        },

        saveEmployeeInfo: function(isinIdsi, value, iscininIdsi) {
            WorkData.update({ _id: isinIdsi, 'workers.id': iscininIdsi }, { $set: { 'workers.$.payed': value } });
        },

        updateWork: function(doc) {
            if (doc.status === 'lost' && (doc.finalNote === 'none' || doc.finalNote === undefined)) {
                throw new Meteor.Error('Please select final note for lost job');
            }
            WorkData.update(
                { _id: doc._id },
                {
                    $set: doc,
                },
                function(error, result) {
                    if (error) {
                        console.log(error);
                        throw new Meteor.Error('Error updating', 'Reason: ' + error.message);
                    } else {
                        console.log(result);
                    }
                },
            );
        },
        supervisorEmail: function(job) {
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                // ssl: true
            });

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: 'movinglosangeles111@gmail.com',
                subject: 'Confirmation email',
                attachment: [
                    {
                        data: supervisorEmailContent(job),
                        alternative: true,
                    },
                ],
            };

            server.send(message, function(err, message) {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error('Imposible to send email to supervisor');
                } else {
                    console.log('Email succesfully sent to supervisor');
                }
            });
        },
        updateDiscount: function(doc, id) {
            Discounts.update(
                { _id: id },
                {
                    $set: doc,
                },
                function(error, result) {
                    error ? console.log(error) : console.log(result);
                },
            );
        },
        removeDiscount: function(id) {
            Discounts.remove(id);
        },
    });
}

// Meteor ozu email gonderme
// Email.send({
//     to: 'joseph.khalilov@gmail.com',
//     from: 'from.address@email.com',
//     subject: 'Example Email',
//     text: 'The contents of our email in plain text.'
// });
