<template>
  <div class="order-confirm">
    <div class="card">
      <div class="card-body py-2 px-md-4">
        <ul>
          <li
            v-for="(item, index) in orderItemList"
            :key="item.title"
            class="py-3"
            :class="{ 'border-top': index }"
          >
            <div
              v-if="item.value === 'payMethod'"
              class="d-flex flex-column gap-3"
            >
              <div>{{ item.title }}</div>
              <ul class="d-flex flex-column flex-sm-row gap-3">
                <li
                  v-for="method in payMethodList"
                  :key="method.value"
                  class="pay-method-item border rounded-1 flex-fill p-3 cursor-pointer"
                  :class="{ 'pay-method-item-active': payMethod === method.value }"
                  @click="payMethod = method.value"
                >
                  <div class="d-flex gap-2 align-items-center">
                    <div class="select-circle border rounded-circle" />

                    <div>{{ method.name }}</div>
                    <img
                      class="third-pay-logo"
                      :src="requireImage(`subscription-plan/third-pay-party/${method.value}.png`)"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else
              class="d-flex justify-content-between align-items-center gap-2"
            >
              <div class="whitespace-nowrap">{{ item.title }}</div>
              <div
                class="text-end break-word"
                :class="item.customValueClass"
              >
                {{ item.value }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <p class="mb-0 mt-2 text-sm text-muted">
      感謝您購買我們的產品，為了維護您的權益，請您確認訂單之前，仔細閱讀我們的
      <nuxt-link
        class="is-btn"
        to="/terms-of-service"
        target="_blank"
      >
        服務條款
      </nuxt-link>
      與
      <nuxt-link
        class="is-btn"
        to="/privacy-polic"
        target="_blank"
      >
        隱私權政策
      </nuxt-link>
      ，祝福您有愉快的產品體驗。
    </p>
  </div>
  <div class="btn-container">
    <n-button
      size="lg"
      class="flex-fill mx-auto"
      type="outline"
      text="上一步"
      @click="goBackHandler"
    />
    <n-button
      size="lg"
      class="flex-fill mx-auto"
      text="確認"
      :loading="confirmLoading"
      :disabled="!payMethod"
      @click="subscribeOrderHandler"
    />
  </div>
</template>
<script lang="ts" setup>
const { ecPayOrder } = useOrderApi();
const { planList } = usePlanList();
const route = useRoute();

const payMethod = defineModel('payMethod', { type: String, default: '' });

const orderData = computed<PlanItem>(() => planList.value?.find((e) => e.type === route.query?.plan) || { type: '' });

const payMethodList = computed(() => [
  {
    name: '信用卡',
    value: 'ecPay'
  }
  // {
  //   name: 'LINE PAY',
  //   value: 'linePay'
  // }
]);

const orderItemList = computed(() => [
  {
    title: '方案名稱',
    value: orderData.value?.planName || ''
  },
  {
    title: '單月費用',
    value: `${orderData.value?.price || 0} NTD`
  },

  {
    title: '總計',
    customValueClass: 'fw-bold fs-5',
    value: `${orderData.value?.totalPrice || 0} NTD`
  },
  {
    title: '付款方式',
    value: 'payMethod'
  }
]);

const confirmLoading = ref<boolean>(false);

const ecPayOrderHandler = async () => {
  const params = {
    itemName: orderData.value.planName || '',
    total: orderData.value.totalPrice || 0,
    planType: orderData.value.type
  };

  const { status, data } = await ecPayOrder(params);
  if (status) {
    document.write(data);
  }
  // await navigateTo({
  //   path: '/subscription-plan/checkout/orderResult'
  // });
};

const subscribeOrderHandler = async () => {
  confirmLoading.value = true;

  switch (payMethod.value) {
    case 'ecPay':
      await ecPayOrderHandler();
      break;
    default:
      break;
  }

  confirmLoading.value = false;
};

const goBackHandler = async () => {
  await navigateTo({
    path: '/subscription-plan/checkout/select',
    query: {
      plan: orderData.value.type
    }
  });
};
</script>
<style lang="scss" scoped>
.select-circle {
  width: 28px;
  height: 28px;
}

.pay-method-item {
  .third-pay-logo {
    margin-left: auto;
    width: 40%;
  }

  &-active {
    border-color: $green !important;

    .select-circle {
      border-color: $green !important;
      background: url('@/assets/image/icon/checked.svg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transition: all 0.3s ease-in-out;
    }
  }
}

@include media-breakpoint-up(md) {
  .pay-method-item {
    &:hover {
      border-color: $green !important;
    }
  }
}
</style>
