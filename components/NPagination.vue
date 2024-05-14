<template>
  <nuxt-link
    class="d-inline-block"
    :class="{ 'w-100': color === 'primary' }"
  >
    <n-button
      class="w-100 d-md-none"
      v-bind="props"
      text="載入更多"
      :icon-src="requireImage('icon/more.svg')"
    />
  </nuxt-link>
  <nav aria-label="Page navigation example ">
    <div class="d-md-block">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: isFirstPage }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="handlePreviousPage"
          >
            <img
              src="/assets/image/icon/previous.svg"
              alt="Previous"
              aria-hidden="true"
            />
          </a>
        </li>
        <template
          v-for="i in totalPages"
          :key="i"
        >
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              >{{ i }}</a
            >
          </li>
        </template>
        <li
          class="page-item"
          :class="{ disabled: isLastPage }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="handleNextPage"
          >
            <img
              src="/assets/image/icon/next.svg"
              alt="Previous"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { NBtnProps } from '@/components/NButton.vue';

export interface NPaginationProps {
  totalPages: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars, vue/require-default-prop
  onPageChange?: (page: number) => void;
  color?: NBtnProps['color'];
  type?: NBtnProps['type'];
  size?: NBtnProps['size'];
}

const props = withDefaults(defineProps<NPaginationProps>(), {
  color: 'secondary',
  type: 'fill',
  size: 'sm'
});

const currentPageRef = ref(props.currentPage);

const isFirstPage = computed(() => currentPageRef.value === 1);
const isLastPage = computed(() => currentPageRef.value === props.totalPages);

const emitPageChange = () => {
  if (props.onPageChange) {
    props.onPageChange(currentPageRef.value);
  }
};

const handlePreviousPage = () => {
  currentPageRef.value = Math.max(currentPageRef.value - 1, 1);
  emitPageChange();
};

const handleNextPage = () => {
  currentPageRef.value = Math.min(currentPageRef.value + 1, props.totalPages);
  emitPageChange();
};
</script>
<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .d-md-none {
    display: none !important;
  }

  .d-md-block {
    display: block !important;
  }
}

@include media-breakpoint-down(md) {
  .d-md-none {
    display: block !important;
  }

  .d-md-block {
    display: none !important;
  }
}
</style>
