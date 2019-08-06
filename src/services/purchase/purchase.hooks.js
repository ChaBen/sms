const request = require('request-promise');
const paypal = require('paypal-rest-sdk');
const rest = require('@feathersjs/rest-client');
const { authenticate } = require('@feathersjs/authentication').hooks;

async function beforePurchase(context) {
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeZgg-XoLfSbdrVeRnEz1aSGatzYfnYwGWGuWydxIp-ik2Wl4Y433qnUeE77hf92vR_x6bJyRbG02dPY',
    'client_secret': 'EENYmBfM1pBpO3hBu3yTJH6mob4areRgbzV-InTa7y-B5k557z0uIC2Bq5snxXnwBbsDVd5U-9fnQ_uB'
  });
  const response = await new Promise(function(resolve, reject) {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "item",
                  "sku": "item",
                  "price": "50.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "50.00"
          },
          "description": "This is the payment description."
      }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        resolve(payment);
      }
    });
  });
  // console.log(response.transactions);
  context.data.payId = response.id;
  context.data.description = response.transactions[0].description;
  context.data.amount = response.transactions[0].amount;
  context.data.items = response.transactions[0].item_list.items;
  context.data.redirectUrl = response.links[1].href;
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ beforePurchase ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
