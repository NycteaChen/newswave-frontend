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
