<template>
  <section class="title mb-4 bg-body-light">
    <div class="d-flex">
      <div class="title-img me-4">
        <img
          :src="magazineContent?.categoryImg"
          :alt="magazineContent?.categoryDescribe"
          class="h-100 object-fit-cover"
        />
      </div>
      <div class="text-primary">
        <div class="fw-bold fs-3">{{ magazineContent?.categoryName }}</div>
        <p
          class="mb-0 mt-2 mt-md-4"
          :class="{ 'limit-line-two': !showFullContent }"
        >
          {{ magazineContent?.categoryDescribe }}
        </p>
      </div>
    </div>
    <div
      class="d-md-none btn-expand d-flex align-items-center justify-content-center gap-1"
      :class="{ show: showFullContent }"
      @click="toggleMagazineContent"
    >
      <span class="expand-text">{{ showFullContent ? '收合' : '展開' }}</span>
      <img
        v-if="!showFullContent"
        :src="requireImage('icon/angle-down.svg')"
        alt="展開"
        class="expand-img"
      />
    </div>
  </section>
  <section>
    <ul
      v-if="renderList.length"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"
    >
      <li
        v-for="item in renderList"
        :key="item.articleId"
      >
        <nuxt-link :to="`/article/${$route.params.category}/${item.articleId}`">
          <div class="card overflow-hidden">
            <div class="overflow-hidden">
              <img
                :src="magazineContent?.categoryImg"
                class="card-img-top"
                :alt="item.imageDescribe"
              />
            </div>
            <NTags
              v-if="item.tags?.length"
              :type="item.tags[0]"
            />
            <div class="card-body">
              <h5 class="card-title limit-line-two text-primary">
                {{ item.title }}
              </h5>
              <div class="d-flex justify-content-between text-muted">
                <div class="d-flex align-items-center">
                  <!--   <img
                    src="https://s3-alpha-sig.figma.com/img/3662/e399/b8712cd3f85b9427a7e6d17ee57ca6cb?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MDMwFa27gcexv9mYTRKybhb~A-xmnfFc2VD5WTxnQYyLlFSN0vU7d3vGWt6Iiz4UdDkRIowKrCwqy13nZ6X2J8QSYEY3YS9YOySTWxz4-h2wk-CMBweYBfIxW0wHNKiJ0y6CprMFayB4Dk-N8vBxxAKuinVhbgG0gRLszYyXNKiC49p9g~Vv5B4HKj9jcuNTSFEql6Yb0Jnr9IX7HTeuZskjcTwXgr2DmfD70Blct7zEsUHgO73AfXreEb6QvQFXNi8ZNzdqEyiS86gaR2sovuSQqoYLvHsehifDYWMiQM3v0GiEpWxRxDcZjftk83UomaVAN5~i08~joNg7Yhq5jg__"
                    alt="作者頭像"
                    class="author-img"
                  /> --><span>{{ item.editor }}</span>
                </div>
                <div class="upload-time">{{ getPublishedDays(item.publishedAt) }} 天前</div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <n-empty
      v-else
      text="暫無文章資料"
      width="300"
    />
    <n-pagination
      v-model:current="pagination.current"
      class="pagination-position"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
    />
  </section>
</template>
<script setup lang="ts">
import type { PaginationType } from '@/components/NPagination.vue';

const isMobile = inject<any>('isMobile');

const route = useRoute();
const { getMagazineArticlePage } = useGuestApi();

const magazineArticleList = ref<ArticleType[]>([]);
const magazineArticlePhoneList = ref<ArticleType[]>([]);
const loadMoreLoading = ref<boolean>(false);

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const renderList = computed(() => (isMobile.value ? magazineArticlePhoneList.value : magazineArticleList.value));

const getMagazineArticlePageHandler = async () => {
  loadMoreLoading.value = true;

  const params: MagazineArticlePageRequestType = {
    pageIndex: pagination.current,
    category: String(route.params.category),
    pageSize: 6
  };
  const { status, data } = await getMagazineArticlePage(params);
  if (status) {
    magazineArticleList.value = data.articles;

    magazineArticlePhoneList.value =
      pagination.current === 1 ? data.articles : [...magazineArticlePhoneList.value, ...data.articles];

    pagination.totalPages = data.totalPages || 0;
  }

  loadMoreLoading.value = false;
};

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

const magazineContent = computed(() => {
  const { category } = route.params;
  return magazineCategoryList.value?.find((item) => item.categoryId === category);
});

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

watch(
  () => pagination.current,
  () => {
    getMagazineArticlePageHandler();
  }
);
</script>
<style lang="scss" scoped>
.title-img {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
}

.card .card-img-top {
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
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

.card {
  .card-title {
    height: 66px;
    font-size: 22px;
    line-height: 33px;
    transition: all 0.3s ease-in-out;
  }
}

.card-body {
  padding: 8px 24px 16px;
}

.expand-img {
  max-width: 9px;
  height: 10px;
}

.btn-expand {
  margin-top: 4px;
  margin-left: auto;
  padding: 2px 12px;
  max-width: 61px;
  border: 0;
  border-radius: 20px;
  background-color: $blue-300;
  color: $gray-100;
}

.expand-text {
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

  .card:hover {
    .card-img-top {
      transform: scale(1.2);
    }

    .card-title {
      opacity: 0.5;
    }
  }
}
</style>
