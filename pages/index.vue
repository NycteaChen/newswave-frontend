<template>
  <div>
    <navbar-test />
    <n-buttons />
    <nuxt-link
      class="mx-2"
      to="/news"
      >新聞列表頁</nuxt-link
    >
    <nuxt-link to="/magazine">雜誌種類頁</nuxt-link>
    <p class="test">這是首頁 1-1</p>
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
