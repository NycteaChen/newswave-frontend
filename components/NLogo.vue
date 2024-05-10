<template>
  <nuxt-link
    to="/"
    class="logo d-block overflow-hidden w-100"
    :style="backgroundImage"
    alt="logo"
  >
    NewsWave
  </nuxt-link>
</template>
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute();

const logoType = ref<'light' | 'dark'>('light');

const backgroundImage = computed(() => ({
  backgroundImage: `url(${requireImage(`site/logo-${logoType.value}.svg`)})`
}));

watchImmediate(route, (val: RouteLocationNormalizedLoaded) => {
  logoType.value = val.name === 'index' ? 'light' : 'dark';
});
</script>
<style lang="scss" scoped>
.logo {
  max-width: 198px;
  height: 30px;
  background-position-y: center;
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: 101%;
  white-space: nowrap;
}
</style>
