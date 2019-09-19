import feathersClient from '../feathers-client';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

export const state = () => ({
  locales: ['us', 'kr', 'cn'],
  locale: 'kr'
});
export const mutations = {
  SET_LANG(state, lang) {
    state.locale = lang
    // const sLang = localStorage.getItem('lang');
    // if (sLang === null || !sLang.includes(lang)) {
    //   localStorage.setItem('lang', lang);
    // }
  }
};

export const actions = {
  nuxtClientInit({ commit, dispatch, state }, { req }) {
  },
  nuxtServerInit({ commit, dispatch, state }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  }
};

export const plugins = [
  service('users'),
  service('send'),
  service('sendTasks'),
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
