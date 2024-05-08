<template>
  <div>
    <n-header v-if="showHeader && !pageLoading" />
    <div v-if="pageLoading">loading.....</div>
    <main
      v-show="!pageLoading"
      style="height: '500px'"
    >
      <nuxt-page :page-key="(route) => route.fullPath" />
      <nuxt-link
        v-if="$route.name !== 'index'"
        to="/"
        >返回首頁
      </nuxt-link>
    </main>
    <n-footer />
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const showHeader = computed(() => route.name !== 'login-register');

const nuxtApp = useNuxtApp();

const pageLoading = ref(true);

provide('pageLoading', pageLoading);

nuxtApp.hook('page:start', () => {
  pageLoading.value = true;
});

nuxtApp.hook('page:finish', () => {
  pageLoading.value = false;
});
</script>
