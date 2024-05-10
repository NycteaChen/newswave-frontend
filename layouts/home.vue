<template>
  <main class="home-layout w-100 h-100 bg-primary-gradient">
    <slot />
  </main>
</template>
<style lang="scss" scoped>
.home-layout {
  padding-top: 56px;
}

@include media-breakpoint-up(md) {
  .home-layout {
    padding-top: 78px;
  }
}
</style>
