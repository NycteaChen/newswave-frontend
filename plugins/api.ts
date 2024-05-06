export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const isLogin = useCookie('isLogin');
  const $api = $fetch.create({
    baseURL: `${config.public.apiBase}/api/v1`,
    onRequest({ request, options, error }) {},
    onResponseError({ request, response, options }): any {
      // 身份未授權
      if (response.status === 401) {
        isLogin.value = undefined;
        userStore.$reset();
        return navigateTo('/login-register');
      }
    }
  });
  return {
    provide: {
      api: $api
    }
  };
});
