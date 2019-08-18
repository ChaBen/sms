const paypal = require('paypal-rest-sdk');

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
}

async function beforePurchase(context) {
  paypal.configure({
    mode: 'sandbox', // sandbox or live
    'client_id': 'AeZgg-XoLfSbdrVeRnEz1aSGatzYfnYwGWGuWydxIp-ik2Wl4Y433qnUeE77hf92vR_x6bJyRbG02dPY',
    'client_secret': 'EENYmBfM1pBpO3hBu3yTJH6mob4areRgbzV-InTa7y-B5k557z0uIC2Bq5snxXnwBbsDVd5U-9fnQ_uB'
  });
  const paypalGoods = new Promise((resolve, reject) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        'payment_method': 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      },
      transactions: [{
        item_list: {
          items: context.data.items
        },
        amount: {
          currency: 'USD',
          total: context.data.total
        },
        description: 'This is the payment description.'
      }]
    };
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
  try {
    const goodsResponse = await paypalGoods;
    context.data.payId = goodsResponse.id;
    context.data.description = goodsResponse.transactions[0].description;
    context.data.amount = goodsResponse.transactions[0].amount;
    context.data.items = goodsResponse.transactions[0].item_list.items;
    context.data.redirectUrl = goodsResponse.links[1].href;
  } catch (error) {
    throw new UserException(error.response);
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [beforePurchase],
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
