<template>
  <div class="news-page">
    <n-loading :loading="showLoading">
      <ul
        v-if="renderList.length"
        class="row gy-4 gx-md-10 align-items-center"
      >
        <li
          v-for="(item, index) in renderList"
          :key="index"
          class="col-12"
          :class="{ 'col-md-6': index }"
        >
          <article-row
            :news-data="item"
            :size="index ? 'small' : 'big'"
          />
        </li>
      </ul>
      <n-empty
        v-else-if="!showLoading"
        width="250"
        text="暫無新聞資料"
      />
    </n-loading>
    <n-pagination
      v-model:current="pagination.current"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
      class="mt-4"
    />
  </div>
</template>
<script setup lang="ts">
import type { PaginationType } from '@/components/NPagination.vue';

useHead({
  titleTemplate: (title) => `${title} - 新聞`
});

const route = useRoute();
const { getNewsPage } = useGuestApi();

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
  keepalive: true,
  middleware(to, from) {
    if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
      const { newsNav } = useNav();
      const fromIndex = newsNav.findIndex(
        (e) =>
          e.label === from.query.category ||
          (from.name === 'news' && !from.query.category) ||
          (e.value === '/magazine' && String(from.name)?.includes('magazine'))
      );
      const toIndex = newsNav.findIndex(
        (e) =>
          e.label === to.query.category ||
          (to.name === 'news' && !to.query.category) ||
          (e.value === '/magazine' && String(to.name)?.includes('magazine'))
      );
      // eslint-disable-next-line no-param-reassign
      to.meta.pageTransition.name = +toIndex > +fromIndex ? 'slide-left' : 'slide-right';
    }
  }
});

const isMobile = inject<any>('isMobile');

const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(true);
const newsArticleList = ref<ArticleType[]>([]);
const newsArticlePhoneList = ref<ArticleType[]>([]);

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const renderList = computed(() => (isMobile.value ? newsArticlePhoneList.value : newsArticleList.value));
const showLoading = computed(() => {
  if (isMobile.value) {
    return !pagination.totalPages && loading.value;
  }
  return loading.value;
});

const getNewsPageHandler = async () => {
  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  const params = {
    pageIndex: pagination.current,
    category: route.query?.category as string | undefined,
    pageSize: 11
  };

  const { status, data } = await getNewsPage(params);
  if (status) {
    newsArticleList.value = data.articles || [];

    newsArticlePhoneList.value =
      pagination.current === 1 ? data.articles : [...newsArticlePhoneList.value, ...data.articles];

    pagination.totalPages = data.totalPages || 0;
  } else {
    newsArticleList.value = [];
  }

  loading.value = false;
  loadMoreLoading.value = false;
};

onMounted(async () => {
  await nextTick(() => {
    getNewsPageHandler();
  });
});

watch(
  () => pagination.current,
  () => {
    getNewsPageHandler();
  }
);

watchDeep(
  () => route.query,
  () => {
    if (pagination.current !== 1) {
      pagination.current = 1;
    } else {
      getNewsPageHandler();
    }
  }
);
</script>
<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .gx-md-10 {
    --bs-gutter-x: 40px;
  }
}

@include media-breakpoint-down(md) {
  .news-page {
    margin-bottom: 40px;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.2s;
  }

  .slide-left-enter-from {
    opacity: 0;
    transform: translate(50px, 0);
  }

  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-enter-from {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
  }
}
</style>
