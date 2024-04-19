<template>
  <div>
    <nuxt-page />

    <div class="word-test">{{ `從 pinia 設定使用者名稱：${account}` }}</div>
  </div>
</template>

<script setup lang="ts">
  const userStore = useUserStore();

  const { account } = storeToRefs(userStore);

  onMounted(() => {
    userStore.SET_USER_INFO({ account: 'Hexo' });
  });
</script>
<style lang="scss" scoped>
  .word-test {
    color: red;
    position: relative;
  }
</style>
