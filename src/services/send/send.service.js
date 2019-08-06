// Initializes the `send` service on path `/send`
const createService = require('feathers-mongoose');
const createModel = require('../../models/send.model');
const hooks = require('./send.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/send', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('send');

  service.hooks(hooks);
};
