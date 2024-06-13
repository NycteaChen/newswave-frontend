<template>
  <div class="news-page">
    <n-loading :loading="showLoading">
      <ul
        v-if="renderList.length"
        class="row gy-4 gx-md-10"
      >
        <li
          v-for="(item, index) in renderList"
          :key="index"
          class="col-12 news-container"
          :class="{ 'col-md-6': index }"
        >
          <nuxt-link
            class="d-flex"
            :class="index ? 'gap-2 news-item pb-2 border-bottom' : 'flex-column gap-4 flex-md-row p-3 border rounded-2'"
            :to="`/article/${item?.topic?.[0]}/${item?.articleId}`"
          >
            <template v-if="index">
              <div class="news-image-container overflow-hidden rounded-1">
                <img
                  :src="item.image"
                  class="news-image object-fit-cover"
                />
              </div>
              <div class="d-flex flex-column justify-content-between gap-2 flex-fill">
                <h6 class="news-title text-body fw-bold limit-line-two">{{ item.title }}</h6>
                <div class="d-flex align-items-center mt-auto justify-content-between">
                  <article-label :text="item.topic?.[0]" />
                  <div class="publish-date text-muted text-end">
                    {{ useDateFormat(item.publishedAt, 'YYYY/MM/DD').value }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="headline-col overflow-hidden rounded-1">
                <img
                  class="news-image object-fit-cover h-100"
                  :src="item.image"
                />
              </div>
              <div class="headline-col d-flex flex-column gap-3">
                <h3 class="news-title text-body fw-bold limit-line-two">{{ item.title }}</h3>
                <img
                  class="wave-icon d-none d-md-inline-block"
                  :src="requireImage('icon/wave-cyan.svg')"
                />
                <div class="d-none d-md-block text-muted">
                  <p class="limit-line-four">{{ item.content }}</p>
                </div>
                <div class="d-flex align-items-center mt-auto">
                  <article-label
                    :text="item.topic?.[0]"
                    class="me-3"
                  />
                  <div class="text-muted flex-fill px-3 border-start border-layout whitespace-nowrap">
                    {{ item.editor }}
                  </div>
                  <div class="publish-date text-muted text-end border-start border-layout">
                    {{ useDateFormat(item.publishedAt, 'YYYY/MM/DD').value }}
                  </div>
                </div>
              </div>
            </template>
          </nuxt-link>
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
.wave-icon {
  width: 36px;
}

.news-item {
  .news-image-container {
    max-width: 140px;
  }
}

.publish-date {
  width: 108px;
}

@include media-breakpoint-up(md) {
  .headline-col {
    width: 50%;
  }

  .gx-md-10 {
    --bs-gutter-x: 40px;
  }

  .news-container {
    .news-image,
    .news-title {
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      .news-image {
        transform: scale(1.2);
      }

      .news-title {
        opacity: 0.5;
      }
    }
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
