// Initializes the `viewer` service on path `/viewer`
const createService = require('./viewer.class.js');
const hooks = require('./viewer.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/viewer', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('viewer');

  service.hooks(hooks);
};
