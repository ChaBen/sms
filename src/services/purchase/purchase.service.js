// Initializes the `purchase` service on path `/purchase`
const createService = require('feathers-mongoose');
const createModel = require('../../models/purchase.model');
const hooks = require('./purchase.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/purchase', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('purchase');

  service.hooks(hooks);
};
