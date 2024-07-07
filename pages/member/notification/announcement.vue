<template>
  <section>
    <n-accordion
      class="announcement-list fw-bold"
      :accordion-list="list"
    >
      <template #title="{ item, index }">
        <h3 class="me-3 mb-0">
          <span
            v-if="!index"
            class="new-badge rounded-1 me-2 text-body-white fs-xs"
          >
            NEW
          </span>
          <span>{{ item.title }}</span>
        </h3>
      </template>
    </n-accordion>
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
      '2024-06-29\n\n敬愛的 NewsWave 會員您好：\n\n為回饋廣大會員的支持，NewsWave 現推出全新的年度訂閱方案。\n新的年度訂閱價格為 960 元，相當於每月費用僅 80 元。與月付方案相比，年度訂閱可為您節省近 20% 的費用。\n趕緊行動搶先訂閱 NewsWave Plus 年度方案，享受更多專屬權益！\n如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave 線上讀書會資訊',
    content:
      '2024-05-29\n\n敬愛的 NewsWave 會員您好：\n\nNewsWave 將於 2024-06-15 20:00 舉辦線上讀書會活動，我們榮幸的邀請到知名作家林景行、謝詩巧、陳靜筠分享他們的創作經歷和心得。\n三位作家皆擁有豐富的創作經驗，並曾獲得多個文學獎項。他們的作品充滿了深度、情感和洞察力，絕對值得您的聆聽。\n另外，NewsWave Plus 訂閱會員將可獲得與作家問答交流的機會，喜歡他們的會員千萬不要錯過！\n\nNewsWave 將會在活動前一天寄送線上會議網址給您，請務必準時參加這場令人期待的演講。\n如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave 舉辦線上讀書會活動',
    content:
      '2024-05-14\n\n敬愛的 NewsWave 會員您好：\n\n為了豐富您的閱讀生活，NewsWave 將於 2024-06-15 20:00 舉辦線上讀書會活動。\n屆時我們將邀請知名作家分享他們的創作經歷和心得，並與大家一起探討作品中的思想內涵。\n本次活動免費參與，NewsWave Plus 訂閱會員還可以獲得專屬福利。活動採用線上直播形式，您可以在家中輕鬆參與互動。\n敬請關注 NewsWave 公告通知，我們將於活動前公佈更多詳細資訊。期待與您一起探索閱讀的樂趣！'
  },
  {
    title: 'NewsWave 維護完成公告',
    content:
      '2024-04-30\n\n敬愛的 NewsWave 會員您好：\n\n今日維護已經完成，感謝您的耐心等待和支持！\n如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave 服務更新',
    content:
      '2024-04-25\n\n敬愛的 NewsWave 會員您好：\n\n為了提供更穩定、更有效率的服務，我們將進行系統維護。\n\n維護時間： 2024-04-30 13:00 至 2024-04-30 17:00\n\n在維護完成期間，您可能無法存取 NewsWave 或遇到功能異常的情況。我們將加快維護工作，並確保盡快恢復正常服務。感謝您的耐心等待和支持！\n如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave Plus 會員調查活動',
    content:
      '2024-04-23\n\n敬愛的 NewsWave 會員您好：\n\n為了更好地了解您的使用需求和意見回饋，NewsWave 現正舉辦會員調查活動。參與本次調查的會員，將有機會獲得 NewsWave Plus 免費限時體驗資格。\n請您撥冗參與，如有任何疑問或建議，隨時與我們聯繫。我們將竭盡全力為您服務。'
  },
  {
    title: 'NewsWave 全新版上線',
    content:
      '2024-04-22\n\n敬愛的 NewsWave 會員您好：\n\n我們很自豪地宣布，全新的 NewsWave 應用程式已經推出！\n作為一項致力於提供零廣告干擾的免費新聞閱讀應用程式，我們不斷努力，讓您能夠輕鬆快速地獲取最新動態，專注於真正的全球重要內容。\n快來使用最新版 NewsWave，讓我們一起探索世界的精彩。'
  }
]);
</script>
<style lang="scss" scoped>
.new-badge {
  padding: 2px 4px;
  background: $green;
  vertical-align: bottom;
}

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
