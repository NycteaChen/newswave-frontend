<template>
  <div class="personal-notification">
    <div class="d-flex flex-wrap align-items-center justify-content-sm-end gap-2 gap-md-3 mb-2 mb-md-3">
      <n-radio-group
        v-model:checked="readState"
        class="col-12 col-sm-8 col-md-6 col-xl-4"
        :options="radioOptions"
      >
        <template #label="{ item }">
          <div
            v-if="item.value === 'unread'"
            class="unread-label position-relative d-flex align-items-center justify-content-center gap-1"
          >
            {{ item.label }}
            <notice-badge type="number" />
          </div>
          <template v-else>
            {{ item.label }}
          </template>
        </template>
      </n-radio-group>
      <delete-notice-btn
        class="ms-auto ms-sm-0"
        :read-state="readState"
        :disabled="!renderList.length"
        @success="getNoticeListHandler"
      />
    </div>
    <ul
      v-if="renderList.length"
      class="d-flex flex-column gap-2 gap-md-3"
    >
      <li
        v-for="item in renderList"
        :key="item.id"
        class="notice-card d-flex gap-2 gap-sm-3 gap-md-4 cursor-pointer p-3 rounded-2"
        :class="item.read ? 'notice-card-read bg-body border' : 'notice-card-unread bg-body-light'"
        @click="openNoticeModal(item)"
      >
        <img
          class="site-logo"
          :src="requireImage('site/site.svg')"
        />
        <div class="flex-fill notice-content">
          <h5 class="text-primary">
            <notice-badge
              v-if="!item.read"
              class="me-1 mb-xl-1"
            />
            {{ noticeTemplate(item?.topic?.[0]).title }}
          </h5>
          <p class="mb-2 text-sm">
            {{ noticeTemplate().subTitle }}
          </p>
          <h6>{{ `${item.title}...` }}</h6>
          <div class="text-muted text-sm">
            {{ useDateFormat(item?.publishedAt, 'YYYY/MM/DD HH:mm').value }}
          </div>
        </div>
      </li>
    </ul>
    <n-empty v-else />
    <n-pagination
      v-model:current="pagination.current"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
      class="mt-4"
    />
  </div>
</template>
<script setup lang="ts">
import type { PaginationType } from '@/components/NPagination.vue';

definePageMeta({
  title: '通知中心 - 我的通知'
});

const { getNoticeList } = useUserApi();

const readState = ref<NoticePageRequestType['readState'] | 'all'>('all');
const loadMoreLoading = ref<boolean>(false);

const radioOptions = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '未讀',
    value: 'unread'
  },
  {
    label: '已讀',
    value: 'read'
  }
];

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const isMobile = inject<any>('isMobile');
const noticeList = ref<NoticeType[]>([]);
const noticePhoneList = ref<NoticeType[]>([]);
const renderList = computed(() => (isMobile.value ? noticePhoneList.value : noticeList.value));

const getNoticeListHandler = async () => {
  loadMoreLoading.value = true;

  const params = {
    pageIndex: pagination.current,
    readState: readState.value === 'all' ? undefined : readState.value
  };

  const { status, data } = await getNoticeList(params);
  if (status) {
    noticeList.value = data.notices || [];

    noticePhoneList.value = pagination.current === 1 ? data.notices : [...noticePhoneList.value, ...data.notices];

    pagination.totalPages = data.totalPages || 0;
  }

  loadMoreLoading.value = false;
};

const noticeModalBus = useEventBus('noticeModalBus');

const openNoticeModal = (item: NoticeType) => {
  noticeModalBus.emit(item);
};

const personalNotificationBus = useEventBus('personalNotificationBus');

onMounted(async () => {
  await nextTick(() => {
    getNoticeListHandler();
  });
});

onBeforeUnmount(() => {
  personalNotificationBus.off(getNoticeListHandler);
});

watch(
  () => pagination.current,
  () => {
    getNoticeListHandler();
  }
);

watchImmediate(
  () => readState.value,
  (val) => {
    if (pagination.current !== 1) {
      pagination.current = 1;
    } else {
      getNoticeListHandler();
    }

    if (val === 'read') {
      personalNotificationBus.off(getNoticeListHandler);
    } else {
      personalNotificationBus.on(getNoticeListHandler);
    }
  }
);
</script>
<style lang="scss" scoped>
.unread-label {
  ::v-deep(.notice-badge) {
    @media screen and (width <= 440px) {
      position: absolute;
      top: -8px;
      right: 5px;
      transform: scale(0.9);
    }

    @media screen and (width <= 375px) {
      right: -20px;
      transform: scale(0.8);
    }
  }
}

.site-logo {
  width: 40px;
  height: 40px;
}

.notice-card-unread {
  border: 1px solid $blue-100;
}

@include media-breakpoint-up(sm) {
  .site-logo {
    width: 60px;
    height: 60px;
  }
}

@include media-breakpoint-up(md) {
  .notice-card {
    transition: background 0.3s ease-in-out;

    &-read:hover {
      background: $gray-200 !important;
    }

    &-unread:hover {
      background: $blue-200 !important;
    }
  }

  .site-logo {
    width: 80px;
    height: 80px;
  }
}

@include media-breakpoint-up(xl) {
  .site-logo {
    width: 126px;
    height: 126px;
  }
}
</style>
