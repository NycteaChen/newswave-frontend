<template>
  <div class="dropdown">
    <div
      id="dropdownMenuLink"
      ref="dropdownToggleRef"
      class="dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <slot name="dropdownTrigger" />
    </div>
    <div
      class="dropdown-menu dropdown-menu-end rounded-1 d-block"
      :class="{ show: visible }"
      aria-labelledby="dropdownMenuLink"
    >
      <slot name="dropdownContent" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const dropdownToggleRef = ref<HTMLElement | null>(null);

const visible = ref<boolean>(false);

useMutationObserver(
  dropdownToggleRef,
  (mutations) => {
    const mutation: any = mutations[0];
    const { className } = mutation.target;
    visible.value = className.includes('show');
  },
  { attributes: true }
);
</script>
<style lang="scss" scoped>
.dropdown-menu {
  top: 48px !important;
  right: 0 !important;
  padding: 0 !important;
  border: 1px solid $blue-100;
  background: #fff;
  box-shadow: 0 10px 40px 0 rgba($black, 0.078);
  transition: transform 0.2s ease-in-out;
  transform: scale(0) !important;
  transform-origin: top right;

  &.show {
    transform: scale(1) !important;
  }
}

.dropdown-toggle::after {
  display: none;
}

@include media-breakpoint-up(md) {
  .dropdown-menu {
    top: 56px !important;
  }
}
</style>
