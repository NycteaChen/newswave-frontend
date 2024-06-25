<template>
  <div class="our-service d-flex flex-column flex-lg-row gap-4 gap-lg-5 align-items-center">
    <div class="image-container">
      <img
        class="rounded-2"
        :src="requireImage('about/service.webp')"
      />
    </div>
    <div class="text-container d-flex flex-column gap-4">
      <h4 class="fw-normal">
        NewsWave 支援各大瀏覽器與裝置，無論何時何地，只要透過可連接網路的裝置，NewsWave
        便能為您提供最新、最有價值的新聞資訊。
      </h4>
      <p>我們每天都會提供最新、最真實的分析文章，</p>
      <p>現在，就趕緊使用 NewsWave 跟上世界潮流吧！</p>
      <div class="text-center text-lg-start">
        <go-use-button />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
p,
h4 {
  margin-bottom: 0;
}
</style>
