<template>
  <div
    class="n-to-top cursor-pointer position-fixed z-to-top border border-layout rounded-pill bg-body d-flex flex-column justify-content-between align-items-center"
    :class="{ show: scrollY > 30 }"
    @click="smoothScrollTo(0)"
  >
    <svg-icon
      name="arrow"
      class="top-icon fill-primary"
    />
    <span>Top</span>
  </div>
</template>
<script lang="ts" setup>
const scrollY = inject<any>('scrollY');
</script>

<style lang="scss" scoped>
.n-to-top {
  right: 16px;
  bottom: -100px;
  padding: 17px 0;
  width: 52px;
  height: 80px;
  gap: 12px;
  color: $blue-300;
  font-size: 12px;
  transition: bottom 0.3s ease-in-out;

  &.show {
    bottom: 30px;
  }

  .top-icon {
    width: 28px;
  }
}
</style>
