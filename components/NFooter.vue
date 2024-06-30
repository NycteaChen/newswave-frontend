<template>
  <footer
    class="n-footer bg-primary-gradient text-body-white"
    :class="$route.name === 'index' ? 'pt-3' : 'pt-64'"
  >
    <div class="container-xxl row mx-auto text-center text-md-start gx-5 py-3">
      <section class="footer-desc col-12 text-blue-400 col-md-6 fs-sm">
        <n-logo
          logo-type="light"
          class="mx-auto mx-md-0"
        />
        <wave-icon />
        <p>© 2024 NewsWave 專題使用</p>
        <cite class="fst-normal">
          Illustration by
          <a
            v-for="author in illustrationAuthorList"
            :key="author.name"
            target="_blank"
            class="footer-link is-btn px-1"
            :href="author.link"
          >
            {{ author.name }}
          </a>
          from
          <a
            target="_blank"
            class="footer-link is-btn"
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
          :class="item.type === 'socialMedia' ? 'col-12 follow-us col-xl-4' : 'col-6 col-xl-4 pe-4'"
        >
          <h5 class="mb-3">{{ item.navTitle }}</h5>
          <ul
            class="navbar-nav"
            :class="{
              'flex-row justify-content-center justify-content-md-start': item.type === 'socialMedia'
            }"
          >
            <li
              v-for="(link, index) in item.linkList"
              :key="link.title"
              class="mt-2"
              :class="{
                'ms-2': item.type === 'socialMedia' && index,
                'social-media-item rounded-circle': item.type === 'socialMedia'
              }"
            >
              <nuxt-link
                :to="link.path"
                class="text-body-white is-btn"
                :class="{
                  'w-100 h-100 d-flex justify-content-center align-items-center ': item.type === 'socialMedia'
                }"
                :target="item.target || ''"
              >
                <svg-icon
                  v-if="item.type === 'socialMedia'"
                  :name="`link-${link.title}`"
                  class="fill-body-white link-icon"
                />
                <template v-else>{{ link.title }}</template>
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
        title: '關於我們',
        path: '/about'
      },
      {
        title: 'NewsWave 介紹',
        path: '/'
      },
      {
        title: '方案介紹',
        path: '/subscription-plan'
      },
      {
        title: '服務條款',
        path: '/policy/terms-of-service'
      },
      {
        title: '隱私權政策',
        path: '/policy/privacy-policy'
      }
    ]
  },
  {
    navTitle: '幫助',
    linkList: [
      {
        title: '常見問題集',
        path: '/faq'
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
    target: '_blank',
    linkList: [
      {
        title: 'facebook',
        path: 'https://www.facebook.com/hexschool/?locale=zh_TW'
      },
      {
        title: 'instagram',
        path: 'https://www.instagram.com/hexschool/'
      },
      {
        title: 'github',
        path: 'https://github.com/NycteaChen/newswave-frontend'
      }
    ]
  }
];

const illustrationAuthorList = [
  {
    name: 'Dani Grapevine',
    link: 'https://icons8.com/illustrations/author/JTmm71Rqvb2T'
  },
  {
    name: 'Julia K',
    link: 'https://icons8.com/illustrations/author/mNCLibjicqSz'
  },
  {
    name: 'Polina M.',
    link: 'https://icons8.com/illustrations/author/Go8GMpKPAq1W'
  }
];
</script>
<style lang="scss" scoped>
.pt-64 {
  padding-top: 64px;
}

.n-footer {
  padding-bottom: 80px;

  ::v-deep(.wave-icon) {
    margin-top: 32px;
    margin-bottom: 32px;
    stroke: $blue-400;
  }
}

.footer-desc {
  font-size: $font-size-sm;
}

.footer-link {
  color: $blue-400;
  text-decoration: underline;
}

.social-media-item {
  width: 40px;
  height: 40px;
  border: 1px solid $border-color;

  a {
    .link-icon {
      width: 16px;
      height: 16px;
    }
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

  ::v-deep(.n-logo) {
    max-width: 415px;
    height: 63px;
  }
}
</style>
