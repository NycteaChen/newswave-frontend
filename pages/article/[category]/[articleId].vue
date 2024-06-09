<template>
  <article class="article-item">
    <section class="card">
      <div class="card-body p-2 pb-4">
        <header class="card-title p-2 p-md-3 d-flex flex-column gap-3">
          <div class="d-flex align-items-center gap-2">
            <article-label
              v-for="item in articleData?.topic"
              :key="item"
              :text="item"
            />
          </div>
          <h3 class="mb-0">{{ articleData?.title }}</h3>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="text-sm">{{ articleData?.editor }}</div>
              <div class="text-muted text-xs">{{ articleData?.publishedAt }}</div>
            </div>
            <collect-share class="d-none d-md-flex" />
          </div>
        </header>
        <figure
          v-if="articleData?.image || renderDefaultMagazineImage"
          class="mb-md-4"
        >
          <img
            :src="articleData?.image || renderDefaultMagazineImage"
            class="rounded-1 mb-2"
          />
          <figcaption class="text-sm text-muted mx-2 pt-2 pb-3 border-bottom pt-md-3 pb-md-4 mx-md-4">
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
    </section>
    <comment-area class="mt-2" />
  </article>
</template>
<script setup lang="ts">
const route = useRoute();
const token: any = useCookie('token');

const { getArticleDetail } = useGuestApi();
const { getMagazineArticleDetail } = useUserApi();

const guestStore = useGuestStore();

const { magazineCategoryList } = storeToRefs(guestStore);

const isMagazine = computed<boolean>(() => String(route.params.articleId).startsWith('M-'));
const showMagazineContent = computed<boolean>(() => token.value && isMagazine.value);
const renderDefaultMagazineImage = computed(
  () => magazineCategoryList.value?.find((e) => String(route.params.category) === e.categoryId)?.categoryImg || ''
);

const articleData = ref<ArticleType>();

const responseHandler = (status: boolean, article: ArticleType) => {
  if (status) {
    articleData.value = article;
    const list = renderBreadcrumb();
    list.push({ label: articleData.value?.title || '...', value: '', truncate: true });

    guestStore.SET_BREADCRUMB_NAV(list);
  }
};

const getMagazineArticleDetailHandler = async () => {
  const { status, data } = await getMagazineArticleDetail(`${route.params.articleId}`);
  responseHandler(status, data.article);
};

const getArticleDetailHandler = async () => {
  const { status, data } = await getArticleDetail(`${route.params.articleId}`);
  responseHandler(status, data);
};

onMounted(async () => {
  await nextTick(() => {
    if (showMagazineContent.value) {
      getMagazineArticleDetailHandler();
    } else {
      getArticleDetailHandler();
    }
  });
});

watch(
  () => token.value,
  () => {
    if (!showMagazineContent.value) {
      getArticleDetailHandler();
    }
  }
);
</script>
