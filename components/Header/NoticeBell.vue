<template>
  <nuxt-link :to="unreadCount && !isMobile ? '' : '/member/notification/personal'">
    <header-dropdown
      v-if="unreadCount && !isMobile"
      class="notice-dropdown"
    >
      <template #dropdownTrigger>
        <div class="position-relative">
          <nav-icon-btn icon="member-personal" />
          <notice-badge class="bell-dot" />
        </div>
      </template>
      <template #dropdownContent>
        <header class="content-header d-flex align-items-center justify-content-between border-bottom">
          <div class="d-flex gap-2 align-items-center">
            <h6 class="mb-0">未讀通知</h6>
            <notice-badge type="number" />
          </div>
          <nuxt-link
            class="fs-sm is-btn"
            to="/member/notification/personal"
          >
            所有通知
          </nuxt-link>
        </header>
        <ul class="notice-list fs-sm">
          <li
            v-for="(item, index) in unreadList"
            :key="item.articleId"
            class="notice-item d-flex flex-column gap-2 cursor-pointer"
            :class="{ 'border-top': index }"
            @click="openNoticeModal(item)"
          >
            <p class="mb-0 fw-bold text-primary">
              <notice-badge class="me-1" />
              {{ noticeTemplate(item.topic[0]).title }}
            </p>
            <p class="mb-0 fs-sm">
              {{ noticeTemplate().subTitle }}
            </p>
            <div class="text-muted fs-xs text-end">
              {{ useDateFormat(item.publishedAt, 'YYYY/MM/DD HH:mm').value }}
            </div>
          </li>
        </ul>
      </template>
    </header-dropdown>
    <div
      v-else
      class="position-relative"
    >
      <nav-icon-btn icon="member-personal" />
      <notice-badge class="bell-dot" />
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
const isMobile = inject('isMobile');

const { getNoticeList } = useUserApi();

const noticeStore = useNoticeStore();
const { unreadCount } = storeToRefs(noticeStore);

const unreadList = ref<NoticeType[]>([]);

const getNoticeListHandler = async () => {
  const params = {
    pageIndex: 1,
    readState: 'unread' as const,
    pageSize: 5
  };
  const { status, data } = await getNoticeList(params);
  if (status) {
    unreadList.value = data.notices || [];
    noticeStore.SET_UNREAD_COUNT(data?.totalElements || 0);
  }
};

const noticeBus = useEventBus('noticeBus');
onBeforeMount(() => {
  noticeBus.on(getNoticeListHandler);
});

const noticeModalBus = useEventBus('noticeModalBus');

const openNoticeModal = (item: NoticeType) => {
  noticeModalBus.emit(item);
};

onMounted(async () => {
  await nextTick(() => {
    getNoticeListHandler();
  });
});
</script>
<style lang="scss" scoped>
::v-deep(.dropdown-menu) {
  width: 320px;
}

.bell-dot {
  position: absolute;
  top: 8.5px;
  right: 6px;
}

%item-padding {
  padding: 12px 24px;
}

.content-header {
  @extend %item-padding;
}

.notice-list {
  overflow-y: auto;
  max-height: 320px;

  &::-webkit-scrollbar-track {
    background: $gray-100;
  }

  .notice-item {
    @extend %item-padding;

    transition: background 0.3s ease-in-out;

    &:hover {
      background: $gray-200 !important;
    }
  }
}
</style>
