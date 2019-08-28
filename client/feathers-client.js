import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { CookieStorage } from 'cookie-storage';

const storage = new CookieStorage();
const url = 'http://localhost/';
const socket = io(url, { transports: ['websocket'] });
const app = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage }));

export default app;
