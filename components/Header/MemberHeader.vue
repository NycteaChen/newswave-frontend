<template>
  <header class="member-center">
    <n-logo />
    <div>Member Center header</div>
    <nav>
      <section>
        <nuxt-link
          v-for="item in memberNav"
          :key="item.title"
          class="me-2"
          :to="{ name: `${item?.childrenRoute?.[0]?.routeName || 'member'}` }"
        >
          {{ item.title }}
        </nuxt-link>
      </section>
      <section>
        <nuxt-link
          v-for="subItem in currentChildrenRoute"
          :key="subItem.title"
          class="me-2"
          :to="{ name: subItem.routeName }"
        >
          {{ subItem.title }}
        </nuxt-link>
      </section>
    </nav>
  </header>
</template>
<script setup lang="ts">
const { memberNav, memberSubNav } = useNav();
const route = useRoute();

const currentChildrenRoute = computed(() => {
  if (String(route.name) === 'member') return [];
  return (
    memberSubNav?.find((e) => String(route.name).includes(e.routeName))
      ?.childrenRoute || []
  );
});
</script>
