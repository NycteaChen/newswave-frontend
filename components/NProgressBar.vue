<template>
  <div
    class="n-progress-bar progress"
    role="progressbar"
    :aria-valuenow="width"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="progress-bar"
      :style="{ width: `${width}%` }"
    />
  </div>
</template>
<script lang="ts" setup>
export interface NProgressBarProps {
  width: number;
}

withDefaults(defineProps<NProgressBarProps>(), {
  width: 0
});
</script>
