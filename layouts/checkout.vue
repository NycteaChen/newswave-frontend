<template>
  <div class="checkout-layout">
    <div class="pt-3 pt-md-4 container-xxl">
      <n-breadcrumb class="mb-2" />
      <n-step
        v-model:step="currentStep"
        :step-list="stepList"
      />
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
const scrollY = inject<any>('scrollY');

const route = useRoute();
const guestStore = useGuestStore();

const currentStep = ref<number>(1);
const stepList = [
  {
    text: '選擇方案'
  },
  {
    text: '確認訂單'
  },
  {
    text: '付款結果'
  }
];

const checkRoute = () => {
  switch (route.name) {
    case 'subscription-plan-checkout-select':
      currentStep.value = 1;
      break;
    case 'subscription-plan-checkout-orderConfirm':
      currentStep.value = 2;
      break;

    case 'subscription-plan-checkout-orderResult':
      currentStep.value = 3;
      break;
    default:
      break;
  }
};

onUnmounted(() => {
  guestStore.SET_BREADCRUMB_NAV([]);
});

watch(
  () => currentStep.value,
  () => {
    scrollY.value = 0;
  }
);

watchImmediate(
  () => route.name,
  () => {
    checkRoute();
    guestStore.SET_BREADCRUMB_NAV(renderBreadcrumb());
  }
);
</script>

<style lang="scss" scoped>
::v-deep(.btn-container) {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: auto;
  margin-top: 24px;
  max-width: 560px;

  .n-button {
    max-width: calc((100% - 16px) / 2);
  }
}

@include media-breakpoint-up(sm) {
  ::v-deep(.order-confirm),
  ::v-deep(.order-result) {
    margin: auto;
    max-width: 560px;
  }
}
</style>
