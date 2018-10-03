/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');

/* Development Seeder */
const seeder = require('feathers-seeder');
const seederOptions = require('./seeder-config');

// Configure the seeder.
app.configure(seeder(seederOptions));

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