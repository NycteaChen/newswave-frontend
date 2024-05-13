declare global {
  interface articleType {
    topic: string[];
    editor: string;
    articleId: string;
    title: string;
    publishedAt: Date | string;
    imageDescribe: string;
    image: string;
    content: string;
    source: {
      name: string;
      url: string;
    };
  }

  interface MagazineCategoryType {
    categoryName: string;
    categoryId: string;
    categoryDescribe: string;
    categoryImg: string;
  }
}

export {};
