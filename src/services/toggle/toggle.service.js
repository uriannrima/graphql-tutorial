// Initializes the `toggle` service on path `/toggle`
const createService = require('feathers-nedb');
const createModel = require('../../models/toggle.model');
const hooks = require('./toggle.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/toggle', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('toggle');

  service.hooks(hooks);
};
