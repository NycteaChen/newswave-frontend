<template>
  <ul class="core-value row row-cols-1 g-3 row-cols-sm-2 row-cols-lg-3 g-md-5 justify-content-sm-center">
    <li
      v-for="item in coreList"
      :key="item.title"
    >
      <n-transition class="core-value-item d-flex h-100 justify-content-center align-items-center flex-column">
        <div class="core-value-icon-container p-2 rounded-circle bg-body position-relative z-2">
          <div
            class="rounded-circle p-3 d-flex mw-100 mh-100"
            :style="{ '--color': item.color }"
          >
            <svg-icon
              class="core-value-icon"
              :name="`about-${item.icon}`"
            />
          </div>
        </div>
        <div
          class="card flex-1 position-relative z-1 text-body-white"
          :style="{ background: item.icon === 'service' ? item.color : `${item.color}cc` }"
        >
          <div class="card-body px-4 py-5 d-flex flex-column gap-2">
            <h4 class="card-title text-center">{{ item.title }}</h4>
            <p class="card-text flex-1">
              {{ item.content }}
            </p>
          </div>
        </div>
      </n-transition>
    </li>
  </ul>
</template>
<script lang="ts" setup>
const coreList = [
  {
    title: '真實性和準確性',
    content: '報導新聞時必須核實事實、確保資訊的可信度，避免散播虛假或誤導性的資訊。',
    icon: 'reality',
    color: '#003c70'
  },
  {
    title: '客觀性和中立性',
    content: '不偏袒任何特定政治觀點、利益集團或個人，確保報導的公正性和信任度。',
    icon: 'objective',
    color: '#e36d63'
  },
  {
    title: '公共服務',
    content: '為公眾提供必要的資訊和洞察力，幫助人們理解和參與社會議題和政治過程。',
    icon: 'service',
    color: '#a3cfc7'
  },
  {
    title: '透明度和責任',
    content: '公開資訊生產的過程和決策，並對文章的準確性和道德性負責，建立與讀者之間的信任關係。',
    icon: 'responsibility',
    color: '#feb272'
  },
  {
    title: '多元化和包容性',
    content: '報導各種群體和觀點，避免偏見和歧視，並促進尊重和理解。',
    icon: 'diverse',
    color: '#0897c9'
  }
];
</script>
<style lang="scss" scoped>
.core-value-icon-container {
  width: 96px;
  height: 96px;
  transform: translateY(24px);

  > div {
    border: 1px dashed var(--color);
  }

  .core-value-icon {
    fill: var(--color);
  }
}
</style>
