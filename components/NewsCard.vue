<template>
  <div class="news-card-container rounded-2">
    <nuxt-link
      class="d-block news-card card p-3 bg-body text-start d-flex flex-column"
      :to="redirectLink"
    >
      <div class="card-img-top rounded-1 mb-2 position-relative">
        <img
          :src="newsData.image || renderDefaultMagazineImage"
          class="article-image object-fit-cover h-100"
          :alt="newsData.imageDescribe"
        />
        <div
          v-if="showCollect"
          class="collect-btn d-flex bg-body position-absolute rounded-circle p-2 border"
          @click.prevent="collectHandler(newsData.articleId)"
        >
          <img :src="requireImage(`icon/collect${isCollected ? '-active' : ''}.svg`)" />
        </div>
      </div>
      <div class="d-flex flex-column justify-content-between flex-fill">
        <h4
          class="card-title"
          :class="isMobile ? 'limit-line-three' : 'limit-line-two'"
        >
          {{ newsData.title }}
        </h4>
        <div class="d-flex flex-wrap align-items-center flex-xl-nowrap">
          <div
            class="mt-2"
            :class="{ 'col-12': !isPc }"
          >
            <article-label
              :text="newsData.topic?.[0]"
              class="me-3"
            />
          </div>
          <div
            class="text-muted mt-2 flex-fill px-xl-3"
            :class="{ 'border-start border-layout whitespace-nowrap': isPc }"
          >
            {{ newsData.editor }}
          </div>
          <div class="publish-date text-muted text-end border-start border-layout mt-2">
            {{ publishDate }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
interface NewsCardProps {
  newsData: ArticleType;
  showCollect?: boolean;
}

const props = withDefaults(defineProps<NewsCardProps>(), {
  showCollect: false
});

const isMobile = inject('isMobile');
const isPc = inject('isPc');

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

const userStore = useUserStore();
const { collects } = storeToRefs(userStore);

const isCollected = computed<boolean>(() => collects.value?.includes(props.newsData?.articleId));
const renderDefaultMagazineImage = computed(
  () => magazineCategoryList.value?.find((e) => props.newsData?.source?.name === e.categoryId)?.categoryImg || ''
);

const publishDate = useDateFormat(props.newsData.publishedAt, 'YYYY/MM/DD');

const isMagazine = computed(() => props.newsData?.articleId.startsWith('M-'));

const redirectLink = computed(() => {
  const category = isMagazine.value ? props.newsData?.source?.name : props.newsData.topic[0];

  return `/article/${category}/${props.newsData.articleId}`;
});
</script>
<style lang="scss" scoped>
.card-img-top {
  overflow: hidden;
  height: 250px;
}

@include media-breakpoint-up(md) {
  .news-card-container {
    .card-img-top .article-image,
    .card-title {
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      .card-img-top .article-image {
        transform: scale(1.2);
      }

      .card-title {
        opacity: 0.5;
      }
    }
  }
}

.news-card {
  height: 462px;
  border: 1px solid $blue-100;
}

.publish-date {
  width: 108px;
}

.collect-btn {
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  box-shadow: 0 10px 40px 0 rgba($black, 0.078);
  transition: filter 0.3s ease-in-out;
}

@include media-breakpoint-up(md) {
  .collect-btn:hover {
    filter: brightness(1.5);
  }
}

@include media-breakpoint-up(lg) {
  .news-card {
    height: 396px;
  }
}
</style>
