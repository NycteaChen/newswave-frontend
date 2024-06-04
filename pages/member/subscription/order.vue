<template>
  <div>訂單記錄 6-5</div>
  <n-table
    :columns="tableColumn"
    :data-source="tableList"
  />
</template>
<script lang="ts" setup>
const tableColumn = [
  {
    title: '訂單編號',
    dataIndex: 'transactionId',
    key: 'transactionId'
  },
  {
    title: '方案名稱',
    dataIndex: 'planName',
    key: 'planName'
  },
  {
    title: '付款狀態',
    dataIndex: 'payStatus',
    key: 'payStatus'
  },
  {
    title: '到期日',
    dataIndex: 'subscriptionExpiredAt',
    key: 'subscriptionExpiredAt'
  }
];

const tableList = [
  {
    transactionId: '123456789',
    planName: '方案1',
    payStatus: '已付款',
    subscriptionExpiredAt: '2022-01-01'
  },
  {
    transactionId: '987654321',
    planName: '方案2',
    payStatus: '未付款',
    subscriptionExpiredAt: '2022-01-01'
  }
];
</script>
