<template>
  <span
    class="badge bg-transparent fw-bold"
    :class="isNewsArticle ? 'news-label' : 'magazine-label'"
  >
    {{ text }}
  </span>
</template>
<script lang="ts" setup>
interface ArticleLabelProps {
  text: string;
  articleId?: ArticleType['articleId'];
}

const props = withDefaults(defineProps<ArticleLabelProps>(), {
  text: '',
  articleId: 'N-'
});

const isNewsArticle = computed(() => props.articleId?.startsWith('N-'));
</script>
<style lang="scss" scoped>
.badge {
  padding: 5px 10px;
  border: 1px solid transparent;

  &.news-label {
    border-color: $primary;
    color: $primary;
  }

  &.magazine-label {
    border-color: $success;
    color: $success;
  }
}
</style>
