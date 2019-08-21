module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sendTasks = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    sendId: { type: Schema.Types.ObjectId, required: true },
    sendRes: { type: Array }
  }, {
    timestamps: true
  });

  return mongooseClient.model('send_tasks', sendTasks);
};
