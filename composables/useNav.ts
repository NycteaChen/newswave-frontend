const memberNav = [
  {
    title: '會員中心',
    routeName: ''
  },
  {
    title: '帳戶管理',
    routeName: 'account',
    childrenRoute: [
      {
        title: '修改個人資料',
        routeName: 'basic'
      },
      {
        title: '修改密碼',
        routeName: 'password'
      }
    ]
  },
  {
    title: '訂閱管理',
    routeName: 'subscription',
    childrenRoute: [
      {
        title: '訂閱資訊',
        routeName: 'info'
      },
      {
        title: '訂單記錄',
        routeName: 'order'
      }
    ]
  },
  {
    title: '文章管理',
    routeName: 'article',
    childrenRoute: [
      {
        title: '我的收藏',
        routeName: 'collect'
      },
      {
        title: '我的追蹤',
        routeName: 'follow'
      },
      {
        title: '我的留言',
        routeName: 'comment'
      }
    ]
  },
  {
    title: '通知中心',
    routeName: 'notification',
    childrenRoute: [
      {
        title: '最新公告',
        routeName: 'announcement'
      },
      {
        title: '我的通知',
        routeName: 'personal'
      }
    ]
  }
].map((e) => {
  const parentRouteName = `member${e.routeName ? `-${e.routeName}` : ''}`;
  let childrenRoute;
  if (e.childrenRoute?.length) {
    childrenRoute = e.childrenRoute.map((el) => ({
      ...el,
      routeName: `${parentRouteName}-${el.routeName}`
    }));
  }
  return {
    ...e,
    routeName: parentRouteName,
    childrenRoute
  };
});

const memberSubNav = memberNav.filter((e) => e.childrenRoute?.length);

export default () => ({
  memberNav,
  memberSubNav
});
