<template>
  <div class="news-card-container rounded-2">
    <nuxt-link
      class="d-block news-card card p-3 bg-body text-start d-flex flex-column"
      :to="`/article/${newsData.articleId}`"
    >
      <div class="card-img-top rounded-1 mb-2">
        <img
          :src="newsData.image"
          class="object-fit-cover h-100"
          :alt="newsData.imageDescribe"
        />
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
  newsData: any;
}

const props = withDefaults(defineProps<NewsCardProps>(), {
  newsData: () => {}
});

const isMobile = inject('isMobile');
const isPc = inject('isPc');

const publishDate = useDateFormat(props.newsData.publishedAt, 'YYYY/MM/DD');
</script>
<style lang="scss" scoped>
.card-img-top {
  overflow: hidden;
  height: 250px;
}

@include media-breakpoint-up(md) {
  .news-card-container {
    .card-img-top img,
    .card-title {
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      .card-img-top img {
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

@include media-breakpoint-up(lg) {
  .news-card {
    height: 396px;
  }
}

@include media-breakpoint-up(xl) {
  .news-card-container {
    margin: 0 16px;
    box-shadow: 0 10px 40px 0 rgba($primary, 0.1);
  }
}
</style>
