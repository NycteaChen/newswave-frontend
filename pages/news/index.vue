<template>
  <div>
    <p>新聞首頁 3-1</p>

    <nuxt-link :to="`/article/${articleId}`"><div>新聞文章1</div></nuxt-link>
  </div>
</template>
<script setup lang="ts">
const articleId = ref<string>('N-87');
</script>
