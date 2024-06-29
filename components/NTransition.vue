<template>
  <div
    ref="target"
    class="n-transition"
    :style="{ '--delay': `${delay}s` }"
    :class="[animationName, targetIsVisible ? 'show opacity-100' : 'opacity-0']"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface NTransitionProps {
  animationName?: string;
  delay?: number;
}

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});

withDefaults(defineProps<NTransitionProps>(), {
  animationName: 'fade-in-up',
  delay: 0
});

watch(
  () => targetIsVisible.value,
  (val) => {
    if (val) {
      stop();
    }
  }
);
</script>
<style lang="scss" scoped>
.n-transition {
  transition: all 0.5s ease-in-out var(--delay);

  &.fade-in-up {
    transform: translateY(50px);

    &.show {
      transform: translateY(0);
    }
  }

  &.fade-in-left {
    transform: translateX(-50px);

    &.show {
      transform: translateX(0);
    }
  }

  &.fade-in-right {
    transform: translateX(50px);

    &.show {
      transform: translateX(0);
    }
  }
}
</style>
