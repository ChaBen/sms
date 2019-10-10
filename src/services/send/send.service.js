// Initializes the `send` service on path `/send`
const request = require('request-promise');
const createService = require('feathers-mongoose');
const createModel = require('../../models/send.model');
const hooks = require('./send.hooks');
const moment = require('moment');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    events: ['sendTasksCreated']
  };

  // Initialize our service with any options it requires
  app.use('/send', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('send');
  service.on('created', async sendAddRes => {
    const { to, text, userId } = sendAddRes;
    const chunkTo = (arr, n) => arr.length ? [arr.slice(0, n), ...chunkTo(arr.slice(n), n)] : [];
    const sendSms = (to) => {
      return new Promise(async(resolve, reject) => {
        // const username = 'yongsin32019';
        // const password = 'esm15254';
        const username = 'chebckql2019';
        const password = 'esm7448';
        const uri = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${username}&password=${password}&to=${to.join()}&text=${escape(text)}&from=Test&type=1`;
        try {
          const data = await request({
            method: 'GET',
            uri
            // qs: { username, password, to: to.join(), text, from: 'Test', type: 1 }
          });
          const arr = [];
          const easyRes = data.split(',');
          for (let index = 0; index < easyRes.length; index++) {
            arr.push({
              phone: to[index],
              status: easyRes[index]
            });
          }
          await app.service('sendTasks').create({
            userId: sendAddRes.userId,
            sendId: sendAddRes._id,
            sendRes: arr
          });
          resolve(arr);
        } catch (error) {
          reject(error);
        }
      })
    };
    /* const sendSms = (to) => {
      return new Promise(async(resolve, reject) => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const fakeArr = [];
          const is = ['OK', 'Fail'];
          for (let index = 0; index < to.length; index++) {
            const random = Math.floor(Math.random() * 2);
            fakeArr.push({
              phone: to[index],
              status: is[random]
            });
          }
          await app.service('sendTasks').create({
            userId: sendAddRes.userId,
            sendId: sendAddRes._id,
            sendRes: fakeArr
          });
          resolve(fakeArr);
        } catch (error) {
          reject(error);
        }
      })
    };*/

    try {
      if (to.length <= 30) {
        // 30개 혹은 이하일경우
        await sendSms(to);
        await app.service('users').patch(userId, {
          $inc: {
            sendCount: -to.length,
            sendAllCount: +to.length
          }
        });
        console.log('√ Send SMS -----OK-----', to.length, moment(new Date()).format('lll'));
        await app.service('send').patch(sendAddRes._id, { status: 2 });
      } else {
        //  if (to.length < 10000)
        const chunk = chunkTo(to, 30);
        for (let index = 0; index < chunk.length; index++) {
          const item = chunk[index];
          await sendSms(item);
          await app.service('users').patch(userId, {
            $inc: {
              sendCount: -item.length,
              sendAllCount: +item.length
            }
          });
          console.log('√ Send SMS -----OK-----', item.length, moment(new Date()).format('lll'));
          if (chunk.length === index + 1) {
            await app.service('send').patch(sendAddRes._id, { status: 2 });
            console.log('√ Send SMS -----SUCCESS-----', to.length, moment(new Date()).format('lll'));
          }
        }
      }
    } catch (error) {
      console.log('X Send SMS ---Error---', error.message, moment(new Date()).format('lll'));
    }
  });

  service.hooks(hooks);
};
