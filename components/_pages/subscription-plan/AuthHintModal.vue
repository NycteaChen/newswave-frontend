<template>
  <n-modal
    v-model:visible="visible"
    body-text="需登入後才能進行此操作"
    confirm-btn-text="前往登入"
    @cancel="close"
    @confirm="confirm"
  />
</template>
<script setup lang="ts">
const visible = defineModel('visible', { type: Boolean, default: false });

const close = () => {
  visible.value = false;
};

const confirm = () => {
  close();
  navigateTo('/login-register');
};
</script>
