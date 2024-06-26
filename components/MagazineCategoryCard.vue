<template>
  <nuxt-link
    class="magazine-category-card d-block card text-start text-body-white position-relative"
    :to="`/magazine/${categoryData.categoryId}`"
  >
    <n-image
      :img-src="categoryData.categoryImg"
      class="card-img object-fit-cover"
      :alt="categoryData.categoryDescribe"
    />
    <div class="card-img-overlay">
      <h4 class="card-title whitespace-nowrap">{{ categoryData.categoryName }}</h4>
      <p
        class="card-text"
        :class="{ 'limit-line-four': isPc && $route.name === 'magazine' }"
      >
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

const isPc = inject('isPc');
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
  .card-title {
    position: absolute;
    top: 32px;
    left: 32px;
    transition: all 0.3s ease-in-out;
    transform: translate(0, 0);
  }

  .card-text {
    opacity: 1;
    transition: all 0.3s ease-in-out;
    transform: translateY(41px);
  }

  .magazine-category-card {
    margin: 0 16px;

    &:not(:hover) {
      .card-title {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .card-text {
        opacity: 0;
        transform: translateY(80%);
      }
    }
  }
}
</style>
