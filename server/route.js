import { Router } from 'meteor/iron:router';
import SquareConnect from 'square-connect';
import WorkData from '../common/collections_2';
import locationIds from '../imports/helpers/companyId.json';
import { Meteor } from 'meteor/meteor';

var config = require('../imports/helpers/config.json');
// Router.bodyParser.json({ limit: '500mb' });

Router.route('/charge', { where: 'server' }).post(function() {
    var req = this.request;
    var res = this.response;

    // let x = JSON.stringify({ name: 'yusif' });

    // res.end(x);

    var defaultClient = SquareConnect.ApiClient.instance;

    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = config.squareAccessToken;

    var api = new SquareConnect.LocationsApi();

    api.listLocations()
        .then(
            data => console.info('API called successfully. Returned data: ' + data)
            // function(data) {
            //     console.log('API called successfully. Returned data: ' + data);
            // },
            // function(error) {
            //     console.error(error);
            // }
        )
        .catch(error => {
            console.error(`id: ${request_params._id}`, error);
            res.end(JSON.stringify({ error: true }));
        });

    // console.log(req);
    var request_params = req.body;
    var idempotency_key = require('crypto')
        .randomBytes(64)
        .toString('hex');

    let jobInfo = WorkData.findOne({ _id: request_params.id });
    let amount = jobInfo[request_params.what];

    // Charge the customer's card
    var transactions_api = new SquareConnect.TransactionsApi();
    var request_body = {
        card_nonce: request_params.nonce,
        amount_money: {
            amount: amount * 100, // $1.00 charge
            currency: 'USD'
        },
        idempotency_key: idempotency_key
    };
    transactions_api.charge(locationIds[jobInfo.companyInfo.name], request_body).then(
        function(data) {
            let obj = {
                _id: request_params.id,
                clientFirstName: request_params.clientFirstName,
                clientLastName: request_params.clientLastName,
                amount,
                cardHolderName: request_params.cardHolderName,
                tsId: data.transaction.id,
                date: data.transaction.created_at,
                jobNumber: request_params.jobNumber
            };

            let job = request_params.job;
            job.quote = false;
            job.confirmed = true;
            job.isFollowUp = true;
            job.status = 'won';
            job.by = 'customer';

            Meteor.call('updateWork', job, (err, response) => {
                res.end(JSON.stringify({ error: false }));
                if (err) {
                    console.error(`Erro with job: ${job.jobNumber}`, err);
                    throw new Meteor.Error('Error while saving data', 'Error while saving data');
                }
                Meteor.call('sendPaymentConfirmationEmail', obj);
                Meteor.call('confirmationGonder', job, (err, response) => {
                    if (err) {
                        console.error(`id: ${job._id}`, err);
                        throw new Meteor.Error('Error while sending email', 'Error while sending email');
                    }
                    // let json = JSON.stringify(data);
                });
            });
        },
        function(error) {
            console.error('route line 62: ' + error);
            // res.writeHead(500);
            res.end(JSON.stringify({ error: true }));
        }
    );
});
