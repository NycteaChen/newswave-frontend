<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item text-decoration-underline home">
        <a :href="props.homelink">{{ props.magazineCategory }}</a>
      </li>
      <li
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ props.breadcrumbpage }}
      </li>
    </ol>
  </nav>
</template>
<script lang="ts" setup>
interface BreadcrumbProps {
  breadcrumbpage: string;
  magazineCategory: string;
  homelink: string;
}

const props = defineProps<BreadcrumbProps>();
</script>
<style lang="scss" scoped>
.breadcrumb-item {
  color: $blue-300;
  font-size: 14px;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: $blue-300; /* 修改分隔符的顏色 */
  content: ' / '; /* 確保分隔符內容正確 */
}

.home {
  color: $primary;
}
</style>
