// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
  
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    sendCount: { type: Number },  // 메세지 보낼수 있는 회수
    sendAllCount: { type: Number },  // 메세지 보낸 회수
    chargeAll: { type: Number } // 총충전금액
    
    
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
