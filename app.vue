<template>
  <div>
    <n-header v-if="showHeader" />
    <main style="height: '500px'">
      <nuxt-page :page-key="(route) => route.fullPath" />

      <div class="word-test my-5">
        {{ `從 pinia 設定使用者名稱：${account}` }}
      </div>
      <nuxt-link
        v-if="$route.name !== 'index'"
        to="/"
        >返回首頁</nuxt-link
      >
    </main>
    <n-footer />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const route = useRoute();

const { account } = storeToRefs(userStore);

const showHeader = computed(() => route.name !== 'loginRegister');

onMounted(() => {
  userStore.SET_USER_INFO({ account: 'Hexo' });
});
</script>
<style lang="postcss" scoped>
.word-test {
  position: relative;
  color: red;
}
</style>
