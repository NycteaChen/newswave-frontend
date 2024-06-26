<template>
  <header
    class="other-header w-100 d-flex align-items-center flex-column bg-body z-header"
    :class="{ 'exclude-nav-tab-header': excludeNavTabPage }"
  >
    <section class="header-container container-xxl py-2 pt-md-4 px-xxl-0">
      <nav class="d-flex justify-content-between align-items-center gap-3">
        <n-logo />
        <div class="d-flex align-items-center gap-1 gap-md-3">
          <client-only>
            <global-search v-if="!isSearchPage" />
            <notice-bell v-if="token" />
            <avatar-dropdown v-if="token || isMobile" />
            <n-button
              v-if="token && !isVip"
              text="訂閱"
              class="d-none d-md-block"
              color="purchase"
              @click="navigateTo('/subscription-plan')"
            />
            <template v-if="!token && !isMobile">
              <n-button
                v-for="(item, index) in loginRegisterBtnGroup"
                :key="index"
                :text="item.text"
                :color="item.color"
                @click="
                  navigateTo({
                    path: '/login-register',
                    query: item.query
                  })
                "
              />
            </template>
          </client-only>
        </div>
      </nav>
    </section>
    <n-tabs
      v-show="!excludeNavTabPage"
      v-model:currentTab="currentTab"
      class="container-xxl px-xxl-0"
      :tab-list="tabList"
      @change-tab="changeTab"
    />
  </header>
</template>
<script lang="ts" setup>
import type { TabItemType } from '@/components/NTabs.vue';
import type { BtnTypes } from '~/components/Header/AvatarDropdown.vue';

const token: any = useCookie('token');
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

const isMobile = inject('isMobile');

const route = useRoute();
const { newsNav, memberNav, memberSubNav } = useNav();
const currentTab = ref<TabItemType['label']>('');

const isSearchPage = computed(() => String(route.name) === 'search');
const isMemberCenter = computed(() => route.path.startsWith('/member'));
const excludeNavTabPage = computed(() =>
  route.matched.some((e) => e?.meta?.layout === 'info' || e?.meta?.layout === 'checkout' || e.name === 'slug')
);

const changeTab = (tabItem: NavItemWithSubType) => {
  if (isMemberCenter.value) {
    if (tabItem.children) {
      navigateTo({ name: tabItem.children });
    } else {
      navigateTo({ name: `${tabItem?.childrenRoute?.[0]?.value || 'member'}` });
    }
  } else {
    navigateTo(tabItem.value);
  }
};

const tabList = computed<NavItemWithSubType[] | NavItemType[]>(() => (isMemberCenter.value ? memberNav : newsNav));

watchEffect(() => {
  if (isMemberCenter.value) {
    currentTab.value = memberSubNav.find((e) => String(route.name)?.includes(e.value))?.label || '會員中心';
  } else {
    currentTab.value =
      (route.query.category as string) ||
      tabList.value.find((e) => String(route.path)?.includes(e.value))?.label ||
      (String(route.params.articleId)?.startsWith('M-') && tabList.value.find((e) => e.value === '/magazine')?.label) ||
      (route.params.category as string) ||
      '';
  }
});

const loginRegisterBtnGroup = computed<BtnTypes[]>(() => [
  {
    text: '註冊',
    color: 'secondary',
    query: { mode: 'register' }
  },
  {
    text: '登入',
    color: 'primary'
  }
]);
</script>
<style lang="scss" scoped>
.exclude-nav-tab-header {
  box-shadow: 0 2px 2px 0 rgba($dark, 0.122);
}

@include media-breakpoint-up(md) {
  .header-container {
    border-bottom: 0 !important;
  }

  .exclude-nav-tab-header {
    .header-container {
      padding-bottom: 24px !important;
    }
  }
}

@include media-breakpoint-down(md) {
  .other-header {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
