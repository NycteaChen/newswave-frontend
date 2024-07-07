<template>
  <section class="mt-5">
    <client-only>
      <nuxt-page />
    </client-only>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'checkout'
});

const userStore = useUserStore();
const { isVip } = storeToRefs(userStore);

onMounted(() => {
  nextTick(async () => {
    if (isVip.value) {
      await navigateTo('/news');

      showToast({
        id: 'checkout-back',
        message: '您已經訂閱 NewsWave Plus！'
      });
    }
  });
});

useHead({
  titleTemplate: (title) => `${title} - 訂閱`
});
</script>
