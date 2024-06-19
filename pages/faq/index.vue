<template>
  <div class="faq">
    <h2
      class="faq-banner d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 gap-md-5 text-center bg-body-light"
    >
      <span>常見問題集</span>
      <img :src="requireImage('faq/banner.svg')" />
    </h2>
    <section class="container">
      <n-accordion :accordion-list="list" />
    </section>
  </div>
</template>
<script setup lang="ts">
import type { AccordionItem } from '@/components/NAccordion.vue';

definePageMeta({
  layout: 'info'
});

const list = ref<AccordionItem[]>(renderFaqList('total'));

useHead({
  titleTemplate: (title) => `${title} - 常見問題集`
});
</script>
<style lang="scss" scoped>
.faq {
  &-banner {
    padding: 40px 16px;

    img {
      max-width: 320px;
    }
  }
}

@include media-breakpoint-up(md) {
  .faq {
    &-banner {
      padding: 60px 16px;

      img {
        max-width: 480px;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .faq {
    &-banner {
      img {
        max-width: 560px;
      }
    }
  }
}
</style>
