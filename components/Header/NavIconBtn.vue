<template>
  <div
    class="nav-icon-btn rounded-1 d-flex justify-content-center align-items-center cursor-pointer"
    @mouseover="isHover = !isMobile"
    @mouseleave="isHover = false"
  >
    <img :src="requireImage(`icon/${icon}${isHover ? '-hover' : ''}.svg`)" />
  </div>
</template>
<script setup lang="ts">
interface NavIconBtnProps {
  icon: string;
}

const isMobile = inject<any>('isMobile');

withDefaults(defineProps<NavIconBtnProps>(), {
  icon: ''
});

const isHover = ref<boolean>(false);
</script>
<style lang="scss" scoped>
.nav-icon-btn {
  padding: 8px 10px;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in-out;
}

@include media-breakpoint-up(md) {
  .nav-icon-btn {
    &:hover {
      background: $blue-100;
    }
  }
}
</style>
