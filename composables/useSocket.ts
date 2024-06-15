import openSocket from 'socket.io-client';

let SOCKET: any;

class Socket {
  static connect() {
    const config = useRuntimeConfig();
    const URL = `${config.public.apiBase}/`;

    const userStore = useUserStore();
    const { id } = storeToRefs(userStore);

    SOCKET = openSocket(URL, {
      query: {
        userId: id.value
      },
      transports: ['websocket']
    });

    SOCKET?.on('notice', (data: any) => {
      const personalNotificationBus = useEventBus('personalNotificationBus');
      const noticeBus = useEventBus('noticeBus');
      const noticeStore = useNoticeStore();
      switch (data?.action) {
        case 'create':
          noticeStore.SET_UNREAD_COUNT((data?.unreadNum || 0) + 1 || 0);
          noticeBus.emit();
          personalNotificationBus.emit();
          break;
        default:
          break;
      }
    });

    // SOCKET?.emit('user agent', navigator.userAgent);
  }

  static disconnect() {
    SOCKET?.disconnect();
  }
}

export default () => Socket;
