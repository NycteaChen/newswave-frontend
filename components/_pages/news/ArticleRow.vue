<template>
  <div class="news-container">
    <nuxt-link
      class="d-flex"
      :class="
        size === 'small' ? 'gap-2 news-item pb-2 border-bottom' : 'flex-column gap-4 flex-md-row p-3 border rounded-2'
      "
      :to="`/article/${newsData?.topic?.[0]}/${newsData?.articleId}`"
    >
      <template v-if="size === 'small'">
        <div class="news-image-container overflow-hidden rounded-1">
          <img
            :src="newsData?.image"
            class="news-image object-fit-cover"
          />
        </div>
        <div class="d-flex flex-column justify-content-between gap-2 flex-fill">
          <h6 class="news-title text-body fw-bold limit-line-two">{{ newsData?.title }}</h6>
          <div class="d-flex align-items-center mt-auto justify-content-between">
            <article-label
              :text="newsData?.topic?.[0]"
              :article-id="newsData?.articleId"
            />
            <div class="publish-date text-muted text-end">
              {{ useDateFormat(newsData?.publishedAt, 'YYYY/MM/DD').value }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="headline-col overflow-hidden rounded-1">
          <img
            class="news-image object-fit-cover h-100"
            :src="newsData?.image"
          />
        </div>
        <div class="headline-col d-flex flex-column gap-3">
          <h3 class="news-title text-body fw-bold limit-line-two">{{ newsData?.title }}</h3>
          <img
            class="wave-icon d-none d-md-inline-block"
            :src="requireImage('icon/wave-cyan.svg')"
          />
          <div class="d-none d-md-block text-muted">
            <p class="limit-line-four">{{ newsData?.content }}</p>
          </div>
          <div class="d-flex align-items-center mt-auto">
            <article-label
              :text="newsData?.topic?.[0]"
              class="me-3"
              :article-id="newsData?.articleId"
            />
            <div class="text-muted flex-fill px-3 border-start border-layout whitespace-nowrap">
              {{ newsData?.editor }}
            </div>
            <div class="publish-date text-muted text-end border-start border-layout">
              {{ useDateFormat(newsData?.publishedAt, 'YYYY/MM/DD').value }}
            </div>
          </div>
        </div>
      </template>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
interface NewsCardProps {
  newsData: ArticleType;
  size?: 'small' | 'big';
}

withDefaults(defineProps<NewsCardProps>(), {
  size: 'small'
});
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
}
</style>
