<template>
  <div>{{ $route.params.category }}</div>
  <h1>雜誌文章列表 5-2</h1>

  <nuxt-link :to="`/article/${articleId}`"><div>雜誌文章1</div></nuxt-link>
</template>
<script setup lang="ts">
const articleId = ref<string>('M-123');
</script>