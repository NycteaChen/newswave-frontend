import { defineStore } from 'pinia';

interface UserInfo {
  account: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    account: ''
  }),
  actions: {
    SET_USER_INFO(value: UserInfo): void {
      Object.entries(value || {}).forEach(([key, val]) => {
        this[key as keyof UserInfo] = val;
        console.log(key);
      });
    }
  }
});

export default {};
