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
    userName: { type: String },
    password: { type: String },
    form: { type: String },
    to: { type: Array },
    text: { type: String },
    response: { type: Array },
    type: { type: Number }
  }, {
    timestamps: true
  });

  return mongooseClient.model('send', send);
};
