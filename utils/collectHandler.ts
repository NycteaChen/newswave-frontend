export default async (articleId: ArticleType['articleId']) => {
  const pageLoadingBus = useEventBus('pageLoadingBus');

  const userStore = useUserStore();
  const { collects } = storeToRefs(userStore);

  const { addCollectArticle, deleteCollectArticle } = useUserApi();

  pageLoadingBus.emit(true);

  const isCollected = collects.value.includes(articleId);
  const type = isCollected ? 'cancel' : 'add';

  const { status, message } = isCollected ? await deleteCollectArticle(articleId) : await addCollectArticle(articleId);

  setTimeout(async () => {
    if (status) {
      await userStore.getUserData();
    }

    showToast({
      id: `${type}-collect-${status}`,
      icon: status ? '' : 'icon/warning.svg',
      message
    });

    pageLoadingBus.emit(false);
  }, 500);
};
