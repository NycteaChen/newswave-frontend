// 未登入使用者
class guestApi {
  static async getMagazineCategoryList(): Promise<ApiResponseType<MagazineCategoryType[]>> {
    const res = await useApi('/guest/magazine-category-list', {
      method: 'get'
    });

    return res;
  }
}

export default () => guestApi;
