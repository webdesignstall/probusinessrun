/*global process*/
import { Meteor } from 'meteor/meteor';
import email from 'emailjs';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';
import PromoCodes from '../common/collections_2';
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
            fromAddress,
            toAddress,
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
            flatRateCard) {
            WorkData.insert({
                quote: true,
                clientFirstName: firstName,
                clientLastName: lastName,
                phoneNumber: phone,
                phoneAdditional: phoneAdditional,
                email: email,
                addresses: [
                    fromAddress,
                    toAddress
                ],
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
                }]
            });
        },

        emailGonder: function (
            musteriAdi,
            musteriLastName,
            musterininNomre,
            movingDate,
            movingSize,
            numerOfMovers,
            fromAddress,
            toAddress,
            musteriEmail,
            jobNumber,
            minimumLaborTime,
            gasFee,
            doubleDrive,
            companyInfo,
            hourlyRatesCash,
            hourlyRatesCard
        ) {
            // servere qosulma
            let server = email.server.connect({
                user: companyInfo.email,
                password: companyInfo.password,
                host: companyInfo.smtp,
                timeout: 60000,
                // ssl: true,
            });

            // let data = ReactDOMServer.renderToString(<EmailContent job={job} />)


            //mesaji gonderme
            let message = {
                text: ' ',
                from: companyInfo.name + ' ' + companyInfo.email,
                to: musteriEmail,
                subject: 'Free Moving Quote for ' + musteriAdi + ' ' + musteriLastName,
                attachment:
                    [
                        {
                            data: `<html style="font-family: 'Roboto', sans-serif;padding: 10px;">
                            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" style="font-family: 'Roboto', sans-serif;">
                           
                            <div style="font-family: 'Roboto', sans-serif;">
                                <div class="merkez" style="font-family: 'Roboto', sans-serif;text-align: center;">
                                    <p style="font-family: 'Roboto', sans-serif;margin: 7px;font-size: 16px;"><b style="font-family: 'Roboto', sans-serif;">Hello ${musteriAdi } ${ musteriLastName }!</b></p>
                                    <p style="font-family: 'Roboto', sans-serif;margin: 7px;font-size: 16px;"><b style="font-family: 'Roboto', sans-serif;">Thank you for requesting your 50% off moving quote!</b></p>
                                    <p style="font-family: 'Roboto', sans-serif;margin: 7px;font-size: 16px;"><b style="font-family: 'Roboto', sans-serif;">Your quote includes:</b></p>
                                </div>
                                <div style="font-family: 'Roboto', sans-serif;">
                                    <table class="merkezTable" style="font-family: 'Roboto', sans-serif;margin: 20px auto 0;">
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Professional,
                                                full time movers
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Use
                                                of Wardrobe Boxes
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Large
                                                Item Packing Supplies
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Moving
                                                Trucks & Movers
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">CPUC
                                                Licensed & Insured
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">No
                                                hidden fees
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Disassembly
                                                and Reassembly
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Tax
                                                Included
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">24/7
                                                Local Support Team
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png" alt="check" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;">Cash
                                                Discount per hour
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="font-family: 'Roboto', sans-serif;">
                                    <table border="1" style="border-collapse: collapse;font-family: 'Roboto', sans-serif;margin: 20px auto 0;" class="merkezTable">
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                CUSTOMER NAME
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${musteriAdi } ${ musteriLastName }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                JOB NUMBER
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${jobNumber }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                PHONE NUMBER
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${musterininNomre }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                Cash rate $/hour
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${hourlyRatesCash }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                Card rate $/hour
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${hourlyRatesCard }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                MOVING DATE
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${movingDate }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                MOVING SIZE
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${movingSize }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                #of MOVERS
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${numerOfMovers }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                MINIMUM LABOR TIME
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${minimumLaborTime } Hours
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                MOVING FROM
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${fromAddress }
                                            </td>
                                        </tr>
                                        <tr style="font-family: 'Roboto', sans-serif;">
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                MOVING TO
                                            </td>
                                            <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                                ${toAddress }
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="1" style="border-collapse: collapse;font-family: 'Roboto', sans-serif;margin: 20px auto 0;" class="merkezTable">
                                    <tr style="font-family: 'Roboto', sans-serif;">
                                        <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                        GAS FEE (one time)
                                        </td>
                                        <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                        $${!isNaN(gasFee) || gasFee === 0 ? gasFee : 'waived' } One-time fee
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Roboto', sans-serif;">
                                        <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">DOUBLE DRIVE TIME</td>
                                        <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">${doubleDrive } (<a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" style="font-family: 'Roboto', sans-serif;">click for learn more</a>)</td>
                                    </tr>
                                    </table>
                                </div>
                            <div class="mesafe" style="font-family: 'Roboto', sans-serif;margin-top: 40px;">
                                <p class="merkez" style="font-family: 'Roboto', sans-serif;text-align: center;"><b style="font-family: 'Roboto', sans-serif;">THE PRICE DOES NOT INCLUDED</b></p>
                                <table border="1" style="border-collapse: collapse;font-family: 'Roboto', sans-serif;margin: 20px auto 0;" class="merkezTable">
                                <tr style="font-family: 'Roboto', sans-serif;">
                                    <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                    <img src="http://www.clker.com/cliparts/z/g/U/q/e/l/check-mark-hi.png" alt="checkRed" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;"> Small item packing materials: (boxes, packing papers,bubble wrap. etc.)
                                    </td>
                                </tr>
                                <tr style="font-family: 'Roboto', sans-serif;">
                                    <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                    <img src="http://www.clker.com/cliparts/z/g/U/q/e/l/check-mark-hi.png" alt="checkRed" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;"> Extra-Large Item Packing and Transportation: for example, pool tables, pianos, etc. (Please ask if you need Extra-Large Item Packing and Moving.)
                                    </td>
                                </tr>
                                <tr style="font-family: 'Roboto', sans-serif;">
                                    <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                    <img src="http://www.clker.com/cliparts/z/g/U/q/e/l/check-mark-hi.png" alt="checkRed" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;"> 
                                    Customer responsible to hold the space for moving truck (if there is any parking ticket, Customer is responsible to pay for it.)                                    </td>
                                </tr>
                                <tr style="font-family: 'Roboto', sans-serif;">
                                    <td style="font-family: 'Roboto', sans-serif;padding: 5px 20px;">
                                    <img src="http://www.clker.com/cliparts/z/g/U/q/e/l/check-mark-hi.png" alt="checkRed" style="font-family: 'Roboto', sans-serif;width: 14px;height: 14px;margin-right: 5px;"> 
                                    Full-coverage insurance
                                </tr>
                                </table>
                            </div>
                            <div class="merkez mesafe" style="font-family: 'Roboto', sans-serif;text-align: center;margin-top: 40px;">
                                <a href="http://www.probusinessrun.com/reserve"><button style="font-family: 'Roboto', sans-serif;border: none;background: #2980b9;border-radius: 5px;color: white;padding: 20px;font-size: 16px;cursor: pointer;">RESERVE YOUR MOVE!</button></a>
                            </div>
                            </div>
                            </html>`,
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
                password: job.companyInfo.password,
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
                            data: data,
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
