<template>
  <section>
    <n-accordion
      class="announcement-list fw-bold"
      :accordion-list="list"
    />
  </section>
</template>
<script setup lang="ts">
import type { AccordionItem } from '@/components/NAccordion.vue';

definePageMeta({
  title: '通知中心 - 最新公告'
});

const list = ref<AccordionItem[]>([
  {
    title: 'NewsWave Plus 推出年度訂閱方案',
    content:
      '2024-09-01 \n\n' +
      '尊敬的NewsWave Plus用戶:\n' +
      '為回饋廣大用戶的支持，NewsWave現推出全新的年度訂閱方案。' +
      '新的年度訂閱價格為960元，相當於每月費用僅80元。與月付方案相比，年度訂閱可為您節省近20%的費用。' +
      '趕快行動吧，搶先訂閱NewsWave Plus年度方案，享受更多專享權益!'
  },
  {
    title: 'NewsWave 舉辦線上讀書會活動',
    content:
      '2024-06-01\n\n' +
      '親愛的用戶:\n' +
      '為了豐富您的閱讀生活，NewsWave 將於6月15日晚8點舉辦線上讀書會活動。屆時我們將邀請知名作家分享他們的創作經歷和心得，並與大家一起探討作品中的思想內涵。' +
      '本次活動免費參與，NewsWave Plus 訂閱用戶還可以獲得專屬福利。活動採用線上直播形式，您可以在家中輕鬆參與互動。\n' +
      '敬請關注NewsWave公告通知,我們將於活動前夕公佈更多詳細信息。期待與您一起探索閱讀的樂趣!'
  },
  {
    title: 'NewsWave 服務更新',
    content:
      '2024-03-26\n\n' +
      '尊敬的用戶:\n' +
      '為了提供更穩定、更有效率的服務,我們將進行系統維護。在此期間,可能會出現一些短暫的服務中斷或延遲。我們深感抱歉造成您的不便,同時也感謝您的理解和支持。\n\n' +
      '維護時間: 2024-03-27 14:00 至 2024-03-28 22:00\n' +
      '在維護完成期間，您可能無法存取 NewsWave 或遇到功能異常的情況。我們將加快維護工作，並確保盡快恢復正常服務。' +
      '感謝您的耐心等待和支持! 如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave Plus 用戶調查活動',
    content:
      '2024-04-20\n\n' +
      '尊敬的NewsWave Plus用戶:\n' +
      '為了更好地了解您的使用需求和意見反饋,NewsWave現正舉辦用戶調查活動。' +
      '參與本次調查的用戶,有機會獲得NewsWave Plus年度會員資格。\n' +
      '請您撥冗參與,您的寶貴意見將幫助我們更好地服務于您。'
  },
  {
    title: 'NewsWave 全新版上線！',
    content:
      '2024-03-24 \n\n親愛的用戶:\n我們很自豪地宣布，全新的NewsWave應用程式已經推出!\n作為一項致力於提供零廣告干預的免費新聞閱讀應用程序，我們不斷努力，讓您能夠輕鬆快速地獲取最新動態，專注於真正的全球重要內容。\n快來使用最新版NewsWave，讓我們一起探索海洋訊息，發現世界的精彩。'
  }
]);
</script>
<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .announcement-list {
    margin-top: 40px;
  }
}

@include media-breakpoint-up(lg) {
  .announcement-list {
    max-width: 1200px !important;
  }
}
</style>
