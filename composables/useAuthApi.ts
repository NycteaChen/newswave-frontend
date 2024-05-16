class authApi {
  static async register(
    params: RegisterRequestType
  ): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      name: params.name,
      email: params.email,
      password: params.password
    };
    const res = await useApi('/auth/register', {
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
    const res = await useApi('/auth/login', {
      method: 'post',
      body
    });

    return res;
  }

  static async logout(): Promise<ApiResponseType<undefined>> {
    const res = await useApi('/auth/logout', {
      method: 'post'
    });

    return res;
  }
}

export default () => authApi;
