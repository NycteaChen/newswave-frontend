<template>
  <img
    ref="imgRef"
    :key="alt"
    :data-src="imgSrc"
    class="n-image lazyload h-100"
    :src="requireImage('default.png')"
    :alt="alt"
    @error="errorHandler"
  />
</template>

<script lang="ts" setup>
defineProps<{
  imgSrc: string;
  alt: string;
}>();

const imgRef = ref<HTMLImageElement | null>(null);

const errorHandler = () => {
  if (imgRef.value) {
    imgRef.value.src = requireImage('default.png');
  }
};
</script>
