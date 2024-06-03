declare global {
  type PasswordType = string;

  type TokenType = string;

  interface UserInfoType {
    id: string;
    name: string;
    email: string;
    birthday: string;
    gender: string;
  }

  interface UserDataType {
    isVip: boolean;
    avatar: string;
    subscribeExpiredAt: string;
    planType: string;
  }

  interface TransactionIdType {
    transactionId?: string;
  }

  interface SubscriptionOrderType extends TransactionIdType {
    planType?: 'month' | 'year';
    itemName?: string;
    total?: number;
    payStatus?: 'paid' | 'fail' | 'unpaid';
    createdAt?: string;
    updatedAt?: string;
    orderAt?: string;
    paidAt?: string;
    subscribeExpiredAt?: string;
  }
}

export {};
