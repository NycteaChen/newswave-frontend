<template>
  <div class="n-table-container">
    <div class="n-list d-flex flex-column gap-3 d-md-none mb-3 container px-0">
      <div
        v-for="(rowItem, index) in dataSource"
        :key="`row-${index}`"
        class="card bg-body-light px-0 pb-0 overflow-hidden pt-4"
      >
        <ul class="bg-body px-4">
          <li
            v-for="(colItem, idx) in columns"
            :key="`row-${index}-${colItem.dataIndex}`"
            class="py-3"
            :class="{ 'border-top': idx }"
          >
            <div class="d-flex justify-content-between align-items-center gap-2">
              <div class="whitespace-nowrap fw-bold">{{ colItem.title }}</div>
              <div class="text-end break-word">
                {{ rowItem[colItem.dataIndex] }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <table class="d-none d-md-table n-table table mb-md-4">
      <thead class="table-head">
        <tr>
          <th
            v-for="(headCol, index) in columns"
            :key="`header-${headCol.dataIndex}`"
            scope="col"
            :style="{ width: headCol.width || 'auto' }"
            :class="{
              'rounded-bottom-0': !index || index === columns.length - 1,
              'rounded-start-2': !index,
              'rounded-end-2': index === columns.length - 1
            }"
            class="rounded-bottom-0 text-body"
          >
            {{ headCol.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataSource"
          :key="`row-${index}`"
        >
          <td
            v-for="headCol in columns"
            :key="`row-${index}-${headCol.dataIndex}`"
          >
            {{ item[headCol.dataIndex] }}
          </td>
        </tr>
        <tr
          v-if="!dataSource.length"
          class="empty-table text-muted fs-5 positive-relative"
        >
          <td
            class="border-bottom-0 align-middle"
            :colspan="columns.length"
          >
            暫無資料
          </td>
        </tr>
      </tbody>
    </table>
    <n-pagination
      v-if="pagination"
      v-bind="pagination"
    />
  </div>
</template>
<script setup lang="ts">
import type { NPaginationProps } from '@/components/NPagination.vue';

export type ColumnItemType = {
  title: string;
  dataIndex: string;
  width?: string;
};

interface NTableProps {
  columns: ColumnItemType[];
  dataSource: any[];
  pagination?: NPaginationProps | undefined;
}

withDefaults(defineProps<NTableProps>(), {
  columns: () => [],
  dataSource: () => [],
  pagination: undefined
});
</script>
<style lang="scss" scoped>
.table {
  > :not(caption) > * > * {
    padding: 12px 16px;
    text-align: center;
  }
}

.table-head {
  tr > * {
    background: $blue-100;
  }
}

.empty-table {
  height: 200px;
}

::v-deep(.pagination) {
  justify-content: flex-end !important;
}
</style>