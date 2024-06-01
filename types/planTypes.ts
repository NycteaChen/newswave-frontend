declare global {
  type PlanItem = {
    title?: string;
    planName?: string;
    type: string;
    price?: number;
    totalPrice?: number;
    recommend?: boolean;
    redirectPath?: string;
  };
}

export {};
