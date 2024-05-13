<template>
  <n-button
    class="w-100"
    v-bind="props"
    text="載入更多"
    :icon-src="requireImage('icon/more.svg')"
  />
  <nav aria-label="Page navigation example">
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
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          >{{ currentPage }}</a
        >
      </li>
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
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
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
  color: 'primary',
  type: 'fill',
  size: 'lg'
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
