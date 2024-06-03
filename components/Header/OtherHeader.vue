<template>
  <header
    class="other-header w-100 d-flex align-items-center flex-column bg-body z-header"
    :class="{ 'subscription-header': isSubscriptionPage }"
  >
    <section class="header-container container-xxl py-2 pt-md-4 px-xxl-0">
      <nav class="d-flex justify-content-between align-items-center gap-3">
        <n-logo target-path="/news" />
        <div class="d-flex align-items-center gap-1 gap-md-3">
          <client-only>
            <nuxt-link
              class="header-icon"
              to="/search"
            >
              <img :src="requireImage('icon/search.svg')" />
            </nuxt-link>
            <template v-if="token">
              <nuxt-link
                class="header-icon"
                to="/member/notification/personal"
              >
                <img :src="requireImage('icon/notice.svg')" />
              </nuxt-link>
            </template>
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
      v-show="!isSubscriptionPage"
      v-model:currentTab="currentTab"
      class="container-xxl px-xxl-0"
      :tab-list="tabList"
      @change-tab="changeTab"
    />
  </header>
</template>
<script lang="ts" setup>
import type { TabItemType } from '@/components/NTabs.vue';
import type { BtnTypes } from '@/components/Header/Avatar/AvatarDropdown.vue';

const token: any = useCookie('token');
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

const isMobile = inject('isMobile');

const route = useRoute();
const { newsNav, memberNav, memberSubNav } = useNav();
const currentTab = ref<TabItemType['label']>('');

const isMemberCenter = computed(() => route.path.startsWith('/member'));
const isSubscriptionPage = computed(() => route.path.startsWith('/subscription-plan'));

const changeTab = (tabItem: any) => {
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

const tabList = computed(() => (isMemberCenter.value ? memberNav : newsNav));

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
.subscription-header {
  box-shadow: 0 2px 2px 0 rgba($dark, 0.122);
}

.header-icon {
  display: flex;
  padding: 8px 10px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
}

@include media-breakpoint-up(md) {
  .header-container {
    border-bottom: 0 !important;
  }

  .header-icon {
    transition: all 0.2s ease-in-out;

    &:hover {
      background: $gray-300;
    }
  }

  .subscription-header {
    box-shadow: none;

    .header-container {
      padding-bottom: 24px !important;
      border-bottom: 1px solid $gray-300 !important;
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
