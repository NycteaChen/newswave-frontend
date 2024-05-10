<template>
  <section class="banner">
    <h1 class="text-primary-white">
      <p>NewsWave</p>
      <p>將您推向世界脈動</p>
    </h1>
  </section>

  <nuxt-link
    class="text-primary-white"
    to="/magazine"
    >雜誌種類頁</nuxt-link
  >
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'home'
});
</script>
