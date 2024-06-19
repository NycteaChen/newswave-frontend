<template>
  <div class="privacy-policy">
    <p>歡迎您使用 NewsWave，我們非常重視您的隱私權，並致力於保護您的個人資訊。</p>
    <p>在使用我們的服務之前，請您仔細閱讀以下隱私權政策：</p>
    <section class="space-getter">
      <div class="space-getter">
        <h4>收集的資訊</h4>
        <ul class="space-getter">
          <li>
            <span class="fw-bold">個人資訊：</span>
            當您註冊時，我們會收集您的聯絡資訊（如電子郵件地址），以及用於登入的驗證資訊（如密碼），我們也會收集您提供給我們的身分資訊（名稱、生日、性別）。根據您設定的喜好，我們會收集您有興趣的文章、主題。
          </li>
          <li>
            <span class="fw-bold">付款資訊：</span>
            若您訂閱本站方案，我們會收集您的付款詳細資訊和其他資訊，以便處理您的付款，其中包含您的付款記錄、帳單地址。
          </li>
          <li>
            <span class="fw-bold">Cookie：</span>
            我們使用 Cookie 來改善網站的功能和性能，並提供更好的使用者體驗。
          </li>
        </ul>
      </div>
      <div class="space-getter">
        <h4>使用資訊</h4>
        <p class="mb-0">我們使用收集到的資訊來：</p>
        <ul class="space-getter">
          <li>提供和維護 NewsWave 服務</li>
          <li>改善網站性能</li>
          <li>向您發送新聞和更新</li>
        </ul>
      </div>
      <div class="space-getter">
        <h4>資訊分享</h4>
        <p class="mb-0">我們不會出售、租借或交換您的個人資訊給其他公司或個人。我們僅在以下情況下分享您的資訊：</p>
        <ul class="space-getter">
          <li>經您同意</li>
          <li>根據法律要求</li>
        </ul>
      </div>
      <div class="space-getter">
        <h4>資訊安全</h4>
        <p class="mb-0">我們採取合理的安全措施，以保護您的個人資訊免受未經授權的訪問、使用或揭露。</p>
      </div>
      <div class="space-getter">
        <h4>聯絡我們</h4>
        <p>
          如果您對我們的隱私權政策、我們如何使用您的個人資訊、行使您的隱私權有任何疑問，或是對於 NewsWave
          服務、您的帳號有一般問題，請隨時
          <nuxt-link
            class="is-btn"
            to="/contact-us"
            target="_blank"
          >
            聯絡我們
          </nuxt-link>
          。
        </p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (title) => `${title} - 隱私權政策`
});

definePageMeta({
  title: '隱私權政策'
});
</script>
<style lang="scss" scoped>
.space-getter {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h4 {
  margin-bottom: 0;
}

ul {
  padding-left: 16px;

  li {
    list-style-type: disc;
  }
}
</style>
