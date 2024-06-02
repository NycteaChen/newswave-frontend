<template>
  <section
    v-if="showMask"
    class="mask fixed-top bg-mask z-mask w-100 h-100"
  />
</template>
<script lang="ts" setup>
const maskBus = useEventBus('maskBus');

const showMask = ref(false);

const maskHandler: any = (show: boolean): void => {
  showMask.value = show;
};

onMounted(() => {
  maskBus.on(maskHandler);
});
</script>
