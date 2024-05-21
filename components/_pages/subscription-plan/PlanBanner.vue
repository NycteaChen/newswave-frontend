<template>
  <section class="plan-banner text-body-white d-flex flex-column align-items-center justify-content-center text-center">
    <h1>NewsWave Plus</h1>
    <h4>無限制閱讀全球各大雜誌</h4>
  </section>
</template>

<style lang="scss" scoped>
.plan-banner {
  height: 360px;
  background-image: linear-gradient(90deg, rgba($dark, 0.75) 0%, rgba($dark, 0.75) 100%),
    url('@/assets/image/subscription-plan/banner.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
}

@include media-breakpoint-up(md) {
  .plan-banner {
    height: 540px;
  }
}
</style>
