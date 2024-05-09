import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: ''
  }),
  actions: {
    SET_USER_INFO(value: UserInfo): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserInfo] = val;
      });
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});

export default {};
