<template>
  <div class="subscription-plan">
    <plan-banner />
    <section
      v-for="(item, index) in sectionList"
      :id="item.id"
      :key="item.title"
      :class="item.background"
    >
      <div class="container text-center">
        <h2 :class="index === 1 ? 'text-body-white' : 'text-primary'">
          {{ item.title }}
        </h2>
        <component :is="item.component" />
      </div>
    </section>
    <section class="footer-banner">
      <div class="container h-100 d-flex align-items-center justify-content-center gap-3 gap-md-4 flex-wrap">
        <h3 class="text-body-white mb-0">有感興趣的雜誌嗎？</h3>
        <n-button
          text="立即使用"
          color="purchase"
          size="lg"
          @click="goToPlan"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const PlanSelection = resolveComponent('PlanSelection');
const MagazineSupplier = resolveComponent('MagazineSupplier');
const PlanFaq = resolveComponent('PlanFaq');

definePageMeta({
  layout: 'info'
});

const sectionList = computed(() => [
  {
    title: '選擇方案',
    id: 'planSelection',
    component: PlanSelection,
    background: 'bg-body-light'
  },
  {
    title: '各大雜誌',
    component: MagazineSupplier,
    background: 'bg-primary-gradient'
  },
  {
    title: '注意事項',
    component: PlanFaq
  }
]);

const isPc = inject<any>('isPc');
const scrollY = inject<any>('scrollY');
const goToPlan = () => {
  const yearPlanRef: HTMLElement | null = document.querySelector('#yearPlan');
  const planSelectionRef: HTMLElement | null = document.querySelector('#planSelection');
  const offsetTop = (!isPc.value ? yearPlanRef?.offsetTop : planSelectionRef?.offsetTop) || 0;
  scrollY.value = offsetTop - (!isPc.value ? 80 : 0);
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 40px;
  padding-bottom: 40px;

  h2 {
    margin-bottom: 40px;
  }
}

@include media-breakpoint-up(md) {
  .container {
    padding-top: 80px;
    padding-bottom: 80px;

    h2 {
      margin-bottom: 80px;
    }
  }
}

.footer-banner {
  margin-top: 48px;
  margin-bottom: -48px;
  height: 240px;
  background-image: linear-gradient(90deg, rgba($dark, 0.75) 0%, rgba($dark, 0.75) 100%),
    url('@/assets/image/subscription-plan/footer-banner.webp');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}

@include media-breakpoint-up(md) {
  .footer-banner {
    margin-top: 80px;
    margin-bottom: -80px;
  }
}
</style>
