<template>
  <div class="global-search">
    <teleport
      to="body"
      :disabled="!isMobile"
    >
      <div
        class="search-input position-absolute"
        :class="{ show: showInput }"
      >
        <n-input
          ref="searchInputRef"
          v-model:value="keyword"
          inputmode="search"
          placeholder="搜尋文章標題"
          suffix-icon="icon/search.svg"
          :suffix-icon-click-fn="goToSearch"
          @press-enter="goToSearch"
          @click-icon="goToSearch"
        />
      </div>
    </teleport>
    <nav-icon-btn
      class="position-relative"
      :class="showInput ? 'opacity-0 z-minus' : 'opacity-100'"
      icon="search"
      @click="showInput = true"
    />
  </div>
</template>
<script lang="ts" setup>
const isMobile = inject<any>('isMobile');
const keyword = ref<string>('');
const route = useRoute();

const showInput = ref<boolean>(false);
const searchInputRef = ref<HTMLElement | null>(null);

const initInput = () => {
  showInput.value = false;
  keyword.value = '';
};

onClickOutside(searchInputRef, () => {
  if (isMobile.value || String(route.name) !== 'search') {
    initInput();
  }
});

const goToSearch = async () => {
  if (keyword.value?.trim() || String(route.name) === 'search') {
    await navigateTo({
      path: '/search',
      query: {
        keyword: keyword.value || undefined
      }
    });

    if (isMobile.value) {
      initInput();
    }
  } else {
    initInput();
  }
};

watch(
  () => String(route.name),
  (val) => {
    if (val !== 'search') {
      initInput();
    }
  }
);
</script>
<style lang="scss" scoped>
.search-input {
  width: 0;
  opacity: 0;

  &.show {
    opacity: 100;
  }

  ::v-deep(.n-input input) {
    height: 40px;
    transition: padding 0.1s 0.2s ease-in-out;
  }
}

@include media-breakpoint-down(md) {
  .global-search {
    position: relative;
  }

  ::v-deep(.suffix-icon) {
    transform: translateX(2px);
  }

  .search-input {
    top: 0;
    right: 50%;
    left: 50%;
    z-index: 12;
    padding: 8px 12px 0;
    height: 100%;
    transition: background 0.3s ease-in-out;
    transform: translateX(-50%);
    transform-origin: center;

    &.show {
      width: 100%;
      background: rgba($gray-100, 0.7);
    }
  }
}

@include media-breakpoint-up(md) {
  .global-search {
    position: relative;
  }

  ::v-deep(.suffix-icon) {
    transform: translateX(2px);
  }

  .search-input {
    right: 0;
    transition: all 0.3s ease-in-out;

    &.show {
      width: 250px;
    }

    &:not(.show) {
      ::v-deep(.n-input input) {
        &.has-suffix-icon {
          padding-right: 0 !important;
        }
      }
    }
  }
}
</style>
