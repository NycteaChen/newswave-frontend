<template>
  <header class="other-header">
    <div>Other head</div>
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
      v-if="isLogin"
      @click="logout"
    >
      登出
    </button>
  </header>
</template>
<script lang="ts" setup>
const isLogin: any = useCookie('isLogin');

const userStore = useUserStore();

const navList = computed<any>(() => {
  const authPath = [{ name: '會員中心', path: '/member' }];
  const notAuthPath = [{ name: '登入註冊', path: '/login-register' }];
  const commonPath = [
    { name: '訂閱', path: '/subscription-plan' },
    { name: '搜尋', path: '/search' }
  ];
  const list = isLogin.value ? authPath : notAuthPath;
  return [...list, ...commonPath];
});

const logout = async () => {
  await useApi('/member/logout', {
    method: 'post',
    credentials: 'include'
  });
  isLogin.value = undefined;
  userStore.$reset();
};
</script>
