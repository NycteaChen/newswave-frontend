<template>
  <div class="search-page">
    <n-loading :loading="loading">
      <h4
        v-if="keyword"
        class="mb-4 text-primary"
      >
        {{ `搜尋標題包含「${keyword}」的文章：` }}
      </h4>
      <ul
        v-if="renderList.length && keyword"
        class="d-flex flex-column gap-4"
      >
        <li
          v-for="(item, index) in renderList"
          :key="index"
        >
          <article-row :news-data="item" />
        </li>
      </ul>
      <n-empty
        v-else-if="!keyword || !loading"
        :text="!keyword ? '請輸入搜尋關鍵字' : '無搜尋結果'"
        width="300"
      />
    </n-loading>
    <n-pagination
      v-model:current="pagination.current"
      class="mt-4"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PaginationType } from '@/components/NPagination.vue';

useHead({
  titleTemplate: (title) => `${title} - 搜尋`
});
const route = useRoute();

// const isMobile = inject<any>('isMobile');

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

// const searchList = ref<ArticleType[]>([]);
// const searchPhoneList = ref<ArticleType[]>([]);
const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(false);

const keyword = computed(() => route.query?.keyword);
// const showLoading = computed(() => {
//   if (isMobile.value) {
//     return !pagination.totalPages && loading.value;
//   }
//   return loading.value;
// });

// const renderList = computed(() => (isMobile.value ? searchPhoneList.value : searchList.value));
const renderList = computed(() => [
  {
    topic: ['社會'],
    editor: '聯合新聞網',
    articleId: 'N-1001',
    title: '誤把室外熱水器裝在室內 竹北夫妻一氧化碳中毒1死1傷',
    publishedAt: '2024-01-08 14:22',
    imageDescribe: '新竹縣竹北市一對夫妻在住家浴室內安裝室外型熱水器,導致一氧化碳中毒,丈夫死亡,妻子受傷住院。',
    image:
      'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/01/30/realtime/28854189.jpg&s=Y&x=0&y=11&sw=1479&sh=986&exp=3600',
    content:
      '新竹縣竹北市今天凌晨0時許發生一氧化碳中毒意外,一對劉姓夫妻疑似天冷洗澡後,熱水器疑似燃燒不完全,釋放出一氧化碳,加上裝置熱水器的陽台加裝鋁門窗阻擋排氣,造成2人一氧化碳中毒,其中42歲丈夫因血液一氧化碳濃度高達63.1%,經搶救無效死亡,32歲妻子血液一氧化碳濃度為26.7%,目前意識清楚、醫院留觀中。\n\n新竹縣消防局指出,今天凌晨0點50分接獲一氧化碳中毒通報,消防人員到場時,一名劉姓男子已呈現昏迷,其妻子意識清楚但肢體無力,消防人員立即將2人送醫搶救,不過由於劉姓男子因嚴重缺氧,經搶救後今天凌晨4時許仍宣告不治。\n\n據了解,這對夫妻和女方媽媽住在同層公寓內,當時因天冷3人晚間輪流洗澡後,熱水器疑似燃燒不完全,釋放出一氧化碳,其中劉妻媽媽發覺頭暈、四肢無力,進房找女兒和女婿求救時,發現2人叫不醒,且呈現無力、昏迷狀態,立即向住在同一棟不同層的兒子(劉妻弟弟)求救,劉妻弟弟到場後撥打119報案。\n\n消防人員到場時發現,屋內遍布一氧化碳氣體,且戶外型熱水器裝在陽台,卻加裝鋁門窗阻擋排氣。雖當時劉妻弟弟表示,陽台窗戶有開一小縫,並未完全關閉,但仍無法完全排出一氧化碳。\n\n新竹縣消防局提醒,冬天因天氣寒冷且風又大,民眾習慣將門窗緊閉,造成空氣不流通,容易產生一氧化碳,導致一氧化碳中毒,請民眾務必注意,燃氣熱水器應安裝於空氣流通處的室外,雖然天氣冷,還是要保持室內通風,且一氧化碳無色無味,但中毒時會有頭暈、噁心、嘔吐、全身無力等症狀,如有以上症狀,立刻關閉熱水器,並打開門窗通風。',
    tags: ['hot'],
    source: {
      name: '聯合新聞網',
      url: 'https://udn.com/'
    }
  },
  {
    topic: ['社會'],
    editor: '聯合新聞網',
    articleId: 'M-1001',
    title: '誤把室外熱水器裝在室內 竹北夫妻一氧化碳中毒1死1傷',
    publishedAt: '2024-01-08 14:22',
    imageDescribe: '新竹縣竹北市一對夫妻在住家浴室內安裝室外型熱水器,導致一氧化碳中毒,丈夫死亡,妻子受傷住院。',
    image:
      'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/01/30/realtime/28854189.jpg&s=Y&x=0&y=11&sw=1479&sh=986&exp=3600',
    content:
      '新竹縣竹北市今天凌晨0時許發生一氧化碳中毒意外,一對劉姓夫妻疑似天冷洗澡後,熱水器疑似燃燒不完全,釋放出一氧化碳,加上裝置熱水器的陽台加裝鋁門窗阻擋排氣,造成2人一氧化碳中毒,其中42歲丈夫因血液一氧化碳濃度高達63.1%,經搶救無效死亡,32歲妻子血液一氧化碳濃度為26.7%,目前意識清楚、醫院留觀中。\n\n新竹縣消防局指出,今天凌晨0點50分接獲一氧化碳中毒通報,消防人員到場時,一名劉姓男子已呈現昏迷,其妻子意識清楚但肢體無力,消防人員立即將2人送醫搶救,不過由於劉姓男子因嚴重缺氧,經搶救後今天凌晨4時許仍宣告不治。\n\n據了解,這對夫妻和女方媽媽住在同層公寓內,當時因天冷3人晚間輪流洗澡後,熱水器疑似燃燒不完全,釋放出一氧化碳,其中劉妻媽媽發覺頭暈、四肢無力,進房找女兒和女婿求救時,發現2人叫不醒,且呈現無力、昏迷狀態,立即向住在同一棟不同層的兒子(劉妻弟弟)求救,劉妻弟弟到場後撥打119報案。\n\n消防人員到場時發現,屋內遍布一氧化碳氣體,且戶外型熱水器裝在陽台,卻加裝鋁門窗阻擋排氣。雖當時劉妻弟弟表示,陽台窗戶有開一小縫,並未完全關閉,但仍無法完全排出一氧化碳。\n\n新竹縣消防局提醒,冬天因天氣寒冷且風又大,民眾習慣將門窗緊閉,造成空氣不流通,容易產生一氧化碳,導致一氧化碳中毒,請民眾務必注意,燃氣熱水器應安裝於空氣流通處的室外,雖然天氣冷,還是要保持室內通風,且一氧化碳無色無味,但中毒時會有頭暈、噁心、嘔吐、全身無力等症狀,如有以上症狀,立刻關閉熱水器,並打開門窗通風。',
    tags: ['hot'],
    source: {
      name: '聯合新聞網',
      url: 'https://udn.com/'
    }
  }
]);

const getSearchPageHandler = async () => {
  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  // const params = {
  //   pageIndex: pagination.current,
  //   keyword: keyword.value || undefined
  // };
  // const { status, data } = await getSearchPage(params);
  // if (status) {
  //   searchList.value = data.comments || [];

  //   searchPhoneList.value = pagination.current === 1 ? data.comments : [...searchPhoneList.value, ...data.comments];

  // pagination.totalPages = data.totalPages || 0;
  pagination.totalPages = 1;
  // } else {
  //   searchList.value = [];
  // }

  setTimeout(() => {
    loading.value = false;
    loadMoreLoading.value = false;
  }, 1000);
};

watchImmediate(
  () => keyword.value,
  (val) => {
    if (val) {
      pagination.current = 1;
      getSearchPageHandler();
    }
  }
);
</script>
<style lang="scss" scoped>
.search-page {
  margin-bottom: 40px;
}
</style>
