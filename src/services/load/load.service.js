// Initializes the `load` service on path `/load`
const createService = require('feathers-nedb');
const createModel = require('../../models/load.model');
const hooks = require('./load.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/load', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('load');

  service.hooks(hooks);
};
