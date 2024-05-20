<template>
  <main class="default-layout container-xxl">
    <div class="pt-3 pt-md-4">
      <section
        v-if="$route.path?.startsWith('/news') || ($route?.name === 'magazine' && !$route.params?.category)"
        ref="pageRef"
        v-touch:swipe.left="swiperHeader"
        v-touch:swipe.right="swiperHeader"
        v-touch:press="pressHandler"
        v-touch:release="releaseHandler"
        class="page-container"
        :style="transformStyle"
      >
        <slot />
      </section>
      <section v-else>
        <slot />
      </section>
      <news-aside-info v-if="$route.path?.startsWith('/news')" />
    </div>
  </main>
</template>

<script lang="ts" setup>
const pageRef = ref<HTMLElement | null>(null);
const swiperRef = useSwipe(pageRef);

const isMobile = inject<any>('isMobile');

const route = useRoute();

const { newsNav } = useNav();

const currentTab = computed(() => {
  if (route.name === 'news' && !route.query.category) {
    return newsNav.find((e) => e.value === '/news')?.label;
  }
  if (route.name === 'news' && route.query.category) {
    return newsNav.find((e) => e.label === route.query.category)?.label;
  }
  if (route.name === 'magazine') {
    return newsNav.find((e) => e.value === '/magazine')?.label;
  }
  return '';
});

const swiperRoute = computed(() => {
  const index = newsNav.findIndex((e) => e.label === currentTab.value);
  const prev = newsNav[index - 1]?.value || newsNav[0]?.value;
  const next = newsNav[index + 1]?.value || newsNav[newsNav.length - 1]?.value;

  return { prev, next };
});

const isPress = ref<boolean>(false);
const transformStyle = computed(() => ({
  transform: isPress.value ? `translateX(${swiperRef.coordsEnd.x - swiperRef.coordsStart.x}px)` : ''
}));

const pressHandler = () => {
  if (!isMobile.value) return;
  isPress.value = true;
};

const releaseHandler = () => {
  if (!isMobile.value) return;
  setTimeout(() => {
    isPress.value = false;
  }, 100);
};

const swiperHeader = (direction: string) => {
  if (!isMobile.value) return;
  if (direction === 'left') {
    navigateTo(swiperRoute.value.next);
  } else {
    navigateTo(swiperRoute.value.prev);
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  transition: transform 0.1s ease-out;
}
</style>
