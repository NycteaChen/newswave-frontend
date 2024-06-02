<template>
  <div class="order-result text-center">
    <h5>假的訂單編號: 123456789</h5>
    <p class="text-center">假的付款結果: {{ orderStatus ? '成功' : '尚未完成' }}</p>
  </div>
  <div class="btn-container">
    <n-button
      v-show="!orderStatus"
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
</template>
<script lang="ts" setup>
const orderStatus = ref<boolean>(false);
</script>
