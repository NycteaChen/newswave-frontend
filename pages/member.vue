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
</script>
