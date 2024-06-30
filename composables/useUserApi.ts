// 一般使用者
class userApi {
  static async register(params: RegisterRequestType): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      name: params.name,
      email: params.email,
      password: params.password
    };
    const res = await useApi('/user/register', {
      method: 'post',
      body
    });

    return res;
  }

  static async login(params: LoginRequestType): Promise<ApiResponseType<LoginRegisterResponseType>> {
    const body = {
      email: params.email,
      password: params.password
    };
    const res = await useApi('/user/login', {
      method: 'post',
      body
    });

    return res;
  }

  static async logout(): Promise<ApiResponseType<undefined>> {
    const res = await useApi('/user/logout', {
      method: 'post'
    });

    return res;
  }

  static async getUserInfo(userId: UserInfoType['id']): Promise<ApiResponseType<UserInfoType>> {
    const res = await useApi(`/user/info/${userId}`, {
      method: 'get'
    });

    return res;
  }

  static async getUserData(userId: UserInfoType['id']): Promise<ApiResponseType<UserDataType>> {
    const res = await useApi(`/user/data/${userId}`, {
      method: 'get'
    });

    return res;
  }

  static async updatePassword(params: { [key: string]: PasswordType }): Promise<ApiResponseType<undefined>> {
    const body = {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    };
    const res = await useApi('/user/password', {
      method: 'patch',
      body
    });

    return res;
  }

  static async getSubscriptionList(query?: TransactionIdType): Promise<ApiResponseType<SubscriptionOrderType[]>> {
    const params = {
      transactionId: query?.transactionId
    };
    const res = await useApi('/user/subscription', {
      method: 'get',
      params
    });

    return res;
  }

  static async updateUserInfo(params: {
    name?: UserInfoType['name'];
    birthday?: UserInfoType['birthday'];
    gender?: UserInfoType['gender'];
    avatar?: UserDataType['avatar'];
  }): Promise<ApiResponseType<UserInfoType>> {
    const body = {
      name: params.name,
      birthday: params.birthday,
      gender: params.gender,
      avatar: params.avatar
    };
    const res = await useApi('/user/info', {
      method: 'patch',
      body
    });

    return res;
  }

  static async getMagazineArticleQuota(
    articleId: ArticleType['articleId']
  ): Promise<ApiResponseType<MagazineArticleDetailResponseType>> {
    const res = await useApi(`/user/magazine-article-quota/${articleId}`, {
      method: 'get'
    });

    return res;
  }

  static async getMagazineArticleDetail(
    articleId: ArticleType['articleId']
  ): Promise<ApiResponseType<MagazineArticleDetailResponseType>> {
    const res = await useApi(`/user/magazine-article-detail/${articleId}`, {
      method: 'get'
    });

    return res;
  }

  static async getCollectPage(query: PageRequestType): Promise<ApiResponseType<ArticlePageType>> {
    const params = {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    const res = await useApi(`/user/collect-page`, {
      method: 'get',
      params
    });

    return res;
  }

  static async addCollectArticle(articleId: ArticleType['articleId']): Promise<ApiResponseType<undefined>> {
    const res = await useApi(`/user/collect-article/${articleId}`, {
      method: 'post'
    });

    return res;
  }

  static async deleteCollectArticle(articleId: ArticleType['articleId']): Promise<ApiResponseType<undefined>> {
    const res = await useApi(`/user/collect-article/${articleId}`, {
      method: 'delete'
    });

    return res;
  }

  static async addArticleComment(params: ArticleCommentRequestType): Promise<ApiResponseType<undefined>> {
    const body = {
      content: params.content
    };
    const res = await useApi(`/user/article-comment/${params.articleId}`, {
      method: 'post',
      body
    });

    return res;
  }

  static async deleteArticleComment(commentId: CommentType['id']): Promise<ApiResponseType<undefined>> {
    const res = await useApi(`/user/article-comment/${commentId}`, {
      method: 'delete'
    });

    return res;
  }

  static async getUserArticleCommentPage(
    query: PageRequestType
  ): Promise<ApiResponseType<ArticleCommentPageResponseType>> {
    const params = {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize
    };
    const res = await useApi(`/user/article-comment-page`, {
      method: 'get',
      params
    });

    return res;
  }

  static async getNoticeList(query: NoticePageRequestType): Promise<ApiResponseType<NoticePageResponseType>> {
    const params = {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      readState: query.readState
    };
    const res = await useApi(`/user/notice-list`, {
      method: 'get',
      params
    });

    return res;
  }

  static async readNotice(noticeId: NoticeType['id']): Promise<ApiResponseType<undefined>> {
    const res = await useApi(`/user/notice/${noticeId}`, {
      method: 'patch'
    });

    return res;
  }

  static async deleteAllNotice(readState: NoticePageRequestType['readState']): Promise<ApiResponseType<undefined>> {
    const params = {
      readState
    };
    const res = await useApi(`/user/notice`, {
      method: 'delete',
      params
    });

    return res;
  }

  static async uploadImage(file: File): Promise<ApiResponseType<UploadResponseType>> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await useApi(`/upload/image`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res;
  }

  static async getImageList(): Promise<ApiResponseType<UploadResponseType>> {
    const res = await useApi(`/upload/image`, {
      method: 'get'
    });
    return res;
  }

  static async getFollowNewsTopic(): Promise<ApiResponseType<string[]>> {
    const res = await useApi(`/user/follow-topic`, {
      method: 'get'
    });
    return res;
  }

  static async followNewsTopic(topic: string) {
    const params = {
      topic
    };
    const res = await useApi(`/user/follow-topic`, {
      method: 'post',
      params
    });

    return res;
  }

  static async deleteFollowNewsTopic(topic: string): Promise<ApiResponseType<undefined>> {
    const params = {
      topic
    };
    const res = await useApi(`/user/follow-topic`, {
      method: 'delete',
      params
    });

    return res;
  }
}

export default () => userApi;
