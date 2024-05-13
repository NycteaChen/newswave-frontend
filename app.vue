<template>
  <div>
    <n-header v-if="showHeader && !pageLoading" />
    <n-spin
      v-if="pageLoading"
      class="text-primary"
    />

    <NuxtLayout class="layouts">
      <nuxt-page :page-key="(route) => route.fullPath" />
      <nuxt-link
        v-if="$route.name !== 'index'"
        to="/"
        >返回首頁
      </nuxt-link>
    </NuxtLayout>
    <n-footer />

    <client-only>
      <n-mask />
      <n-to-top />
    </client-only>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { width } = useWindowSize();
const { y } = useWindowScroll();
provide('scrollY', y);

const showHeader = computed(() => route.name !== 'login-register');

const isMobile = computed<boolean>(() => width.value < 768);
const isPc = computed<boolean>(() => width.value >= 1200);
provide('isMobile', isMobile);
provide('isPc', isPc);

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
