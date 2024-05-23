<template>
  <section class="hot-news bg-body position-relative">
    <div class="hot-news-container container text-center position-relative z-1">
      <h2 class="text-primary">熱門新聞</h2>
      <n-swiper :swiper-list="newsList">
        <template #slide="{ slideItem }">
          <news-card :news-data="slideItem" />
        </template>
      </n-swiper>
      <nuxt-link to="/news">
        <n-button
          color="secondary"
          text="瀏覽更多新聞"
        />
      </nuxt-link>
    </div>
    <img
      class="wave-img"
      :src="requireImage(`home/wave-3.svg`)"
    />
  </section>
</template>
<script lang="ts" setup>
const { getHotNewsList } = useGuestApi();

const newsList = ref<ArticleType[]>([]);

const getHotNewsListHandler = async () => {
  const params: HotNewsListRequestType = {
    limit: 6,
    type: 'hot'
  };

  const { data, status } = await getHotNewsList(params);
  if (status) {
    newsList.value = data;
  }
};

onMounted(async () => {
  await nextTick(() => {
    getHotNewsListHandler();
  });
});
</script>
<style lang="scss" scoped>
.hot-news {
  padding: 80px 0 125px;
}

@include media-breakpoint-down(md) {
  .hot-news-container {
    padding-right: 0;
    padding-left: 0;
  }
}

@include media-breakpoint-up(md) {
  .hot-news {
    padding-bottom: 180px;
  }
}

@include media-breakpoint-up(xl) {
  .hot-news {
    padding-bottom: 300px;
  }
}

@media screen and (width >= 1500px) {
  .hot-news-container {
    max-width: 1464px;
  }
}
</style>
