<template>
  <div
    id="nAccordion"
    class="accordion accordion-flush"
  >
    <div
      v-for="(item, index) in accordionList"
      :key="item.title"
      class="accordion-item bg-transparent"
    >
      <h3
        :id="`heading-${index}`"
        class="accordion-header py-4"
      >
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapse${index}`"
          aria-expanded="false"
          :aria-controls="`flush-collapse${index}`"
        >
          <slot
            v-if="slots.title"
            name="title"
            :item="item"
            :index="index"
          />
          <h3
            v-else
            class="me-3 mb-0"
          >
            {{ item.title }}
          </h3>
        </button>
      </h3>
      <div
        :id="`flush-collapse${index}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`heading-${index}`"
        data-bs-parent="#nAccordion"
      >
        <div class="accordion-body">
          <wave-icon class="mb-3" />
          <p class="mb-0 fs-md-5 whitespace-pre-wrap">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export type AccordionItem = {
  title: string;
  content: string;
};

interface NAccordionProps {
  accordionList?: AccordionItem[];
}

const slots = useSlots();

withDefaults(defineProps<NAccordionProps>(), {
  accordionList: () => []
});
</script>
<style lang="scss" scoped>
.accordion-button {
  background: transparent;
  box-shadow: none;

  &:not(.collapsed) {
    background: transparent;
  }
}

.accordion-item {
  border-color: $blue-300;
}

.accordion-body {
  padding-top: 0;
  padding-bottom: 40px;
}

.accordion-flush > .accordion-item:last-child {
  border-bottom: 1px solid $blue-300;
}

@include media-breakpoint-down(md) {
  .collapsing {
    transition: height 0.15s linear !important;
  }
}
</style>
