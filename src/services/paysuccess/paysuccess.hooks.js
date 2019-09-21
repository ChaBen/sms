const { authenticate } = require('@feathersjs/authentication').hooks;
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
    const perPrice = [0.016666, 0.013333, 0.011755];
    let per;
    if (total < 1000) {
      per = perPrice[0];
    } else if (total < 3000) {
      per = perPrice[1];
    } else if (total >= 3000) {
      per = perPrice[2];
    }
    const setPerPrice = Math.floor(total / per);
    await context.app.service('users').patch(context.data.userId, {
      $inc: {
        sendCount: +setPerPrice,
        chargeAll: +total
      }
    });
    const email = await context.app.service('users').find({ query: { _id: context.data.userId }});
    context.data.email = email[0].email;
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
    all: [authenticate('jwt')],
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
