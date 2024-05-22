<template>
  <div class="magazine-page">
    <nuxt-link
      v-show="!isVip"
      to="/subscription-plan"
    >
      <div
        class="alert alert-info d-flex align-items-center justify-content-between"
        role="alert"
      >
        <div class="text-sm me-2">NewsWave Plus 享雜誌無限制觀看</div>
        <img :src="requireImage('icon/arrow-right.svg')" />
      </div>
    </nuxt-link>

    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);
</script>
<style lang="scss" scoped>
.alert {
  img {
    width: 8px;
  }
}
</style>
