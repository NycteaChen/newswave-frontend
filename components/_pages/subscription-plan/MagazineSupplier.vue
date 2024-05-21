<template>
  <div class="magazine-supplier">
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
        class="border px-3 py-2"
      >
        <div class="text-body-white">{{ `${slide.name} logo` }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts" setup>
const topSupplierList = [
  {
    name: '華文時尚'
  },
  {
    name: '星光娛樂'
  },
  {
    name: '時尚風尚'
  },
  {
    name: '文化藝術'
  },
  {
    name: '國際時尚'
  },
  {
    name: '音樂世界'
  },
  {
    name: '設計師之眼'
  },
  {
    name: '名人專訪'
  },
  {
    name: '時尚生活'
  },
  {
    name: '美容健康'
  },
  {
    name: '時尚達人'
  },
  {
    name: '時尚之星'
  },
  {
    name: '藝術文學'
  },
  {
    name: '時尚報導'
  },
  {
    name: '時尚指南'
  },
  {
    name: '時尚之旅'
  },
  {
    name: '時尚新聞'
  },
  {
    name: '時尚經典'
  },
  {
    name: '時尚探索'
  }
];

const bottomSupplierList = [
  {
    name: '科技趨勢'
  },
  {
    name: '藝術表達'
  },
  {
    name: '美食美味'
  },
  {
    name: '健康與福祉'
  },
  {
    name: '美食編年史'
  },
  {
    name: '文學洞察'
  },
  {
    name: '科技創新者'
  },
  {
    name: '健康智慧'
  },
  {
    name: '文化畫布'
  },
  {
    name: '美食雅致'
  },
  {
    name: '美食報導'
  },
  {
    name: '心靈與身體'
  },
  {
    name: '文化萬花筒'
  },
  {
    name: '藝術印象'
  },
  {
    name: '科技對話'
  },
  {
    name: '文學響宴'
  },
  {
    name: '美食探險'
  },
  {
    name: '健康要事'
  },
  {
    name: '創意畫布'
  },
  {
    name: '科技洞察'
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
