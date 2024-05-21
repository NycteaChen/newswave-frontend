<template>
  <div class="dropdown">
    <n-avatar
      id="dropdownMenuLink"
      class="is-btn dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    />
    <ul
      class="dropdown-menu dropdown-menu-end rounded-1"
      aria-labelledby="dropdownMenuLink"
    >
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
        <li
          class="menu-item mb-3 d-flex align-items-center gap-2"
          @click="navigateTo('/member')"
        >
          <img :src="requireImage('member/member.svg')" />
          <nuxt-link
            to="/member"
            class="text-primary"
          >
            會員中心
          </nuxt-link>
        </li>
        <li
          class="menu-item text-primary d-flex align-items-center gap-2"
          @click="logoutHandler"
        >
          <img :src="requireImage('icon/logout.svg')" />
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
  </div>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');
const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

const { logout } = useUserApi();
const route = useRoute();

export interface BtnTypes {
  text: string;
  color: 'primary' | 'secondary';
  query?: any;
}

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
  const { status } = await logout();
  if (status) {
    token.value = undefined;
    userStore.$reset();

    if (route.path?.startsWith('/member')) {
      navigateTo('/news');
    } else if (route.name === 'subscription-plan-checkout') {
      navigateTo('/subscription-plan');
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-menu {
  top: 6px !important;
  padding: 12px 0;
  width: 250px;
  border: 1px solid $blue-100;
  background: #fff;
  box-shadow: 0 10px 40px 0 rgba($black, 0.078);

  li {
    padding: 12px 24px;

    &.menu-item {
      padding-right: 48px;
      padding-left: 48px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }

    img {
      width: 14px;
    }
  }
}

@include media-breakpoint-up(md) {
  .dropdown-menu {
    top: 14px !important;

    li.menu-item:hover {
      background: $gray-200;
    }
  }
}
</style>
