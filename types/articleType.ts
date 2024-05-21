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

  interface MagazineArticlePageType {
    articles: [
      {
        articleId: String;
        title: String;
        tags: String;
        publishedAt: Number;
        image: String;
        source: {
          name: String;
          url: String;
        };
      }
    ];
    firstPage: Boolean;
    lastPage: Boolean;
    empty: Boolean;
    totalElements: Number;
    totalPages: Number;
    tagetPage: Number;
  }
}

export {};
