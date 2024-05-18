<template>
  <n-accordion
    class="plan-faq text-start mx-auto"
    :accordion-list="list"
  />
</template>
<script setup lang="ts">
import type { AccordionItem } from '@/components/NAccordion.vue';

const list = ref<AccordionItem[]>([
  {
    title: 'NewsWave Plus 是什麼？',
    content:
      'NewsWave Plus 是NewsWave 提供的訂閱服務，一個月最多只要 100 元，便能專享限定的雜誌內容，豐富您的閱讀生活。'
  },
  {
    title: '可以在 NewsWave Plus 觀看什麼內容？',
    content:
      'NewsWave Plus 擁有各大雜誌商精選文章，主題超過 10 種以上，包括科技、娛樂、文藝、健康、時尚等熱門話題，隨時隨地盡情閱讀。'
  },
  {
    title: 'NewsWave Plus 如何計費？',
    content:
      '只要支付一筆固定月費，就能用您的行動裝置、電腦觀看 NewsWave Plus 提供的各大雜誌文章，各方案介於每月 80 元至 100 元，無額外費用。'
  },
  {
    title: '如何取消訂閱？',
    content:
      'NewsWave Plus 提供取消續訂服務，只需點個兩下輕鬆操作即可取消訂閱，無取消費用。您可至會員中心的訂閱管理取消續訂，您的 NewsWave Plus 服務將持續至最新一筆訂單的期限為止，待訂單到期時，系統會自動停止對您的帳戶扣款。'
  }
]);
</script>
