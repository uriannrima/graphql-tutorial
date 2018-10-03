// Initializes the `building` service on path `/building`
const createService = require('feathers-nedb');
const createModel = require('../../models/building.model');
const hooks = require('./building.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/building', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('building');

  service.hooks(hooks);
};
