// paysuccess-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const paysuccess = new Schema({
    intent: { type: String },
    state: { type: String },
    payer: { type: Object },
    transactions: { type: Array },
    links: { type: Array }
  }, {
    timestamps: true
  });

  return mongooseClient.model('paysuccess', paysuccess);
};
