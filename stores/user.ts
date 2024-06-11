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
    subscribeExpiredAt: '',
    planType: '',
    autoRenew: ''
  }),

  getters: {
    isVip: (state) => state.planType === 'month' || state.planType === 'year'
  },

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
    },
    async getUserInfo() {
      const { data, status } = await userApi.getUserInfo(this.id);
      if (status) {
        Object.entries(data || {}).forEach(([key, val]) => {
          this[key as keyof UserInfoType] = val;
        });
      }
    }
  },

  persist: {
    storage: persistedState.localStorage
  }
});

export default {};
