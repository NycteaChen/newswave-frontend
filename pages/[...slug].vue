<template>
  <div class="not-found d-flex flex-column gap-4 align-items-center">
    <img
      class="not-found-img"
      :src="requireImage('404/not-found.svg')"
    />
    <h4 class="mb-0">查無此頁面</h4>
    <n-button
      text="返回"
      @click="$router.back()"
    />
  </div>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: (title) => `${title} - 404`
});
</script>
<style lang="scss" scoped>
.not-found-img {
  max-width: 560px;
}

@include media-breakpoint-up(md) {
  .not-found {
    margin-top: 60px;
  }
}
</style>
