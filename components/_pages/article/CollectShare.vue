<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <n-button
      v-for="item in btnList"
      :key="item.text"
      size="sm"
      color="secondary"
      :text="item.text"
      :icon-src="requireImage(`icon/${item.icon}.svg`)"
      @click="item.clickFn()"
    />

    <Teleport to="body">
      <auth-hint-modal v-model:visible="showHintModal" />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const token: any = useCookie('token');

const isCollect = ref<boolean>(false);
const showHintModal = ref<boolean>(false);

const copyLinkHandler = () => {
  copyText({ text: `${window.origin}${route.fullPath}`, message: '複製連結成功' });
};

const collect = () => {
  if (!token.value) {
    showHintModal.value = true;
    return;
  }
  isCollect.value = !isCollect.value;
  collectHandler(isCollect.value);
};

const btnList = computed(() => [
  {
    text: '收藏',
    icon: `collect${isCollect.value ? '-active' : ''}`,
    clickFn: collect
  },
  {
    text: '分享',
    icon: 'link',
    clickFn: copyLinkHandler
  }
]);
</script>
<style lang="scss" scoped>
::v-deep(.btn-content) {
  flex-direction: row-reverse;
}
</style>
