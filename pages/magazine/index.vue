<template>
  <div>雜誌種類列表頁 5-1</div>
  <h1>精選雜誌</h1>
  <nuxt-link :to="`/magazine/${category}`">{{ category }}</nuxt-link>
</template>
<script setup lang="ts">
const category = ref('科技前沿周刊');
</script>
