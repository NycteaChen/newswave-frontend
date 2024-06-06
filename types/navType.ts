declare global {
  interface NavItemType {
    label: string;
    value: string;
    badge?: string;
  }

  interface NavItemWithSubType extends NavItemType {
    children?: NavItemType['value'];
    childrenRoute?: NavItemType[];
  }
}

export {};
