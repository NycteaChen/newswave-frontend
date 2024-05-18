<template>
  <div class="d-inline-block">
    <n-button
      class="w-100 d-md-none"
      v-bind="props"
      text="載入更多"
      :icon-src="requireImage('icon/more.svg')"
      @click.prevent="handlePageChange"
    />
  </div>
  <nav
    aria-label="Page navigation example "
    class="d-md-block d-none"
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
          :class="{ active: pageIndex === 1 }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(1)"
            >1</a
          >
        </li>
        <li
          v-if="currentPage - 1 > 3"
          class="page-item disabled"
        >
          <span class="page-link">...</span>
        </li>
        <li
          v-for="i in showPage"
          :key="i"
          class="page-item"
          :class="{ active: pageIndex === i + 1 }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(i + 1)"
            >{{ i + 1 }}</a
          >
        </li>
        <li
          v-if="totalPages - currentPage > 3"
          class="page-item disabled"
        >
          <span class="page-link">...</span>
        </li>
        <li
          class="page-item"
          :class="{ active: pageIndex === totalPages }"
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
      <template v-else>
        <li
          v-for="i in totalPages"
          :key="i"
          class="page-item"
          :class="{ active: pageIndex === i }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(i)"
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
  </nav>
</template>

<script lang="ts" setup>
import type { NBtnProps } from '@/components/NButton.vue';

export interface NPaginationProps {
  totalPages: number;
  currentPage: number;
  color?: NBtnProps['color'];
  type?: NBtnProps['type'];
  size?: NBtnProps['size'];
}

const props = withDefaults(defineProps<NPaginationProps>(), {
  color: 'secondary',
  type: 'fill',
  size: 'sm'
});

const pageIndex = ref(props.currentPage);
const isFirstPage = computed(() => pageIndex.value === 1);
const isLastPage = computed(() => pageIndex.value === props.totalPages);
const showPage = computed(() => {
  let start: number;
  let end: number;

  if (pageIndex.value - 1 > 3) {
    start = Math.max(pageIndex.value - 3, 1);
    if (props.totalPages - pageIndex.value < 3) {
      end = props.totalPages - 2;
      start = props.totalPages - 5;
    } else {
      end = Math.min(pageIndex.value + 1, props.totalPages);
    }
  } else {
    end = 5;
    start = 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
const emit = defineEmits<{ (e: 'page-change', page: number): void }>();

const emitPageChange = () => {
  emit('page-change', pageIndex.value);
};

const handlePreviousPage = () => {
  pageIndex.value = Math.max(pageIndex.value - 1, 1);
  emitPageChange();
};

const handleNextPage = () => {
  pageIndex.value = Math.min(pageIndex.value + 1, props.totalPages);
  emitPageChange();
};

const handlePageClick = (page: number) => {
  pageIndex.value = Math.max(1, Math.min(page, props.totalPages));
  emitPageChange();
};

const handlePageChange = (page: number) => {
  if (typeof page === 'number') {
    let newPageIndex = page;
    if (page === props.totalPages) {
      newPageIndex = page;
    } else {
      newPageIndex = page + 1;
    }
    pageIndex.value = Math.max(1, Math.min(newPageIndex, props.totalPages));
    emitPageChange();
    emit('page-change', pageIndex.value);
  }
};
</script>
<style lang="scss" scoped>
.pagination .page-item.active .page-link {
  background: $primary;
  color: $gray-100;
}
</style>
