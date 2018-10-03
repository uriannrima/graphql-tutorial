// Initializes the `breaker` service on path `/breaker`
const createService = require('feathers-nedb');
const createModel = require('../../models/breaker.model');
const hooks = require('./breaker.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/breaker', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('breaker');

  service.hooks(hooks);
};
