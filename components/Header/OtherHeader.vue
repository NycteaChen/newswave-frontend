<template>
  <header class="other-header">
    <n-logo />
    <nav class="row">
      <nuxt-link
        v-for="item in navList"
        :key="item.path"
        class="col"
        :to="item.path"
      >
        {{ item.name }}
      </nuxt-link>
    </nav>
    <button
      v-if="token"
      @click="logoutHandler"
    >
      登出
    </button>
  </header>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');

const userStore = useUserStore();
const { logout } = useMemberApi();

const navList = computed<any>(() => {
  const authPath = [{ name: '會員中心', path: '/member' }];
  const notAuthPath = [{ name: '登入註冊', path: '/login-register' }];
  const commonPath = [
    { name: '訂閱', path: '/subscription-plan' },
    { name: '搜尋', path: '/search' }
  ];
  const list = token.value ? authPath : notAuthPath;
  return [...list, ...commonPath];
});

const logoutHandler = async () => {
  const { status } = await logout();
  if (status) {
    token.value = undefined;
    userStore.$reset();
  }
};
</script>
