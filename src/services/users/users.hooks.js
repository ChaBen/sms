const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
function beforeCreate(context) {
  context.data.sendCount = 5
  context.data.sendAllCount = 0;
  context.data.chargeAll = 0;
  context.data.level = 1;
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
    create: [beforeCreate, hashPassword()],
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
