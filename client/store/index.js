import feathersClient from '../feathers-client';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

export const state = () => ({});
export const mutations = {};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req, store }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
      .then(async response => {
        return dispatch('auth/authenticate', { accessToken: store.state.auth.accessToken, strategy: 'jwt' }).catch(_ => {})
      });
  }
};

export const plugins = [
  service('users'),
  service('send'),
  service('purchase'),
  service('paysuccess'),
  auth({
    state: {
      publicPages: [
        'index',
        'signup',
        'pricing',
        'login'
      ]
    },
    userService: 'users'
  })
];
