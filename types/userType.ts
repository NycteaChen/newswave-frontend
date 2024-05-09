declare global {
  type PasswordType = string;

  type TokenType = string;

  interface UserInfo {
    id: string;
    name: string;
    email: string;
  }
}

export {};
