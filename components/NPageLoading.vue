<template>
  <div
    class="loading-indicator position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    :class="{ show: isLoading }"
  >
    <div class="loader" />
  </div>
</template>

<script setup lang="ts">
// const nuxtApp = useNuxtApp();
const pageLoadingBus = useEventBus('pageLoadingBus');
const isLoading = ref(false);

// const unsubPageStart = nuxtApp.hook('page:start', () => {
//   if (process.client) {
//     console.log('start');
//     isLoading.value = true;
//   }
// });

const loadingHandler: any = (bool: boolean): void => {
  isLoading.value = bool;
};

// const unsubPageFinish = nuxtApp.hook('page:finish', () => {
//   if (process.client) {
//     console.log('finish');
//     setTimeout(() => {
//       isLoading.value = false;
//       console.log('isLoading.value :>> ', isLoading.value);
//     }, 400);
//   }
// });

onBeforeMount(() => {
  pageLoadingBus.on(loadingHandler);
});

// onBeforeUnmount(() => {
//   unsubPageStart();
//   unsubPageFinish();
// });
</script>
<style lang="scss" scoped>
.loading-indicator {
  z-index: -1;
  background: rgba($gray-100, 0.7);
  transition: opacity 0.5s ease-in-out;

  &.show {
    z-index: $zindex-fixed;
  }
}

/* loading 動畫：https://css-loaders.com/dancers/ */
.loader {
  position: relative;
  width: 40px;
  aspect-ratio: 1;
}

.loader::before,
.loader::after {
  position: absolute;
  top: 0;
  left: 0;
  margin: -8px 0 0 -8px;
  width: 24px;
  background: $primary;
  content: '';
  animation:
    l2-1 2s infinite,
    l2-2 1s infinite;
  aspect-ratio: 1;
}

.loader::after {
  background: $danger;
  animation-delay: -1s, 0s;
  scale: -1 1;
}

@keyframes l2-1 {
  0% {
    top: 0;
    left: 0;
  }

  25% {
    top: 100%;
    left: 0;
  }

  50% {
    top: 100%;
    left: 100%;
  }

  75% {
    top: 0;
    left: 100%;
  }

  100% {
    top: 0;
    left: 0;
  }
}

@keyframes l2-2 {
  40%,
  50% {
    transform: rotate(0.25turn) scale(0.5);
  }

  100% {
    transform: rotate(0.5turn) scale(1);
  }
}

@keyframes l15 {
  50% {
    clip-path: inset(0);
  }

  100% {
    clip-path: inset(0 0 0 100%);
  }
}
</style>
