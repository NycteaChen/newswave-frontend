const responseHandler = ({ status = false, message = '', type = '' }) => {
  if (status) {
    showToast({
      id: `${type}-collect-success`,
      message
    });
  }
};

export default async (articleId: ArticleType['articleId']) => {
  const userStore = useUserStore();
  const { collects } = storeToRefs(userStore);

  const { addCollectArticle, deleteCollectArticle } = useUserApi();

  if (collects.value.includes(articleId)) {
    const { status, message } = await deleteCollectArticle(articleId);
    responseHandler({ status, message, type: 'cancel' });
  } else {
    const { status, message } = await addCollectArticle(articleId);
    responseHandler({ status, message, type: 'add' });
  }

  userStore.getUserData();
};
