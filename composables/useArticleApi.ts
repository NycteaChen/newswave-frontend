class articleApi {
  static async getMagazineCategoryList(): Promise<
    ApiResponseType<MagazineCategoryType[]>
  > {
    const res = await useApi('/member/magazine-category-list', {
      method: 'get'
    });

    return res;
  }
}

export default () => articleApi;
