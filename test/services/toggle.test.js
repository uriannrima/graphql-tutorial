const assert = require('assert');
const app = require('../../src/app');

describe('\'toggle\' service', () => {
  it('registered the service', () => {
    const service = app.service('toggle');

    assert.ok(service, 'Registered the service');
  });
});
