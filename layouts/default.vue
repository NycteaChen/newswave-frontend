<template>
  <main class="default-layout container-xxl">
    <nav class="mb-2 mb-md-4">
      <n-tabs
        v-model:currentTab="currentTab"
        :tab-list="newsNav"
        @change-tab="changeTab"
      />
    </nav>
    <div>
      <section
        v-if="$route.path?.startsWith('/news') || ($route?.name === 'magazine' && !$route.params?.category)"
        ref="pageRef"
        v-touch:swipe.left="swiperHeader"
        v-touch:swipe.right="swiperHeader"
        v-touch:press="pressHandler"
        v-touch:release="releaseHandler"
        class="page-container"
        :style="transformStyle"
      >
        <slot />
      </section>
      <section v-else>
        <slot />
      </section>
      <news-aside-info v-if="$route.path?.startsWith('/news')" />
    </div>
    <button
      v-if="token"
      @click="logoutHandler"
    >
      登出
    </button>
  </main>
</template>

<script lang="ts" setup>
import type { TabItemType } from '@/components/NTabs.vue';

const token: any = useCookie('token');
const pageRef = ref<HTMLElement | null>(null);
const swiperRef = useSwipe(pageRef);

const isMobile = inject<any>('isMobile');

const userStore = useUserStore();
const { logout } = useUserApi();
const route = useRoute();

const { newsNav } = useNav();

const logoutHandler = async () => {
  const { status } = await logout();
  if (status) {
    token.value = undefined;
    userStore.$reset();

    if (route.path?.startsWith('/member')) {
      navigateTo('/news');
    }
  }
};

const currentTab = ref<TabItemType['label']>('');

const changeTab = (tabItem: TabItemType) => {
  navigateTo(tabItem.value);
};

watchEffect(() => {
  currentTab.value =
    (route.query.category as string) ||
    newsNav.find((e) => String(route.path)?.includes(e.value))?.label ||
    (String(route.params.articleId)?.startsWith('M-') && newsNav.find((e) => e.value === '/magazine')?.label) ||
    (route.params.category as string) ||
    '';
});

const swiperRoute = computed(() => {
  const index = newsNav.findIndex((e) => e.label === currentTab.value);
  const prev = newsNav[index - 1]?.value || newsNav[0]?.value;
  const next = newsNav[index + 1]?.value || newsNav[newsNav.length - 1]?.value;

  return { prev, next };
});

const isPress = ref<boolean>(false);
const transformStyle = computed(() => ({
  transform: isPress.value ? `translateX(${swiperRef.coordsEnd.x - swiperRef.coordsStart.x}px)` : ''
}));

const pressHandler = () => {
  if (!isMobile.value) return;
  isPress.value = true;
};

const releaseHandler = () => {
  if (!isMobile.value) return;
  setTimeout(() => {
    isPress.value = false;
  }, 100);
};

const swiperHeader = (direction: string) => {
  if (!isMobile.value) return;
  if (direction === 'left') {
    navigateTo(swiperRoute.value.next);
  } else {
    navigateTo(swiperRoute.value.prev);
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  transition: transform 0.1s ease-out;
}
</style>
