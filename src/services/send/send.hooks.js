const { authenticate } = require('@feathersjs/authentication').hooks;

function UserException(error) {
  this.message = error.error_description;
  this.status = error.httpStatusCode;
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

async function afterFindSend(context) {
  for (let index = 0; index < context.result.length; index++) {
    const send = context.result[index];
    const sendTasks = await context.app.service('sendTasks').find({ query: { sendId: send._id }});
    let resArr = [];
    for (let inx = 0; inx < sendTasks.length; inx++) {
      const item = sendTasks[inx];
      resArr = resArr.concat(item.sendRes);
    }

    const ok = resArr.filter(res => res.status.includes('OK'));
    const fail = resArr.filter(res => res.status.includes('Fail'));
    const { status, text, to, createdAt } = send;
    const percent = Math.floor((resArr.length / to.length) * 100);

    context.result[index] = {
      id: send._id,
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
    create: [beforeCreate],
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
