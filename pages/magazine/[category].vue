<template>
  <h1>雜誌文章列表 5-2</h1>
<<<<<<< HEAD

  <nuxt-link :to="`/article/${$route.params.category}/${articleId}`">
    <div>{{ `${$route.params.category}文章` }}</div>
  </nuxt-link>
  <section class="container d-flex p-3">
=======
  <section class="container d-flex p-3 mb-4 title-backgroundcolor">
>>>>>>> 2f9e9e3 (feat(issue36): 雜誌文章列表)
    <div class="title-img me-4">
      <img
        src="https://s3-alpha-sig.figma.com/img/28f5/1841/4a4a211181a9778ab18e8509f1c601e3?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PNp9w9dAynMK-jDxXLiSsJDggsv~~bX~cGZz6TASYgpjBxc7wYZbVjJg0sunkMcYrIbleK~AdQB752ogwn2AH2fXmPyQ40C6ujelUi0azjNfvTRKoB1b72xDlJqlPsCb5X3rSNXrDLIwzZwtb-Y3bmPQuVDQDR3R5EEa2sGyrYQ6PAgGrlSWhqOtutC4ejSb2PaQV0xOxYETsl3VeFblpt1umgpvCyV~ktGfAw9s8~z6ssprkl6u4JLQnRYSJdf191KX5WYWVEUGkOo84vBCioPPF2DCj8-XFrd4Emv62dzdhM8r6F8FESDSUv6gYRag2BVSAND~MOC6lcRiESUywA__"
        alt="Mimage"
        class="img-fluid"
      />
    </div>
    <div class="magazine-title">
      <div class="mb-3 fw-bold fs-3">
        {{ $route.params.category }}
      </div>
      <div class="fs-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque quas
        ipsum quasi porro nemo deserunt voluptates. Aspernatur eius adipisci
        odit deleniti laborum illo. Hic minus nisi asperiores accusamus fuga
        ipsum.*20
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <nuxt-link :to="`/article/${articleId}`">
          <div class="card h-100">
            <img
              src="https://s3-alpha-sig.figma.com/img/a42b/d33f/1838a6959de079672cb7810c637cd8fc?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmjm0N-IAHDN5IxAUNHYHS9CJs8EUE63tXXyPRWMKjLEU~IMHSNEDI55WYLWzxb0SZCVoK6-98RmgwyPJfTT8VkhgTLK2QIjUxBq-I5sKex61YIaz2JMbQe4u4CBk~eY6cnj1ZCfOAy4~BQ0LxwMyKDZzfBssEdZdDZTArEaC1vdOgFDXUIwz2kxuo~dpgFOQ3njlB9P0FPp~5mLSgwIkRync0sWoAhY0TzZkOwarG4F0qdHqn9ZTAM~kbdD7wjils~-6vCimXroVYL69v7Mz1sq1mi3uxbPoXZ6uYnc7RmXZDy7cDkT29D9tyQwBMRL7XVCqOzs0I4ee~nX84ElNA__"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">
                探索未來科技趨勢:人工智慧、虛擬現實、區塊鏈和綠色創新的新革命
              </h5>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="d-flex justify-content-center pagination-position">
      <NPagination
        :total-pages="20"
        :current-page="currentPage"
        @page-change="handlePageChange"
      ></NPagination>
    </div>
  </section>
</template>
<script setup lang="ts">
const articleId = ref<string>('M-123');
const currentPage = ref(1);

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>
<style lang="scss" scoped>
.title-img {
  max-width: 120px;
  height: 120px;
}

.magazine-title {
  color: $primary;
}

.pagination-position {
  margin-top: 40px;
  margin-bottom: 80px;
}

.title-backgroundcolor {
  background-color: $light;
}
</style>
