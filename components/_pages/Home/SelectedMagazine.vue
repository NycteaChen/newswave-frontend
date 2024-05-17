<template>
  <section class="selected-magazine bg-primary-gradient position-relative">
    <div class="selected-magazine-container container text-center position-relative z-3">
      <h2 class="text-body-white">精選雜誌</h2>

      <n-swiper
        :swiper-list="categoryList"
        mode="dark"
      >
        <template #slide="{ slideItem }">
          <magazine-category-card :category-data="slideItem" />
        </template>
      </n-swiper>
      <nuxt-link to="/magazine">
        <n-button
          color="secondary"
          text="瀏覽更多雜誌"
        />
      </nuxt-link>
    </div>

    <img
      class="wave-img z-2"
      :src="requireImage(`home/wave-2.svg`)"
    />
  </section>
</template>
<script lang="ts" setup>
const { getMagazineCategoryList } = useGuestApi();
const categoryImg =
  'https://s3-alpha-sig.figma.com/img/ab7f/370b/4c812551f6d82b1de68bffdd918870d7?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qc5XFY-yjwy0cvxg5QFeYVJjy5dzIwOaCYh3BOOjBjPLJvF5xS7RFqNbDofJZ5kb6bW2ufTfNNiXhArFsqg5knrnpzOtD3iVQQbUyXIrnzIw8nUmmPkpvaWoXr~53UQFi3yKGtSmATPjiON7QXbcKVhqchbYtxHujmcqCRgZq492k-~1ixVwxlXGc9A40dNetDKitNoVgm5yXyfCZ4t-a24b6cgWDkVEXpVAzhdBJ9Fwr9R8XVFeUz2uWFAetCnm4Cy6OlNDCyWZB3LGGMxghdG94Rhn9BHjpdknOhIkp5Ya4Zu5GU75qanbOzB0CI92J5H1OFAljsSEqb6IrHNiYA__';

const categoryList = ref<MagazineCategoryType[]>([]);

const getMagazineCategoryListHandler = async () => {
  const { status, data } = await getMagazineCategoryList();
  if (status) {
    categoryList.value = data.map((e) => ({
      ...e,
      categoryImg
    }));
  } else {
    categoryList.value = [];
  }
};

onMounted(async () => {
  await nextTick(() => {
    getMagazineCategoryListHandler();
  });
});
</script>

<style lang="scss" scoped>
.selected-magazine {
  padding: 80px 0 125px;
}

@include media-breakpoint-down(md) {
  .selected-magazine-container {
    padding-right: 0;
    padding-left: 0;
  }
}

@include media-breakpoint-up(md) {
  .selected-magazine {
    padding-bottom: 180px;
  }
}

@include media-breakpoint-up(xl) {
  .selected-magazine {
    padding-bottom: 300px;

    &::after {
      position: absolute;
      right: -400px;
      bottom: -87px;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: $blue-700;
      content: '';
    }
  }
}

@media screen and (width >= 1500px) {
  .selected-magazine-container {
    max-width: 1464px;
  }

  ::v-deep(.customize-swiper-button) {
    top: 283px;
  }
}
</style>
