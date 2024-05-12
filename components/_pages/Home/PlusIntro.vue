<template>
  <section
    id="plusIntro"
    class="plus-intro bg-body-light position-relative"
  >
    <div class="container text-center position-relative z-1">
      <div class="text-primary">
        <h2>NewsWave Plus</h2>
        <p class="fs-5">無限制閱讀全球各大雜誌，帶您探索世界更多角落</p>
      </div>
      <plan-selection />
    </div>

    <img
      class="wave-img"
      :src="requireImage(`home/wave-4.svg`)"
    />
  </section>
</template>
<style lang="scss" scoped>
.plus-intro {
  padding: 80px 0 125px;
}

::v-deep(.plan-selection) {
  margin: 40px 0;
}

@include media-breakpoint-up(md) {
  ::v-deep(.plan-selection) {
    margin: 80px 0;
  }
}
</style>
