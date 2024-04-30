<template>
  <div>
    <navbar-test />
    <n-buttons />
    <p class="test">這是首頁</p>
    <p>{{ `滑鼠座標 (x,y) = (${x},${y})` }}</p>
  </div>
</template>
<script setup lang="ts">
const { x, y } = useMouse();
</script>

<style lang="postcss" scoped>
.test {
  position: relative;
  color: blue;
}
</style>
