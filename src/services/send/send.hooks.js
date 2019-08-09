const request = require('request-promise');
const { authenticate } = require('@feathersjs/authentication').hooks;

async function beforeAddUserId(context) {
  // TODO: api 보내는 로직
  const uri = 'https://www.easysendsms.com/sms/bulksms-api/bulksms-api';
  const username = 'yongsin32019';
  // const username = 'chebckql2019';
  // const password = 'esm7448';
  const password = 'esm15254';
  const ctData = context.data
  const to = ctData.to.length > 1 ? ctData.to.join(',') : ctData.to;
  const text = ctData.text;
  const data = await request({
    method: 'GET',
    uri,
    qs: { username, password, from: 'Test', type: 0, to, text }
  });
  context.data.response = data;
  return context;
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [beforeAddUserId],
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
