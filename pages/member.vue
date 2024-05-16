<template>
  <div class="member-center mt-3">
    <member-header />
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'] // or middleware: 'auth'
});
</script>
