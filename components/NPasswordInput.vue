<template>
  <n-input
    v-bind="$attrs"
    v-model:value="value"
    :type="inputType"
    :suffix-icon="`icon/eye${eyeType}.svg`"
    :suffix-icon-click-fn="showPasswordHandler"
    @click-icon="showPasswordHandler"
  />
</template>
<script setup lang="ts">
const value = defineModel('value', { type: String, required: true, default: '' });

const showPassword = ref<boolean>(false);

const inputType = computed(() => (showPassword.value ? 'text' : 'password'));
const eyeType = computed(() => (showPassword.value ? '-slash' : ''));

const showPasswordHandler = () => {
  showPassword.value = !showPassword.value;
};
</script>
