// 未登入使用者
class guestApi {
  static async getMagazineCategoryList(): Promise<ApiResponseType<MagazineCategoryType[]>> {
    const res = await useApi('/guest/magazine-category-list', {
      method: 'get'
    });

    return res;
  }

  static async getHotNewsList(query: HotNewsListResponseType): Promise<ApiResponseType<ArticleType[]>> {
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
}

export default () => guestApi;
