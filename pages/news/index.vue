<template>
  <div class="news-page">
    <section class="p-3 border rounded-2 mb-4 news-container">
      <nuxt-link
        class="d-flex flex-column gap-4 flex-md-row"
        :to="`/article/${headline.topic?.[0]}/${headline.articleId}`"
      >
        <div class="headline-col overflow-hidden rounded-1">
          <img
            class="news-image object-fit-cover"
            :src="headline.image"
          />
        </div>
        <div class="headline-col d-flex flex-column gap-3">
          <h3 class="news-title text-body fw-bold limit-line-two">{{ headline.title }}</h3>
          <img
            class="wave-icon d-none d-md-inline-block"
            :src="requireImage('icon/wave-cyan.svg')"
          />
          <div class="d-none d-md-block text-muted">
            <p class="limit-line-four">{{ headline.content }}</p>
          </div>
          <div class="d-flex align-items-center mt-auto">
            <article-label
              :text="headline.topic?.[0]"
              class="me-3"
            />
            <div class="text-muted flex-fill px-3 border-start border-layout whitespace-nowrap">
              {{ headline.editor }}
            </div>
            <div class="publish-date text-muted text-end border-start border-layout">
              {{ useDateFormat(headline.publishedAt, 'YYYY/MM/DD').value }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </section>
    <ul class="row gy-4 gx-md-10">
      <li
        v-for="(item, index) in newsArticleList"
        :key="index"
        class="col-12 col-md-6 news-container"
      >
        <nuxt-link
          class="d-flex gap-2 news-item pb-2 border-bottom"
          :to="`/article/${item?.topic?.[0]}/${item?.articleId}`"
        >
          <div class="news-image-container overflow-hidden rounded-1">
            <img
              :src="item.image"
              class="news-image object-fit-cover"
            />
          </div>
          <div class="d-flex flex-column justify-content-between gap-2 flex-fill">
            <h6 class="news-title text-body fw-bold limit-line-two">{{ item.title }}</h6>
            <div class="d-flex align-items-center mt-auto justify-content-between">
              <article-label :text="item.topic?.[0]" />
              <div class="publish-date text-muted text-end">
                {{ useDateFormat(item.publishedAt, 'YYYY/MM/DD').value }}
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <n-pagination
      v-model:current="pagination.current"
      :total-pages="pagination.totalPages"
      :btn-loading="btnLoading"
      class="mt-4"
    />
  </div>
</template>
<script setup lang="ts">
import type { PaginationType } from '@/components/NPagination.vue';

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
  keepalive: true,
  middleware(to, from) {
    if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
      const { newsNav } = useNav();
      const fromIndex = newsNav.findIndex(
        (e) =>
          e.label === from.query.category ||
          (from.name === 'news' && !from.query.category) ||
          (e.value === '/magazine' && String(from.name)?.includes('magazine'))
      );
      const toIndex = newsNav.findIndex(
        (e) =>
          e.label === to.query.category ||
          (to.name === 'news' && !to.query.category) ||
          (e.value === '/magazine' && String(to.name)?.includes('magazine'))
      );
      // eslint-disable-next-line no-param-reassign
      to.meta.pageTransition.name = +toIndex > +fromIndex ? 'slide-left' : 'slide-right';
    }
  }
});

const btnLoading = ref<boolean>(false);
const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const route = useRoute();

const { newsNav } = useNav();

const headline: ArticleType = {
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
};

const news: ArticleType = {
  topic: ['體育'],
  editor: '聯合新聞網',
  articleId: 'N-1045',
  title: 'NBA／改行踢足球？湖人羅素將球踢向觀眾席遭聯盟開罰',
  publishedAt: '2024-01-30 10:01',
  imageDescribe: '湖人羅素在對勇士一戰賽後,將柯瑞投的肉包球踢向觀眾席,遭聯盟以1萬5000美元開罰。',
  image:
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/01/30/0/28854201.jpg&s=Y&x=0&y=0&sw=1280&sh=853&exp=3600',
  content:
    "湖人前天靠著詹姆斯（LeBron James）致勝罰球，以145：144險勝勇士。羅素（D'Angelo Russell）比賽結束時，將柯瑞（Stephen Curry）投出的超大號肉包球踢向觀眾席，如今聯盟開出1萬5000美元（約新台幣46.7萬）罰單。\n\n羅素該場比賽19投8中，砍進28分5助攻，湖人和勇士殺進2OT才獲勝，可能是太興奮，羅素在比賽結束當下，展現腳上功夫，將球踢向觀眾席，事後遭聯盟罰款。\n\n羅素近期狀況火燙，近8戰場均27.5分6.4助攻，三分球命中率54%。他原本是交易流言主角，但昨天有消息指出，湖人與老鷹停止交易談判，他有望留在紫金大軍。\n\n",
  tags: ['hot'],
  source: {
    name: '聯合新聞網',
    url: 'https://udn.com/'
  }
};

const newsArticleList = computed(() => {
  const list = newsNav.filter((e) => e.value !== '/magazine' && e.value !== '/news');

  let sum = 0;
  const arr: ArticleType[] = [];

  while (sum < 10) {
    sum += 1;
    arr.push(news);
  }
  const query = (route?.query?.category as string) || '';
  return arr
    .map((e, index) => ({
      ...e,
      topic: [list[index % 6].label]
    }))
    .filter((e) => (route.query.category ? e.topic?.includes(query) : true));
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

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.2s;
  }

  .slide-left-enter-from {
    opacity: 0;
    transform: translate(50px, 0);
  }

  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-enter-from {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
  }
}
</style>
