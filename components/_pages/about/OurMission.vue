<template>
  <div class="our-mission d-flex flex-column flex-lg-row-reverse gap-4 gap-lg-5 align-items-center">
    <n-transition
      class="image-container"
      :animation-name="`fade-in-${isMobile ? 'up' : 'right'}`"
    >
      <n-image
        class="rounded-2"
        :img-src="requireImage('about/mission.webp')"
        alt="mission"
      />
    </n-transition>

    <n-transition
      class="text-container d-flex flex-column gap-4"
      :animation-name="`fade-in-${isMobile ? 'up' : 'left'}`"
    >
      <h4 class="fw-normal">每個人都能夠隨時隨地獲得可靠、客觀、多元的資訊。</h4>
      <p>
        無論您關心政治、經濟、科技、文化、娛樂還是體育，我們都會為您提供最有價值的資訊，我們將保持中立，不偏袒任何特定立場或利益。作為第四權力的一部分監督政府和企業的行為，揭示不正當的行為並保護公眾利益，並通過深入報道社會問題和不平等現象，促進社會變革和持續改進。
      </p>
      <p>
        我們相信，好的新聞將促進有意義的對話和辯論，培養公眾對問題的理解和討論，從而促進社會的進步和民主的健康發展。
      </p>
      <p>我們相信，知識和資訊的分享即是推動社會進步的關鍵。</p>
    </n-transition>
  </div>
</template>
<script lang="ts" setup>
const isMobile = inject('isMobile');
</script>
<style lang="scss" scoped>
p,
h4 {
  margin-bottom: 0;
}
</style>
