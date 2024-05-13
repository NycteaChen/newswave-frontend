<template>
  <div
    class="position-relative"
    :class="`n-swiper-${mode}`"
  >
    <div
      class="customize-swiper-button swiper-button-next"
      @click="slideNext"
    />
    <div
      class="customize-swiper-button swiper-button-prev"
      @click="slidePrev"
    />
    <swiper
      ref="swiperRef"
      class="n-swiper"
      :modules="[SwiperNavigation, SwiperPagination]"
      :loop="isMobile || swiperList.length > 5"
      :pagination="true"
      :navigation="true"
      :centered-slides="isMobile"
      :breakpoints="breakpointsOption"
      @swiper="onSwiper"
      @slide-change="slideChange"
    >
      <swiper-slide
        v-for="(slide, index) in swiperList"
        :key="index"
      >
        <slot
          name="slide"
          :slide-item="slide"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts" setup>
interface NSwiperProps {
  swiperList?: any[];
  mode?: 'light' | 'dark';
}

withDefaults(defineProps<NSwiperProps>(), {
  swiperList: () => [],
  mode: 'light'
});

const isMobile = inject<boolean>('isMobile');

const breakpointsOption = reactive({
  0: {
    slidesPerView: 1.2,
    spaceBetween: 24
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 24
  },
  1200: {
    slidesPerView: 3,
    spaceBetween: 8
  }
});

let nSwiper: any = null;
const onSwiper = (swiper: any) => {
  nSwiper = swiper;
};

const slideChange = (swiper: any) => {
  nSwiper = swiper;
};

const slideNext = () => {
  nSwiper?.slideNext();
};
const slidePrev = () => {
  nSwiper?.slidePrev();
};
</script>
<style lang="scss" scoped>
.n-swiper {
  padding-top: 40px;
  padding-bottom: 144px;
}

.customize-swiper-button {
  display: none;
}

::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  top: unset;
  bottom: 40px;
  width: 52px;
  height: 80px;
  border: 1px solid transparent;
  border-radius: 50rem;

  &::after,
  &::before {
    font-weight: 900;
    font-size: 32px;
  }
}

::v-deep(.swiper-pagination) {
  z-index: unset;
}

::v-deep(.swiper-pagination-bullets) {
  bottom: 68px;

  .swiper-pagination-bullet {
    transition: all 0.2s ease-in-out;
  }

  .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
    background: $blue-300;
  }

  .swiper-pagination-bullet-active {
    width: 24px;
    border-radius: 8px;
  }
}

.n-swiper-light {
  ::v-deep(.swiper-pagination-bullet-active) {
    background: $primary;
  }

  ::v-deep(.swiper-button-prev),
  ::v-deep(.swiper-button-next) {
    border-color: $gray-300;

    &::after,
    &::before {
      color: $primary;
    }
  }
}

.n-swiper-dark {
  ::v-deep(.swiper-pagination-bullet-active) {
    background: $gray-100;
  }

  ::v-deep(.swiper-button-prev),
  ::v-deep(.swiper-button-next) {
    border-color: $blue-400;

    &::after,
    &::before {
      color: $gray-100;
    }
  }
}

@include media-breakpoint-up(md) {
  .n-swiper {
    padding-top: 80px;
  }
}

@include media-breakpoint-up(xl) {
  .n-swiper {
    padding-bottom: 152px;
  }
}

@media screen and (width >= 1500px) {
  .n-swiper {
    margin-right: 64px;
    margin-left: 64px;

    ::v-deep(.swiper-button-prev),
    ::v-deep(.swiper-button-next) {
      display: none;
    }
  }

  .customize-swiper-button {
    top: 263px;
    bottom: unset;
    display: flex;

    &.swiper-button-prev {
      left: 0;
    }

    &.swiper-button-next {
      right: 0;
    }
  }
}
</style>
