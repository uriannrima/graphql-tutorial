const assert = require('assert');
const app = require('../../src/app');

describe('\'load\' service', () => {
  it('registered the service', () => {
    const service = app.service('load');

    assert.ok(service, 'Registered the service');
  });
});
