// 未登入使用者
class guestApi {
  static async getMagazineCategoryList(): Promise<ApiResponseType<MagazineCategoryType[]>> {
    const res = await useApi('/guest/magazine-category-list', {
      method: 'get'
    });

    return res;
  }

  static async getMagazineArticlePage(query: ArticlePageRequestType): Promise<ApiResponseType<ArticlePageType>> {
    const params = {
      category: query.category,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    const res = await useApi('/guest/magazine-article-page', {
      method: 'get',
      params
    });

    return res;
  }

  static async getNewsPage(query: ArticlePageRequestType): Promise<ApiResponseType<ArticlePageType>> {
    const params = {
      topic: query.category,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    const res = await useApi('/guest/news-page', {
      method: 'get',
      params
    });

    return res;
  }

  static async getHotNewsList(query: HotNewsListRequestType): Promise<ApiResponseType<ArticleType[]>> {
    const params = {
      type: query.type,
      limit: query.limit
    };

    const res = await useApi('/guest/hot-news-list', {
      method: 'get',
      params
    });

    return res;
  }

  static async getArticleDetail(articleId: ArticleType['articleId']): Promise<ApiResponseType<ArticleType>> {
    const res = await useApi(`/guest/article-detail/${articleId}`, {
      method: 'get'
    });

    return res;
  }

  static async getArticleCommentPage(
    query: ArticleCommentPageRequestType
  ): Promise<ApiResponseType<ArticleCommentPageResponseType>> {
    const params = {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };

    const res = await useApi(`/guest/article-comment-page/${query.articleId}`, {
      method: 'get',
      params
    });

    return res;
  }

  static async getSearchPage(query: SearchPageRequestType): Promise<ApiResponseType<ArticlePageType>> {
    const params = {
      keyword: query.keyword,
      type: query.type,
      topic: query.topic,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };

    const res = await useApi(`/guest/search-news-page`, {
      method: 'get',
      params
    });

    return res;
  }
}

export default () => guestApi;
