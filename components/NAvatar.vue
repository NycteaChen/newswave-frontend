<template>
  <div
    class="n-avatar overflow-hidden"
    :class="{
      'rounded-2': shape === 'square',
      'rounded-circle': shape === 'circle'
    }"
    :style="{ height: `${size}px`, width: `${size}px` }"
  >
    <n-image
      v-if="avatarPhoto"
      :img-src="avatarPhoto"
      :alt="`${type}-${avatarPhoto}`"
      class="w-100 object-fit-cover"
    />
    <div
      v-else
      class="default-avatar d-flex align-items-center justify-content-center w-100 h-100"
      :class="avatarType"
    >
      <svg-icon
        :name="`avatar-${avatarType}`"
        class="avatar-icon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
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

const avatarType = computed(() => (token.value ? 'default' : 'visitor'));

const avatarPhoto = computed(() => (token.value && props.type === 'user' ? avatar?.value : props.imgSrc));
</script>
<style lang="scss" scoped>
.n-avatar {
  border: 1px solid $white;
}

.default-avatar {
  .avatar-icon {
    max-width: 45%;
    max-height: 100%;
  }

  &.default {
    background: $blue-200;

    .avatar-icon {
      fill: $blue-300;
    }
  }

  &.visitor {
    background: $blue-300;

    .avatar-icon {
      fill: $blue-100;
    }
  }
}
</style>
