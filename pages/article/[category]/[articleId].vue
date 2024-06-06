<template>
  <div>文章內頁 3-2、5-3</div>
  <div>{{ `種類：${$route.params.category}` }}</div>
  <div>{{ `文章 ID:${$route.params.articleId}` }}</div>
  <div>{{ `${articleType}文章` }}</div>

  <div v-if="hiddenArticle">尚未登入，無法獲取雜誌文章資訊！</div>
</template>
<script setup lang="ts">
const route = useRoute();
const token: any = useCookie('token');

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

const articleType = computed(() => (route.params.articleId[0] === 'M' ? '雜誌' : '新聞'));

const hiddenArticle = computed(() => !token.value && articleType.value === '雜誌');

watchImmediate([() => route.path, () => magazineCategoryList.value], () => {
  const list = renderBreadcrumb();
  list.push({ label: '假的 title 標題標題的 title 標題標題的 title 標題標題', value: '' });

  guestStore.SET_BREADCRUMB_NAV(list);
});
</script>
