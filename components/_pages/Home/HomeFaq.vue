<template>
  <section class="home-faq bg-body position-relative">
    <div class="container text-center position-relative z-1">
      <h2 class="text-primary">常見問題</h2>
      <n-accordion
        class="faq-accordion text-start mx-auto"
        :accordion-list="list"
      />

      <img
        v-if="!isPc"
        class="seagull-img"
        :src="requireImage(`home/seagull.svg`)"
      />
    </div>
    <img
      class="wave-img"
      :src="requireImage(`home/wave-5.svg`)"
    />

    <img
      v-if="isPc"
      class="seagull-img mt-0 position-absolute"
      :src="requireImage(`home/seagull.svg`)"
    />
  </section>
</template>
<script setup lang="ts">
import type { accordionItem } from '@/components/NAccordion.vue';

const list = ref<accordionItem[]>([
  {
    title: 'NewsWave 是什麼？',
    content:
      'NewsWave 是一個致力於提供零廣告干擾的免費新聞閱讀應用程式，讓您能輕鬆快速地瀏覽世界最新動態，專注於真正重要的內容。無論何時何地，只要透過可連接網路的行動裝置，NewsWave 便能為您提供最新、最有價值的新聞資訊。'
  },
  {
    title: 'NewsWave可閱讀什麼樣內容',
    content:
      'NewsWave為您整理的六大熱門新聞主題，不論國際新聞、財經資訊、科技趨勢還是娛樂八卦，都能在 NewsWave 找到您想要的新聞！'
  },
  {
    title: 'NewsWave Plus 是什麼？',
    content:
      'NewsWavePlus是NewsWave提供的訂閱服務，一個月最多只要100元，便能專享限定的雜誌內容，豐富您的閱讀生活。'
  }
]);

const isPc = inject<boolean>('isPc');
</script>

<style lang="scss" scoped>
.home-faq {
  padding: 80px 0 125px;
}

.seagull-img {
  margin-top: 40px;
  width: calc(200 / 375 * 100%);
}

@include media-breakpoint-up(md) {
  .faq-accordion {
    margin-top: 40px;
  }

  .seagull-img {
    width: 313px;
  }
}

@include media-breakpoint-up(lg) {
  .faq-accordion {
    max-width: 856px !important;
  }

  .home-faq {
    padding-bottom: 240px;
  }

  .seagull-img {
    margin-top: 60px;
  }
}

@include media-breakpoint-up(xl) {
  .home-faq {
    padding-bottom: 290px;
  }

  .seagull-img {
    bottom: 209px;
    left: 4%;
    width: 313px;
  }
}
</style>
