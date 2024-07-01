export default async (articleId: ArticleType['articleId']) => {
  const userStore = useUserStore();
  const { collects } = storeToRefs(userStore);

  const { addCollectArticle, deleteCollectArticle } = useUserApi();

  const isCollected = collects.value.includes(articleId);
  const type = isCollected ? 'cancel' : 'add';

  const { status, message } = isCollected ? await deleteCollectArticle(articleId) : await addCollectArticle(articleId);

  if (status) {
    await userStore.getUserData();
  }

  showToast({
    id: `${type}-collect-${status}`,
    type: status ? 'success' : 'warning',
    message
  });
};
