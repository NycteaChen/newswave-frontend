<template>
  <div class="order-result">
    <div
      class="card"
      :class="{ 'justify-content-center align-items-center': pageLoading }"
    >
      <n-spin
        v-if="pageLoading"
        class="text-primary"
      />
      <template v-else>
        <div class="card-body py-0">
          <div class="pt-3 pt-md-4 mb-md-2 d-flex flex-column align-items-center gap-3 gap-md-4">
            <svg-icon
              :name="`${isPaid ? 'checked' : 'warning'}`"
              class="pay-status-icon"
              :class="`fill-${isPaid ? 'success' : 'danger'}`"
            />
            <h3 class="text-center mb-0">{{ renderText }}</h3>
          </div>
          <ul>
            <li
              v-for="(item, index) in orderItemList"
              :key="item.title"
              class="py-3"
              :class="{ 'border-top': index }"
            >
              <div class="d-flex justify-content-between align-items-center gap-2">
                <div class="whitespace-nowrap">{{ item.title }}</div>
                <div class="text-end break-word">
                  {{ item.value }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div
      v-if="!pageLoading"
      class="btn-container"
    >
      <n-button
        v-show="!isPaid"
        size="lg"
        class="flex-fill mx-auto"
        type="outline"
        text="聯絡我們"
        @click="navigateTo('/contact-us')"
      />
      <n-button
        size="lg"
        class="flex-fill mx-auto"
        text="返回首頁"
        @click="navigateTo('/news')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();

const { getUserData } = useUserStore();
const { getSubscriptionList } = useUserApi();

const pageLoading = ref<boolean>(true);
const subscriptionInfo = ref<SubscriptionOrderType>({});

const isPaid = computed<boolean>(() => subscriptionInfo.value?.payStatus === 'paid');

const renderText = computed(() => {
  if (isPaid.value) {
    return '付款成功';
  }
  return subscriptionInfo.value?.transactionId ? '未完成付款，請再重試一次' : '無此訂單編號';
});

const getSubscriptionListHandler = async () => {
  const params = {
    transactionId: route.query?.order as TransactionIdType['transactionId']
  };
  const { status, data } = await getSubscriptionList(params);
  if (status && data.length) {
    [subscriptionInfo.value] = data;
    getUserData();
  }
  setTimeout(() => {
    pageLoading.value = false;
  }, 300);
};

const orderItemList = computed(() => [
  {
    title: '訂單編號',
    value: subscriptionInfo.value?.transactionId || '-'
  },
  {
    title: '方案名稱',
    value: subscriptionInfo.value?.itemName || '-'
  },
  {
    title: '總計',
    value: `${subscriptionInfo.value?.total || 0} NTD`
  }
]);

onMounted(async () => {
  pageLoading.value = true;
  await nextTick(() => {
    getSubscriptionListHandler();
  });
});
</script>
<style lang="scss" scoped>
.order-result .card {
  min-height: 350px;
}

.pay-status-icon {
  width: 80px;
  height: 80px;
}

@include media-breakpoint-up(md) {
  .pay-status-icon {
    width: 120px;
    height: 120px;
  }
}
</style>
