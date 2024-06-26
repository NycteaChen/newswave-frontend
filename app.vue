<template>
  <div>
    <n-page-loading />
    <teleport to="body">
      <n-toast />
      <notice-modal v-if="token" />
    </teleport>
    <n-header v-if="!isLoginPage" />
    <nuxt-layout class="layouts">
      <nuxt-page :page-key="(route) => route.fullPath" />
    </nuxt-layout>
    <n-footer v-if="!isLoginPage" />

    <client-only>
      <n-mask />
      <n-to-top v-if="!isLoginPage" />
    </client-only>
  </div>
</template>
<script setup lang="ts">
const { getMagazineCategoryList } = useGuestStore();
const Socket = useSocket();
const route = useRoute();
const { width } = useWindowSize();
const { y } = useWindowScroll();
provide('scrollY', y);

const isLoginPage = computed(() => route.name === 'login-register');

const isMobile = computed<boolean>(() => width.value < 768);
const isPc = computed<boolean>(() => width.value >= 1200);
provide('isMobile', isMobile);
provide('isPc', isPc);

const token: any = useCookie('token');
const userStore = useUserStore();

onMounted(async () => {
  await nextTick(() => {
    getMagazineCategoryList();

    if (token.value) {
      userStore.getUserData();

      if (route.name === 'member-account-basic') {
        userStore.getUserInfo();
      }
    } else {
      userStore.$reset();
    }
  });
});

watchImmediate(
  () => token.value,
  (val) => {
    if (val) {
      Socket.connect();
    } else {
      Socket.disconnect();
    }
  }
);
</script>
<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  .layouts,
  ::v-deep(.layouts) {
    &:not(.login-layout) {
      padding-top: $mobile-header-height;
    }

    &:not(.login-layout, .home-layout) {
      padding-bottom: 48px;
    }

    &.default-layout,
    &.member-layout {
      padding-top: $mobile-header-tab-height;
    }
  }
}

@include media-breakpoint-up(md) {
  .layouts,
  ::v-deep(.layouts) {
    &.info-layout {
      padding-bottom: 80px;
      min-height: calc(100vh - $pc-header-height - 372px);
    }

    &:not(.login-layout, .home-layout, .info-layout) {
      padding-bottom: 80px;
      min-height: calc(100vh - $pc-header-tab-height - 372px);
    }
  }
}
</style>
