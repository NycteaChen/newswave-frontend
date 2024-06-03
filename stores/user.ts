import { defineStore } from 'pinia';

const userApi = useUserApi();

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    birthday: '',
    gender: '',
    avatar: '',
    isVip: '',
    subscribeExpiredAt: '',
    planType: ''
  }),

  actions: {
    SET_USER_INFO(value: UserInfoType): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserInfoType] = val;
      });
    },
    async getUserData() {
      const { data, status } = await userApi.getUserData(this.id);
      if (status) {
        Object.entries(data || {}).forEach(([key, val]) => {
          this[key as keyof UserDataType] = val;
        });
      }
    }
  },

  persist: {
    storage: persistedState.localStorage
  }
});

export default {};
