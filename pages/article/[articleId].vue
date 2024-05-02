<template>
  <div>文章內頁 3-2、5-3</div>
  <div>{{ `文章 ID:${$route.params.articleId}` }}</div>
  <div>{{ `${articleType}文章` }}</div>
</template>
<script setup lang="ts">
const route = useRoute();

const articleType = computed(() =>
  route.params.articleId[0] === 'M' ? '雜誌' : '新聞'
);
</script>
