<template>
  <div class="n-empty d-flex flex-column text-muted align-items-center gap-3 gap-md-4">
    <img
      :src="requireImage(img)"
      :style="{ width: `${width}px` }"
    />
    <p class="text-sm mb-0">{{ text }}</p>
  </div>
</template>
<script lang="ts" setup>
interface nEmptyProps {
  img?: string;
  text?: string;
  width?: string | number;
}

withDefaults(defineProps<nEmptyProps>(), {
  img: 'icon/no-search.svg',
  text: '暫無資料',
  width: 150
});
</script>

<style lang="scss" scoped>
.n-empty {
  margin: 60px auto;
}
</style>
