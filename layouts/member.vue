<template>
  <main class="member-layout container-xxl">
    <client-only>
      <nav
        class="sub-nav d-flex align-items-center gap-2"
        :class="{ 'expand py-2': currentChildrenRoute.length }"
      >
        <nuxt-link
          v-for="subItem in currentChildrenRoute"
          :key="subItem.label"
          class="p-2 px-md-4 text-center"
          :class="$route.name === subItem.value ? 'text-primary fw-bold' : 'text-body is-btn'"
          :to="{ name: subItem.value }"
        >
          {{ subItem.label }}
          <notice-badge v-if="subItem?.badge === 'notice'" />
        </nuxt-link>
      </nav>
      <div class="pt-3 pt-md-4">
        <n-breadcrumb class="mb-2" />
        <slot />
      </div>
    </client-only>
  </main>
</template>

<script lang="ts" setup>
const { newsNav, memberSubNav } = useNav();
const route = useRoute();

const currentChildrenRoute = computed(() => {
  if (String(route.name) === 'member') return [];
  return memberSubNav?.find((e) => String(route.name)?.includes(e.value))?.childrenRoute || [];
});

const guestStore = useGuestStore();

watchImmediate(
  () => route.path,
  () => {
    if (route?.matched?.length) {
      const list: NavItemType[] = newsNav
        .filter((e) => e.label === '首頁')
        .concat({
          label: '會員中心',
          value: '/member'
        });

      if (route.name !== 'member') {
        const subItem = route?.matched?.[1];
        list.push({
          label: (subItem?.meta?.title as string) || '',
          value: ''
        });
      }
      guestStore.SET_BREADCRUMB_NAV(list);
    }
  }
);

onUnmounted(() => {
  guestStore.SET_BREADCRUMB_NAV([]);
});
</script>
<style lang="scss" scoped>
.sub-nav {
  margin-right: -12px;
  margin-left: -12px;
  height: 0;
  border-bottom: 1px solid transparent;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  &.expand {
    height: 53px;
    border-bottom: 1px solid $blue-100;
    opacity: 1;
  }
}

@include media-breakpoint-down(sm) {
  .sub-nav a {
    flex: 1 1 0;
  }
}
</style>
