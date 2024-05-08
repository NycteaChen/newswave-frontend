<template>
  <div class="member-center mt-3">
    <div>這是會員中心layout</div>
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'] // or middleware: 'auth'
});
</script>
