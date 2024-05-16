<template>
  <div
    class="n-avatar overflow-hidden"
    :class="{
      'rounded-2': shape === 'square',
      'rounded-circle': shape === 'circle'
    }"
    :style="{ height: `${size}px`, width: `${size}px` }"
  >
    <img
      :src="avatarPhoto"
      :alt="type"
    />
  </div>
</template>
<script setup lang="ts">
interface NAvatarProps {
  /*
   * 頭貼類型：用戶 or 雜誌文章作者
   * 若為雜誌文章作者，要搭配使用 imgSrc
   */
  type?: 'user' | 'editor';
  imgSrc?: string;
  size?: number | string;
  shape?: 'square' | 'circle';
}

const props = withDefaults(defineProps<NAvatarProps>(), {
  type: 'user',
  imgSrc: '',
  size: 40,
  shape: 'square'
});

const userPhoto =
  'https://s3-alpha-sig.figma.com/img/a35f/96e0/420a808247c645c5bfe34b5608c3eac7?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DLStYGTm3nASL6a0fZKPC1fvCjJk6DySa1hrG0HrrXIyoCSBKTyCRahRMbgapQUaxk3jexvUV5nFZ9V5-EN3lYTUzyzzvQjXw1pGdWQ9qHzZnKEUPn29M6KiO41gTOLC1765l9esO6qNH1d5pjh-2s4J-jZGJCdicTG5RTm1ru6hLo6J44l9tgy-2~Cxwn-KQpTTMWl0~xoL3D-d1lHXGz8xQ07m2gwkG~LMHt96l9uj3OdsYRejDJ70cU0EIOz-A9ZfS7mymboCsvlP3S1MomZpGsw-DojZgJQaccGjGEqKPOypndaYYCmA6hfI1XPc1cX9tGJ44iIa1VUyOrjZIw__';

const avatarPhoto = computed(() =>
  props.type === 'user' ? userPhoto : props.imgSrc
);
</script>
