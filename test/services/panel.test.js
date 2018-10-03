const assert = require('assert');
const app = require('../../src/app');

describe('\'panel\' service', () => {
  it('registered the service', () => {
    const service = app.service('panel');

    assert.ok(service, 'Registered the service');
  });
});
