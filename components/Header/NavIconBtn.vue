<template>
  <div class="nav-icon-btn rounded-1 d-flex justify-content-center align-items-center cursor-pointer">
    <svg-icon
      :name="icon"
      class="btn-icon"
    />
  </div>
</template>
<script setup lang="ts">
interface NavIconBtnProps {
  icon: string;
}

withDefaults(defineProps<NavIconBtnProps>(), {
  icon: ''
});
</script>
<style lang="scss" scoped>
.nav-icon-btn {
  padding: 8px 10px;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in-out;

  .btn-icon {
    width: 20px;
    height: 20px;
    transition: fill 0.2s ease-in-out;
    fill: $text-muted;
  }
}

@include media-breakpoint-up(md) {
  .nav-icon-btn {
    &:hover {
      background: $blue-100;

      .btn-icon {
        fill: $blue-400;
      }
    }
  }
}
</style>
