<template>
  <div>
    <n-loading :loading="loading">
      <ul v-if="renderList.length">
        <li>搜尋頁 7-1</li>
      </ul>
      <n-empty
        v-else-if="!loading"
        text="無搜尋結果"
        width="300"
      />
    </n-loading>
  </div>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: (title) => `${title} - 搜尋結果`
});

const isMobile = inject<any>('isMobile');
const noticeList = ref<NoticeType[]>([]);
const noticePhoneList = ref<NoticeType[]>([]);

const loading = ref<boolean>(true);

const renderList = computed(() => (isMobile.value ? noticePhoneList.value : noticeList.value));

onMounted(() => {
  loading.value = false;
});
</script>
