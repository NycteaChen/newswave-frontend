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
interface NLogoProps {
  logoType?: 'light' | 'dark';
}

const props = withDefaults(defineProps<NLogoProps>(), {
  logoType: 'dark'
});

const backgroundImage = computed(() => ({
  backgroundImage: `url(${requireImage(`site/logo-${props.logoType}.svg`)})`
}));
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
