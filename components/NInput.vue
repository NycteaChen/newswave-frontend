<template>
  <div class="n-input d-flex align-items-center position-relative">
    <input
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :type="type"
      :inputmode="inputmode"
      class="form-control text-sm py-2"
      :class="{ 'invalid-field': hasError, 'has-suffix-icon': suffixIcon }"
      :disabled="disabled"
      @keyup.enter="$emit('pressEnter')"
    />
    <div
      v-if="suffixIcon"
      class="suffix-icon position-absolute h-100 d-flex align-items-center"
      :class="{ 'is-btn': suffixIconClickFn }"
      @click="$emit('clickIcon')"
    >
      <img :src="requireImage(suffixIcon)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const value = defineModel('value', { type: String, required: true, default: '' });

export interface NInputProps {
  id?: string;
  placeholder?: string;
  type?: string;
  inputmode?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  hasError?: boolean;
  suffixIcon?: string;
  suffixIconClickFn?: () => void;
  disabled?: boolean;
}

withDefaults(defineProps<NInputProps>(), {
  id: 'nInput',
  placeholder: '請輸入',
  type: 'text',
  inputmode: 'text',
  hasError: false,
  disabled: false,
  suffixIcon: '',
  suffixIconClickFn: undefined
});

defineEmits<{ (e: 'pressEnter'): void; (e: 'clickIcon'): void }>();
</script>
<style lang="scss" scoped>
.n-input {
  input.has-suffix-icon {
    padding-right: 44px;
  }

  input:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
}

.suffix-icon {
  right: 12px;
  width: 20px;

  img {
    max-height: 100%;
  }
}
</style>
