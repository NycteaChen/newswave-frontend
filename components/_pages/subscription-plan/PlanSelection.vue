<template>
  <div class="plan-selection row justify-content-center">
    <div
      v-for="item in planList"
      :key="item.title"
      class="col-12 col-xl-4"
    >
      <div class="card mb-4 px-0 mx-auto">
        <div class="card-header pt-3 pb-4 bg-primary fw-bold position-relative">
          <h4 class="plan-title">{{ item.title }}</h4>
          <h5 class="text-blue-400 mb-0">
            $
            <span class="plan-price text-body-white px-1">{{
              item.price
            }}</span>
            /月
          </h5>
          <div
            v-if="item.recommend"
            class="recommend-label d-flex align-items-center rounded-1 text-body-white position-absolute"
          >
            <img
              class="me-1"
              :src="requireImage('icon/ship-anchor.svg')"
            />
            <span>推薦</span>
          </div>
        </div>
        <div class="card-content pt-4">
          <div class="card-body">
            <ul class="access-list">
              <li
                v-for="access in item.accessList"
                :key="access.value"
                class="access-list-item fs-5 mb-3"
              >
                <div class="d-flex align-items-center justify-content-center">
                  <img
                    class="me-2"
                    :src="requireImage(`icon/${access.value}.svg`)"
                  />
                  <span :class="{ 'text-accent': access.value === 'discount' }">
                    {{ access.label }}</span
                  >
                </div>
              </li>
            </ul>
            <div
              class="px-4 mb-3"
              :class="{ 'current-hint': item.isCurrentPlan }"
            >
              <nuxt-link :to="item.redirectPath">
                <n-button
                  class="w-100"
                  :text="
                    item.redirectPath === '/subscription-plan'
                      ? '立即訂閱'
                      : '前往使用'
                  "
                  :color="
                    item.redirectPath === '/subscription-plan'
                      ? 'purchase'
                      : 'secondary'
                  "
                />
              </nuxt-link>
            </div>
          </div>
          <img :src="requireImage('subscription-plan/bottom-wave.svg')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

const currentStatus = '';

const accessList = [
  {
    label: '各大新聞內容',
    value: 'news'
  },
  {
    label: '會員基本功能',
    value: 'member'
  },
  {
    label: '嚴選雜誌專欄',
    value: 'magazine'
  },
  {
    label: '獨家優惠價格',
    value: 'discount'
  }
];

const planList = computed(() => {
  const list = [
    {
      title: '免費',
      type: 'free',
      price: 0,
      redirectPath: '/news'
    },
    {
      title: '1 個月',
      type: 'month',
      price: 100,
      redirectPath: isVip.value ? '/magazine' : '/subscription-plan'
    },
    {
      title: '12 個月',
      type: 'year',
      price: 80,
      recommend: true,
      redirectPath: isVip.value ? '/magazine' : '/subscription-plan'
    }
  ];
  return list.map((e, index) => ({
    ...e,
    accessList: accessList.slice(0, index + 2),
    isCurrentPlan: currentStatus === e.type
  }));
});
</script>
<style lang="scss" scoped>
.card {
  max-width: 415px;
  border-color: #fff;
}

.plan-title {
  color: $blue-200;
}

.plan-price {
  font-size: 64px;
  line-height: 76px;
}

.access-list {
  height: 216px;
}

.recommend-label {
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  background: $danger;

  img {
    width: 24px;
    height: 24px;
  }
}

.access-list-item {
  div > img {
    width: 24px;
    height: 24px;
  }
}

.current-hint {
  position: relative;

  &::after {
    position: absolute;
    bottom: -35px;
    left: 0;
    width: 100%;
    color: $text-muted;
    content: '目前方案';
  }
}
</style>
