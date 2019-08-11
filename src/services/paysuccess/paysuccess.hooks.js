const paypal = require('paypal-rest-sdk');

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
}

async function beforeCreate(context) {
  const { paymentId, PayerID } = context.data;
  const paypalpayment = new Promise((resolve, reject) => {
    var execute_payment_json = {
      'payer_id': PayerID,
      'transactions': [{
        'amount': {
          'currency': 'USD',
          'total': '50.00'
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
  try {
    const paymentResponse = await paypalpayment;
    await context.app.service('users').patch(context.data.userId, {
      $inc: {
        sendCount: +25000,
        chargeAll: +paymentResponse.transactions[0].amount.total
      }
    });
    context.data.payId = paymentResponse.id;
    context.data.intent = paymentResponse.intent;
    context.data.state = paymentResponse.state;
    context.data.payer = paymentResponse.payer;
    context.data.transactions = paymentResponse.transactions;
    context.data.links = paymentResponse.links;
    return context;
  } catch (error) {
    throw new UserException(error.response);
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [beforeCreate],
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
