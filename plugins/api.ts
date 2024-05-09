export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const $api = $fetch.create({
    baseURL: `${config.public.apiBase}/api/v1`,
    onRequest({ request, options, error }) {
      const token = useCookie('token');
      if (token.value) {
        options.headers = { authorization: `Bearer ${token.value}` };
      }
    },
    onResponseError({ request, response, options }): any {
      // 身份未授權
      if (response.status === 401) {
        const token = useCookie('token');
        token.value = undefined;
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
