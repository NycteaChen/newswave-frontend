<template>
  <section
    class="n-loading-container position-relative"
    :class="{ show: loading }"
  >
    <slot />
    <div v-show="loading">
      <div
        class="n-loading text-primary position-absolute top-0 flex-column gap-3 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      >
        <n-spin :is-small="isSmall" />
        <span v-if="showText">讀取中...</span>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { NSpinProps } from '@/components/NSpin.vue';

interface NLoadingProps {
  loading: boolean;
  showText?: boolean;
  isSmall?: NSpinProps['isSmall'];
}

withDefaults(defineProps<NLoadingProps>(), {
  loading: false,
  showText: true,
  isSmall: false
});
</script>
<style lang="scss" scoped>
.n-loading-container {
  &.show {
    min-height: 300px;
  }
}

.n-loading {
  background: rgba($gray-100, 0.8);
}
</style>
