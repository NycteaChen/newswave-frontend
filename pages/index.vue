<template>
  <div class="home-page">
    <home-banner />
    <app-intro />
    <hot-news />
    <plus-intro />
    <selected-magazine />
    <home-faq />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'home'
});
</script>
<style lang="scss" scoped>
::v-deep(.wave-img) {
  position: absolute;
  bottom: 0;
}
</style>
