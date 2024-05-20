<template>
  <component :is="getComponent" />
</template>
<script setup lang="ts">
const HomeHeader = resolveComponent('HomeHeader');
const OtherHeader = resolveComponent('OtherHeader');

const route = useRoute();

const getComponent = computed(() => {
  switch (route.name) {
    case 'index':
      return HomeHeader;
    default:
      return OtherHeader;
  }
});
</script>
<style lang="scss" scoped>
::v-deep(.home-header) {
  height: $mobile-header-height;
}

::v-deep(.other-header) {
  height: $mobile-header-tab-height;
}

@include media-breakpoint-up(md) {
  ::v-deep(.home-header) {
    height: $mobile-header-tab-height;
  }

  ::v-deep(.other-header) {
    height: $pc-header-tab-height;
  }
}
</style>
