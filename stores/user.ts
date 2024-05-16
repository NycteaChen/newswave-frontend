import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    isVip: false,
    avatar: ''
  }),
  actions: {
    SET_USER_INFO(value: UserInfoType): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserInfoType] = val;
      });
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});

export default {};
