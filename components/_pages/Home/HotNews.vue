<template>
  <section class="hot-news bg-body position-relative">
    <div class="hot-news-container container text-center position-relative z-1">
      <h2 class="text-primary">熱門新聞</h2>
      <n-swiper :swiper-list="newsList">
        <template #slide="{ slideItem }">
          <news-card :news-data="slideItem" />
        </template>
      </n-swiper>
      <nuxt-link to="/news">
        <n-button
          color="secondary"
          text="瀏覽更多新聞"
        />
      </nuxt-link>
    </div>
    <img
      class="wave-img"
      :src="requireImage(`home/wave-3.svg`)"
    />
  </section>
</template>
<script lang="ts" setup>
const nuxtApp = useNuxtApp();

const news: articleType = {
  topic: ['社會'],
  editor: '聯合新聞網',
  articleId: 'N-1006',
  title: '婚禮前48小時…岳母激戰女婿！人妻婚後2年才知真相淚崩',
  publishedAt: '2024-01-06 10:13',
  imageDescribe:
    '一名女網友分享,結婚前48小時,未婚夫竟與岳母發生性關係,雖隨後照樣結婚,但兩年後她知道真相後崩潰痛哭。',
  image:
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/01/30/0/28853794.jpg&s=Y&x=0&y=0&sw=1025&sh=683&exp=3600',
  content:
    '任何人飲酒記得量力而為,尤其是男性。外國1名女子在網路分享,自己和男友決定結婚,女方母親暫時搬過來同住準備婚禮事宜,他們在婚禮前48小時各自出席單身派對,男方飲醉回家誤入未來岳母睡房發生性關係,隨後扮作無事結婚。\n\n2年後丈夫出於愧疚承認當年做錯事,人妻又驚又怒,致電母親質問,但對方否認事件,甚至聲稱當年遭到準女婿強迫。網友紛紛留言「揭露,讓他們沒面子」、「似是岳母佔了醉女婿的便宜」、「離婚吧！」。\n\n原po在「Reddit討論區」表示,自己母親私生活不檢點,經常和其他異性調情約會,被當時男友和原po引為笑柄,男友笑說不認為她母親有魅力。隨後兩人決定結婚,未來岳母因為幫手準備婚事,所以暫時搬過來和他們同住,在婚禮前48小時,原po和未婚夫各自出席單身派對。\n\n凌晨約3時,原po回家發現未婚夫不在房中,於是發送短訊,但無人回覆,她以為未婚夫仍和兄弟繼續消遣,所以沒有理會便休息。到了翌日早上,未婚夫返房,聲稱由於飲醉,所以未能即時回家,原po知道對方並非經常飲酒,可能準備婚事感到壓力,所以放縱自己,之後他們按照計劃結婚。\n\n但2年後不知發生何事,丈夫愧疚承認當晚飲醉後進入岳母房間,兩人繼而發生關係,趁樓主熟睡時離開房間和住處,再扮作回家。\n\n原po頓時晴天霹靂,隨後致電母親,向她表示「丈夫告訴了我一切」,母親花了數分鐘假裝不知道樓主意思,甚至否認一切,一時聲稱女婿編造,一時聲稱被女婿強迫。原po知道對方拒絕承認,而且不想承擔任何責任或道歉,因而感到煩厭掛斷電話。\n\n原po當場痛哭,形容自己「完全迷失」、「失去了生命中最重要的兩個人」,可能丈夫當時受到酒精影響,但始終無法改變事實,兩人過去兩年表現到若無其事,自己則「像傻瓜一樣」,都不知道日後如何向親友解釋離婚原因。\n\n多名網友紛紛留言「揭露,讓他們沒面子」、「似是岳母佔了醉女婿的便宜」、「離婚吧！」、「好過份！」、「好難再回頭」。相關貼文於2年前發布,近日再度流傳。',
  source: {
    name: '聯合新聞網',
    url: 'https://udn.com/'
  }
};
const newsList = ref<articleType[]>([]);

nuxtApp.hook('page:finish', () => {
  newsList.value = [news, news, news, news, news, news];
});
</script>
<style lang="scss" scoped>
.hot-news {
  padding: 80px 0 125px;
}

@include media-breakpoint-down(md) {
  .hot-news-container {
    padding-right: 0;
    padding-left: 0;
  }
}

@include media-breakpoint-up(md) {
  .hot-news {
    padding-bottom: 180px;
  }
}

@include media-breakpoint-up(xl) {
  .hot-news {
    padding-bottom: 300px;
  }
}

@media screen and (width >= 1500px) {
  .hot-news-container {
    max-width: 1464px;
  }
}
</style>
