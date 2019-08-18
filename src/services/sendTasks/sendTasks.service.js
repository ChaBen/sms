const createService = require('feathers-mongoose');
const createModel = require('../../models/sendTasks.model');
const hooks = require('./sendTasks.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sendTasks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sendTasks');

  service.hooks(hooks);
};
