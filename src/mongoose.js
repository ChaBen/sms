const mongoose = require('mongoose');

module.exports = function(app) {
  const config = app.get('mongodb');
  mongoose.connect(
    config,
    { useCreateIndex: true, useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
