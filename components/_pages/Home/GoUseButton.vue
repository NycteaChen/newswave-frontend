<template>
  <nuxt-link
    to="/news"
    class="d-block w-100"
  >
    <n-button
      class="w-100"
      v-bind="props"
      text="前往使用"
      :icon-src="requireImage('icon/ship.svg')"
    />
  </nuxt-link>
</template>
<script lang="ts" setup>
import type { NBtnProps } from '@/components/NButton.vue';

interface GoUseBtnProps {
  color?: NBtnProps['color'];
  type?: NBtnProps['type'];
  size?: NBtnProps['size'];
}

const props = withDefaults(defineProps<GoUseBtnProps>(), {
  color: 'accent',
  type: 'fill',
  size: 'lg'
});
</script>
