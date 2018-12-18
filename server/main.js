/*global process*/
import { Meteor } from 'meteor/meteor';
import email from 'emailjs';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';
import PromoCodes from '../common/collections_2';
import EmailContent from './EmailContent';
// import ReactDOMServer from 'react-dom/server';
// import EmailContent from './EmailContent';

Meteor.startup(() => {
    // prepare mailing server
    process.env.MAIL_URL = 'smtp://postmaster%40probusinessrun.com:6d0eb775d8a76c5f1efd0b02030ea3fa-e89319ab-67f4f8af@smtp.mailgun.org:587';
    // code to run on server at startup
    Meteor.publish('userData', function () {
        if (this.userId && Meteor.user().profile.rank === 'admin') {
            return Meteor.users.find({ 'profile.company': Meteor.userId(), 'profile.rank': 'mover' });
        } else {
            this.ready();
        }
    });
    Meteor.publish('tabletData', function () {
        if (this.userId && Meteor.user().profile.rank === 'admin') {
            return Meteor.users.find({ 'profile.company': Meteor.userId(), 'profile.rank': 'tablet' });
        } else {
            this.ready();
        }
    });

    const promoCode = PromoCodes.find({}).fetch();
    promoCode && promoCode.length < 1 ? PromoCodes.insert({
        list: ['zumka']
    }) : ''
});

if (Meteor.isServer) {
    Meteor.methods({
        duymeniVurma: function (id) {
            WorkData.update(id, {
                $set: {
                    clientName: Math.random()
                }
            });
        },

        isiSilmek: function (id) {
            WorkData.remove(id);
        },

        isciniSilmek: function (id) {
            Meteor.users.remove(id);
        },

        quotaniBazayaElaveEt: function (
            firstName,
            lastName,
            phone,
            phoneAdditional,
            email,
            addressesArray,
            movingDateConverted,
            price,
            minimumLaborTime,
            hourlyRatesCash,
            hourlyRatesCard,
            trucks,
            doubleDrive,
            gasFee,
            smallPackingItems,
            largeItemFee,
            jobNumber,
            movingSize,
            note,
            baza,
            workMustBeginTime,
            numberOfWorkers,
            trucksTemp,
            companyInfo,
            flatRate,
            flatRateCash,
            flatRateCard,
            comment) {
            WorkData.insert({
                quote: true,
                clientFirstName: firstName,
                clientLastName: lastName,
                phoneNumber: phone,
                phoneAdditional: phoneAdditional,
                email: email,
                addresses: addressesArray,
                workDate: movingDateConverted,
                movingSize: movingSize,
                note: note,
                workers: baza,
                confirmed: false,
                trucks: trucks,
                price: price,
                jobNumber: jobNumber,
                hourlyRatesCash: hourlyRatesCash,
                hourlyRatesCard: hourlyRatesCard,
                laborTime: minimumLaborTime,
                gasFee: gasFee,
                doubleDrive: doubleDrive,
                smallItemPacking: smallPackingItems,
                largeItemFee: largeItemFee,
                workMustBeginTime: workMustBeginTime,
                numberOfWorkers: numberOfWorkers,
                trucksTemp: trucksTemp,
                companyInfo: companyInfo,
                flatRate: [{
                    isTrue: flatRate,
                    cashAmount: flatRateCash,
                    cardAmount: flatRateCard
                }],
                comment
            });
        },

        emailGonder: function (job) {
            // servere qosulma
            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                host: job.companyInfo.smtp,
                timeout: 60000,
                // ssl: true,
            });

            // let data = ReactDOMServer.renderToString(<EmailContent job={job} />)


            //mesaji gonderme
            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Free Moving Quote for ' + job.firstName + ' ' + job.lastName,
                attachment:
                    [
                        {
                            data: EmailContent(job),
                            alternative: true
                        }
                    ]
            };
            this.x = false;

            server.send(message, function (err) {
                console.log(err);
            })

            // WorkData.update(
            //     {
            //         jobNumber: jobNumber
            //     },
            //     {
            //         $set: {
            //             emailSent: true
            //         }
            //     }
            // );
        },

        confirmationGonder: function (job) {
            WorkData.update(job._id, {
                $set: {
                    quote: false
                }
            });

            let server = email.server.connect({
                user: job.companyInfo.email,
                password: 'MCla7724!',
                timeout: 60000,
                host: job.companyInfo.smtp,
                // ssl: true
            });

            // let data = ReactDOMServer.renderToString(<EmailContent job={job} />)

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Confirmation email',
                attachment:
                    [
                        {
                            data: job, // TODO: burda confirmation zamani gonderilecek emailin html ini  duzeldib attach etmek lazimdir
                            alternative: true
                        }
                    ]
            };

            server.send(message, function (err) {
                console.log(err);
            });
        },

        saveEmployeeInfo: function (isinIdsi, value, iscininIdsi) {
            WorkData.update(
                { _id: isinIdsi, 'workers.id': iscininIdsi },
                { $set: { 'workers.$.payed': value } }
            );
        },

        updateWork: function (doc) {
            WorkData.update({ _id: doc._id }, {
                $set: doc
            }, function (error, result) {
                error ? console.log(error) : console.log(result);
            });
        },
        updateDiscount: function (doc, id) {
            Discounts.update(
                { _id: id }, {
                    $set: doc
                },
                function (error, result) {
                    error ? console.log(error) : console.log(result);
                });
        },
        removeDiscount: function (id) {
            Discounts.remove(id)
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
