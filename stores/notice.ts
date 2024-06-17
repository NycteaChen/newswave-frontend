import { defineStore } from 'pinia';

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    unreadCount: 0
  }),
  actions: {
    SET_UNREAD_COUNT(value: number): void {
      this.unreadCount = value;
    }
  }
});

export default {};
