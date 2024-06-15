<template>
  <div>關於我們</div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'info'
});

useHead({
  titleTemplate: (title) => `${title} - 關於我們`
});
</script>
