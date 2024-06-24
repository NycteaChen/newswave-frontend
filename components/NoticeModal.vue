<template>
  <n-modal
    v-model:visible="visible"
    title="系統通知"
    :show-confirm-btn="false"
    cancel-btn-text="關閉"
    @cancel="close"
  >
    <template #body>
      <h4 class="text-primary">
        {{ noticeTemplate(noticeInfo?.topic?.[0]).title }}
      </h4>
      <p>
        {{ noticeTemplate().subTitle }}
      </p>
      <nuxt-link
        class="news-card cursor-pointer"
        :to="`/article/${noticeInfo?.topic?.[0]}/${noticeInfo?.articleId}`"
      >
        <div
          class="card rounded-1 border"
          @click="close"
        >
          <div class="card-body">
            <h5 class="news-title">
              {{ noticeInfo?.title }}
            </h5>
            <p class="truncate news-content">
              {{ noticeInfo?.content }}
            </p>
            <div class="d-flex align-items-center justify-content-between">
              <article-label :text="noticeInfo?.topic?.[0]" />
              <div class="text-muted text-end fs-sm">
                {{ useDateFormat(noticeInfo?.publishedAt, 'YYYY/MM/DD HH:mm').value }}
              </div>
            </div>
          </div>
        </div>
      </nuxt-link>
    </template>
  </n-modal>
</template>
<script setup lang="ts">
const personalNotificationBus = useEventBus('personalNotificationBus');
const noticeModalBus = useEventBus('noticeModalBus');
const noticeBus = useEventBus('noticeBus');
const { readNotice } = useUserApi();

const visible = ref<boolean>(false);
const noticeInfo = ref<NoticeType>();

const close = () => {
  visible.value = false;
};

const readNoticeHandler = async () => {
  const { status } = await readNotice(noticeInfo.value?.id || '');
  if (status) {
    noticeBus.emit();
    personalNotificationBus.emit();
  }
};

const showNoticeModal: any = (info: NoticeType): void => {
  visible.value = true;
  noticeInfo.value = info;

  if (!info.read) {
    readNoticeHandler();
  }
};

onBeforeMount(() => {
  noticeModalBus.on(showNoticeModal);
});
</script>
<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .news-card {
    .news-title,
    .news-content {
      transition: opacity 0.3s ease-in-out;
    }

    &:hover {
      .news-title,
      .news-content {
        opacity: 0.5;
      }
    }
  }
}
</style>
