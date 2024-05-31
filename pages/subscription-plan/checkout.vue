<template>
  <div class="pt-3 pt-md-4 container-xxl">
    <n-step v-model:step="currentStep" />

    <section class="mt-3 mt-md-4">
      <button @click="currentStep = 1">step 1</button>
      <button @click="currentStep = 2">step 2</button>
      <button @click="currentStep = 3">step 3</button>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'info'
});

const currentStep = ref<number>(1);
</script>
