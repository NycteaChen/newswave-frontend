<template>
  <section class="my-collect mt-3">
    <div
      v-if="renderList.length"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3"
    >
      <news-card
        v-for="item in renderList"
        :key="item.articleId"
        :news-data="item"
        show-collect
      />
    </div>
    <n-empty v-else />
    <n-pagination
      v-model:current="pagination.current"
      :total-pages="pagination.totalPages"
      :btn-loading="btnLoading"
    />
  </section>
</template>
<script lang="ts" setup>
import type { PaginationType } from '@/components/NPagination.vue';

definePageMeta({
  title: '文章管理 - 我的收藏'
});

const isMobile = inject<any>('isMobile');

const { getCollectPage } = useUserApi();

const collectList = ref<ArticleType[]>([]);
const collectPhoneList = ref<ArticleType[]>([]);
const btnLoading = ref<boolean>(false);
const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const renderList = computed(() => (isMobile.value ? collectPhoneList.value : collectList.value));

const getCollectPageHandler = async () => {
  btnLoading.value = true;

  const params = {
    pageIndex: pagination.current,
    pageSize: 12
  };

  const { status, data } = await getCollectPage(params);
  if (status) {
    collectList.value = data.articles;

    collectPhoneList.value = pagination.current === 1 ? data.articles : [...collectPhoneList.value, ...data.articles];

    pagination.totalPages = data.totalPages || 0;
  }

  btnLoading.value = false;
};

onMounted(async () => {
  await nextTick(() => {
    getCollectPageHandler();
  });
});

watch(
  () => pagination.current,
  () => {
    getCollectPageHandler();
  }
);
</script>
<style lang="scss" scoped>
.my-collect .row {
  margin-bottom: 40px;
}
</style>
