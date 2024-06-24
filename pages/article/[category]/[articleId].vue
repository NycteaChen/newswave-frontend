<template>
  <article class="article-item position-relative mb-4">
    <n-loading :loading="loading">
      <client-only>
        <template v-if="hasArticle">
          <teleport to="#shareCollect">
            <collect-share class="d-md-none mb-2" />
          </teleport>
          <section
            class="card overflow-hidden"
            :class="{ 'has-paywall': showPaywall }"
          >
            <div class="card-body p-2 pb-4">
              <header class="card-title p-2 p-md-3 d-flex flex-column gap-3">
                <div class="d-flex align-items-center gap-2">
                  <article-label
                    v-for="item in articleData?.topic"
                    :key="item"
                    :article-id="articleData?.articleId"
                    :text="item"
                  />
                </div>
                <h3 class="mb-0">{{ articleData?.title }}</h3>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fs-sm">{{ articleData?.editor }}</div>
                    <div class="text-muted fs-xs">{{ articleData?.publishedAt }}</div>
                  </div>
                  <collect-share class="d-none d-md-flex" />
                </div>
              </header>
              <figure
                v-if="articleData?.image || articleData?.articleId?.startsWith('M-')"
                class="mb-md-4"
              >
                <article-image
                  :article-data="articleData"
                  class="news-image rounded-1 mb-2 d-block mx-auto"
                />
                <figcaption class="fs-sm text-muted mx-2 pt-2 pb-3 border-bottom pt-md-3 pb-md-4 mx-md-4">
                  {{ articleData?.imageDescribe }}
                </figcaption>
              </figure>

              <p class="card-text mx-2 pb-3 mx-md-4 pb-md-4 border-bottom mb-2">
                {{ articleData?.content }}
              </p>
              <footer class="p-3">
                <collect-share />
              </footer>
            </div>
            <article-paywall
              v-if="showPaywall"
              ref="articlePaywallRef"
              :read-quota="readQuota"
              class="position-absolute bottom-0"
              @free-read="freeReadHandler"
            />
          </section>
          <comment-area
            v-if="!showPaywall"
            class="mt-2"
          />
        </template>
      </client-only>
      <n-empty
        v-if="!loading && !hasArticle"
        text="無此文章資料"
        width="300"
      />
    </n-loading>
  </article>
</template>
<script setup lang="ts">
// @ts-ignore
import ArticlePaywall from '@/components/_pages/article/ArticlePaywall.vue';

const route = useRoute();
const token: any = useCookie('token');

const { getArticleDetail } = useGuestApi();
const { getMagazineArticleDetail, getMagazineArticleQuota } = useUserApi();

const guestStore = useGuestStore();
const userStore = useUserStore();

const { planType } = storeToRefs(userStore);

const loading = ref<boolean>(true);
const isFreeRead = ref<boolean>(false);
const readQuota = ref<number>(0);
const articleData = ref<ArticleType>();
const articlePaywallRef = ref<InstanceType<typeof ArticlePaywall> | null>(null);

const hasArticle = ref<boolean>(false);

const isMagazine = computed<boolean>(() => String(route.params.articleId).startsWith('M-'));
const showPaywall = computed<boolean>(
  () => isMagazine.value && (!token.value || !(planType.value || isFreeRead.value))
);

const articleId = computed<string>(() => `${route.params.articleId}`);

const responseHandler = (status: boolean, article: ArticleType) => {
  if (status) {
    articleData.value = article;
  }
  hasArticle.value = status && !!articleData.value?.articleId;

  const list = renderBreadcrumb();
  list.push({ label: articleData.value?.title || '...', value: '', truncate: true });

  guestStore.SET_BREADCRUMB_NAV(list);
};

const getMagazineArticleQuotaHandler = async () => {
  loading.value = true;
  const { status, data, message } = await getMagazineArticleQuota(articleId.value);
  responseHandler(status, data?.article);
  readQuota.value = data?.quota || 0;
  isFreeRead.value = status;

  if (!status) {
    showToast({
      id: 'free-read-fail',
      icon: 'icon/warning.svg',
      message
    });
  }
  loading.value = false;
};

const getMagazineArticleDetailHandler = async () => {
  loading.value = true;
  const { status, data } = await getMagazineArticleDetail(articleId.value);
  responseHandler(status, data?.article);
  readQuota.value = data?.quota || 0;
  loading.value = false;
};

const getArticleDetailHandler = async () => {
  loading.value = true;
  const { status, data } = await getArticleDetail(articleId.value);
  responseHandler(status, data);
  readQuota.value = 0;

  loading.value = false;
};

const freeReadHandler = async () => {
  if (articlePaywallRef.value) {
    articlePaywallRef.value.btnLoading = true;

    await getMagazineArticleQuotaHandler();

    articlePaywallRef.value.btnLoading = false;
  }
};

onMounted(async () => {
  await nextTick(() => {
    if (isMagazine.value && token.value) {
      getMagazineArticleDetailHandler();
    } else {
      getArticleDetailHandler();
    }
  });
});

watch(
  () => token.value,
  (val) => {
    if (!val && isMagazine.value) {
      getArticleDetailHandler();
    }
  }
);

useHead({
  titleTemplate: (title) => `${title} - 文章`
});
</script>
<style lang="scss" scoped>
.card.has-paywall {
  padding-bottom: 150px;
}

.card-text {
  white-space: pre-wrap;
}

@include media-breakpoint-up(md) {
  .news-image {
    max-width: 75%;
  }
}
</style>
