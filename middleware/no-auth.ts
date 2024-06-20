export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();

  if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    return;
  }

  const token = useCookie('token');
  if (!token.value) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return navigateTo('/news');
});
