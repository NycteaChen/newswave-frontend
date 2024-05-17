class userApi {
  static async updatePassword(params: { [key: string]: PasswordType }): Promise<ApiResponseType<undefined>> {
    const body = {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    };
    const res = await useApi('/user/password', {
      method: 'patch',
      body
    });

    return res;
  }
}

export default () => userApi;
