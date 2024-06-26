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
      v-if="avatarPhoto"
      :src="avatarPhoto"
      :alt="type"
      class="w-100 h-100 object-fit-cover"
    />
    <div
      v-else
      class="default-avatar d-flex align-items-center justify-content-center w-100 h-100"
    >
      <img :src="requireImage('icon/avatar.svg')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import userPhotoSrc from '@/assets/image/icon/user-photo.svg';

const userStore = useUserStore();
const { avatar } = storeToRefs(userStore);
interface NAvatarProps {
  /*
   * 頭貼類型：用戶 or 非用戶
   * 若為非用戶，要搭配使用 imgSrc
   */
  type?: 'user' | 'other';
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

const token: any = useCookie('token');

const userPhoto = userPhotoSrc;

const avatarPhoto = computed(() =>
  token.value && props.type === 'user' && !props.imgSrc ? avatar?.value || userPhoto : props.imgSrc
);
</script>
<style lang="scss" scoped>
.default-avatar {
  background: $blue-300;

  img {
    max-width: 45%;
  }
}
</style>
