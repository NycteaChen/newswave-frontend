<template>
  <nuxt-link
    to="/news"
    class="d-block w-100"
  >
    <n-button
      class="w-100 text-primary-white border bg-transparent fw-bold px-md-3"
    >
      <div class="d-flex align-items-center">
        <span class="go-text flex-fill fs-5 lh-sm">前往使用</span>
        <img
          class="ms-auto"
          :src="requireImage('icon/ship.svg')"
        />
      </div>
    </n-button>
  </nuxt-link>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
::v-deep(.n-button) {
  padding: 12px 24px;
  min-width: 192px;
  height: 48px;
  border-color: $gray-300;
}

@include media-breakpoint-down(md) {
  .go-text {
    transform: translateX(11px);
  }
}
</style>
