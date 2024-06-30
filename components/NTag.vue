<template>
  <div
    class="n-tag rounded-1 d-inline-flex align-items-center gap-2"
    :class="color"
  >
    <svg-icon
      v-if="iconName"
      :name="iconName"
      class="n-tag-icon"
    />
    <span class="fw-bold">{{ text }}</span>
  </div>
</template>
<script setup lang="ts">
export interface NTagsProps {
  text: string;
  iconName?: string;
  color?: 'cyan' | 'red' | 'accent';
}
withDefaults(defineProps<NTagsProps>(), {
  type: '',
  iconName: '',
  color: 'accent'
});
</script>
<style lang="scss" scoped>
.n-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 12px;

  .n-tag-icon {
    width: 24px;
    height: 24px;
    fill: currentcolor;
  }

  &.accent {
    background: $accent;
    color: $white;
  }

  &.cyan {
    background-color: $cyan-400;
    color: $cyan-1000;
  }

  &.red {
    background-color: $red-400;
    color: $red-900;
  }
}
</style>
