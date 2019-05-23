import { Router } from 'meteor/iron:router';
import SquareConnect from 'square-connect';
import WorkData from '../common/collections_2';
import locationIds from '../imports/helpers/companyId.json';
import { Meteor } from 'meteor/meteor';

var config = require('../imports/helpers/config.json');

Router.route('/charge', { where: 'server' }).post(function() {
    var req = this.request;
    var res = this.response;

    var defaultClient = SquareConnect.ApiClient.instance;

    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = config.squareAccessToken;

    var api = new SquareConnect.LocationsApi();

    api.listLocations()
        .then(
            data =>
                console.log('API called successfully. Returned data: ' + data)
            // function(data) {
            //     console.log('API called successfully. Returned data: ' + data);
            // },
            // function(error) {
            //     console.error(error);
            // }
        )
        .catch(error => console.log(error));

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
    transactions_api
        .charge(locationIds[jobInfo.companyInfo.name], request_body)
        .then(
            function(data) {
                var json = JSON.stringify(data);
                console.log(data);
                console.log('payment successfully: ' + data.exports);
                res.end(json);
            },
            function(error) {
                console.log('route line 62: ' + error);
                // res.writeHead(500);
                res.end(JSON.stringify({ error: true }));
            }
        );
});
