// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    computerId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sendCount: { type: Number, required: true, default: 5 },
    sendAllCount: { type: Number, required: true, default: 0 },
    chargeAll: { type: Number, required: true, default: 0 },
    level: { type: Number, required: true, default: 1 }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
