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
    planType: '',
    autoRenew: ''
  }),

  actions: {
    SET_USER_INFO(value: UserInfoType): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserInfoType] = val;
      });
    },
    SET_USER_DATA(value: UserDataType): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserDataType] = val;
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
