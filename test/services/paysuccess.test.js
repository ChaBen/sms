const assert = require('assert');
const app = require('../../src/app');

describe('\'paysuccess\' service', () => {
  it('registered the service', () => {
    const service = app.service('paysuccess');

    assert.ok(service, 'Registered the service');
  });
});
