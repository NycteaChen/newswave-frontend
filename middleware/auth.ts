export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();

  if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    return;
  }

  const isLogin = useCookie('isLogin');
  if (isLogin.value) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return navigateTo('/login-register');
});
