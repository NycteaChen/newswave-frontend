<template>
  <header-dropdown class="avatar-dropdown">
    <template #dropdownTrigger>
      <n-avatar class="is-btn" />
    </template>
    <template #dropdownContent>
      <ul class="menu">
        <template v-if="token">
          <li
            v-if="token && !isVip"
            class="d-md-none pb-0 mb-3"
          >
            <n-button
              class="w-100"
              text="訂閱"
              color="purchase"
              @click="navigateTo('/subscription-plan')"
            />
          </li>
          <nuxt-link
            :to="redirectItem.to"
            class="text-primary"
          >
            <li
              class="menu-item mb-3 d-flex align-items-center gap-2"
              @click="navigateTo(redirectItem.to)"
            >
              <svg-icon
                :name="redirectItem.icon"
                class="menu-item-icon"
              />
              {{ redirectItem.label }}
            </li>
          </nuxt-link>
          <li
            class="menu-item text-primary d-flex align-items-center gap-2"
            @click="logoutHandler"
          >
            <svg-icon
              name="logout"
              class="menu-item-icon"
            />
            <span>登出</span>
          </li>
        </template>
        <template v-else>
          <li
            v-for="(item, index) in loginRegisterBtnGroup"
            :key="index"
            :class="{ 'pb-0 mb-1': !index }"
          >
            <n-button
              class="w-100"
              :text="item.text"
              :color="item.color"
              size="lg"
              @click="
                navigateTo({
                  path: '/login-register',
                  query: item.query
                })
              "
            />
          </li>
        </template>
      </ul>
    </template>
  </header-dropdown>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');
const userStore = useUserStore();
const noticeStore = useNoticeStore();
const { isVip } = storeToRefs(userStore);

const { logout } = useUserApi();
const route = useRoute();

export interface BtnTypes {
  text: string;
  color: 'primary' | 'secondary';
  query?: any;
}

const redirectItem = computed(() =>
  String(route.name).includes('member')
    ? {
        label: '首頁',
        to: '/news',
        icon: 'home'
      }
    : {
        label: '會員中心',
        to: '/member',
        icon: 'member-basic'
      }
);

const loginRegisterBtnGroup = computed<BtnTypes[]>(() => [
  {
    text: '登入',
    color: 'primary'
  },
  {
    text: '註冊',
    color: 'secondary',
    query: { mode: 'register' }
  }
]);

const logoutHandler = async () => {
  const { status, message } = await logout();
  if (status) {
    if (route.path?.startsWith('/member')) {
      await navigateTo('/news');
    } else if (String(route.name)?.includes('subscription-plan-checkout')) {
      await navigateTo('/subscription-plan');
    }

    token.value = undefined;
    userStore.$reset();
    noticeStore.$reset();

    showToast({
      id: 'logout-success',
      message
    });
  } else {
    showToast({
      id: 'logout-fail',
      message,
      type: 'warning'
    });
  }
};
</script>
<style lang="scss" scoped>
::v-deep(.dropdown-menu) {
  padding: 12px 0 !important;
  width: 250px;
}

.menu {
  li {
    padding: 12px 24px;

    &.menu-item {
      padding-right: 48px;
      padding-left: 48px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      .menu-item-icon {
        fill: currentcolor;
        width: 16px;
        height: 16px;
      }
    }
  }
}

@include media-breakpoint-up(md) {
  .menu li.menu-item:hover {
    background: $gray-200;
  }
}
</style>
