<template>
  <div class="magazine">
    <div class="row g-4 gx-xl-0">
      <div
        v-for="item in magazineCategoryList"
        :key="item.categoryId"
        class="col-12 col-sm-6 col-lg-4 col-xl-3"
      >
        <magazine-category-card :category-data="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  },
  keepalive: true
});

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);
</script>
<style lang="scss" scoped>
::v-deep(.magazine-category-card) {
  border: 1px solid $gray-300;
}

@include media-breakpoint-down(md) {
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.2s;
  }

  .slide-left-enter-from {
    opacity: 0;
    transform: translate(50px, 0);
  }

  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
  }
}

@include media-breakpoint-up(lg) {
  ::v-deep(.magazine-category-card) {
    height: 372px;
  }
}

@include media-breakpoint-up(xl) {
  .magazine {
    margin: 0 -12px;
  }

  .magazine-category-card {
    margin: 0 12px;
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep(.magazine-category-card) {
    height: 250px;
  }
}
</style>
