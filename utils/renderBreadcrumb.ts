export default (): NavItemType[] => {
  const route = useRoute();
  const { newsNav } = useNav();
  const guestStore = useGuestStore();
  const { magazineCategoryList } = storeToRefs(guestStore);

  let list: NavItemType[] = [];

  const { category = '' } = route.name === 'news' ? route.query : route.params;

  // 新聞
  if (category !== '首頁' && newsNav.some((e) => e.label === String(category))) {
    list = newsNav.filter((e) => e.label === '首頁' || e.label === String(category));
    // 雜誌
  } else if (magazineCategoryList.value?.some((e) => e.categoryId === String(category))) {
    list = newsNav.filter((e) => e.label === '精選雜誌');
    const magazineItem = magazineCategoryList.value?.find((e) => e.categoryId === String(category));
    list.push({
      label: magazineItem?.categoryName || '',
      value: `/magazine/${magazineItem?.categoryId}`
    });
  } else if (route.name === 'search') {
    list = newsNav.filter((e) => e.label === '首頁');
    list.push({
      label: '搜尋',
      value: ''
    });
  } else {
    list = [];
  }

  return list;
};
