/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');

/* Development Seeder */
import memory from 'feathers-memory';
const seeder = require('feathers-seeder');
// const seederOptions = require('./seeder-config');

const seederOptions = {
  services: [
    {
      path: 'users',
      count: 10,
      template: {
        'username': '{{internet.email}}',
        'firstName': '{{name.firstName}}',
        'lastName': '{{name.lastName}}',
        'password': 'password'
      }
    }
  ]
};

app
  .use('/users', memory())
  .configure(seeder(seederOptions));

// Seed then start.
app.seed().then(() => {
  const port = app.get('port');
  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
});