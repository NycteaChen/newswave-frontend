<template>
<<<<<<< HEAD
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
=======
  <section class="container title-backgroundcolor mb-4 p-3">
    <div class="d-flex">
      <div class="title-img me-4">
        <img
          src="https://s3-alpha-sig.figma.com/img/28f5/1841/4a4a211181a9778ab18e8509f1c601e3?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PNp9w9dAynMK-jDxXLiSsJDggsv~~bX~cGZz6TASYgpjBxc7wYZbVjJg0sunkMcYrIbleK~AdQB752ogwn2AH2fXmPyQ40C6ujelUi0azjNfvTRKoB1b72xDlJqlPsCb5X3rSNXrDLIwzZwtb-Y3bmPQuVDQDR3R5EEa2sGyrYQ6PAgGrlSWhqOtutC4ejSb2PaQV0xOxYETsl3VeFblpt1umgpvCyV~ktGfAw9s8~z6ssprkl6u4JLQnRYSJdf191KX5WYWVEUGkOo84vBCioPPF2DCj8-XFrd4Emv62dzdhM8r6F8FESDSUv6gYRag2BVSAND~MOC6lcRiESUywA__"
          alt="Mimage"
          class="img-fluid"
        />
      </div>
      <div class="magazine-title">
        <div class="mb-3 fw-bold fs-3">{{ $route.params.category }}</div>
        <div>
          <div v-if="!isMobile || showFullContent">{{ magazineContent }}</div>
          <div v-else>
            {{ magazineContentShort + '...' }}
          </div>
        </div>
      </div>
>>>>>>> cf058a5 (feat(issue36): 雜誌文章列表頁)
    </div>
    <div class="d-flex flex-row-reverse">
      <button
        class="d-md-none btn-expand"
        @click="toggleMagazineContent"
      >
        {{ showFullContent ? '收合' : '展開' }}
        <i class="bi bi-angle-down"></i>
      </button>
    </div>
  </section>
  <section class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <nuxt-link :to="`/article/${articleId}`">
          <div class="card h-100 .image-container">
            <img
              src="https://s3-alpha-sig.figma.com/img/a42b/d33f/1838a6959de079672cb7810c637cd8fc?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmjm0N-IAHDN5IxAUNHYHS9CJs8EUE63tXXyPRWMKjLEU~IMHSNEDI55WYLWzxb0SZCVoK6-98RmgwyPJfTT8VkhgTLK2QIjUxBq-I5sKex61YIaz2JMbQe4u4CBk~eY6cnj1ZCfOAy4~BQ0LxwMyKDZzfBssEdZdDZTArEaC1vdOgFDXUIwz2kxuo~dpgFOQ3njlB9P0FPp~5mLSgwIkRync0sWoAhY0TzZkOwarG4F0qdHqn9ZTAM~kbdD7wjils~-6vCimXroVYL69v7Mz1sq1mi3uxbPoXZ6uYnc7RmXZDy7cDkT29D9tyQwBMRL7XVCqOzs0I4ee~nX84ElNA__"
              class="card-img-top"
              alt="雜誌文章圖片"
            />
            <div class="image-tag">
              <img
                src="/assets/image/icon/tag-news.svg"
                alt="tag-news"
              />
              <span class="fw-bold">NEWS</span>
            </div>

            <div class="card-body">
              <h5 class="card-title">探索未來科技趨勢:人工智慧、虛擬現實、區塊鏈和綠色創新的新革命</h5>
              <div class="d-flex justify-content-between author">
                <div class="d-flex align-items-center">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/3662/e399/b8712cd3f85b9427a7e6d17ee57ca6cb?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MDMwFa27gcexv9mYTRKybhb~A-xmnfFc2VD5WTxnQYyLlFSN0vU7d3vGWt6Iiz4UdDkRIowKrCwqy13nZ6X2J8QSYEY3YS9YOySTWxz4-h2wk-CMBweYBfIxW0wHNKiJ0y6CprMFayB4Dk-N8vBxxAKuinVhbgG0gRLszYyXNKiC49p9g~Vv5B4HKj9jcuNTSFEql6Yb0Jnr9IX7HTeuZskjcTwXgr2DmfD70Blct7zEsUHgO73AfXreEb6QvQFXNi8ZNzdqEyiS86gaR2sovuSQqoYLvHsehifDYWMiQM3v0GiEpWxRxDcZjftk83UomaVAN5~i08~joNg7Yhq5jg__"
                    alt="作者頭像"
                    class="author-img"
                  /><span>佐藤優太</span>
                </div>
                <div class="upload-time">1天前</div>
              </div>
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
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const magazineContent =
  '「新電子科技雜誌」隸屬於城邦出版集團，創立於1986年，是台灣半導體科技領域最專業的B2B產業雜誌，以促進台灣半導體與電子科技產業創新與蓬勃為使命，幫助產業人士掌握市場脈動、提升產品技術研發實力。';
const magazineContentShort = computed(() => magazineContent.slice(0, 35));
const showFullContent = ref(false);
const toggleMagazineContent = () => {
  showFullContent.value = !showFullContent.value;
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

.author {
  color: $gray-700;
}

.author-img {
  margin-right: 8px;
  max-width: 24px;
  height: 24px;
}

.upload-time {
  position: relative;
  padding-left: 8px;
}

.upload-time::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px;
  height: 16px; /* 調整高度來設置邊框長度 */
  background-color: $gray-300;
  content: '';
  transform: translateY(-50%);
}

.image-container {
  position: relative;
  display: inline-block;
}

.image-tag {
  position: absolute;
  top: 16px; /* Adjust as needed */
  left: 16px; /* Adjust as needed */
  padding: 8px 12px;
  max-width: 105px;
  background-color: #b4deea;
  color: #2f5862;
  font-size: 16px;

  img {
    margin-right: 8px;
    max-width: 24px;
    height: 24px;
  }
}

.btn-expand {
  margin-top: 4px;
  padding: 4px, 6px, 4px, 12px;
  border: 0;
  border-radius: 20px;
  background-color: $blue-300;
  color: $gray-100;
}
</style>
