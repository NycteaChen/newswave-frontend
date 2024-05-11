<template>
  <footer class="mt-3 bg-primary-gradient text-primary-white py-3">
    <div class="container row mx-auto text-center text-md-start gx-5 py-3">
      <section class="footer-desc col-12 text-blue-400 col-md-6 fs-sm">
        <n-logo
          logo-type="light"
          class="mx-auto mx-md-0"
        />
        <img
          class="wave-logo"
          :src="requireImage('icon/wave.svg')"
        />
        <p>© 2024 NewsWave 專題使用</p>
        <cite class="fst-normal">
          Illustration by
          <a
            class="footer-link"
            href="https://www.behance.net/STRELKAX"
          >
            Julia K
          </a>
          from
          <a
            class="footer-link"
            href="https://icons8.com/illustrations"
          >
            Ouch
          </a>
          !
        </cite>
      </section>

      <nav class="footer-nav col-12 col-md-6 row g-3 mx-auto g-md-0">
        <section
          v-for="item in footerNav"
          :key="item.navTitle"
          class="text-blue-400"
          :class="
            item.type === 'socialMedia'
              ? 'col-12 follow-us col-xl-4'
              : 'col-6 col-xl-4 pe-4'
          "
        >
          <h5 class="mb-3">{{ item.navTitle }}</h5>
          <ul
            class="navbar-nav"
            :class="{
              'flex-row justify-content-center justify-content-md-start':
                item.type === 'socialMedia'
            }"
          >
            <li
              v-for="(link, index) in item.linkList"
              :key="link.title"
              class="mt-2"
              :class="{
                'ms-2': item.type === 'socialMedia' && index,
                'social-media-item': item.type === 'socialMedia'
              }"
            >
              <nuxt-link
                :to="link.path"
                class="text-primary-white"
                :target="item.type === 'socialMedia' ? '_blank' : ''"
                :style="
                  item.type === 'socialMedia'
                    ? renderSocialMedia(link.title)
                    : {}
                "
              >
                <template v-if="item.type !== 'socialMedia'">
                  {{ link.title }}
                </template>
              </nuxt-link>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  </footer>
</template>
<script setup lang="ts">
const footerNav = [
  {
    navTitle: '認識我們',
    linkList: [
      {
        title: '關於本站',
        path: '/about'
      },
      {
        title: '理念價值',
        path: '/core-value'
      },
      {
        title: '服務條款',
        path: '/terms-of-service'
      },
      {
        title: '隱私權政策',
        path: '/privacy-policy'
      }
    ]
  },
  {
    navTitle: '幫助',
    linkList: [
      {
        title: '常見問題集',
        path: '/questions'
      },
      {
        title: '聯絡我們',
        path: '/contact-us'
      }
    ]
  },
  {
    navTitle: '追蹤我們',
    type: 'socialMedia',
    linkList: [
      {
        title: 'facebook',
        path: '#'
      },
      {
        title: 'instagram',
        path: '#'
      },
      {
        title: 'line',
        path: '#'
      }
    ]
  }
];

const renderSocialMedia = (type: string) => ({
  backgroundImage: `url(${requireImage(`icon/${type}.svg`)})`
});
</script>
<style lang="scss" scoped>
.footer-desc {
  font-size: $font-size-sm;
}

.footer-link {
  color: $blue-400;
  text-decoration: underline;
}

.wave-logo {
  margin-top: 32px;
  margin-bottom: 32px;
}

.social-media-item {
  width: 40px;
  height: 40px;
  border: 1px solid $border-color;
  border-radius: 50%;

  a {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
}

@include media-breakpoint-down(md) {
  .footer-nav {
    margin-top: 80px;
  }
}

@include media-breakpoint-down(xl) {
  .follow-us {
    margin-top: 80px;
  }
}

@include media-breakpoint-up(md) {
  .footer-nav {
    margin-top: 35px;
  }

  ::v-deep(.logo) {
    max-width: 415px;
    height: 63px;
  }
}
</style>
