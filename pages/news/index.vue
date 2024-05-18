<template>
  <div>
    <p>
      {{ $route.query.category }}
    </p>
    <p>新聞首頁 3-1</p>
    <nuxt-link
      v-for="item in newsArticleList"
      :key="item.label"
      :to="`/article/${item.label}/${articleId}`"
      ><div>{{ `${item.label}新聞文章` }}</div></nuxt-link
    >
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
  keepalive: true,
  middleware(to, from) {
    if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
      const { newsNav } = useNav();
      const fromIndex = newsNav.findIndex(
        (e) =>
          e.label === from.query.category ||
          (from.name === 'news' && !from.query.category) ||
          (e.value === '/magazine' && String(from.name)?.includes('magazine'))
      );
      const toIndex = newsNav.findIndex(
        (e) =>
          e.label === to.query.category ||
          (to.name === 'news' && !to.query.category) ||
          (e.value === '/magazine' && String(to.name)?.includes('magazine'))
      );
      // eslint-disable-next-line no-param-reassign
      to.meta.pageTransition.name = +toIndex > +fromIndex ? 'slide-left' : 'slide-right';
    }
  }
});

const articleId = ref<string>('N-87');

const route = useRoute();

const { newsNav } = useNav();

const newsArticleList = computed(() => {
  const list = newsNav.filter((e) => e.value !== '/magazine');
  if (route.query.category) {
    return list.filter((e) => e.label === route.query.category);
  }
  return list;
});
</script>
<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.2s;
  }

  .slide-left-enter-from {
    opacity: 0;
    transform: translate(50px, 0);
  }

  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-enter-from {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .slide-right-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
  }
}
</style>
