<template>
  <div class="plan-selection row justify-content-center text-center">
    <client-only>
      <div
        v-for="item in renderPlanList"
        :id="`${item.type}Plan`"
        :key="item.title"
        class="col-12 col-xl-4"
        :class="{ 'col-lg-5': !isIntroMode }"
      >
        <div
          class="card mb-4 px-0 mx-auto overflow-hidden"
          :class="{
            'select-card cursor-pointer': !isIntroMode,
            'select-card-active': item.type === selectedPlan?.type
          }"
          @click="selectPlanHandler(item)"
        >
          <div class="card-header pt-3 pb-4 bg-primary fw-bold position-relative">
            <h4 class="plan-title">{{ item.title }}</h4>
            <h5 class="text-blue-400 mb-0">
              $
              <span class="plan-price text-body-white px-1">{{ item.price }}</span>
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
            <img
              :class="{ 'checked-icon-show': item.type === selectedPlan?.type }"
              class="checked-icon position-absolute"
              :src="requireImage('icon/checked.svg')"
            />
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
                    <span :class="{ 'text-accent': access.value === 'discount' }"> {{ access.label }}</span>
                  </div>
                </li>
              </ul>
              <div
                v-show="isIntroMode"
                class="px-4 mb-3"
                :class="{ 'current-hint': item.isCurrentPlan }"
              >
                <n-button
                  class="w-100"
                  :text="item.btnText"
                  :color="item.btnColor"
                  @click="goToPage(item)"
                />
              </div>
            </div>
            <img :src="requireImage('subscription-plan/bottom-wave.svg')" />
          </div>
        </div>
      </div>
    </client-only>
    <Teleport to="body">
      <auth-hint-modal v-model:visible="showHintModal" />
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
interface PlanSelectionProps {
  /*
   * 是否顯示免費方案
   */
  showFree?: boolean;
  /*
   * 卡片模式: 介紹intro、選擇付費項目 checkout
   */
  mode?: 'intro' | 'checkout';
}

const selectedPlan = defineModel('plan', { type: Object, default: () => {} });

const props = withDefaults(defineProps<PlanSelectionProps>(), {
  showFree: true,
  mode: 'intro'
});

const token = useCookie('token');
const userStore = useUserStore();
const route = useRoute();

const { isVip, planType } = storeToRefs(userStore);

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

const redirectPath = computed(() => {
  if (isVip.value) {
    return '/magazine';
  }

  return token.value ? '/subscription-plan/checkout/select' : '';
});

const isIntroMode = computed(() => props.mode === 'intro');

const { planList } = usePlanList();

const renderPlanList = computed(() =>
  planList.value
    .map((e, index) => {
      const redirect = e.type === 'free' ? '/news' : redirectPath.value;
      return {
        ...e,
        redirectPath: redirect,
        accessList: accessList.slice(0, index + 2),
        btnText: !redirect || redirect.startsWith('/subscription-plan') ? '立即訂閱' : '前往使用',
        btnColor: (!redirect || redirect.startsWith('/subscription-plan') ? 'purchase' : 'secondary') as
          | 'purchase'
          | 'secondary',
        isCurrentPlan: planType.value === e.type || (e.type === 'free' && !isVip.value && token.value)
      };
    })
    .filter((e) => props.showFree || e.type !== 'free')
);

const showHintModal = ref<boolean>(false);

const goToPage = (item: PlanItem) => {
  switch (item.type) {
    case 'free':
      navigateTo(item.redirectPath);
      break;
    default:
      if (token.value) {
        navigateTo({
          path: item.redirectPath,
          query: {
            plan: item.type
          }
        });
      } else {
        showHintModal.value = true;
      }
      break;
  }
};

const selectPlanHandler = (item: PlanItem) => {
  if (isIntroMode.value) return;
  selectedPlan.value = item;
};

watchImmediate(
  () => route.query,
  (val) => {
    if ('plan' in val) {
      selectedPlan.value = renderPlanList.value?.find((e: PlanItem) => e.type === val.plan) || {};
    }
  },
  { deep: true }
);
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

.checked-icon {
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: all 0.1s ease-in-out;
  transform: scale(0.5);

  &-show {
    opacity: 1;
    transform: scale(1);
  }
}

.select-card-active {
  box-shadow: 0 10px 40px 0 rgba($black, 0.078);
}

@include media-breakpoint-up(md) {
  .select-card {
    transition: all 0.2s ease-in-out;

    &:not(.select-card-active):hover {
      box-shadow: 0 10px 40px 0 rgba($black, 0.078);
      transform: translateY(-20px);
    }
  }
}
</style>
