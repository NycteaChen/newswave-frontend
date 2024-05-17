// 一般使用者
class userApi {
  static async register(params: RegisterRequestType): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      name: params.name,
      email: params.email,
      password: params.password
    };
    const res = await useApi('/user/register', {
      method: 'post',
      body
    });

    return res;
  }

  static async login(params: LoginRequestType): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      email: params.email,
      password: params.password
    };
    const res = await useApi('/user/login', {
      method: 'post',
      body
    });

    return res;
  }

  static async logout(): Promise<ApiResponseType<undefined>> {
    const res = await useApi('/user/logout', {
      method: 'post'
    });

    return res;
  }

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
