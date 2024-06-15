<template>
  <div class="delete-comment-btn">
    <n-button
      color="danger"
      type="outline"
      :icon-src="isMobile ? requireImage('icon/delete.svg') : ''"
      :text="isMobile ? '' : '刪除留言'"
      size="sm"
      @click="showHintModal = true"
    />

    <Teleport to="body">
      <n-modal
        v-model:visible="showHintModal"
        title="刪除留言"
        body-text="您確定要刪除此留言嗎？"
        confirm-btn-text="確認刪除"
        confirm-btn-color="danger"
        :confirm-btn-loading="btnLoading"
        :cancel-btn-disabled="btnLoading"
        @cancel="close"
        @confirm="deleteArticleCommentHandler"
      />
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
const isMobile = inject('isMobile');

const props = withDefaults(defineProps<{ commentId: CommentType['id'] }>(), {
  commentId: ''
});

const emit = defineEmits<{ (e: 'success', commentId: CommentType['id']): void }>();

const { deleteArticleComment } = useUserApi();

const btnLoading = ref<boolean>(false);
const showHintModal = ref<boolean>(false);

const close = () => {
  showHintModal.value = false;
};

const deleteArticleCommentHandler = async () => {
  btnLoading.value = true;

  const { status, message } = await deleteArticleComment(props.commentId);

  if (status) {
    close();
    setTimeout(() => {
      emit('success', props.commentId);
    });
  }

  showToast({
    id: `delete-comment-${status}`,
    icon: status ? '' : 'icon/warning.svg',
    message
  });

  btnLoading.value = false;
};
</script>
<style lang="scss" scoped>
.delete-comment-btn {
  ::v-deep(.btn-icon) {
    width: 13px;
    height: 15px;
  }
}
</style>
