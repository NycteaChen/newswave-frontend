<template>
  <div
    ref="nModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="nModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="`modal-${size}`"
    >
      <div class="modal-content">
        <div class="modal-header gap-2 justify-content-between border-bottom-0">
          <h2
            id="nModalLabel"
            class="modal-title text-primary"
          >
            {{ title }}
          </h2>
          <div
            class="close-btn is-btn"
            @click="visible = false"
          >
            <svg-icon
              name="close"
              class="fill-muted w-100 h-100"
            />
          </div>
        </div>
        <div class="modal-body p-4 text-start">
          <slot
            v-if="slots.body"
            name="body"
          />
          <template v-else>
            {{ bodyText }}
          </template>
        </div>
        <div
          class="modal-footer border-top-0 position-relative overflow-hidden"
          :class="[isSmallModal ? 'gap-2' : 'gap-3 gap-md-4']"
        >
          <n-button
            v-if="showCancelBtn"
            class="footer-btn"
            :color="cancelBtnColor"
            :type="cancelBtnType"
            :text="cancelBtnText"
            :loading="cancelBtnLoading"
            :disabled="cancelBtnDisabled"
            :size="isSmallModal ? 'sm' : 'lg'"
            @click="$emit('cancel')"
          />
          <n-button
            v-if="showConfirmBtn"
            class="footer-btn"
            :color="confirmBtnColor"
            :type="confirmBtnType"
            :text="confirmBtnText"
            :loading="confirmBtnLoading"
            :disabled="confirmBtnDisabled"
            :size="isSmallModal ? 'sm' : 'lg'"
            @click.prevent="$emit('confirm')"
          />
          <img
            class="position-absolute bottom-0 start-0 m-0"
            :src="requireImage('home/wave-2.svg')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NBtnProps } from '@/components/NButton.vue';

defineEmits<{ (e: 'cancel'): void; (e: 'confirm'): void }>();

const visible = defineModel('visible', { type: Boolean, default: false });

interface NModelProps {
  title?: string;
  bodyText?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  /*
   * sm: 300px，md: 500px，lg: 800px，xl: 1140px
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  confirmBtnColor?: NBtnProps['color'];
  confirmBtnType?: NBtnProps['type'];
  showConfirmBtn?: boolean;
  confirmBtnLoading?: boolean;
  confirmBtnDisabled?: boolean;
  cancelBtnType?: NBtnProps['type'];
  cancelBtnColor?: NBtnProps['color'];
  showCancelBtn?: boolean;
  cancelBtnLoading?: boolean;
  cancelBtnDisabled?: boolean;
}
const props = withDefaults(defineProps<NModelProps>(), {
  title: '提示',
  bodyText: '',
  size: 'md',
  confirmBtnType: 'fill',
  confirmBtnText: '確認',
  confirmBtnColor: 'primary',
  showConfirmBtn: true,
  confirmBtnLoading: false,
  confirmBtnDisabled: false,
  cancelBtnType: 'fill',
  cancelBtnText: '取消',
  cancelBtnColor: 'secondary',
  showCancelBtn: true,
  cancelBtnLoading: false,
  cancelBtnDisabled: false
});

const nModal = ref<HTMLElement | null>(null);

const isSmallModal = computed<boolean>(() => props.size === 'sm');

const slots = useSlots();

const { $bs }: any = useNuxtApp();

useMutationObserver(
  nModal,
  (mutations) => {
    const mutation: any = mutations[0];
    const { className } = mutation.target;
    visible.value = className.includes('show');
  },
  { attributes: true }
);

watch(
  () => visible.value,
  (val) => {
    const myModal = $bs.Modal.getOrCreateInstance(nModal.value);
    if (val) {
      myModal.show();
    } else {
      myModal.hide();
    }
  }
);
</script>
<style lang="scss" scoped>
.modal-title {
  font-size: 32px;
}

.close-btn {
  padding: 8px 10px;
  width: 40px;
  height: 40px;
}

.footer-btn {
  position: relative;
  z-index: 1;
  margin: 0;
}

.modal-dialog:not(.modal-sm) {
  .footer-btn {
    min-width: 136px;
  }
}

::v-deep(.btn-primary),
::v-deep(.btn-primary-outline) {
  &:disabled,
  &:disabled:active {
    background: $blue-200;
  }
}

::v-deep(.btn-accent-outline) {
  &:disabled,
  &:disabled:active {
    color: $red-300;
  }
}

@include media-breakpoint-down(sm) {
  .modal-footer {
    flex-direction: column-reverse;
  }

  .footer-btn {
    width: 100%;
  }
}
</style>
