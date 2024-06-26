declare global {
  interface NavItemType {
    label: string;
    value: string;
    badge?: string;
    truncate?: boolean;
  }

  interface NavItemWithSubType extends NavItemType {
    children?: NavItemType['value'];
    childrenRoute?: NavItemType[];
  }
}

export {};
