<template>
  <main class="default-layout container-xxl">
    <nav class="mb-2 mb-md-4">
      <n-tabs
        v-model:currentTab="currentTab"
        :tab-list="newsNav"
        @change-tab="changeTab"
      />
    </nav>
    <slot />
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

const userStore = useUserStore();
const { logout } = useUserApi();
const route = useRoute();

const { newsNav } = useNav();

const logoutHandler = async () => {
  const { status } = await logout();
  if (status) {
    token.value = undefined;
    userStore.$reset();

    if (route.path.startsWith('/member')) {
      navigateTo('/news');
    }
  }
};

const currentTab = ref<TabItemType['label']>('');

const changeTab = (tabItem: TabItemType) => {
  navigateTo(tabItem.value);
};

onMounted(() => {
  currentTab.value =
    (route.query.category as string) || newsNav.find((e) => String(route.path).includes(e.value))?.label || '首頁';
});
</script>
