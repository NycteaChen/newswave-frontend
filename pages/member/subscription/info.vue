<template>
  <div class="subscription-info pt-3 bg-body-light rounded-2 my-0 mx-auto mx-md-0 overflow-hidden">
    <div class="bg-body p-3 mx-3">
      <ul class="d-flex flex-column">
        <li
          v-for="(item, index) in infoList"
          :key="item.title"
          class="py-3"
          :class="{ 'border-top': index }"
        >
          <div class="d-flex gap-2 flex-column">
            <div>{{ item.title }}</div>
            <p
              v-if="item.hint"
              class="text-sm text-muted mb-0"
            >
              {{ item.hint }}
            </p>
            <n-switch
              v-if="item.value === 'switch'"
              v-model:checked="renewBool"
              :disabled="!isVip || renewLoading"
            />
            <div
              v-else
              class="fs-5 fw-bold"
            >
              {{ item.value }}
            </div>
          </div>
        </li>
      </ul>
      <div
        v-if="!isVip"
        class="text-center"
      >
        <n-button
          text="了解訂閱方案"
          color="accent"
          @click="navigateTo('/subscription-plan')"
        />
      </div>
    </div>
    <img
      class="mt-2"
      :src="requireImage('member/wave-2.svg')"
    />
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();

const { planList } = usePlanList();
const { autoRenew, planType, subscribeExpiredAt, isVip } = storeToRefs(userStore);

const renewBool = ref<boolean>(!!autoRenew.value);

const currentPlan = computed(() => planList.value?.find((e) => e.type === planType.value));

const infoList = computed(() => [
  {
    title: '訂閱狀態',
    value: isVip.value ? '訂閱中' : '無'
  },
  {
    title: '方案名稱',
    value: isVip.value ? currentPlan.value?.planName : '-'
  },
  {
    title: '訂閱到期日',
    value: isVip.value ? useDateFormat(subscribeExpiredAt.value, 'YYYY/MM/DD HH:mm:ss').value : '-'
  },
  {
    title: '自動續訂',
    value: 'switch',
    hint: '為繼續享有 NewsWave Plus 服務，方案到期後，系統將依據您目前的方案費用自動扣款'
  }
]);

const { subscribeAutoRenew } = useMemberApi();

const renewLoading = ref<boolean>(false);

const subscribeAutoRenewHandler = async () => {
  renewLoading.value = true;
  const { status, data, message } = await subscribeAutoRenew(renewBool.value);
  if (status) {
    showToast({
      id: `renew-${data.autoRenew}`,
      message: `${data.autoRenew ? '自動' : '取消自動'}${message}`
    });

    userStore.SET_USER_DATA(data);
  }

  setTimeout(() => {
    renewLoading.value = false;
  }, 3000);
};

watch(
  () => renewBool.value,
  () => {
    subscribeAutoRenewHandler();
  }
);
</script>
<style lang="scss" scoped>
.subscription-info {
  max-width: 540px;
}
</style>
