/*global process*/
import { Meteor } from 'meteor/meteor';
import email from 'emailjs';
import WorkData from '../common/collections_2';
import Discounts from '../common/discountData';
import PromoCodes from '../common/collections_2';

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

            let message = {
                text: ' ',
                from: job.companyInfo.name + ' ' + job.companyInfo.email,
                to: job.email,
                subject: 'Confirmation email',
                attachment:
                    [
                        {
                            data: `<!DOCTYPE html>
                                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

                                    <head>
                                        <title></title>
                                        <!--[if !mso]><!-- -->
                                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                        <!--<![endif]-->
                                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <style type="text/css">
                                            #outlook a {
                                                padding: 0;
                                            }
                                            
                                            .ReadMsgBody {
                                                width: 100%;
                                            }
                                            
                                            .ExternalClass {
                                                width: 100%;
                                            }
                                            
                                            .ExternalClass * {
                                                line-height: 100%;
                                            }
                                            
                                            body {
                                                margin: 0;
                                                padding: 0;
                                                -webkit-text-size-adjust: 100%;
                                                -ms-text-size-adjust: 100%;
                                            }
                                            
                                            table,
                                            td {
                                                border-collapse: collapse;
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                            }
                                            
                                            img {
                                                border: 0;
                                                height: auto;
                                                line-height: 100%;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                            }
                                            
                                            p {
                                                display: block;
                                                margin: 13px 0;
                                            }
                                        </style>
                                        <!--[if !mso]><!-->
                                        <style type="text/css">
                                            @media only screen and (max-width:480px) {
                                                @-ms-viewport {
                                                    width: 320px;
                                                }
                                                @viewport {
                                                    width: 320px;
                                                }
                                            }
                                        </style>
                                        <!--<![endif]-->
                                        <!--[if mso]>
                                                                <xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml>
                                                                <![endif]-->
                                        <!--[if lte mso 11]>
                                                                <style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
                                        <!--[if !mso]><!-->
                                        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
                                        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                                        <style type="text/css">
                                            @import url(https://fonts.googleapis.com/css?family=Roboto);
                                            @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                                        </style>
                                        <!--<![endif]-->
                                        <style type="text/css">
                                            @media only screen and (min-width:480px) {
                                                .mj-column-per-100 {
                                                    width: 100%!important;
                                                }
                                            }
                                        </style>
                                    </head>

                                    <body style="background: #ECF0F1;">
                                        <div class="mj-container" style="background-color:#ECF0F1;">
                                            <!--[if mso | IE]>      
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        
                                                                <tr>          
                                                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      
                                                                <![endif]-->
                                            <div style="margin:0px auto;max-width:600px;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
                                                                <!--[if mso | IE]>      
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">        
                                                                <tr>          
                                                                <td style="vertical-align:top;width:600px;">      
                                                                <![endif]-->
                                                                <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center">
                                                                                    <div style="cursor:auto;color:#000000;font-family:Roboto, Tahoma, sans-serif;font-size:11px;line-height:22px;text-align:center;">
                                                                                        <p><span style="font-size:14px;"><strong>Hello&#xA0; ${job.clientFirstName }!</strong></span></p>
                                                                                        <p><span style="font-size:14px;"><strong>Thank you for confirming your move with chat Movers Los Angeles!</strong></span></p>
                                                                                        <p><span style="font-size:14px;"><strong>Please review your Moving Confirmation below to ensure accuracy:</strong></span></p>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                                            <!--[if mso | IE]>      
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        
                                                                <tr>          
                                                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      
                                                                <![endif]-->
                                            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div style="margin:0px auto;max-width:600px;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
                                                                                <!--[if mso | IE]>      
                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">        
                                                                <tr>          
                                                                <td style="vertical-align:top;width:600px;">      
                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                                                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left">
                                                                                                    <div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;">
                                                                                                        <table align="center" border="1" cellpadding="2" cellspacing="0" style="width:550px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Your job number:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.jobNumber }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Moving date:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.workDate }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Arrival window:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.workMustBeginTime }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;"># of movers:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.numberOfWorkers }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Hourly rates cash:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.hourlyRatesCash }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Hourly rates card:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.hourlyRatesCard }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Minimum labor time:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.laborTime }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Gass fee:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.gasFee }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Double drive time:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.doubleDrive } <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf">Click to learn more</a></span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Moving from:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.addresses[0] }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Moving to:</span></td>
                                                                                                                    <td><span style="font-size:14px;">${job.addresses[1] }</span></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td><span style="font-size:14px;">Moving size:</span></td>
                                                                                                                    <td style="text-align: left;"><span style="font-size:14px;">${job.movingSize }</span></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <p></p>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left">
                                                                                                    <div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;">
                                                                                                        <p>
                                                                                                            <input checked="checked" disabled name="checked" type="checkbox" value="checked"> &#xA0;I have read, understand and agree to the contents of the&#xA0;<i><a href="http://cheapmoversanaheim.com/ProBusinessRun/1.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/1.pdf" target="_blank">&quot;What&apos;s Included&quot; Section.</a></i>
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            <input checked="checked" disabled type="checkbox" value="true"> &#xA0;I have read, understand and agree to the contents of the&#xA0;<i><a href="http://cheapmoversanaheim.com/ProBusinessRun/5.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/5.pdf" target="_blank">&quot;What&apos;s Not Included&quot; Section.</a></i>
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            <input type="checkbox" checked="checked" disabled>&#xA0;I have read, understand and agree to the contents of the&#xA0;<i><a href="http://cheapmoversanaheim.com/ProBusinessRun/4.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/4.pdf" target="_blank">&quot;For Your Information&quot; Section.</a></i>
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            <input type="checkbox" checked="checked" disabled>&#xA0;I have received a copy of the&#xA0;<i><a href="http://cheapmoversanaheim.com/ProBusinessRun/2.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/2.pdf" target="_blank">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            <input type="checkbox" checked="checked" disabled>&#xA0;I have received a copy of the&#xA0;<i><a href="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" target="_blank">CPUC Hazardous Material List</a></i> &#xA0;and I agree not to pack any of the
                                                                                                            <br>items listed for transportation by Cheap Movers Los Angeles.</p>
                                                                                                        <p>
                                                                                                            <input type="checkbox" checked="checked" disabled> &#xA0;I understand and agree that I will have&#xA0;<i>Cash or Card Payment</i>&#xA0;ready on the day of my move.
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            <input type="checkbox" checked="checked" disabled> &#xA0;Yes! I have read the information above and wish to pay my Moving Deposit to book this move.
                                                                                                            <br>I understand that this Deposit is non-refundable and non-transferrable if I reschedule or cancel this move.
                                                                                                        </p>
                                                                                                        <p>
                                                                                                            **If you have any questions, please contact us soon as possible by phone, text, or e-mail 24/7**</p>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>      
                                                                </td>
                                                                </tr>
                                                                </table>      
                                                                <![endif]-->
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso | IE]>      
                                                                </td>
                                                                </tr>
                                                                </table>      
                                                                <![endif]-->
                                        </div>
                                    </body>

                                    </html>`,
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
