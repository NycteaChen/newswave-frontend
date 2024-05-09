declare global {
  interface ApiResponseType<T> {
    status?: boolean;
    message: string;
    data: T;
  }

  interface LoginRequestType {
    email: UserInfo['email'];
    password: PasswordType;
  }

  interface RegisterRequestType extends LoginRequestType {
    name: UserInfo['name'];
  }

  interface LoginRegisterResponseType extends UserInfo {
    token: TokenType;
  }
}

export {};
