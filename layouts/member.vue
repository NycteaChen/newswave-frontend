<template>
  <main class="member-layout container-xxl">
    <client-only>
      <nav v-if="!isMobile && currentChildrenRoute.length">
        <nuxt-link
          v-for="subItem in currentChildrenRoute"
          :key="subItem.label"
          class="me-2"
          :to="{ name: subItem.value }"
        >
          {{ subItem.label }}
        </nuxt-link>
      </nav>
      <div class="pt-3 pt-md-4">
        <slot />
      </div>
    </client-only>
  </main>
</template>

<script lang="ts" setup>
const isMobile = inject('isMobile');

const { memberSubNav } = useNav();
const route = useRoute();

const currentChildrenRoute = computed(() => {
  if (String(route.name) === 'member') return [];
  return memberSubNav?.find((e) => String(route.name)?.includes(e.value))?.childrenRoute || [];
});
</script>
