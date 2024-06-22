<template>
  <img
    class="article-image"
    :src="articleData?.image || renderDefaultMagazineImage"
    :alt="articleData?.imageDescribe"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  articleData?: ArticleType;
}>();

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

const isMagazine = computed(() => props.articleData?.articleId?.startsWith('M-'));

const renderDefaultMagazineImage = computed(() =>
  isMagazine.value
    ? magazineCategoryList.value?.find((e) => props.articleData?.source?.name === e.categoryId)?.categoryImg || ''
    : ''
);
</script>
