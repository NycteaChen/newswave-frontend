<template>
  <div class="member-center">
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'member',
  middleware: ['auth']
});

useHead({
  titleTemplate: (title) => `${title} - 會員中心`
});
</script>
