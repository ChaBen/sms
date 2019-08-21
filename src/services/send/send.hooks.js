const { authenticate } = require('@feathersjs/authentication').hooks;

async function afterFindSend(context) {
  for (let index = 0; index < context.result.length; index++) {
    const task = context.result[index];
    const sendTasks = await context.app.service('sendTasks').find({ query: { sendId: task._id }});
    let resArr = [];
    for (let inx = 0; inx < sendTasks.length; inx++) {
      const item = sendTasks[inx];
      resArr = resArr.concat(item.sendRes);
    }

    const ok = resArr.filter(res => res.status === 'OK');
    const fail = resArr.filter(res => res.status === 'Fail');
    const { status, text, to, createdAt } = task;
    const percent = Math.floor((resArr.length / to.length) * 100);

    context.result[index] = {
      ok: ok.length,
      fail: fail.length,
      to: to.length,
      percent,
      status,
      text,
      createdAt
    };
  }
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [afterFindSend],
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
