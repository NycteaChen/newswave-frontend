<template>
  <div class="our-service d-flex flex-column flex-lg-row gap-4 gap-lg-5 align-items-center">
    <n-transition
      class="image-container"
      :animation-name="`fade-in-${isMobile ? 'up' : 'left'}`"
    >
      <n-image
        class="rounded-2"
        :img-src="requireImage('about/service.webp')"
        alt="service"
      />
    </n-transition>
    <n-transition
      class="text-container d-flex flex-column gap-4"
      :animation-name="`fade-in-${isMobile ? 'up' : 'right'}`"
    >
      <h4 class="fw-normal">
        NewsWave 支援各大瀏覽器與裝置，無論何時何地，只要透過可連接網路的裝置，NewsWave
        便能為您提供最新、最有價值的新聞資訊。
      </h4>
      <p>我們每天都會提供最新、最真實的分析文章，</p>
      <p>現在，就趕緊使用 NewsWave 跟上世界潮流吧！</p>
      <div class="text-center text-lg-start">
        <go-use-button />
      </div>
    </n-transition>
  </div>
</template>
<script lang="ts" setup>
const isMobile = inject('isMobile');
</script>
<style lang="scss" scoped>
p,
h4 {
  margin-bottom: 0;
}
</style>
