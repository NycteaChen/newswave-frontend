<template>
  <div class="global-search">
    <teleport
      to="body"
      :disabled="!isMobile"
    >
      <div
        class="search-input position-absolute"
        :class="{ show: showInput, 'opacity-50': disabledInput }"
      >
        <n-input
          ref="searchInputRef"
          v-model:value="keyword"
          :disabled="disabledInput"
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

const disabledInput = ref<boolean>(false);
const showInput = ref<boolean>(false);
const searchInputRef = ref<HTMLElement | null>(null);

const initInput = () => {
  showInput.value = false;
  keyword.value = '';
};

const goToSearch = async () => {
  if (keyword.value?.trim()) {
    disabledInput.value = true;

    await navigateTo({
      path: '/search',
      query: {
        keyword: keyword.value || undefined,
        type: 'all',
        topic: 'all'
      }
    });

    disabledInput.value = false;
  } else {
    initInput();
  }
};

onClickOutside(searchInputRef, () => {
  initInput();
});
</script>
<style lang="scss" scoped>
.search-input {
  z-index: -1;
  width: 0;
  opacity: 0;

  &.show {
    z-index: 12;
    opacity: 100;
  }

  ::v-deep(.n-input input) {
    height: 40px;
    transition: padding 0.1s 0.2s ease-in-out;
  }

  &:not(.show) {
    ::v-deep(.n-input input) {
      &.has-suffix-icon {
        padding-right: 0 !important;
      }
    }
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
    transition: background 0.3s ease-in-out;
    transform: translateX(-50%);
    transform-origin: center;

    &.show {
      padding: 8px 12px 0;
      width: 100%;
      height: 100%;
      background: rgba($gray-100, 0.9);
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
  }
}
</style>
