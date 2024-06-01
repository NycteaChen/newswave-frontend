<template>
  <div class="n-step d-flex position-relative">
    <div
      v-for="item in renderList"
      :key="item.step"
      class="flex-fill"
    >
      <div
        class="position-relative z-1 n-step-dot mx-auto d-flex align-items-center justify-content-center rounded-circle"
        :class="{
          'n-step-dot-active bg-primary text-body-white': current >= item.step,
          'bg-body-secondary': current < item.step
        }"
        :data-text="item.text"
      >
        {{ item.step }}
      </div>
    </div>
    <n-progress-bar
      class="position-absolute"
      :style="{ width: progressWidth }"
      :width="(100 / (renderList.length - 1)) * (current - 1)"
    />
  </div>
</template>
<script lang="ts" setup>
type StepItem = {
  text?: string;
};

export interface NStepProps {
  stepList?: StepItem[];
}

const current = defineModel('step', { type: Number, default: 1 });

const props = withDefaults(defineProps<NStepProps>(), {
  stepList: () => []
});

const renderList = computed(() =>
  props.stepList.map((e, index) => ({
    ...e,
    step: index + 1
  }))
);

const progressWidth = computed(() => `calc(100% / ${renderList.value.length} * ${renderList.value.length - 1})`);
</script>
<style lang="scss" scoped>
.n-step-dot {
  width: 30px;
  height: 30px;
}

::v-deep(.n-progress-bar) {
  inset: 50%;
  transform: translate(-50%, -50%);

  &,
  .progress-bar {
    height: 4px;
  }
}

.n-step-dot-active {
  transition: all 0.1s linear 0.45s;

  &::after {
    position: absolute;
    bottom: -35px;
    left: 50%;
    color: $primary;
    content: attr(data-text);
    text-align: center;
    white-space: nowrap;
    font-size: 14px;
    transform: translate(-50%, -50%);
  }
}
</style>
