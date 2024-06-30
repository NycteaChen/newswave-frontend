<template>
  <header
    class="home-header fixed-top w-100 z-header"
    :class="{ 'bg-primary-gradient': isNavExpanded }"
  >
    <nav
      class="navbar navbar-expand-md position-relative bg-md-transparent"
      :class="[isPcScrollDown ? 'scroll-down' : 'bg-primary-gradient', { 'is-expand': isNavExpanded }]"
    >
      <div class="container-fluid px-3 px-xl-5 position-relative z-1">
        <n-logo logo-type="light" />
        <button
          ref="toggleBtnRef"
          class="navbar-toggler ms-2 p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#homeNavbarContent"
          aria-controls="homeNavbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleHandler"
        >
          <svg-icon
            :name="buttonIconType"
            :class="buttonIconType"
            class="navbar-toggler-icon fill-body-white"
            style="background-image: none"
          />
        </button>
        <div
          id="homeNavbarContent"
          class="collapse navbar-collapse mt-3 mt-md-0"
        >
          <ul class="navbar-nav px-2 px-md-0 me-auto ms-md-4">
            <li
              v-for="(item, index) in homeNav"
              :key="item.title"
              class="nav-item px-4 pt-3 pb-2 fs-5"
              :class="{ 'mt-2 mt-md-0 ms-md-2': index }"
            >
              <nuxt-link
                v-if="item.path"
                class="text-body-white fs-5 is-btn"
                :to="item.path"
                @click="maskBus.emit(false)"
                >{{ item.title }}
              </nuxt-link>
              <span
                v-else
                class="is-btn text-body-white fs-5 is-btn"
                @click="goToPlan"
              >
                {{ item.title }}</span
              >
            </li>
            <li
              class="go-use-btn-container d-md-flex ms-md-auto"
              @click="maskBus.emit(false)"
            >
              <go-use-button
                color="light"
                type="outline"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const homeNav = [
  {
    title: '關於我們',
    path: '/about'
  },
  {
    title: '方案介紹',
    path: ''
  }
];

const maskBus = useEventBus('maskBus');

const toggleBtnRef = ref<any>('');
const buttonIconType = ref<'expand' | 'close'>('expand');

const isNavExpanded = computed(() => buttonIconType.value === 'close');

const toggleHandler = () => {
  buttonIconType.value = toggleBtnRef.value?.ariaExpanded === 'true' ? 'close' : 'expand';
  maskBus.emit(toggleBtnRef.value?.ariaExpanded === 'true');
};

const isMobile = inject<any>('isMobile');

watchEffect(() => {
  if (!isMobile.value) {
    maskBus.emit(false);
  } else {
    maskBus.emit(isNavExpanded.value);
  }
});

const scrollY = inject<any>('scrollY');
const isPcScrollDown = ref<boolean>(false);

const { $bs }: any = useNuxtApp();

const goToPlan = () => {
  if (isMobile.value) {
    const collapse = new $bs.Collapse('#homeNavbarContent');
    collapse.hide();
    toggleHandler();
  }

  const plusIntroRef: HTMLElement | null = document.querySelector('#plusIntro');
  smoothScrollTo(plusIntroRef?.offsetTop || 0);
};

onMounted(() => {
  isPcScrollDown.value = !isMobile.value && scrollY.value > 30;
});

watch([() => scrollY.value, () => isMobile.value], (val) => {
  isPcScrollDown.value = !val[1] && val[0] > 30;
});
</script>
<style lang="scss" scoped>
.navbar-toggler {
  border: 0;
  box-shadow: none;
}

.navbar-toggler-icon {
  height: 24px;

  &.expand {
    width: 27px;
  }

  &.close {
    width: 15px;
  }
}

@include media-breakpoint-up(md) {
  .home-header {
    .navbar {
      padding-top: 12px;
      padding-bottom: 12px;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(90deg, $blue-800 0%, $primary 100%);
        content: '';
        opacity: 0;
        transition: all 0.1s linear;
      }

      &.scroll-down::after {
        opacity: 1;
      }

      .navbar-nav {
        width: 100%;

        li {
          white-space: nowrap;
        }

        .go-use-btn-container {
          align-items: center;

          ::v-deep(.n-button) {
            min-width: 192px;
          }
        }
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .navbar.is-expand::after {
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background-image: url('@/assets/image/header/bottom-wave.svg');
    background-size: cover;
    content: '';
  }

  .navbar-nav {
    padding-top: 40px;
    padding-bottom: 40px;

    .go-use-btn-container {
      margin-top: 40px;
    }
  }
}
</style>
