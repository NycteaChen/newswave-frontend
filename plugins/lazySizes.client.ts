import lazySizes from 'lazysizes';
export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.vueApp.use(lazySizes);
});
