<template>
  <table class="table">
    <thead class="table-head">
      <tr>
        <th
          v-for="(headCol, index) in columns"
          :key="`header-${headCol.dataIndex}`"
          scope="col"
          :class="{
            'rounded-bottom-0': !index || index === columns.length - 1,
            'rounded-start-2': !index,
            'rounded-end-2': index === columns.length - 1
          }"
          class="rounded-bottom-0"
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
</template>
<script setup lang="ts">
interface NTableProps {
  columns: any[];
  dataSource: any[];
}

withDefaults(defineProps<NTableProps>(), {
  columns: () => [],
  dataSource: () => []
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
  height: 2 00;
}
</style>
