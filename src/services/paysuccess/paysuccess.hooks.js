const paypal = require('paypal-rest-sdk');

function beforeCreate(context) {
  const { paymentId, PayerID } = context.data;
  var execute_payment_json = {
    "payer_id": PayerID,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "50.00"
      }
    }]
  };

 
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log("Get Payment Response");
      console.log(JSON.stringify(payment));
    }
  });
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ beforeCreate ],
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
