<template>
  <div>NotufyView</div>
</template>
<script setup>
import { io } from 'socket.io-client';

let socket = {};

onMounted(() => {
  const URL = 'http://localhost:5173/';
  socket = io(URL, { transports: ['websocket'] });
  socket.on('connect', (data) => {
    console.log(`Client ${socket.id}`);
    console.log(data);
  });
});
</script>
