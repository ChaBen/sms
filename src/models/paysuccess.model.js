// paysuccess-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const paysuccess = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    payId: { type: String, required: true },
    intent: { type: String, required: true },
    state: { type: String, required: true },
    payer: { type: Object, required: true },
    transactions: { type: Array, required: true },
    links: { type: Array, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('paysuccess', paysuccess);
};
