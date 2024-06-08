<template>
  <div>我的通知</div>
  {{ notice }}
</template>
<script setup lang="ts">
import openSocket from 'socket.io-client';

definePageMeta({
  title: '通知中心 - 我的通知'
});

const config = useRuntimeConfig();
const notice = ref(null);
const userStore = useUserStore();
const { id } = storeToRefs(userStore);

onMounted(() => {
  const URL = `${config.public.apiBase}/`;
  const socket = openSocket(URL, {
    query: {
      userId: id.value
    }
  });
  socket.on('notice', (data: any) => {
    if (data?.action !== 'create') return;
    notice.value = data;
    console.log('notice:', notice.value);
  });
  socket.emit('user agent', navigator.userAgent);
});
</script>
