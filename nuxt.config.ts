// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  typescript: {
    typeCheck: true
  },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/stylelint-module', '@pinia/nuxt', '@vueuse/nuxt'],
  stylelint: {
    lintOnStart: false, // 專案啟動時不自動檢查所有相關檔案
    chokidar: true // 監聽文件異動進行檢核（文件未列出此選項）
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**']
  }
});
