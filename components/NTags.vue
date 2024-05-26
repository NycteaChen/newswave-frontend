<template>
  <div
    class="tag"
    :class="{ 'bg-red': props.type === 'HOT' }"
  >
    <div class="height d-flex align-items-center">
      <img
        :src="requireImage(imagePath)"
        :alt="props.type"
      />
      <span class="fw-bold">{{ props.type }}</span>
    </div>
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
.tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #b4deea;
  color: #2f5862;
  font-size: 16px;

  img {
    margin-right: 8px;
    max-width: 24px;
  }

  .height {
    height: 24px;
  }

  &.bg-red {
    background-color: $red-300;
    color: #9d3632;
  }
}
</style>
