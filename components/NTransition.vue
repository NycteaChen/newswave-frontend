<template>
  <div
    ref="targetRef"
    class="n-transition"
    :style="{ '--delay': `${delay}s` }"
    :class="[animationName, showTarget ? 'show opacity-100' : 'opacity-0']"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface NTransitionProps {
  animationName?: string;
  delay?: number;
}

const scrollY = inject<any>('scrollY');
const targetRef = ref<HTMLElement | null>(null);
const showTarget = ref<boolean>(false);

withDefaults(defineProps<NTransitionProps>(), {
  animationName: 'fade-in-up',
  delay: 0
});

watch(
  () => scrollY.value,
  (val) => {
    if (val < 30) {
      showTarget.value = false;
    } else if ((targetRef.value?.getBoundingClientRect()?.y || 0) < (window.innerHeight * 5) / 7) {
      showTarget.value = true;
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
