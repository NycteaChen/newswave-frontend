<template>
  <div class="member-center mb-3">
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'member',
  middleware: ['auth'] // or middleware: 'auth'
});
</script>
