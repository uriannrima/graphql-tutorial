const assert = require('assert');
const app = require('../../src/app');

describe('\'breaker\' service', () => {
  it('registered the service', () => {
    const service = app.service('breaker');

    assert.ok(service, 'Registered the service');
  });
});
