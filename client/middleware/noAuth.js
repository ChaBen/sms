export default function({ store, redirect, route }) {
  // If the user is authenticated redirect to home page
  if (store.state.auth.accessToken) {
    const path = route.params.hasOwnProperty('lang') ? `/${route.params.lang}/` : '/';
    return redirect(path)
  }
}
