<template>
  <nav
    v-if="breadcrumbList.length"
    aria-label="breadcrumb"
  >
    <ol class="breadcrumb d-none d-md-flex">
      <li
        v-for="item in breadcrumbList"
        :key="item?.label"
        class="breadcrumb-item"
        :class="{
          'text-decoration-underline is-btn': !item?.current,
          active: item?.current,
          truncate: item?.current && item?.truncate
        }"
      >
        <nuxt-link
          v-if="!item?.current"
          :to="item?.value"
        >
          {{ item?.label }}
        </nuxt-link>
        <template v-else>
          {{ item?.label }}
        </template>
      </li>
    </ol>
    <nuxt-link
      class="d-flex align-items-center d-md-none mobile-breadcrumb-item"
      :to="prevRoute?.value"
    >
      <svg-icon
        class="arrow-icon fill-primary"
        name="arrow"
      />
      <span class="fs-sm text-decoration-underline text-primary">
        {{ prevRoute?.label }}
      </span>
    </nuxt-link>
  </nav>
</template>
<script lang="ts" setup>
interface NBreadcrumbType extends NavItemType {
  current?: boolean;
  prev?: boolean;
}

const guestStore = useGuestStore();
const { breadcrumbNav } = storeToRefs(guestStore);

const breadcrumbList = ref<NBreadcrumbType[]>([]);

const prevRoute = computed(() => breadcrumbList.value?.find((e) => e.prev));

watchImmediate(
  () => breadcrumbNav.value,
  (val: NBreadcrumbType[]) => {
    breadcrumbList.value = JSON.parse(JSON.stringify(val || []));

    breadcrumbList.value.forEach((e, index, arr) => {
      e.current = index === arr.length - 1;
      e.prev = index === arr.length - 2;
    });
  }
);
</script>
<style lang="scss" scoped>
.mobile-breadcrumb-item {
  .arrow-icon {
    padding: 7px 0;
    width: 22px;
    height: 22px;
    transform: rotate(-90deg);
  }
}

.breadcrumb-item.active.truncate {
  max-width: 120px;
}
</style>
