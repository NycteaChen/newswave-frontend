<template>
  <n-table-list
    :columns="tableColumn"
    :data-source="dataList"
  />
</template>
<script lang="ts" setup>
import type { ColumnItemType } from '@/components/NTableList.vue';

definePageMeta({
  title: '訂閱管理 - 訂單記錄'
});

const { getSubscriptionList } = useUserApi();

const tableColumn: ColumnItemType[] = [
  {
    title: '訂單編號',
    dataIndex: 'transactionId',
    width: '20%'
  },
  {
    title: '方案名稱',
    dataIndex: 'itemName',
    width: '20%'
  },
  {
    title: '付款狀態',
    dataIndex: 'payStatus',
    width: '20%'
  },
  {
    title: '建立時間',
    dataIndex: 'createdAt',
    width: '20%'
  },
  {
    title: '到期日',
    dataIndex: 'subscribeExpiredAt',
    width: '20%'
  }
];

const dataList = ref<SubscriptionOrderType[]>([]);

const getSubscriptionListHandler = async () => {
  const { status, data } = await getSubscriptionList();
  if (status) {
    dataList.value = data.map((e) => ({
      ...e,
      payStatus: e.payStatus === 'paid' ? '已付款' : '尚未付款',
      createdAt: useDateFormat(e.createdAt, 'YYYY/MM/DD HH:mm:ss').value,
      subscribeExpiredAt:
        e.payStatus === 'paid' ? useDateFormat(e.subscribeExpiredAt, 'YYYY/MM/DD HH:mm:ss').value : '-'
    }));
  }
};

onMounted(async () => {
  await nextTick(() => {
    getSubscriptionListHandler();
  });
});
</script>
