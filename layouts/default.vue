<template>
  <main class="default-layout container-xxl">
    <div
      class="pt-md-4"
      :class="isArticlePage ? 'article-padding-top' : 'pt-3'"
    >
      <client-only>
        <div class="d-flex flex-wrap gap-1 align-items-center justify-content-between">
          <n-breadcrumb class="mb-2" />
          <div id="shareCollect" />
        </div>
      </client-only>
      <div class="row flex-column flex-lg-row align-items-start">
        <section
          v-if="showAsideInfo || ($route?.name === 'magazine' && !$route.params?.category)"
          ref="pageRef"
          v-touch:swipe.left="swiperHeader"
          v-touch:swipe.right="swiperHeader"
          v-touch:press="pressHandler"
          v-touch:release="releaseHandler"
          class="page-container col-12"
          :class="{ 'col-lg-9 ': showAsideInfo }"
          :style="transformStyle"
        >
          <slot />
        </section>
        <section
          v-else
          class="col-12"
        >
          <slot />
        </section>

        <aside
          v-if="showAsideInfo"
          class="d-flex flex-column gap-3 flex-lg-column-reverse col-12 col-lg-3"
        >
          <news-aside-info />
          <weather-report />
        </aside>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
const pageRef = ref<HTMLElement | null>(null);
const swiperRef = useSwipe(pageRef);

const isMobile = inject<any>('isMobile');

const route = useRoute();

const { newsNav } = useNav();

const isArticlePage = computed(() => String(route.name) === 'article-category-articleId');

const showAsideInfo = computed(
  () => String(route.name) === 'news' || String(route.name) === 'search' || isArticlePage.value
);

const hasTouchEvent = computed(() => {
  switch (String(route.name)) {
    case 'news':
    case 'magazine':
      return isMobile.value;
    default:
      return false;
  }
});

const currentTab = computed(() => {
  switch (route.name) {
    case 'news':
      return newsNav.find((e) => (route.query.category ? e.label === route.query.category : e.value === '/news'))
        ?.label;
    case 'magazine':
      return newsNav.find((e) => e.value === '/magazine')?.label;
    default:
      return '';
  }
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
  if (!hasTouchEvent.value) return;
  isPress.value = true;
};

const releaseHandler = () => {
  if (!hasTouchEvent.value) return;
  setTimeout(() => {
    isPress.value = false;
  }, 100);
};

const swiperHeader = (direction: string) => {
  if (!hasTouchEvent.value) return;
  if (direction === 'left') {
    navigateTo(swiperRoute.value.next);
  } else {
    navigateTo(swiperRoute.value.prev);
  }
};

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

watchImmediate([() => route.fullPath, () => magazineCategoryList.value], () => {
  if (isArticlePage.value) return;

  guestStore.SET_BREADCRUMB_NAV(renderBreadcrumb());
});

onUnmounted(() => {
  guestStore.SET_BREADCRUMB_NAV([]);
});
</script>
<style lang="scss" scoped>
.page-container {
  transition: transform 0.1s ease-out;
}

.article-padding-top {
  padding-top: 11px;
}
</style>
