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
            <div class="text-sm">{{ item.title }}</div>
            <n-switch
              v-if="item.value === 'switch'"
              v-model:checked="renewBool"
              :disabled="!isVip"
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
const { planType, subscribeExpiredAt, isVip } = storeToRefs(userStore);

const renewBool = ref<boolean>(false);

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
    value: 'switch'
  }
]);
</script>
<style lang="scss" scoped>
.subscription-info {
  max-width: 540px;
}
</style>
