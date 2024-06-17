<template>
  <span
    v-if="unreadCount"
    class="notice-badge bg-danger"
    :class="{
      'notice-dot d-inline-block': type === 'dot',
      badge: type === 'number',
      'rounded-circle': type === 'dot' || unreadCount < 10,
      'rounded-pill text-xs': type === 'number' && unreadCount > 9
    }"
  >
    <template v-if="type === 'number'">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </template>
  </span>
</template>
<script lang="ts" setup>
interface NoticeBadgeProps {
  type?: 'dot' | 'number';
}

withDefaults(defineProps<NoticeBadgeProps>(), {
  type: 'dot'
});

const noticeStore = useNoticeStore();
const { unreadCount } = storeToRefs(noticeStore);
</script>
<style lang="scss" scoped>
.notice-dot {
  width: 6px;
  height: 6px;
  transform: translateY(-2.5px);
}
</style>
