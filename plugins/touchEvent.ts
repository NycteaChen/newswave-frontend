import Vue3TouchEvents from 'vue3-touch-events';

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.vueApp.use(Vue3TouchEvents);
});
