<template>
  <section class="app-intro bg-body-light position-relative">
    <div class="container text-center position-relative z-1">
      <h2 class="text-primary">您不可或缺的新聞管家</h2>
      <div class="intro-container row mx-1 flex-column">
        <figure
          v-for="(item, index) in introList"
          :key="item.title"
          class="intro-item col d-md-flex my-xl-0 align-items-md-center justify-content-md-evenly"
          :class="{ 'my-4 flex-md-row-reverse': index === 1 }"
        >
          <img
            class="intro-img"
            :src="requireImage(`home/intro-${index + 1}.png`)"
          />
          <div>
            <figcaption>
              <h3 class="mt-3">{{ item.title }}</h3>
            </figcaption>
            <img
              class="wave-icon"
              :src="requireImage('icon/wave-cyan.svg')"
            />
            <p
              v-for="(desc, idx) in item.descList"
              :key="idx"
              class="intro-description"
              :class="{ 'mb-0': !index }"
            >
              {{ desc }}
            </p>
          </div>
        </figure>
      </div>
      <go-use-button />
    </div>

    <img
      class="wave-img"
      :src="requireImage(`home/wave-2.svg`)"
    />
  </section>
</template>
<script lang="ts" setup>
const introList = [
  {
    title: '多元的新聞來源',
    descList: ['NewsWave 整合各媒體新聞資訊，', '讓您掌握時下最新浪潮']
  },
  {
    title: '零廣告干擾',
    descList: ['不再需要擔心版面受到廣告影響，', '給您沉浸順暢閱讀體驗']
  },
  {
    title: '個人化服務',
    descList: ['您可以收藏追蹤有興趣的文章主題，', '打造專屬於您新聞之旅']
  }
];
</script>
<style lang="scss" scoped>
.app-intro {
  padding: 80px 0 125px;
}

.intro-container {
  margin-top: 80px;
  margin-bottom: 88px;
}

.intro-img {
  max-width: 300px;
}

.intro-description {
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;

  @media screen and (width >= 375px) {
    white-space: nowrap;
  }
}

.wave-icon {
  margin: 24px 0;
  width: 36px;
}

@include media-breakpoint-up(md) {
  .wave-icon {
    margin-top: 56px;
  }
}

@include media-breakpoint-up(xxl) {
  .intro-img {
    max-width: 416px;
  }
}
</style>
