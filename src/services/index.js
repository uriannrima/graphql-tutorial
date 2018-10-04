const graphql = require('./graphql/graphql.service.js');
const building = require('./building/building.service.js');
const panel = require('./panel/panel.service.js');
const room = require('./room/room.service.js');
const image = require('./image/image.service.js');
const breaker = require('./breaker/breaker.service.js');
const load = require('./load/load.service.js');
const toggle = require('./toggle/toggle.service.js');
const viewer = require('./viewer/viewer.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(building);
  app.configure(panel);
  app.configure(room);
  app.configure(image);
  app.configure(breaker);
  app.configure(load);
  app.configure(toggle);
  app.configure(viewer);
  app.configure(graphql);
  app.configure(users);
};
