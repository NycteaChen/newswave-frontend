<template>
  <div class="form-check form-switch">
    <input
      id="flexSwitchCheckChecked"
      class="form-check-input"
      :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      type="checkbox"
      role="switch"
      :checked="checkValue"
      :disabled="disabled"
    />
    <label
      class="form-check-label"
      for="flexSwitchCheckChecked"
      >{{ label }}</label
    >
  </div>
</template>
<script lang="ts" setup>
interface NSwitchProps {
  label?: string;
  disabled?: boolean;
}

const checkValue = defineModel('checked', { type: Boolean, required: true, default: false });

withDefaults(defineProps<NSwitchProps>(), {
  label: '',
  disabled: false
});
</script>
<style lang="scss" scoped>
.form-check-input {
  height: 1.5rem;
}

.form-check-input:disabled {
  pointer-events: unset;
}
</style>
