<template>
  <section>
    <n-tabs
      v-model:currentTab="currentTab"
      :tab-list="tabList"
      key-field="value"
      @change-tab="changeTab"
    />
    <ul class="news-container pt-3 gap-1 d-flex flex-column">
      <li
        v-for="item in newsList"
        :key="item.articleId"
        class="bg-body-light p-2 rounded-2"
      >
        <nuxt-link
          class="d-flex align-items-center"
          :to="`/article/${item.topic[0]}/${item.articleId}`"
        >
          <div class="text-muted text-sm pe-2">{{ useDateFormat(item.publishedAt, 'HH:mm').value }}</div>
          <div class="limit-line-two text-body border-start ps-2">{{ item.title }}</div>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script lang="ts" setup>
import type { TabItemType } from '@/components/NTabs.vue';

const { getHotNewsList } = useGuestApi();

const currentTab = ref<HotNewsListRequestType['type']>('news');

const tabList: TabItemType[] = [
  {
    label: '最新資訊',
    value: 'news'
  },
  {
    label: '熱門新聞',
    value: 'hot'
  }
];

const newsList = ref<ArticleType[]>([]);

const getHotNewsListHandler = async () => {
  const params = {
    limit: 15,
    type: currentTab.value
  };

  const { data, status } = await getHotNewsList(params);
  if (status) {
    newsList.value = data;
  }
};

const changeTab = () => {
  getHotNewsListHandler();
};

onMounted(async () => {
  await nextTick(() => {
    getHotNewsListHandler();
  });
});
</script>
<style lang="scss" scoped>
::v-deep(.n-tab-item) {
  flex: 1 1 0;
}

.news-container {
  overflow-y: auto;
  max-height: 575px;

  &::-webkit-scrollbar {
    width: 0;
  }
}

@include media-breakpoint-up(md) {
  .news-container {
    max-height: 595px;
  }
}
</style>
