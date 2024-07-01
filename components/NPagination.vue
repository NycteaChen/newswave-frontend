<template>
  <div
    v-if="totalPages"
    class="n-pagination d-flex justify-content-center"
  >
    <div
      v-if="!isLastPage || (isLastPage && btnLoading)"
      class="w-100 text-center d-md-none"
    >
      <n-button
        class="w-100"
        color="secondary"
        size="sm"
        :loading="btnLoading"
        text="載入更多"
        icon-src="rotate"
        @click.prevent="handleNextPage"
      />
    </div>
    <nav
      aria-label="Page navigation"
      class="d-md-block d-none"
    >
      <ul class="pagination justify-content-center">
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
            <svg-icon
              name="arrow-line"
              class="page-icon arrow-previous"
            />
          </a>
        </li>

        <!-- 總頁數大於9，顯示中間五頁-->
        <template v-if="totalPages > 9">
          <!-- 顯示第一頁-->
          <li
            class="page-item"
            :class="{ active: current === 1 }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePageClick(1)"
              >1</a
            >
          </li>
          <li
            v-if="current - 1 > 3"
            class="page-item disabled"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePreviousPage"
            >
              <svg-icon
                name="more"
                class="page-icon"
              />
            </a>
          </li>
          <li
            v-for="i in showPage"
            :key="i"
            class="page-item"
            :class="{ active: current === i + 1 }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePageClick(i + 1)"
              >{{ i + 1 }}</a
            >
          </li>
          <li
            v-if="totalPages - current > 3"
            class="page-item disabled"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="handlePreviousPage"
            >
              <svg-icon
                name="more"
                class="page-icon"
              />
            </a>
          </li>
          <li
            class="page-item"
            :class="{ active: current === totalPages }"
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
            :class="{ active: current === i }"
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
            <svg-icon
              name="arrow-line"
              class="page-icon arrow-next"
            />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
export interface PaginationType {
  current: number;
  totalPages: number;
}

interface NPaginationProps {
  totalPages: PaginationType['totalPages'];
  btnLoading?: boolean;
}

const props = withDefaults(defineProps<NPaginationProps>(), {
  totalPages: 0,
  btnLoading: false
});

const current = defineModel('current', { type: Number, default: 1, required: true });

const isFirstPage = computed(() => current.value === 1);
const isLastPage = computed(() => current.value === props.totalPages);
const showPage = computed(() => {
  let start: number;
  let end: number;

  if (current.value - 1 > 3) {
    start = Math.max(current.value - 3, 1);
    if (props.totalPages - current.value < 3) {
      end = props.totalPages - 2;
      start = props.totalPages - 5;
    } else {
      end = Math.min(current.value + 1, props.totalPages);
    }
  } else {
    end = 5;
    start = 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const handlePreviousPage = () => {
  current.value = Math.max(current.value - 1, 1);
};

const handleNextPage = () => {
  current.value = Math.min(current.value + 1, props.totalPages);
};

const handlePageClick = (page: number) => {
  current.value = Math.max(1, Math.min(page, props.totalPages));
};
</script>
<style lang="scss" scoped>
.page-link {
  .page-icon {
    fill: $primary;
    width: 12px;
    height: 12px;

    &.arrow-previous {
      transform: rotate(180deg);
    }
  }
}

.pagination .page-item.active .page-link {
  background: $primary;
  color: $gray-100;
}

.disabled {
  cursor: not-allowed;
  pointer-events: unset;
}

@include media-breakpoint-down(md) {
  ::v-deep(.n-button) {
    max-width: 128px;
  }
}
</style>
