<template>
  <section class="mt-5">
    <client-only>
      <nuxt-page />
    </client-only>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'checkout'
});

useHead({
  titleTemplate: (title) => `${title} - 訂閱`
});
</script>
