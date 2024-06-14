declare global {
  interface ApiResponseType<T> {
    status: boolean;
    message: string;
    data: T;
  }

  interface PageRequestType {
    pageIndex: number;
    pageSize?: number;
  }

  interface PageResponseType {
    firstPage: boolean;
    lastPage: boolean;
    empty: boolean;
    totalElements: number;
    totalPages: number;
    targetPage: number;
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

  interface MagazineArticlePageRequestType extends PageRequestType {
    category: string;
  }

  interface OrderRequestType {
    itemName: PlanItem['planName'];
    total: PlanItem['totalPrice'];
    planType: PlanItem['type'];
  }

  interface MagazineArticleDetailResponseType {
    article: ArticleType;
    quota: number;
    planType: UserDataType['planType'];
  }
}

export {};
