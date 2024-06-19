<template>
  <section class="home-faq bg-body position-relative">
    <div class="container text-center position-relative z-1">
      <h2 class="text-primary">常見問題</h2>
      <n-accordion
        class="faq-accordion text-start mx-auto"
        :accordion-list="list"
      />

      <img
        class="seagull-img d-xl-none"
        :src="requireImage(`home/seagull.svg`)"
      />
    </div>
    <img
      class="wave-img"
      :src="requireImage(`home/wave-5.svg`)"
    />

    <img
      class="seagull-img mt-0 position-absolute d-none d-xl-inline-block"
      :src="requireImage(`home/seagull.svg`)"
    />
  </section>
</template>
<script setup lang="ts">
import type { AccordionItem } from '@/components/NAccordion.vue';

const list = ref<AccordionItem[]>(renderFaqList('home'));
</script>

<style lang="scss" scoped>
.home-faq {
  padding: 80px 0 125px;
}

.seagull-img {
  margin-top: 40px;
  width: calc(200 / 375 * 100%);
}

@include media-breakpoint-up(md) {
  .faq-accordion {
    margin-top: 40px;
  }

  .seagull-img {
    width: 313px;
  }
}

@include media-breakpoint-up(lg) {
  .faq-accordion {
    max-width: 856px !important;
  }

  .home-faq {
    padding-bottom: 240px;
  }

  .seagull-img {
    margin-top: 60px;
  }
}

@include media-breakpoint-up(xl) {
  .home-faq {
    padding-bottom: 290px;
  }

  .seagull-img {
    bottom: 209px;
    left: 4%;
    width: 313px;
  }
}
</style>
