// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    sendCount: { type: Number, required: true }, // 메세지 보낼수 있는 회수
    sendAllCount: { type: Number, required: true }, // 메세지 보낸 회수
    chargeAll: { type: Number, required: true }, // 총충전금액
    level: { type: Number, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
