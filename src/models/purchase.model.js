// purchase-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const purchase = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    payId: { type: String },
    redirectUrl: { type: String },
    description: { type: String },
    amount: { type: Object },
    items: { type: Array }
  }, {
    timestamps: true
  });

  return mongooseClient.model('purchase', purchase);
};
