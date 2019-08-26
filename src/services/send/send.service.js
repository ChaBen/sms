// Initializes the `send` service on path `/send`
const request = require('request-promise');
const createService = require('feathers-mongoose');
const createModel = require('../../models/send.model');
const hooks = require('./send.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
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
        const username = 'yongsin32019';
        const password = 'esm15254';
        const uri = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${username}&password=${password}&to=${to.join()}&text=${escape(text)}&from=Test&type=1`;
        try {
          const data = await request({
            method: 'GET',
            uri
            // qs: { username, password, to: to.join(), text, from: 'Test', type: 1 }
          });
          const fakeArr = [];
          const easyRes = data.split(',');
          for (let index = 0; index < easyRes.length; index++) {
            fakeArr.push({
              phone: to[index],
              status: easyRes[index]
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
    };
    if (to.length <= 50) {
      // 50개 혹은 이하일경우
      try {
        await sendSms(to);
        await app.service('');
        await app.service('users').patch(userId, {
          $inc: {
            sendCount: -to.length,
            sendAllCount: +to.length
          }
        });
        console.log('√ Send SMS -----OK-----', to.length, sendAddRes._id, new Date());
        console.log('√ Send SMS -----SUCCESS-----', to.length, sendAddRes._id, new Date());
        await app.service('send').patch(sendAddRes._id, {
          status: 2
        });
      } catch (error) {
        console.log('X Send SMS ---Error--- < 50', error, new Date());
      }
    } else {
      //  if (to.length < 10000)
      const chunk = chunkTo(to, 50);
      for (let index = 0; index < chunk.length; index++) {
        const item = chunk[index];
        try {
          await sendSms(item);
          await app.service('users').patch(userId, {
            $inc: {
              sendCount: -item.length,
              sendAllCount: +item.length
            }
          });
          console.log('√ Send SMS -----OK-----', item.length, sendAddRes._id, new Date());
          if (chunk.length === index + 1) {
            await app.service('send').patch(sendAddRes._id, {
              status: 2
            });
            console.log('√ Send SMS -----SUCCESS-----', to.length, sendAddRes._id, new Date());
          }
        } catch (error) {
          console.log('X Send SMS ---Error---', error, new Date());
        }
      }
    }
  });

  service.hooks(hooks);
};
