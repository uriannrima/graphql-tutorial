const graphql = require('./graphql/graphql.service.js');
const buildings = require('./buildings/buildings.service.js');
const panels = require('./panels/panels.service.js');
const rooms = require('./rooms/rooms.service.js');
const images = require('./images/images.service.js');
const breakers = require('./breakers/breakers.service.js');
const loads = require('./loads/loads.service.js');
const toggles = require('./toggles/toggles.service.js');
const viewer = require('./viewer/viewer.service.js');
const users = require('./users/users.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(buildings);
  app.configure(panels);
  app.configure(rooms);
  app.configure(images);
  app.configure(breakers);
  app.configure(loads);
  app.configure(toggles);
  app.configure(viewer);
  app.configure(users);
  app.configure(graphql);
};
