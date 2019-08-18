const paypal = require('paypal-rest-sdk');

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
}

async function beforeCreate(context) {
  const { paymentId, PayerID } = context.data;
  const purchase = context.app.service('purchase');
  const paypalpayment = new Promise(async(resolve, reject) => {
    const purchaseRes = await purchase.find({ query: { payId: paymentId }});
    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [{
        amount: purchaseRes[0].amount
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
    const total = parseInt(paymentResponse.transactions[0].amount.total);
    await context.app.service('users').patch(context.data.userId, {
      $inc: {
        sendCount: +total / 0.02,
        chargeAll: +total
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
