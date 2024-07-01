<template>
  <div
    class="toast-container position-fixed start-50 top-0"
    :class="{ show: visible, 'z-minus': !visible }"
  >
    <div
      :id="toastInfo.id"
      ref="nToast"
      class="toast bg-body overflow-hidden"
      :data-bs-delay="toastInfo.delay"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex gap-3 p-3 pb-0">
        <div class="pt-1 flex-shrink-0">
          <svg-icon
            :name="toastInfo.icon"
            class="toast-icon"
            :class="`fill-${toastInfo.iconColor}`"
          />
        </div>
        <div class="flex-fill">
          <header class="d-flex align-items-center w-100 justify-content-between mb-2">
            <h5 class="text-primary mb-0">系統提示</h5>
            <svg-icon
              name="close"
              class="close-icon is-btn flex-shrink-0 fill-muted"
              @click="closeToast('hide')"
            />
          </header>
          <p class="mb-0 break-word w-100">{{ toastInfo.message }}</p>
        </div>
      </div>
      <img :src="requireImage('member/wave-2.svg')" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const nToastBus = useEventBus('nToastBus');

interface NToastProps {
  id: string;
  message: string;
  icon: string;
  delay?: number;
  iconColor: string;
}

const toastInfo = reactive<NToastProps>({
  id: 'nToast',
  icon: '',
  message: '',
  delay: 0,
  iconColor: ''
});

const visible = ref<boolean>(false);
const nToast = ref<HTMLElement | null>(null);

useMutationObserver(
  nToast,
  (mutations) => {
    const mutation: any = mutations[0];
    const { className } = mutation.target;
    visible.value = className.includes('show');
  },
  { attributes: true }
);

const { $bs }: any = useNuxtApp();

const closeToast = (type: 'hide' | 'dispose'): void => {
  const toastRef = document.getElementById(toastInfo.id);
  const toastInstance = $bs.Toast.getOrCreateInstance(toastRef);
  toastInstance[type]();
};

const showToast: any = (info: NToastProps): void => {
  if (info.id === toastInfo.id && visible.value) return;
  if (info.id !== toastInfo.id) {
    closeToast('dispose');
  }

  Object.assign(toastInfo, info);

  nextTick(() => {
    const toastRef = document.getElementById(toastInfo.id);
    const toastInstance = $bs.Toast.getOrCreateInstance(toastRef);
    toastInstance.show();
  });
};

onBeforeMount(() => {
  nToastBus.on(showToast);
});
</script>
<style lang="scss" scoped>
.toast-container {
  transition: all 0.3s ease-in-out;
  transform: translate(-50%, -100px);

  &.show {
    transform: translate(-50%, 50px);
  }
}

.toast {
  &:not(.show) {
    display: block;
  }
}

.toast-icon {
  width: 24px;
  height: 24px;
}

.close-icon {
  width: 16px;
  height: 16px;
}
</style>
