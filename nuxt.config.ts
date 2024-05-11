// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: 'NewsWave',
      htmlAttrs: {
        lang: 'zh-Hant'
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description',
          content:
            'NewsWave 是一個專注於提供無干擾新聞閱讀體驗的應用程式。無論您是尋找國際新聞、財經資訊、科技趨勢還是娛樂八卦，NewsWave 都能讓您輕鬆快速地瀏覽最新動態，專注於真正重要的內容。'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'NewsWave'
        },
        {
          property: 'og:locale',
          content: 'zh_TW'
        }
      ]
    }
  },
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      autoprefixer: true
    }
  },
  vite: {
    build: { assetsInlineLimit: 0 },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "bootstrap/scss/functions";
            @import "~/assets/scss/config/_variables.scss";
            @import "bootstrap/scss/mixins";
          `
        }
      }
    }
  },
  typescript: {
    typeCheck: true
  },
  modules: [
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt'
  ],
  stylelint: {
    lintOnStart: false, // 專案啟動時不自動檢查所有相關檔案
    chokidar: true // 監聽文件異動進行檢核（文件未列出此選項）
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**']
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
      'types/*.ts',
      'types/**/*.ts'
    ]
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  }
});
