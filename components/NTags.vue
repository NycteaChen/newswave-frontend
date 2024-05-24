<template>
  <div class="image-tag">
    <img
      :src="requireImage(imagePath)"
      :alt="props.type"
    />
    <span class="fw-bold">{{ props.type }}</span>
  </div>
</template>
<script setup lang="ts">
export interface NTagsProps {
  type: 'HOT' | 'NEWS';
}
const props: NTagsProps = {
  type: 'NEWS'
};
const imagePath = computed(() => (props.type === 'HOT' ? 'icon/tag-hot.svg' : 'icon/tag-news.svg'));
</script>
<style lang="scss" scoped>
.image-tag {
  position: absolute;
  top: 16px; /* Adjust as needed */
  left: 16px; /* Adjust as needed */
  padding: 8px 12px;
  max-width: 105px;
  background-color: #b4deea;
  color: #2f5862;
  font-size: 16px;

  img {
    margin-right: 8px;
    max-width: 24px;
    height: 24px;
  }

  span {
    width: 49px;
    height: 24px;
  }
}
</style>
