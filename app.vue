<template>
  <div>
    <n-header v-if="showHeader" />

    <nuxt-layout class="layouts">
      <nuxt-page :page-key="(route) => route.fullPath" />
    </nuxt-layout>
    <n-footer v-if="showFooter" />

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
const showFooter = computed(() => route.name !== 'login-register');

const isMobile = computed<boolean>(() => width.value < 768);
const isPc = computed<boolean>(() => width.value >= 1200);
provide('isMobile', isMobile);
provide('isPc', isPc);
</script>
