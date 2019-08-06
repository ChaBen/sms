const assert = require('assert');
const app = require('../../src/app');

describe('\'mongotest\' service', () => {
  it('registered the service', () => {
    const service = app.service('mongotest');

    assert.ok(service, 'Registered the service');
  });
});
