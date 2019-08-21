export default function(context) {
  const { store, redirect, route } = context;
  const { auth } = store.state;
  const routeName = route.name.includes('lang-') ? route.name.split('lang-')[1] : route.name;

  if ((!auth.publicPages.includes(routeName) && routeName !== 'lang') && !auth.payload) {
    const path = route.params.hasOwnProperty('lang') ? `/${route.params.lang}/login` : '/login';
    return redirect(path);
  }
}
