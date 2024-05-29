<template>
  <div>NotifyView</div>
  {{ notice }}
</template>
<script setup>
import openSocket from 'socket.io-client';

const notice = ref(null);

onMounted(() => {
  const URL = 'http://localhost:5173/';
  const socket = openSocket(URL);
  socket.on('notice', (data) => {
    if (data.action !== 'create') return;
    notice.value = data;
    console.log('notice:', notice.value);
  });
});
</script>
