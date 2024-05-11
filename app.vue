<template>
  <div>
    <n-header v-if="showHeader && !pageLoading" />
    <div
      v-if="pageLoading"
      class="spinner-border text-primary"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <NuxtLayout class="layouts">
      <nuxt-page :page-key="(route) => route.fullPath" />
      <nuxt-link
        v-if="$route.name !== 'index'"
        to="/"
        >返回首頁
      </nuxt-link>
    </NuxtLayout>
    <n-footer />
    <n-mask />
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { width } = useWindowSize();

const showHeader = computed(() => route.name !== 'login-register');

const isMobile = computed<boolean>(() => width.value < 768);
provide('isMobile', isMobile);

const pageLoading = ref(true);
provide('pageLoading', pageLoading);

const nuxtApp = useNuxtApp();
nuxtApp.hook('page:start', () => {
  pageLoading.value = true;
});

nuxtApp.hook('page:finish', () => {
  pageLoading.value = false;
});
</script>
