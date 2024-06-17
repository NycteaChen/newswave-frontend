const memberNav: NavItemWithSubType[] = [
  {
    label: '會員中心',
    value: ''
  },
  {
    label: '帳戶管理',
    value: 'account',
    childrenRoute: [
      {
        label: '修改個人資料',
        value: 'basic'
      },
      {
        label: '修改密碼',
        value: 'password'
      }
    ]
  },
  {
    label: '訂閱管理',
    value: 'subscription',
    childrenRoute: [
      {
        label: '訂閱資訊',
        value: 'info'
      },
      {
        label: '訂單記錄',
        value: 'order'
      }
    ]
  },
  {
    label: '文章管理',
    value: 'article',
    childrenRoute: [
      {
        label: '我的收藏',
        value: 'collect'
      },
      {
        label: '我的追蹤',
        value: 'follow'
      },
      {
        label: '我的留言',
        value: 'comment'
      }
    ]
  },
  {
    label: '通知中心',
    value: 'notification',
    badge: 'notice',
    childrenRoute: [
      {
        label: '最新公告',
        value: 'announcement'
      },
      {
        label: '我的通知',
        value: 'personal',
        badge: 'notice'
      }
    ]
  }
].map((e) => {
  const parentRouteName = `member${e.value ? `-${e.value}` : ''}`;
  let childrenRoute;
  if (e.childrenRoute?.length) {
    childrenRoute = e.childrenRoute.map((el) => ({
      ...el,
      value: `${parentRouteName}-${el.value}`
    }));
  }
  return {
    ...e,
    childrenRoute
  };
});

const memberSubNav = memberNav.filter((e) => e.childrenRoute?.length);

const newsNav: NavItemType[] = ['首頁', '國際', '社會', '科技', '財經', '體育', '娛樂']
  .map((e, index) => ({
    label: e,
    value: index ? `/news?category=${e}` : '/news',
    badge: ''
  }))
  .concat({ label: '精選雜誌', value: '/magazine', badge: 'Plus' });

export default () => ({
  memberNav,
  memberSubNav,
  newsNav
});
