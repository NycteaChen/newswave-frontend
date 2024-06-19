<template>
  <n-accordion
    class="plan-faq text-start mx-auto"
    :accordion-list="list"
  />
</template>
<script setup lang="ts">
import type { AccordionItem } from '@/components/NAccordion.vue';

const list = ref<AccordionItem[]>(renderFaqList('plan'));
</script>
