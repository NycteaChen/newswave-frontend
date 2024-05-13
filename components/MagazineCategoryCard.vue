<template>
  <nuxt-link
    class="magazine-category-card d-block card text-start text-body-white"
    :to="`/magazine/${categoryData.categoryName}`"
  >
    <img
      :src="categoryData.categoryImg"
      class="card-img h-100 object-fit-cover"
      :alt="categoryData.categoryDescribe"
    />
    <div class="card-img-overlay">
      <h4 class="card-title">{{ categoryData.categoryName }}</h4>
      <p class="card-text">
        {{ categoryData.categoryDescribe }}
      </p>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
interface NewsCardProps {
  categoryData: any;
}

withDefaults(defineProps<NewsCardProps>(), {
  categoryData: () => {}
});
</script>
<style lang="scss" scoped>
%transition-duration {
  transition: all 0.3s ease-in-out;
}

.magazine-category-card {
  @extend %transition-duration;

  height: 320px;
  border: 1px solid $blue-400;

  .card-img-overlay {
    @extend %transition-duration;

    padding: 32px;
    background: rgba($dark, 0.6);
  }

  &:hover {
    border-color: $blue-100;

    .card-img-overlay {
      background: rgba($blue-700, 0.9);
    }
  }
}

@include media-breakpoint-up(lg) {
  .magazine-category-card {
    height: 435px;
  }
}

@include media-breakpoint-down(md) {
  .card-text {
    font-size: $font-size-sm;
  }
}

@include media-breakpoint-up(xl) {
  .magazine-category-card {
    margin: 0 16px;
  }
}
</style>
