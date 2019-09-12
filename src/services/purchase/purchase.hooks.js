const paypal = require('paypal-rest-sdk');

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
}

async function beforePurchase(context) {
  paypal.configure({
    mode: 'live', // sandbox or live
    'client_id': 'ARoQA_xNutHx8wF_XfvjyrSfFmMn53YQbQdlV4eb3hIjJ4GaR4JeWjhSbMuLWsX2XNX9dh1E45D-0tGV',
    'client_secret': 'EDkwBkIpwzJsizlhDrC1P51vLBLeFgsOk4QB1ocFdycn22KDKl6TQgID1DhOJ739ja1yyfenao1N2SDf'
  });
  const paypalGoods = new Promise((resolve, reject) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        'payment_method': 'paypal'
      },
      redirect_urls: {
        return_url: 'http://cndsms.com/success',
        cancel_url: 'http://cndsms.com/pricing'
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
