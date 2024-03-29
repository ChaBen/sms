const users = require('./users/users.service.js');
const send = require('./send/send.service.js');
const sendTasks = require('./sendTasks/sendTasks.service.js');
const purchase = require('./purchase/purchase.service.js');

const paysuccess = require('./paysuccess/paysuccess.service.js');

module.exports = function(app) {
  app.configure(users);
  app.configure(send);
  app.configure(sendTasks);
  app.configure(purchase);
  app.configure(paysuccess);
};
