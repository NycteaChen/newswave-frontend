<template>
  <div class="n-step d-flex">
    <div
      v-for="step in totalStep"
      :key="step"
      class="flex-fill position-relative"
    >
      <div
        class="position-relative z-1 n-step-dot mx-auto d-flex align-items-center justify-content-center rounded-circle"
        :class="{
          'n-step-dot-active bg-primary text-body-white': current >= step,
          'bg-body-secondary': current < step
        }"
      >
        {{ step }}
      </div>
      <n-progress-bar
        v-if="step > 1"
        class="position-absolute w-100"
        :width="current >= step ? 100 : 0"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface NStepProps {
  totalStep?: number;
}

const current = defineModel('step', { type: Number, default: 1 });

withDefaults(defineProps<NStepProps>(), {
  totalStep: 3
});
</script>
<style lang="scss" scoped>
.n-step-dot {
  width: 30px;
  height: 30px;
}

::v-deep(.n-progress-bar) {
  top: 50%;
  bottom: 50%;
  left: -50%;
  transform: translateY(-50%);

  &,
  .progress-bar {
    height: 4px;
  }
}

.n-step-dot-active {
  transition: all 0.1s linear 0.5s;
}
</style>
