<template>
  <main class="member-layout container-xxl">
    <client-only>
      <nav
        v-if="!isMobile"
        class="mb-md-3"
      >
        <n-tabs
          v-model:currentTab="currentTab"
          :tab-list="memberNav"
          @change-tab="changeTab"
        />
        <nuxt-link
          v-for="subItem in currentChildrenRoute"
          :key="subItem.label"
          class="me-2"
          :to="{ name: subItem.value }"
        >
          {{ subItem.label }}
        </nuxt-link>
      </nav>
      <div class="pt-2">
        <slot />
      </div>
    </client-only>
  </main>
</template>

<script lang="ts" setup>
import type { TabItemType } from '@/components/NTabs.vue';

const isMobile = inject('isMobile');

const { memberNav, memberSubNav } = useNav();
const route = useRoute();

const currentChildrenRoute = computed(() => {
  if (String(route.name) === 'member') return [];
  return memberSubNav?.find((e) => String(route.name)?.includes(e.value))?.childrenRoute || [];
});

const currentTab = ref<TabItemType['label']>('');
const changeTab = (tabItem: any) => {
  if (tabItem.children) {
    navigateTo({ name: tabItem.children });
  } else {
    navigateTo({ name: `${tabItem?.childrenRoute?.[0]?.value || 'member'}` });
  }
};

watchEffect(() => {
  currentTab.value = memberSubNav.find((e) => String(route.name)?.includes(e.value))?.label || '會員中心';
});
</script>
