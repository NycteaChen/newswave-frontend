<template>
  <button
    type="button"
    class="n-button btn"
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
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps<{
  type?: string;
  size?: string;
}>();
</script>
