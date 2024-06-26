<template>
  <div class="subscription-plan">
    <plan-banner />
    <section
      v-for="item in sectionList"
      :id="item.id"
      :key="item.title"
      :class="item.background"
    >
      <div
        class="content text-center"
        :class="item.id === 'magazineSupplier' ? 'container-xxl px-0' : 'container'"
      >
        <n-transition>
          <h2 :class="item.background === 'bg-primary-gradient' ? 'text-body-white' : 'text-primary'">
            {{ item.title }}
          </h2>
        </n-transition>
        <component :is="item.component" />
      </div>
    </section>
    <section class="footer-banner d-flex align-items-center">
      <n-transition class="container d-flex align-items-center justify-content-center gap-3 gap-md-4 flex-wrap">
        <h3 class="text-body-white mb-0">有感興趣的雜誌嗎？</h3>
        <n-button
          text="立即使用"
          color="purchase"
          size="lg"
          @click="goToPlan"
        />
      </n-transition>
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

useHead({
  titleTemplate: (title) => `${title} - 方案介紹`
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
    id: 'magazineSupplier',
    component: MagazineSupplier,
    background: 'bg-primary-gradient'
  },
  {
    title: '注意事項',
    component: PlanFaq
  }
]);

const isPc = inject<any>('isPc');

const goToPlan = () => {
  const yearPlanRef: HTMLElement | null = document.querySelector('#yearPlan');
  const planSelectionRef: HTMLElement | null = document.querySelector('#planSelection');
  const offsetTop = (!isPc.value ? yearPlanRef?.offsetTop : planSelectionRef?.offsetTop) || 0;

  smoothScrollTo(offsetTop - (!isPc.value ? 80 : 0));
};
</script>
<style lang="scss" scoped>
.content {
  padding-top: 40px;
  padding-bottom: 40px;

  h2 {
    margin-bottom: 40px;
  }
}

@include media-breakpoint-up(md) {
  .content {
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
