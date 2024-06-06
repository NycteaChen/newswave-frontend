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

  static async getUserInfo(userId: UserInfoType['id']): Promise<ApiResponseType<UserInfoType>> {
    const res = await useApi(`/user/info/${userId}`, {
      method: 'get'
    });

    return res;
  }

  static async getUserData(userId: UserInfoType['id']): Promise<ApiResponseType<UserDataType>> {
    const res = await useApi(`/user/data/${userId}`, {
      method: 'get'
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

  static async getSubscriptionList(query?: TransactionIdType): Promise<ApiResponseType<SubscriptionOrderType[]>> {
    const params = {
      transactionId: query?.transactionId
    };
    const res = await useApi('/user/subscription', {
      method: 'get',
      params
    });

    return res;
  }

  static async updateUserInfo(params: {
    name?: string;
    birthday?: string;
    gender?: string;
    avatar?: string;
  }): Promise<ApiResponseType<UserInfoType>> {
    const body = {
      name: params.name,
      birthday: params.birthday,
      gender: params.gender,
      avatar: params.avatar
    };
    const res = await useApi('/user/info', {
      method: 'patch',
      body
    });

    return res;
  }
}

export default () => userApi;
