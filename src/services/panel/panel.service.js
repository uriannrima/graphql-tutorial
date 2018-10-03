// Initializes the `panel` service on path `/panel`
const createService = require('feathers-nedb');
const createModel = require('../../models/panel.model');
const hooks = require('./panel.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/panel', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('panel');

  service.hooks(hooks);
};
