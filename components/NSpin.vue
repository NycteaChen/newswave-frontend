<template>
  <div
    class="spinner-border"
    :class="isSmall ? 'spinner-border-sm' : ''"
    role="status"
  />
</template>
<script lang="ts" setup>
export interface NSpinProps {
  isSmall?: boolean;
}

withDefaults(defineProps<NSpinProps>(), {
  isSmall: false
});
</script>
