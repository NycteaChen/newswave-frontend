<template>
  <div class="delete-notice-btn">
    <n-button
      color="danger"
      type="outline"
      icon-src="delete"
      size="sm"
      :text="isMobile ? '' : '刪除通知'"
      icon-position="left"
      :disabled="disabled"
      @click="showHintModal = true"
      @mouseover="isHover = !(isMobile || disabled)"
      @mouseleave="isHover = false"
    />
    <Teleport to="body">
      <n-modal
        v-model:visible="showHintModal"
        title="刪除通知"
        :body-text="`您確定要刪除所有${DeleteType[readState || 'all']}通知嗎？`"
        confirm-btn-text="確認刪除"
        confirm-btn-color="danger"
        :confirm-btn-loading="btnLoading"
        :cancel-btn-disabled="btnLoading"
        @cancel="close"
        @confirm="deleteAllNoticeHandler"
      />
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
import type { NBtnProps } from '@/components/NButton.vue';

enum DeleteType {
  all = '',
  unread = '未讀',
  read = '已讀'
}

interface DeleteNoticeBtn {
  readState: NoticePageRequestType['readState'] | 'all';
  disabled: NBtnProps['disabled'];
}

const props = withDefaults(defineProps<DeleteNoticeBtn>(), {
  readState: 'all',
  disabled: false
});

const isMobile = inject('isMobile');
const emit = defineEmits<{ (e: 'success'): void }>();

const { deleteAllNotice } = useUserApi();

const isHover = ref<boolean>(false);

const btnLoading = ref<boolean>(false);
const showHintModal = ref<boolean>(false);

const close = () => {
  showHintModal.value = false;
};

const noticeBus = useEventBus('noticeBus');

const deleteAllNoticeHandler = async () => {
  btnLoading.value = true;

  const { status, message } = await deleteAllNotice(props.readState === 'all' ? undefined : props.readState);
  if (status) {
    close();
    noticeBus.emit();
    setTimeout(() => {
      emit('success');
    });
  }

  showToast({
    id: `delete-notice-${status}`,
    type: status ? 'success' : 'warning',
    message
  });

  btnLoading.value = false;
};
</script>
<style lang="scss" scoped>
.delete-notice-btn {
  ::v-deep(.btn-icon) {
    width: 13px;
    height: 15px;
  }
}
</style>
