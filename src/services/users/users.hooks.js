const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { machineIdSync } = require('node-machine-id');

async function beforeCreate(context) {
  const computerId = await machineIdSync();
  console.log(computerId);
  context.data.computerId = computerId;
}

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [
      authenticate('jwt'),
      function(context) {
        context.result = context.params.auth;
      }
    ],
    create: [hashPassword(), beforeCreate],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
