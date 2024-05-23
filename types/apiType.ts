declare global {
  interface ApiResponseType<T> {
    status?: boolean;
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
  interface MagazineArticlePageResponseType {
    pageIndex: any;
    category: any;
  }
}

export {};
