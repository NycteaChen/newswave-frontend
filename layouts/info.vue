<template>
  <main
    class="info-layout"
    :class="{ 'contact-us-layout d-flex justify-content-center align-items-center': $route.name === 'contact-us' }"
  >
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.contact-us-layout {
  background-image: linear-gradient(0deg, rgba($gray-300, 0.9) 0%, rgba($gray-300, 0.9) 100%),
    url('@/assets/image/contact-us/background.webp');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
