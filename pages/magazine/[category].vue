<template>
  <div>{{ $route.params.category }}</div>
  <h1>雜誌文章列表 5-2</h1>

  <nuxt-link :to="`/article/${$route.params.category}/${articleId}`"
    ><div>{{ `${$route.params.category}文章` }}</div></nuxt-link
  >
  <NPagination
    :total-pages="20"
    :current-page="currentPage"
    @page-change="handlePageChange"
  ></NPagination>
</template>
<script setup lang="ts">
const articleId = ref<string>('M-123');
const currentPage = ref(1);

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>
