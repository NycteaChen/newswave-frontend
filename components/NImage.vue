<template>
  <img
    ref="imgRef"
    :key="alt"
    :data-src="imgSrc"
    class="n-image lazyload h-100"
    :src="requireImage(props.defaultImg)"
    :alt="alt"
    @error="errorHandler"
  />
</template>

<script lang="ts" setup>
interface NImageProps {
  imgSrc: string;
  alt: string;
  defaultImg?: string;
}

const props = withDefaults(defineProps<NImageProps>(), {
  defaultImg: 'default.png'
});

const imgRef = ref<HTMLImageElement | null>(null);

const errorHandler = () => {
  if (imgRef.value) {
    imgRef.value.src = requireImage(props.defaultImg);
  }
};
</script>
