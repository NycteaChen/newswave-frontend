<template>
  <div class="terms-of-service">
    <p>歡迎您使用 NewsWave，NewsWave 提供個人化訂閱服務，讓會員能追蹤感興趣的主題文章。</p>
    <p>
      您對我們服務的使用受本《服務條款》約束，本《服務條款》所稱「NewsWave 服務」、「我們的服務」或「服務」，是指
      NewsWave 所提供探索及存取 NewsWave 內容的個人化服務，包括所有功能、使用者介面，以及與我們服務相關的所有內容。
      本《服務條款》中所稱的「您」指的是 NewsWave 會員。
    </p>
    <p>在使用我們的服務之前，請您仔細閱讀以下服務條款：</p>

    <section class="space-getter">
      <div class="space-getter">
        <h4>使用條款</h4>
        <ul class="first-level space-getter">
          <li>
            <div class="fw-bold">註冊與帳戶：</div>
            <ul class="second-level">
              <li>您需要註冊一個帳戶才能使用我們的服務。</li>
              <li>您必須提供真實、準確的個人資訊。</li>
            </ul>
          </li>
          <li>
            <div class="fw-bold">內容責任：</div>
            <ul class="second-level">
              <li>您在我們的網站上發布的內容應遵守法律法規，不得涉及違法、淫穢、侮辱等內容。</li>
              <li>您不得侵犯我們的版權或其他知識產權。</li>
            </ul>
          </li>
          <li>
            <div class="fw-bold">隱私權：</div>
            我們尊重您的隱私權，不會將您的個人資訊用於其他目的。請仔細閱讀我們的
            <nuxt-link
              to="/policy/privacy-policy"
              target="_blank"
            >
              隱私權政策
            </nuxt-link>
            ，以了解我們如何收集、使用和保護您的個人資訊。
          </li>
          <li>
            <div class="fw-bold">免責聲明：</div>
            <ul class="second-level">
              <li>我們不對新聞內容的準確性、完整性或可靠性承擔責任。</li>
              <li>您使用我們的服務時，需自行承擔風險。</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="space-getter">
        <h4>收費與取消</h4>
        <div>
          「NewsWave Plus」為 NewsWave 提供的訂閱服務，若對於 NewsWave Plus 服務有一般疑問亦可參考我們的
          <nuxt-link
            class="is-btn"
            target="_blank"
            to="/faq"
          >
            常見問題集
          </nuxt-link>
          。
        </div>
        <ul class="first-level space-getter">
          <li>
            <span class="fw-bold">風險警示：</span>
            購買產品存在一定的風險，包括但不限於產品性能、使用安全性、售後服務等方面。
          </li>
          <li>
            <span class="fw-bold">付款資訊：</span>
            若您訂閱本站方案，我們會收集您的付款詳細資訊和其他資訊，以便處理您的付款，其中包含您的付款記錄、帳單地址。
          </li>
          <li>
            <span class="fw-bold">取消：</span>
            NewsWave Plus
            提供取消續訂服務，只需點個兩下輕鬆操作即可取消訂閱，無取消費用。您可至「會員中心」的「訂閱管理」取消續訂，您的
            NewsWave Plus 服務將持續至最新一筆訂單的期限為止，待訂單到期時，系統會自動停止對您的帳戶扣款。
          </li>
          <li>
            <span class="fw-bold">變更價格與訂閱方案：</span>
            我們可不定期變更訂閱方案與服務價格。 我們會在價格變更或訂閱方案變更生效至少一個月前通知您。
            若您不願接受價格變更或訂閱方案變更，可在變更生效前取消續訂。
          </li>
        </ul>
      </div>
      <div class="space-getter">
        <h4>聯絡我們</h4>
        <p class="mb-0">
          如果您對我們的服務條款有任何疑問，請隨時
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
  titleTemplate: (title) => `${title} - 服務條款`
});

definePageMeta({
  title: '服務條款'
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

  &.first-level li {
    list-style-type: disc;
  }

  &.second-level li {
    list-style-type: circle;
  }
}
</style>
