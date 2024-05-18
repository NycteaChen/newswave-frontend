<template>
  <div>
    <div>雜誌種類列表頁 5-1</div>
    <h1>精選雜誌</h1>
    <p>
      <nuxt-link :to="`/magazine/${category}`">{{ category }}</nuxt-link>
    </p>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  },
  keepalive: true
});

const category = ref('科技前沿周刊');
</script>
<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.2s;
  }

  .slide-left-enter-from {
    opacity: 0;
    transform: translate(50px, 0);
  }

  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
  }
}
</style>
