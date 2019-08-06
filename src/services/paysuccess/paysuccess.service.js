// Initializes the `paysuccess` service on path `/paysuccess`
const createService = require('feathers-mongoose');
const createModel = require('../../models/paysuccess.model');
const hooks = require('./paysuccess.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/paysuccess', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('paysuccess');

  service.hooks(hooks);
};
