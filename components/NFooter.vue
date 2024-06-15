<template>
  <footer class="n-footer bg-primary-gradient text-body-white pt-3">
    <div class="container-xxl row mx-auto text-center text-md-start gx-5 py-3">
      <section class="footer-desc col-12 text-blue-400 col-md-6 fs-sm">
        <n-logo
          logo-type="light"
          class="mx-auto mx-md-0"
        />
        <img
          class="wave-icon"
          :src="requireImage('icon/wave.svg')"
        />
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
                'social-media-item': item.type === 'socialMedia'
              }"
            >
              <nuxt-link
                :to="link.path"
                class="text-body-white is-btn"
                :class="{ 'link-text-hidden': item.type === 'socialMedia' }"
                :target="item.target || ''"
                :style="item.type === 'socialMedia' ? renderSocialMedia(link.title) : {}"
              >
                {{ link.title }}
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

const renderSocialMedia = (type: string) => ({
  backgroundImage: `url(${requireImage(`footer/${type}.svg`)})`
});
</script>
<style lang="scss" scoped>
.n-footer {
  padding-bottom: 80px;
}

.footer-desc {
  font-size: $font-size-sm;
}

.footer-link {
  color: $blue-400;
  text-decoration: underline;
}

.wave-icon {
  margin-top: 32px;
  margin-bottom: 32px;
  width: 36px;
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

  ::v-deep(.n-logo) {
    max-width: 415px;
    height: 63px;
  }
}
</style>
