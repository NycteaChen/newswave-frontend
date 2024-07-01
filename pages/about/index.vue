<template>
  <div class="about-us">
    <h2 class="about-us-banner d-flex align-items-center justify-content-center text-body-white flex-column">
      <div class="banner-text d-flex align-items-center justify-content-center">關於我們</div>
      <img :src="requireImage('home/wave-2.svg')" />
    </h2>

    <section
      v-for="(item, index) in sectionList"
      :key="`${item.titlePrefix}${item.titleSuffix}`"
      :class="[
        item.background,
        { 'text-body-white': item.background === 'bg-primary-gradient', 'our-team-container': index === 3 }
      ]"
    >
      <div class="container py-5 position-relative z-1">
        <n-transition>
          <h3 class="mb-4">
            <span>{{ item.titlePrefix }}</span>
            <span
              class="fs-1 position-relative"
              :class="item.background === 'bg-primary-gradient' ? 'text-blue-400' : 'text-primary'"
            >
              <span class="position-relative z-2">{{ item.titleSuffix }}</span>
              <span
                class="deco-text fs-1 z-1 text-muted position-absolute"
                :class="{ 'opacity-75': item.background === 'bg-primary-gradient' }"
              >
                {{ item.decoText }}
              </span>
            </span>
          </h3>
          <wave-icon
            class="mb-4 mt-xl-4"
            :class="index ? 'mb-xl-5' : 'mb-xl-0'"
          />
        </n-transition>
        <component :is="item.component" />
      </div>
      <img
        v-if="item.waveImg"
        :src="requireImage(`home/wave-${item.waveImg}.svg`)"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'info'
});

useHead({
  titleTemplate: (title) => `${title} - 關於我們`
});

const OurMission = resolveComponent('OurMission');
const CoreValue = resolveComponent('CoreValue');
const OurService = resolveComponent('OurService');
const OurTeam = resolveComponent('OurTeam');

const sectionList = computed(() => [
  {
    titlePrefix: '我們的',
    titleSuffix: '使命',
    decoText: 'MISSION',
    component: OurMission,
    waveImg: '3'
  },
  {
    titlePrefix: '核心',
    titleSuffix: '價值',
    decoText: 'CORE VALUES',
    component: CoreValue,
    background: 'bg-body-light',
    waveImg: '4'
  },
  {
    titlePrefix: '我們的',
    titleSuffix: '服務',
    decoText: 'SERVICE',
    component: OurService,
    background: 'bg-primary-gradient',
    waveImg: '2'
  },
  {
    titlePrefix: '團隊',
    titleSuffix: '成員',
    decoText: 'MEMBERS',
    component: OurTeam
  }
]);
</script>
<style lang="scss" scoped>
.about-us {
  .deco-text {
    top: 25%;
    left: calc($h1-font-size + 1.5vw);
    width: calc(100vw - 32px);
    opacity: 0.2;
  }
}

.our-team-container {
  position: relative;

  &::after {
    position: absolute;
    right: -80px;
    bottom: 80px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: $blue-100;
    content: '';
  }

  &::before {
    position: absolute;
    top: 180px;
    left: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: $blue-100;
    content: '';
  }
}

.about-us-banner {
  background-image: linear-gradient(135deg, rgba($blue-800, 0.6) 47%, rgba($primary, 0.4) 100%),
    url('@/assets/image/about/banner.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .banner-text {
    margin-top: 5%;
    height: 45vh;
  }
}

@include media-breakpoint-up(md) {
  .about-us {
    .deco-text {
      top: 30%;
      left: calc($h1-font-size * 1.5);
    }
  }
}

@include media-breakpoint-up(lg) {
  ::v-deep(.image-container) {
    flex: 1 1 55%;
  }

  ::v-deep(.text-container) {
    flex: 1 1 45%;
  }
}
</style>
