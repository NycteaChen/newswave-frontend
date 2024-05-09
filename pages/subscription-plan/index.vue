<template>
  <div>訂閱方案首頁 4-1</div>
  <button @click="subscribe">訂閱方案</button>
  <div>{{ text }}</div>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');

const text = ref<string>('');

const subscribe = () => {
  if (token.value) {
    text.value = '確認為登入狀態可以訂閱';
  } else {
    text.value = '請先登入！';
  }
};
</script>
