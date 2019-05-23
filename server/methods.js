import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// import { HTTP } from 'meteor/http';
import squareConnect from 'square-connect';

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
                        console.log(err);
                        throw new Meteor.Error(
                            'Error',
                            'Can\'t update information. Please contact with the administration'
                        );
                    }
                }
            );
        },
        chargeMoney: function(doc) {
            // this.unblock();
            // try {
            //     const result =HTTP.post('http://localhost:3000/charge', , [asyncCallback])
            //     console.log(result);
            //     return true;
            // } catch (e) {
            //     // Got a network error, timeout, or HTTP error in the 400 or 500 range.
            //     return false;
            // }
            // var request_params = req.body;
            // var idempotency_key = require('crypto')
            //     .randomBytes(64)
            //     .toString('hex');
            // // Charge the customer's card
            // var transactions_api = new squareConnect.TransactionsApi();
            // var request_body = {
            //     card_nonce: doc.nonce,
            //     amount_money: {
            //         amount: 200, // $1.00 charge
            //         currency: 'USD'
            //     },
            //     idempotency_key: idempotency_key
            // };
            // transactions_api
            //     .charge('RGT056NG9D9QX', request_body)
            //     .then(function(data) {
            //         return JSON.stringify(data);
            //     })
            //     .catch(error => {
            //         if (error) {
            //             throw new Meteor.Error(
            //                 'Can\'t charge',
            //                 `Reason is ${error.response.text}`
            //             );
            //         }
            //     });
        }
    });
}
