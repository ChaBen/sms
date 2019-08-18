// Initializes the `send` service on path `/send`
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
        await new Promise(resolve => setTimeout(resolve, 3000));
        const fakeArr = [];
        for (let index = 0; index < to.length; index++) {
          fakeArr.push('OK');
        }
        await app.service('send').patch(sendAddRes._id, {
          response: fakeArr
        });
        resolve(fakeArr);
        // const username = 'yongsin32019';
        // const password = 'esm15254';
        // const uri = 'https://www.easysendsms.com/sms/bulksms-api/bulksms-api';
        // try {
        //   const data = await request({
        //     method: 'GET',
        //     uri,
        //     qs: { username, password, to: to.join(), text, from: 'Test', type: 0 }
        //   });
        //   resolve(data);
        // } catch (error) {
        //   reject(error);
        // }
      })
    };
    if (to.length <= 50) {
      // 50개 혹은 이하일경우
      try {
        await sendSms(to);
      } catch (error) {
        console.log(error);
      }
    } else if (to.length < 10000) {
      const chunk = chunkTo(to, 50);
      for (let index = 0; index < chunk.length; index++) {
        const item = chunk[index];
        await sendSms(item);
        await app.service('users').patch(userId, {
          $inc: {
            sendCount: -item.length,
            sendAllCount: +item.length
          }
        });
        console.log('Send SMS ---OK---', item.length, userId);
      }
    }
    // const userFind = await app.service('users').find({
    //   paginate: false
    // })
    // console.log(app.service('users').FeathersVuexModel);
  });

  service.hooks(hooks);
};
