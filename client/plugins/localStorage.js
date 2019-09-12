import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return

  window.onNuxtReady(async(nuxt) => {
    const storage = JSON.parse(localStorage.getItem('auth-storage'));
    const isStorage = storage ? storage.auth.accessToken : false;
    if (isStorage) {
      try {
        await store.dispatch('auth/authenticate', { accessToken: storage.auth.accessToken, strategy: 'jwt' });
      } catch (error) {
        store.dispatch('auth/logout');
        console.log('error: !', error);
      }
    }
    createPersistedState({
      key: 'auth-storage',
      paths: ['auth']
    })(store) // vuex plugins can be connected to store, even after creation
  })
}
