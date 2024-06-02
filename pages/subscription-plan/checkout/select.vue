<template>
  <plan-selection
    v-model:plan="selectedPlan"
    :show-free="false"
    mode="checkout"
  />
  <div class="btn-container">
    <n-button
      size="lg"
      class="flex-fill mx-auto"
      text="下一步"
      :disabled="!selectedPlan.type"
      @click="goNextHandler"
    />
  </div>
</template>
<script lang="ts" setup>
const selectedPlan = ref<PlanItem>({ type: '' });

const goNextHandler = async () => {
  await navigateTo({
    path: '/subscription-plan/checkout/orderConfirm',
    query: {
      plan: selectedPlan.value.type
    }
  });
};
</script>
