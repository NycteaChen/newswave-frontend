<template>
  <main class="home-layout w-100 h-100 bg-primary-gradient overflow-hidden position-relative">
    <slot />
  </main>
</template>
<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .home-layout {
    padding-top: 78px;
  }
}
</style>
