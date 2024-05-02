<template>
  <component :is="getComponent" />
</template>
<script setup lang="ts">
const HomeHeader = resolveComponent('HomeHeader');
const MemberHeader = resolveComponent('MemberHeader');
const OtherHeader = resolveComponent('OtherHeader');

const route = useRoute();

const getComponent = computed(() => {
  switch (route.name) {
    case 'index':
      return HomeHeader;
    default:
      return String(route.name)?.startsWith('member')
        ? MemberHeader
        : OtherHeader;
  }
});
</script>
