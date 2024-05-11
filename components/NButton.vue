<template>
  <button
    type="button"
    class="n-button btn"
    :disabled="disabled"
    :class="{
      'btn-primary': type === 'primary',
      'btn-secondary': type === 'secondary',
      'btn-success': type === 'success',
      'btn-info': type === 'info',
      'btn-warning': type === 'warning',
      'btn-danger': type === 'danger',
      'btn-light': type === 'light',
      'btn-dark': type === 'dark',
      'btn-link': type === 'link'
    }"
  >
    <template v-if="loading">
      <span
        class="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span
        class="visually-hidden"
        role="status"
        >Loading...</span
      >
    </template>
    <slot v-else />
  </button>
</template>
<script setup lang="ts">
interface NBtnProps {
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
    | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

defineProps<NBtnProps>();
</script>
