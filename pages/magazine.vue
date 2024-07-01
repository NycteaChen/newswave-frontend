<template>
  <div class="magazine-page">
    <nuxt-link
      v-show="!(token && isVip)"
      to="/subscription-plan"
    >
      <div
        class="alert alert-info d-flex align-items-center justify-content-between"
        role="alert"
      >
        <div class="fs-sm me-2">NewsWave Plus 享雜誌無限制觀看</div>
        <svg-icon
          name="arrow"
          class="arrow-icon"
        />
      </div>
    </nuxt-link>

    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
const token: any = useCookie('token');
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

useHead({
  titleTemplate: (title) => `${title} - 雜誌`
});
</script>
<style lang="scss" scoped>
.alert {
  .arrow-icon {
    width: 16px;
    height: 16px;
    fill: currentcolor;
    transform: rotate(90deg);
  }
}
</style>
