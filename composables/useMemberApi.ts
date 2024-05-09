class memberApi {
  static async register(
    params: RegisterRequestType
  ): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      name: params.name,
      email: params.email,
      password: params.password
    };
    const res = await useApi('/member/register', {
      method: 'post',
      body
    });

    return res;
  }

  static async login(
    params: LoginRequestType
  ): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      email: params.email,
      password: params.password
    };
    const res = await useApi('/member/login', {
      method: 'post',
      body
    });

    return res;
  }

  static async logout(): Promise<ApiResponseType<undefined>> {
    const res = await useApi('/member/logout', {
      method: 'post'
    });

    return res;
  }

  static async updatePassword(params: {
    [key: string]: PasswordType;
  }): Promise<ApiResponseType<undefined>> {
    const body = {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    };
    const res = await useApi('/member/password', {
      method: 'patch',
      body
    });

    return res;
  }
}

export default () => memberApi;
