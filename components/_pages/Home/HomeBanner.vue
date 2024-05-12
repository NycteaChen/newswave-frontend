<template>
  <section class="home-banner">
    <div class="position-relative">
      <div class="banner-container container">
        <div
          class="position-relative z-1 w-100 row flex-nowrap flex-column flex-md-row-reverse align-items-center mx-auto"
        >
          <img
            class="banner-img mx-auto mx-md-0 col col-md-6"
            :src="requireImage('home/banner.png')"
          />
          <div
            class="slogan-area position-relative z-1 text-center mt-3 text-md-start mt-md-0 col col-md-6 flex-md-fill"
          >
            <div class="slogan text-body-white position-relative z-1">
              <h1>NewsWave</h1>
              <h1>將您推向世界脈動</h1>
            </div>
            <go-use-button class="position-relative z-1" />
          </div>
        </div>
      </div>
      <img
        class="wave-img"
        :src="requireImage(`home/wave-1.svg`)"
      />
    </div>
  </section>
</template>
<style lang="scss" scoped>
%circle {
  position: absolute;
  border-radius: 50%;
  background: $blue-700;
}

.home-banner {
  overflow: hidden;

  &::before {
    @extend %circle;

    right: -187px;
    bottom: -187px;
    width: 375px;
    height: 375px;
    content: '';
  }

  &::after {
    @extend %circle;
  }
}

.banner {
  &-container {
    padding-bottom: 128px;
  }

  &-img {
    max-width: 375px;
    width: 100%;
  }
}

.slogan {
  margin-bottom: 40px;
  font-size: 28px;

  &-area::after {
    @extend %circle;
  }

  @media screen and (width >= 375px) {
    white-space: nowrap;
    font-size: 40px;
  }
}

@include media-breakpoint-down(md) {
  .home-banner {
    position: relative;

    &::after {
      bottom: 118px;
      left: -134px;
      width: 324px;
      height: 324px;
      content: '';
    }
  }
}

@include media-breakpoint-up(md) {
  .slogan {
    margin-bottom: 64px;

    &-area::after {
      top: 8px;
      left: -162px;
      width: 216px;
      height: 216px;
      content: '';
    }
  }

  .home-banner {
    &::before {
      top: -300px;
      right: -300px;
      width: 600px;
      height: 600px;
    }
  }

  .banner-container {
    padding-bottom: 30px;
  }
}

@include media-breakpoint-up(xl) {
  .home-banner {
    &::before {
      top: -400px;
      right: -400px;
      width: 800px;
      height: 800px;
    }
  }

  .banner-img {
    max-width: 562px;
  }

  .slogan {
    margin-bottom: 64px;

    &-area::after {
      top: -62px;
      width: 324px;
      height: 324px;
    }
  }
}

@include media-breakpoint-up(xxl) {
  .banner-img {
    max-width: 746px;
  }
}
</style>
