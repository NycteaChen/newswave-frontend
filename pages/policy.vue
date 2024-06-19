<template>
  <div class="policy">
    <div class="bg-body-light pt-3 pt-md-5">
      <img :src="requireImage('policy/wave.svg')" />
    </div>
    <section class="container position-relative">
      <h2
        v-if="title"
        class="title text-primary text-center mb-3 position-relative z-2"
      >
        {{ title }}
      </h2>
      <nuxt-page class="position-relative z-2" />
      <div class="seagull-img mx-auto position-relative z-2">
        <img :src="requireImage('home/seagull.svg')" />
      </div>

      <div class="circle circle-left bg-body-light" />
      <div class="circle circle-right bg-body-light" />
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'info'
});

const route = useRoute();

const title = computed(() => route.matched?.find((e) => e.name === String(route.name))?.meta?.title);
</script>
<style lang="scss" scoped>
.container {
  max-width: 720px !important;

  .title {
    margin-bottom: 40px !important;
  }
}

.seagull-img {
  margin-top: 40px;
  width: calc(200 / 375 * 100%);
}

.circle {
  position: absolute;
  z-index: 1;
  border-radius: 50%;

  &-left {
    top: 10%;
    left: -150px;
    width: 400px;
    height: 400px;
  }

  &-right {
    right: -120px;
    bottom: 300px;
    width: 200px;
    height: 200px;
  }
}

@include media-breakpoint-up(md) {
  .circle {
    &-left {
      top: 80px;
      left: -70%;
      width: 600px;
      height: 600px;
    }

    &-right {
      right: -35%;
      bottom: 100px;
      width: 400px;
      height: 400px;
    }
  }
}
</style>
