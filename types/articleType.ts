declare global {
  interface ArticleType {
    articleId: string;
    topic: string[];
    editor: string;
    title: string;
    publishedAt: string;
    imageDescribe: string;
    image: string;
    content: string;
    tags: string[];
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

  interface PageType {
    firstPage: boolean;
    lastPage: boolean;
    empty: boolean;
    totalElements: number;
    totalPages: number;
    targetPage: number;
  }
  interface MagazineArticlePageType extends PageType {
    articles: ArticleType[];
  }
}

export {};
