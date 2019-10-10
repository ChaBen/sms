const { authenticate } = require('@feathersjs/authentication').hooks;
const { discard } = require('feathers-hooks-common');
const { machineIdSync } = require('node-machine-id');

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
}

async function beforeFind(context) {
  const id = await machineIdSync({ original: true });
  console.log(id);
}

async function beforeCreate(context) {
  const { userId, to } = context.data;
  const sendCount = await context.app.service('users').find({ query: { _id: userId }});
  if (to.length > sendCount[0].sendCount) {
    throw new UserException({
      error_description: '남아있는 SMS건수가 부족합니다.',
      httpStatusCode: 500
    });
  }
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [beforeFind],
    get: [],
    create: [beforeCreate],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [discard('to')],
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
