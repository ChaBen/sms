import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return

  window.onNuxtReady(async(nuxt) => {
    const { auth } = JSON.parse(localStorage.getItem('auth-storage'));
    if (auth.accessToken) {
      await store.dispatch('auth/authenticate', { accessToken: auth.accessToken, strategy: 'jwt' });
    }
    createPersistedState({
      key: 'auth-storage',
      paths: ['auth']
    })(store) // vuex plugins can be connected to store, even after creation
  })
}
