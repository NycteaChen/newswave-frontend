<template>
  <div class="magazine">
    <magazine-banner />
    <n-loading :loading="loading">
      <ul
        v-if="magazineCategoryList.length"
        class="row g-4 gx-xl-0"
      >
        <li
          v-for="item in magazineCategoryList"
          :key="item.categoryId"
          class="d-block col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <magazine-category-card :category-data="item" />
        </li>
      </ul>
      <n-empty
        v-else-if="!loading"
        text="暫無雜誌資料"
        width="300"
      />
    </n-loading>
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

const loading = ref<boolean>(true);

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

onMounted(async () => {
  await nextTick(() => {
    loading.value = false;
  });
});

useHead({
  titleTemplate: (title) => `${title} - 雜誌`
});
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
  ::v-deep(.n-loading-container) {
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
