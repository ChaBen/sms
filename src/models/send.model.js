// send-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const send = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    // users: { type: Schema.Types.ObjectId, ref: 'users' },
    status: { type: Number, required: true },
    to: { type: Array, required: true },
    text: { type: String, required: true },
    type: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('send', send);
};
