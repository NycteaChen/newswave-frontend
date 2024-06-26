<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <client-only>
      <n-button
        v-for="item in btnList"
        :key="item.text"
        size="sm"
        color="secondary"
        :loading="item.loading || false"
        :text="item.text"
        :icon-src="item.icon"
        @click="item.clickFn()"
      />
    </client-only>
    <Teleport to="body">
      <auth-hint-modal v-model:visible="showHintModal" />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const token: any = useCookie('token');

const collectShareBus = useEventBus('collectShareBus');

const userStore = useUserStore();
const { collects } = storeToRefs(userStore);

const showHintModal = ref<boolean>(false);
const collectLoading = ref<boolean>(false);

const copyLinkHandler = () => {
  copyText({ text: `${window.origin}${route.fullPath}`, message: '複製連結成功' });
};

const collectLoadingHandler: any = (bool: boolean): void => {
  collectLoading.value = bool;
};

const collect = async () => {
  if (!token.value) {
    showHintModal.value = true;
    return;
  }

  collectShareBus.emit(true);
  collectLoadingHandler(true);

  await collectHandler(String(route.params?.articleId));

  collectShareBus.emit(false);
  collectLoadingHandler(false);
};

const isCollected = computed<boolean>(() => collects.value?.includes(String(route.params?.articleId)));

const btnList = computed(() => [
  {
    text: '收藏',
    icon: isCollected.value ? 'collect-fill' : 'member-collect',
    clickFn: collect,
    loading: collectLoading.value
  },
  {
    text: '分享',
    icon: 'link',
    clickFn: copyLinkHandler
  }
]);

onBeforeMount(() => {
  collectShareBus.on(collectLoadingHandler);
});

onBeforeUnmount(() => {
  collectShareBus.off(collectLoadingHandler);
});
</script>
<style lang="scss" scoped>
::v-deep(.btn-content) {
  flex-direction: row-reverse;
}
</style>
