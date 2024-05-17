class articleApi {
  static async getMagazineCategoryList(): Promise<ApiResponseType<MagazineCategoryType[]>> {
    const res = await useApi('/auth/magazine-category-list', {
      method: 'get'
    });

    return res;
  }
}

export default () => articleApi;
