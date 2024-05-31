<template>
  <div>我的通知</div>
  {{ notice }}
</template>
<script setup lang="ts">
import openSocket from 'socket.io-client';

definePageMeta({
  title: '通知中心 - 我的通知'
});

const notice = ref(null);
const userStorage = JSON.parse(localStorage.getItem('user')) || {};

onMounted(() => {
  const URL = 'http://localhost:5173/';
  const socket = openSocket(URL, {
    query: {
      userId: userStorage.id
    }
  });
  socket.on('notice', (data) => {
    if (data.action !== 'create') return;
    notice.value = data;
    console.log('notice:', notice.value);
  });
  socket.emit('user agent', navigator.userAgent);
});
</script>
