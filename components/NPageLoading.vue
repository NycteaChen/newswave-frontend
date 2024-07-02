<template>
  <div
    class="loading-indicator bg-body position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    :class="{ hidden: !isLoading }"
  >
    <div class="loader" />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const pageLoadingBus = useEventBus('pageLoadingBus');
const isLoading = ref(true);

const loadingHandler: any = (bool: boolean): void => {
  isLoading.value = bool;
};

nuxtApp.hook('page:finish', () => {
  if (process.client && isLoading.value) {
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
});

onBeforeMount(() => {
  pageLoadingBus.on(loadingHandler);
});
</script>
<style lang="scss" scoped>
.loading-indicator {
  z-index: $zindex-fixed;
  transition: opacity 0.5s ease-in-out;

  &.hidden {
    z-index: -1;
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
