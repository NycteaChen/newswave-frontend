<template>
  <section class="title mb-4 bg-body-light">
    <div class="d-flex">
      <div class="title-img me-4">
        <img
          :src="magazineContent.categoryImg"
          :alt="magazineContent.categoryDescribe"
          class="img-fluid h-100 object-fit-cover"
        />
      </div>
      <div class="title-scribe text-primary">
        <div class="mb-3 fw-bold fs-3">{{ magazineContent.categoryName }}</div>
        <div>
          <div v-if="!isMobile || showFullContent">{{ magazineContent.categoryDescribe }}</div>
          <div
            v-else
            class="limit-line-two"
          >
            {{ magazineContent.categoryDescribe }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row-reverse">
      <div
        class="d-md-none btn-expand"
        @click="toggleMagazineContent"
      >
        <div class="d-flex align-items-center">
          <span class="expand-text">{{ showFullContent ? '收合' : '展開' }}</span>
          <img
            v-if="!showFullContent"
            :src="requireImage('icon/angle-down.svg')"
            alt="展開"
            class="expand-img"
          />
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="(item, index) in isMobile ? magazineArticleListPhone : magazineArticleList"
        :key="index"
      >
        <nuxt-link :to="`/article/${$route.params.category}/${item.articleId}`">
          <div class="card h-100 .image-container">
            <img
              src="https://s3-alpha-sig.figma.com/img/a42b/d33f/1838a6959de079672cb7810c637cd8fc?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmjm0N-IAHDN5IxAUNHYHS9CJs8EUE63tXXyPRWMKjLEU~IMHSNEDI55WYLWzxb0SZCVoK6-98RmgwyPJfTT8VkhgTLK2QIjUxBq-I5sKex61YIaz2JMbQe4u4CBk~eY6cnj1ZCfOAy4~BQ0LxwMyKDZzfBssEdZdDZTArEaC1vdOgFDXUIwz2kxuo~dpgFOQ3njlB9P0FPp~5mLSgwIkRync0sWoAhY0TzZkOwarG4F0qdHqn9ZTAM~kbdD7wjils~-6vCimXroVYL69v7Mz1sq1mi3uxbPoXZ6uYnc7RmXZDy7cDkT29D9tyQwBMRL7XVCqOzs0I4ee~nX84ElNA__"
              class="card-img-top"
              alt="{{item.imageDescribe}}"
            />
            <NTags :type="item.tags[0]"> </NTags>
            <div class="card-body">
              <h5 class="card-title limit-line-two text-primary">
                {{ item.title }}
              </h5>
              <div class="d-flex justify-content-between text-muted">
                <div class="d-flex align-items-center">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/3662/e399/b8712cd3f85b9427a7e6d17ee57ca6cb?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MDMwFa27gcexv9mYTRKybhb~A-xmnfFc2VD5WTxnQYyLlFSN0vU7d3vGWt6Iiz4UdDkRIowKrCwqy13nZ6X2J8QSYEY3YS9YOySTWxz4-h2wk-CMBweYBfIxW0wHNKiJ0y6CprMFayB4Dk-N8vBxxAKuinVhbgG0gRLszYyXNKiC49p9g~Vv5B4HKj9jcuNTSFEql6Yb0Jnr9IX7HTeuZskjcTwXgr2DmfD70Blct7zEsUHgO73AfXreEb6QvQFXNi8ZNzdqEyiS86gaR2sovuSQqoYLvHsehifDYWMiQM3v0GiEpWxRxDcZjftk83UomaVAN5~i08~joNg7Yhq5jg__"
                    alt="作者頭像"
                    class="author-img"
                  /><span>{{ item.editor }}</span>
                </div>
                <div class="upload-time">{{ getPublishedDays(item.publishedAt) }} 天前</div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="d-flex justify-content-center pagination-position">
      <NPagination
        :total-pages="pagination.totalPages"
        :current-page="currentPage"
        @page-change="handlePageChange"
      ></NPagination>
    </div>
  </section>
</template>
<script setup lang="ts">
const route = useRoute();
const { getMagazineArticlePage } = useGuestApi();

const magazineArticleList = ref<ArticleType[]>([]);
const magazineArticleListPhone = ref<ArticleType[]>([]);
const pagination = ref<PageType>({
  firstPage: false,
  lastPage: false,
  empty: false,
  totalElements: 0,
  totalPages: 0,
  targetPage: 0
});
const currentPage = ref(1);
const getMagazineArticlePageHandler = async () => {
  const params: MagazineArticlePageRequestType = {
    pageIndex: currentPage.value,
    category: route.params.category
  };
  const { status, data } = await getMagazineArticlePage(params);
  if (status) {
    magazineArticleList.value = data.articles;
    if (currentPage.value === 1) {
      magazineArticleListPhone.value = data.articles;
    } else {
      magazineArticleListPhone.value = [...magazineArticleListPhone.value, ...data.articles];
    }

    pagination.value = {
      firstPage: data.firstPage,
      lastPage: data.lastPage,
      empty: data.empty,
      totalElements: data.totalElements || 0,
      totalPages: data.totalPages || 0,
      targetPage: data.targetPage || 0
    };
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  getMagazineArticlePageHandler();
};
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);
const magazineContent = ref({
  categoryDescribe: '',
  categoryImg: '',
  categoryName: ''
});
watch(
  () => route.params.category,
  (category) => {
    const matchingCategory = magazineCategoryList.value.find((item) => item.categoryId === category);
    if (matchingCategory) {
      magazineContent.value = {
        categoryDescribe: matchingCategory.categoryDescribe,
        categoryImg: matchingCategory.categoryImg,
        categoryName: matchingCategory.categoryName
      };
    }
  },
  { immediate: true }
);

const showFullContent = ref(false);
const toggleMagazineContent = () => {
  showFullContent.value = !showFullContent.value;
};

const getPublishedDays = (publishedAtStr: string | number | Date) => {
  const publishedAt = new Date(publishedAtStr);
  const today = new Date();
  const diffInDays = Math.floor((today.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays;
};
onMounted(async () => {
  await nextTick(() => {
    getMagazineArticlePageHandler();
  });
});
</script>
<style lang="scss" scoped>
.title-img {
  width: 120px;
  height: 120px;
}

.title-scribe {
  width: 231px;
}

.pagination-position {
  margin-top: 40px;
  margin-bottom: 80px;
}

.author-img {
  margin-right: 8px;
  max-width: 24px;
  height: 24px;
}

.upload-time {
  position: relative;
  padding-left: 8px;
}

.upload-time::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px;
  height: 16px;
  background-color: $gray-300;
  content: '';
  transform: translateY(-50%);
}

.image-container {
  position: relative;
  display: inline-block;
}

.card-title {
  height: 66px;
  font-size: 22px;
  line-height: 33px;

  &:hover {
    opacity: 0.5;
  }
}

.card-body {
  padding: 8px 24px 16px;
}

.expand-img {
  margin-top: 4px;
  margin-right: 12px;
  margin-bottom: 4px;
  max-width: 9px;
  height: 10px;
}

.btn-expand {
  margin-top: 4px;
  max-width: 61px;
  border: 0;
  border-radius: 20px;
  background-color: $blue-300;
  color: $gray-100;
}

.expand-text {
  margin: 2px 4px 2px 12px;
  max-width: 24px;
  height: 18px;
  font-size: 12px;
}

.title {
  border-radius: 8px;
}

@include media-breakpoint-down(md) {
  .title {
    padding: 12px;
  }

  .title-img {
    width: 80px;
    height: 80px;
  }
}

@include media-breakpoint-up(md) {
  .title {
    padding: 16px;
  }

  .title-scribe {
    width: 1120px;
  }
}
</style>
