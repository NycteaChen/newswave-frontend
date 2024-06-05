// 訂閱使用者
class memberApi {
  static async subscribeAutoRenew(autoRenew: UserDataType['autoRenew']): Promise<ApiResponseType<UserDataType>> {
    const body = {
      autoRenew
    };
    const res = await useApi('/member/auto-renew', {
      method: 'patch',
      body
    });

    return res;
  }
}

export default () => memberApi;
