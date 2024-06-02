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
</script>
