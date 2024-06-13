<template>
  <div class="article-paywall w-100 d-flex flex-column align-items-center gap-3">
    <img
      class="lock-icon"
      :src="requireImage('icon/lock.svg')"
    />
    <h5 class="mb-0">解鎖閱讀全部內容</h5>
    <div class="d-flex flex-column gap-3 flex-sm-row">
      <div
        v-for="item in paywallList"
        :key="item.title"
        class="paywall-item card text-center"
      >
        <div class="card-body d-flex flex-column gap-3 p-md-4">
          <h5 class="card-title flex-fill mb-0">{{ item.title }}</h5>
          <p class="card-text mb-0 text-sm flex-fill">{{ item.text }}</p>
          <n-button
            class="w-100"
            :text="item.btnText"
            :loading="item.loading"
            :disabled="item.disabled"
            :color="item.btnColor || 'primary'"
            @click="item.clickFn()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface ArticlePaywallType {
  readQuota: number;
}

const props = withDefaults(defineProps<ArticlePaywallType>(), {
  readQuota: 0
});

const emit = defineEmits<{ (e: 'freeRead'): void }>();

const token: any = useCookie('token');

const btnLoading = ref<boolean>(false);

const enableFreeRead = computed(() => token.value && props.readQuota);

const memberStatusBtnText = computed(() => {
  if (enableFreeRead.value) return `免費閱讀：${props.readQuota}次`;
  return token.value ? '您的免費次數已用完' : '登入';
});

const paywallList = computed(() => [
  {
    title: '訂閱 NewsWave Plus 暢讀各大雜誌',
    text: '每個月最多只需 100 元，無限暢讀各大雜誌文章不受限制',
    btnText: '訂閱',
    btnColor: 'purchase' as const,
    clickFn: () => {
      navigateTo('/subscription-plan');
    }
  },
  {
    title: '加入會員享有免費閱讀次數',
    text: '會員可享有收藏、追蹤等服務，另提供 3 次免費閱讀雜誌文章額度',
    btnText: memberStatusBtnText.value,
    loading: btnLoading.value,
    disabled: !!token.value && !props.readQuota,
    clickFn: () => {
      if (enableFreeRead.value) {
        emit('freeRead');
      } else {
        navigateTo('/login-register');
      }
    }
  }
]);

defineExpose({ btnLoading });
</script>
<style lang="scss" scoped>
.article-paywall {
  padding: 60px 20px 20px;
  background-image: linear-gradient(0deg, $gray-100 85%, transparent);

  .paywall-item {
    flex: 1 1 0;
  }

  .lock-icon {
    width: 22px;
  }
}
</style>
