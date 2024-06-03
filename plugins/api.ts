export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const $api = $fetch.create({
    baseURL: `${config.public.apiBase}/api/v1`,
    onRequest({ request, options }) {
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
        showToast({
          id: 'auth-fail',
          icon: 'icon/warning.svg',
          message: '憑證過期，請重新登入'
        });
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
