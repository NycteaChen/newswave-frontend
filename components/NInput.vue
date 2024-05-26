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
    />
    <div
      v-if="suffixIcon"
      class="suffix-icon position-absolute h-100 py-2"
      :class="{ 'is-btn': suffixIconClickFn }"
      @click="suffixIconClickFn"
    >
      <img :src="requireImage(suffixIcon)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const value = defineModel('value', { type: String, required: true, default: '' });

interface NInputProps {
  id?: string;
  placeholder: string;
  type?: string;
  inputmode?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  hasError?: boolean;
  suffixIcon?: string;
  suffixIconClickFn?: () => void;
}

withDefaults(defineProps<NInputProps>(), {
  id: 'nInput',
  placeholder: '請輸入',
  type: 'text',
  inputmode: 'text',
  hasError: false,
  suffixIcon: '',
  suffixIconClickFn: undefined
});
</script>
<style lang="scss" scoped>
.n-input {
  input.has-suffix-icon {
    padding-right: 44px;
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
