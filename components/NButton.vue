<template>
  <button
    type="button"
    class="n-button"
    :disabled="disabled || loading"
    :class="[btnClass, isSmallBtn ? 'rounded-1' : 'rounded-2']"
  >
    <div
      class="btn-content d-flex align-items-center justify-content-center position-relative"
      :class="{ 'flex-row-reverse': iconPosition === 'left' }"
    >
      <span
        class="button-loading position-absolute top-50 start-50 translate-middle"
        :class="loading ? 'd-flex' : 'd-none'"
      >
        <n-spin is-small />
      </span>
      <span
        v-if="text"
        class="btn-text flex-fill fw-bold whitespace-nowrap"
        :class="[isSmallBtn ? 'mx-1' : 'mx-4', { 'opacity-0': loading }]"
      >
        {{ text }}
      </span>
      <img
        v-if="iconSrc"
        class="btn-icon"
        :class="{ 'opacity-0': loading }"
        :src="iconSrc"
      />
    </div>
  </button>
</template>
<script setup lang="ts">
export interface NBtnProps {
  text: string;
  /**
   * 按鈕色
   * purchase、secondary 僅能與 type: fill 搭配
   * light 僅能與 type: outline 搭配
   */
  color?: 'primary' | 'secondary' | 'purchase' | 'accent' | 'light' | 'danger';
  type?: 'fill' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconSrc?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NBtnProps>(), {
  text: '',
  color: 'primary',
  size: 'md',
  type: 'fill',
  iconSrc: '',
  iconPosition: 'right',
  loading: false,
  disabled: false
});

const btnClass = computed(() => {
  const size = `btn-${props.size}`;
  const style = `btn-${props.color}${props.type === 'fill' ? '' : '-outline'}`;
  return `${size} ${style}`;
});

const isSmallBtn = computed<boolean>(() => props.size === 'sm');
</script>
<style lang="scss" scoped>
.n-button {
  outline: 0;
  line-height: 24px;
  transition: $btn-transition;

  .btn-content {
    height: 24px;
  }

  .btn-icon {
    width: 22px;
    height: 22px;
  }
}

// 大小間距
.btn-lg {
  padding: 12px 20px;
  font-size: $btn-font-size-lg;
}

.btn-md {
  padding: 8px 20px;
  font-size: $btn-font-size;
}

.btn-sm {
  padding: 4px 8px;
  font-size: $btn-font-size-sm;
  line-height: 21px;

  .btn-content {
    height: 21px;
  }

  .btn-icon {
    width: auto;
    height: 12px;
  }
}

// 按鈕實色、outline 樣式
%btn-fill {
  border-width: 1px !important;
  border-color: transparent !important;
}

%btn-outline {
  background: transparent;
}

%btn-disabled {
  box-shadow: none;
  opacity: 1;
  cursor: not-allowed;
}

.btn-primary {
  @extend %btn-fill;

  background: $primary;
  color: $gray-100;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    background: $blue-100;
    color: $blue-300;
  }

  &-outline {
    @extend %btn-outline;

    border: 1px solid $primary;
    color: $primary;

    &:disabled,
    &:disabled:active {
      @extend %btn-disabled;

      border-color: $blue-100;
      background: transparent;
      color: $blue-100;
    }
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]),
    &-outline:hover:not([disabled]),
    &-outline:active:not([disabled]) {
      border-color: $blue-500;
      background: $blue-500;
      color: $gray-100;
    }
  }

  &:focus-visible:not([disabled]),
  &-outline:focus-visible:not([disabled]) {
    background: $primary;
    box-shadow: 0 0 0 4px $blue-200;
    color: $gray-100;
  }
}

.btn-secondary {
  @extend %btn-fill;

  background: $secondary;
  color: $primary;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    background: $gray-200;
    color: $gray-400;
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]) {
      background: $blue-400;
      color: $primary;
    }
  }

  &:focus-visible:not([disabled]) {
    background: $secondary;
    box-shadow: 0 0 0 4px $blue-300;
    color: $primary;
  }
}

.btn-accent {
  @extend %btn-fill;

  background: $accent;
  color: $gray-100;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    background: $red-100;
    color: $red-300;
  }

  &-outline {
    @extend %btn-outline;

    border: 1px solid $accent;
    color: $accent;

    &:disabled,
    &:disabled:active {
      @extend %btn-disabled;

      border-color: $red-300;
      background: transparent;
      color: $red-100;
    }
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]),
    &-outline:hover:not([disabled]),
    &-outline:active:not([disabled]) {
      background: $red-500;
      color: $gray-100;
    }
  }

  &:focus-visible:not([disabled]),
  &-outline:focus-visible:not([disabled]) {
    background: $accent;
    box-shadow: 0 0 0 4px $red-200;
    color: $gray-100;
  }
}

.btn-light-outline {
  @extend %btn-outline;

  border: 1px solid $gray-300;
  color: $gray-100;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    border-color: $gray-600;
    background: transparent;
    color: $gray-600;
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]) {
      border: 1px solid $blue-400;
      background: $blue-400;
      color: $gray-100;
    }
  }

  &:focus-visible:not([disabled]) {
    background: $blue-200;
    box-shadow: 0 0 0 4px $blue-100;
    color: $gray-100;
  }
}

.btn-purchase {
  @extend %btn-fill;

  background: $success;
  color: $gray-100;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    background: $green-100;
    color: $green-200;
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]) {
      background: $green-800;
      color: $gray-100;
    }
  }

  &:focus-visible:not([disabled]) {
    background: $success;
    box-shadow: 0 0 0 4px $green-100;
    color: $gray-100;
  }
}

.btn-danger {
  @extend %btn-fill;

  background: $danger;
  color: $gray-100;

  &:disabled,
  &:disabled:active {
    @extend %btn-disabled;

    background: $orange-100;
    color: $orange-200;
  }

  &-outline {
    @extend %btn-outline;

    border: 1px solid $danger;
    color: $danger;

    &:disabled,
    &:disabled:active {
      @extend %btn-disabled;

      border-color: $orange-300;
      background: $orange-300;
      color: $orange-100;
    }
  }

  @media screen and (width >= 768px) {
    &:hover:not([disabled]),
    &:active:not([disabled]),
    &-outline:hover:not([disabled]),
    &-outline:active:not([disabled]) {
      border-color: $orange-400;
      background: $orange-400;
      color: $gray-100;
    }
  }

  &:focus-visible:not([disabled]),
  &-outline:focus-visible:not([disabled]) {
    background: $danger;
    box-shadow: 0 0 0 4px $orange-200;
    color: $gray-100;
  }
}
</style>
