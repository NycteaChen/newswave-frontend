<template>
  <section class="my-collect mt-3">
    <n-loading :loading="showLoading">
      <ul
        v-if="renderList.length"
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3"
      >
        <li
          v-for="item in renderList"
          :key="item.articleId"
        >
          <news-card
            :news-data="item"
            show-collect
          />
        </li>
      </ul>
      <n-empty
        v-else-if="!showLoading"
        img="icon/no-data.svg"
      />
    </n-loading>
    <n-pagination
      v-model:current="pagination.current"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
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
const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(true);

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const showLoading = computed(() => {
  if (isMobile.value) {
    return !pagination.totalPages && loading.value;
  }
  return loading.value;
});

const renderList = computed(() => (isMobile.value ? collectPhoneList.value : collectList.value));

const getCollectPageHandler = async () => {
  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  const params = {
    pageIndex: pagination.current,
    pageSize: 12
  };

  const { status, data } = await getCollectPage(params);
  if (status) {
    collectList.value = data.articles;

    collectPhoneList.value = pagination.current === 1 ? data.articles : [...collectPhoneList.value, ...data.articles];

    pagination.totalPages = data.totalPages || 0;
  } else {
    collectList.value = [];
  }

  loading.value = false;
  loadMoreLoading.value = false;
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

::v-deep(.news-card-container),
::v-deep(.news-card) {
  height: 100%;
}
</style>
