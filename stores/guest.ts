import { defineStore } from 'pinia';

const guestApi = useGuestApi();

export const useGuestStore = defineStore('guest', {
  state: () => ({
    magazineCategoryList: [] as MagazineCategoryType[]
  }),
  actions: {
    async getMagazineCategoryList() {
      const { data, status } = await guestApi.getMagazineCategoryList();
      if (status) {
        const categoryImg = 'https://cdn.pixabay.com/photo/2018/09/16/00/27/magazine-3680550_1280.jpg';
        this.magazineCategoryList = data.map((e) => ({
          ...e,
          categoryImg: e.categoryImg || categoryImg
        }));
      } else {
        this.magazineCategoryList = [];
      }
    }
  }
});

export default {};
