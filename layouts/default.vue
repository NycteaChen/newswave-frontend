<template>
  <main class="default container-xxl pt-2">
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
const token: any = useCookie('token');

const userStore = useUserStore();
const { logout } = useAuthApi();
const route = useRoute();

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
</script>
