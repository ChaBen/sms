import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { CookieStorage } from 'cookie-storage';

const storage = new CookieStorage();
const socket = io('http://34.97.213.233/', { transports: ['websocket'], forceNew: true });
// const socket = io('http://localhost:5000/', { transports: ['websocket'] });
const app = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage }));

export default app;
