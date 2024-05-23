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
    tagetPage: number;
  }
  interface MagazineArticlePageType extends PageType {
    articles: [
      {
        articleId: string;
        topic: string[];
        title: string;
        publishedAt: string;
        image: string;
        tags: string[];
        editor: string;
        imageDescribe: string;
        source: {
          name: string;
          url: string;
        };
      }
    ];
  }
}

export {};
