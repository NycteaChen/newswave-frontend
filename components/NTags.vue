<template>
  <div
    class="tag"
    :class="{ 'bg-red': props.type === 'hot' }"
  >
    <div class="height d-flex align-items-center">
      <img
        :src="requireImage(imagePath)"
        :alt="tagName"
      />
      <span class="fw-bold">{{ tagName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface NTagsProps {
  type: string;
}
const props = withDefaults(defineProps<NTagsProps>(), {
  type: ''
});

const imagePath = computed(() => (props.type === 'hot' ? 'icon/tag-hot.svg' : 'icon/tag-news.svg'));
const tagName = computed(() => (props.type === 'hot' ? 'HOT' : 'NEW'));
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
