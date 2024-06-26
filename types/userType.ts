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
    avatar: string;
    subscribeExpiredAt: string;
    planType: PlanItem['type'];
    autoRenew: boolean;
    collects: string[];
    follows: string[];
  }

  interface TransactionIdType {
    transactionId?: string;
  }

  interface SubscriptionOrderType extends TransactionIdType {
    planType?: 'month' | 'year';
    itemName?: OrderRequestType['itemName'];
    total?: OrderRequestType['total'];
    payStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    orderAt?: string;
    paidAt?: string;
    subscribeExpiredAt?: UserDataType['subscribeExpiredAt'];
  }

  interface UploadResponseType {
    imgUrl: string;
  }
}

export {};
