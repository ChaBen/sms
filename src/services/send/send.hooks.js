const { authenticate } = require('@feathersjs/authentication').hooks;

async function beforeSend(context) {
  const sendTasks = context.app.service('sendTasks');
  const sendTasksRes = await sendTasks.create({
    text: 'string'
  });
  console.log(sendTasksRes);
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [beforeSend],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
