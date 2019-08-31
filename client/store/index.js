import feathersClient from '../feathers-client';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

// service('sendTasks')

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
  async nuxtClientInit({ commit, dispatch, state }) {
    if (!state.auth.accessToken) return;
    // await dispatch('auth/authenticate', { accessToken: state.auth.accessToken, strategy: 'jwt' });
  },
  nuxtServerInit({ commit, dispatch, state }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    });
    // .then(async response => {
    //   if (!state.auth.accessToken) return response;
    //   return await dispatch('auth/authenticate', { accessToken: state.auth.accessToken, strategy: 'jwt' }).catch(_ => {});
    // });
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
