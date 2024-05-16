<template>
  <div>{{ $route.params.category }}</div>
  <h1>雜誌文章列表 5-2</h1>

  <nuxt-link :to="`/article/${articleId}`"><div>雜誌文章1</div></nuxt-link>
  <NPagination
    :total-pages="20"
    :current-page="currentPage"
    @page-change="handlePageChange"
  ></NPagination>
</template>
<script setup lang="ts">
const articleId = ref<string>('M-123');
const currentPage = ref(1);

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();

const handlePageChange = (page: number) => {
  currentPage.value = page;
  emit('page-change', page);
};
</script>
