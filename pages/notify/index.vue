<template>
  <div>NotifyView</div>
  {{ notice }}
</template>
<script setup>
import openSocket from 'socket.io-client';

const notice = ref(null);

onMounted(() => {
  const URL = 'http://localhost:5173/';
  const socket = openSocket(URL, {
    query: {
      userId: '66581de434dcc5b46c3b6'
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
