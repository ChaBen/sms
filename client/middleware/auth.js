export default function(context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  // const routeName = route.name;
  const routeName = route.name.split('lang-')[1];

  if (!auth.publicPages.includes(routeName) && !auth.payload) {
    return redirect('/login');
  }
}
