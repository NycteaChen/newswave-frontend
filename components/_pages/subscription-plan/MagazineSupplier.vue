<template>
  <n-transition class="magazine-supplier">
    <swiper
      v-for="(swiper, index) in swiperList"
      :key="index"
      :modules="[SwiperAutoplay]"
      class="supplier-swiper"
      :class="{ 'mt-4 mt-md-5': index === 1 }"
      :loop="true"
      :space-between="16"
      :allow-touch-move="false"
      :autoplay="{
        disableOnInteraction: false,
        delay: 0,
        reverseDirection: index === 1
      }"
      :speed="4000"
      slides-per-view="auto"
    >
      <swiper-slide
        v-for="slide in swiper"
        :key="slide.name"
        class="text-body-white"
      >
        <client-only>
          <img
            class="rounded-1"
            :src="requireImage(`subscription-plan/magazine-supplier/${slide.img}.png`)"
            :alt="slide.name"
          />
        </client-only>
      </swiper-slide>
    </swiper>
  </n-transition>
</template>
<script lang="ts" setup>
const topSupplierList = [
  {
    name: 'Tech Trend',
    img: 'techTrend'
  },
  {
    name: 'Star Entertainment',
    img: 'starLand'
  },
  {
    name: 'Fashion Trends',
    img: 'fashionTrends'
  },
  {
    name: 'Culture & Arts',
    img: 'cultureArts'
  },
  {
    name: 'International Fashion',
    img: 'internationalFashion'
  },
  {
    name: 'Music World',
    img: 'musicWorld'
  },
  {
    name: 'Designer’s Eye',
    img: 'designerEye'
  },
  {
    name: 'Celebrity Interviews',
    img: 'celebrityInterviews'
  },
  {
    name: 'Fashion Lifestyle',
    img: 'fashionLifestyle'
  },
  {
    name: 'Tech Talk',
    img: 'techTalk'
  },
  {
    name: 'Fashion Stars',
    img: 'fashionStars'
  },
  {
    name: 'Art & Literature',
    img: 'artLiterature'
  },
  {
    name: 'Fashion Reports',
    img: 'fashionReports'
  },
  {
    name: 'Literary Insights',
    img: 'literaryInsights'
  },
  {
    name: 'Fashion Classics',
    img: 'fashionClassics'
  },
  {
    name: 'Mind & Body',
    img: 'mindBody'
  }
];

const bottomSupplierList = [
  {
    name: 'Chinese Fashion',
    img: 'chineseFashion'
  },
  {
    name: 'Artistic Expressions',
    img: 'artisticExpressions'
  },
  {
    name: 'Gourmet Delights',
    img: 'gourmetDelights'
  },
  {
    name: 'Fashion Exploration',
    img: 'fashionExploration'
  },
  {
    name: 'Health & Wellness',
    img: 'healthWellness'
  },
  {
    name: 'Culinary Chronicles',
    img: 'culinaryChronicles'
  },
  {
    name: 'Fashion Guide',
    img: 'fashionGuide'
  },
  {
    name: 'Cultural Kaleidoscope',
    img: 'culturalKaleidoscope'
  },
  {
    name: 'Tech Innovator',
    img: 'techInnovator'
  },
  {
    name: 'Health Wise',
    img: 'healthWise'
  },
  {
    name: 'Cultural Canvas',
    img: 'culturalCanvas'
  },
  {
    name: 'Epicurean Elegance',
    img: 'epicureanElegance'
  },
  {
    name: 'Literary Echoes',
    img: 'literaryEchoes'
  },
  {
    name: 'Beauty & Health',
    img: 'beautyHealth'
  },
  {
    name: 'Health Matters',
    img: 'healthMatters'
  },
  {
    name: 'Tech Insight',
    img: 'techInsight'
  }
];

const swiperList = computed(() => [topSupplierList, bottomSupplierList]);
</script>
<style lang="scss" scoped>
::v-deep(.swiper-wrapper) {
  transition-timing-function: linear;
}

::v-deep(.swiper-slide) {
  width: 120px;
}

@include media-breakpoint-up(md) {
  ::v-deep(.swiper-slide) {
    width: 180px;
  }
}
</style>
