declare global {
  interface ApiResponseType<T> {
    status: boolean;
    message: string;
    data: T;
  }

  interface LoginRequestType {
    email: UserInfoType['email'];
    password: PasswordType;
  }

  interface RegisterRequestType extends LoginRequestType {
    name: UserInfoType['name'];
  }

  interface LoginRegisterResponseType extends UserInfoType {
    token: TokenType;
  }

  interface HotNewsListRequestType {
    type: 'hot' | 'news';
    limit: number;
  }
  interface MagazineArticlePageRequestType {
    pageIndex: number;
    category: string | string[];
  }

  interface OrderRequestType {
    itemName: string;
    total: number;
    planType: string;
  }

  interface OrderRequestType {
    itemName: string;
    total: number;
  }
}

export {};
