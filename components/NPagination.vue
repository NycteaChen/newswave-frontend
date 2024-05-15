<template>
  <div
    class="d-inline-block"
    :class="{ 'w-100': color === 'primary' }"
  >
    <n-button
      class="w-100 d-md-none"
      v-bind="props"
      text="載入更多"
      :icon-src="requireImage('icon/more.svg')"
    />
  </div>
  <nav
    aria-label="Page navigation example "
    class="d-sm-none d-md-block d-none d-sm-block"
  >
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

      <!-- 總頁數大於9，顯示中間五頁-->
      <template v-if="totalPages > 9">
        <!-- 顯示第一頁-->
        <li
          class="page-item"
          :class="{ active: activePageRef === 1 }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(1)"
            >1</a
          >
        </li>
        <li class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <template
          v-for="i in showPage"
          :key="i"
        >
          <li
            class="page-item"
            :class="{ active: activePageRef === i + 1 }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePageClick(i + 1)"
              >{{ i }}</a
            >
          </li>
        </template>
        <template v-if="totalPages - currentPage > 2">
          <li class="page-item disabled">
            <span class="page-link">...</span>
          </li>
        </template>
        <li
          class="page-item"
          :class="{ active: activePageRef === totalPages }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(totalPages)"
            >{{ totalPages }}</a
          >
        </li>
      </template>
      <!-- 如果總頁數小於 10，顯示所有頁碼 -->
      <template v-if="totalPages < 10">
        <template
          v-for="i in totalPages"
          :key="i"
        >
          <li
            class="page-item"
            :class="{ active: activePageRef === i }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePageClick(i)"
              >{{ i }}</a
            >
          </li>
        </template>
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
const showPage = computed(() => {
  const start = Math.max(currentPageRef.value - 3, 1);
  const end = Math.min(currentPageRef.value + 1, props.totalPages);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

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
const activePageRef = ref(props.currentPage);

const handlePageClick = (page: number) => {
  activePageRef.value = page;
  currentPageRef.value = page;
  emitPageChange();
};
</script>
<style lang="scss" scoped>
.pagination .page-item.active .page-link {
  background-color: primary;
  color: #fff;
}
</style>
