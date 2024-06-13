<template>
  <div class="n-empty d-flex flex-column text-muted align-items-center gap-3 gap-md-4">
    <img :src="requireImage('icon/no-data.svg')" />
    <div class="text-sm">暫無資料</div>
  </div>
</template>
<style lang="scss" scoped>
.n-empty {
  img {
    width: 40px;
    height: 40px;
  }
}

@include media-breakpoint-up(md) {
  .n-empty {
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
