<template>
  <header
    class="home-header fixed-top w-100 z-3"
    :class="{ 'bg-primary-gradient': isNavExpanded }"
  >
    <nav class="navbar navbar-expand-md bg-primary-gradient">
      <div class="container-fluid px-3 px-md-5">
        <n-logo logo-type="light" />
        <button
          ref="toggleBtnRef"
          class="navbar-toggler ms-2 p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleHandler"
        >
          <img
            class="navbar-toggler-icon"
            :class="buttonIconType"
            :src="requireImage(`icon/${buttonIconType}.svg`)"
            alt="expand-icon"
          />
        </button>
        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse mt-3 mt-md-0"
        >
          <ul class="navbar-nav px-2 px-md-0 me-auto ms-md-4">
            <li
              v-for="(item, index) in homeNav"
              :key="item.title"
              class="nav-item px-4 pt-3 pb-2 fs-5"
              :class="{ 'mt-2 mt-md-0 ms-md-2': index }"
              @click="mask.emit(false)"
            >
              <nuxt-link
                class="text-primary-white"
                :to="item.path"
                >{{ item.title }}
              </nuxt-link>
            </li>
            <li
              class="go-use-btn-container d-md-flex ms-md-auto"
              @click="mask.emit(false)"
            >
              <go-use-button />
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
    path: '#'
  }
];

const mask = useEventBus('mask');

const toggleBtnRef = ref<any>('');
const buttonIconType = ref<'expand' | 'close'>('expand');

const isNavExpanded = computed(() => buttonIconType.value === 'close');

const toggleHandler = () => {
  buttonIconType.value =
    toggleBtnRef.value?.ariaExpanded === 'true' ? 'close' : 'expand';
  mask.emit(toggleBtnRef.value?.ariaExpanded === 'true');
};

const isMobile = inject<any>('isMobile');

watchEffect(() => {
  if (!isMobile.value) {
    mask.emit(false);
  } else {
    mask.emit(isNavExpanded.value);
  }
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
    height: 78px;

    .navbar {
      padding-top: 12px;
      padding-bottom: 12px;

      .navbar-nav {
        width: 100%;

        li {
          white-space: nowrap;
        }

        .go-use-btn-container {
          align-items: center;
        }
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .navbar-nav {
    padding-top: 40px;
    padding-bottom: 40px;

    .go-use-btn-container {
      margin-top: 40px;
    }
  }
}
</style>
