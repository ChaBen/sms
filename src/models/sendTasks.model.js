module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sendTasks = new Schema({
    text: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('send_tasks', sendTasks);
};
