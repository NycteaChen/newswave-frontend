<template>
  <div>文章內頁 3-2、5-3</div>
  <div>{{ `文章 ID:${$route.params.articleId}` }}</div>
  <div>{{ `${articleType}文章` }}</div>

  <div v-if="hiddenArticle">尚未登入，無法獲取雜誌文章資訊！</div>
</template>
<script setup lang="ts">
const route = useRoute();
const isLogin: any = useCookie('isLogin');

const articleType = computed(() =>
  route.params.articleId[0] === 'M' ? '雜誌' : '新聞'
);

const hiddenArticle = computed(
  () => !isLogin.value && articleType.value === '雜誌'
);
</script>
