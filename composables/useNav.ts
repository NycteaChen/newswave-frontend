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
        value: 'basic',
        img: 'icon/basic.svg'
      },
      {
        label: '修改密碼',
        value: 'password',
        img: 'icon/password.svg'
      }
    ]
  },
  {
    label: '訂閱管理',
    value: 'subscription',
    childrenRoute: [
      {
        label: '訂閱資訊',
        value: 'info',
        img: 'icon/info.svg'
      },
      {
        label: '訂單記錄',
        value: 'order',
        img: 'icon/order.svg'
      }
    ]
  },
  {
    label: '文章管理',
    value: 'article',
    childrenRoute: [
      {
        label: '我的收藏',
        value: 'collect',
        img: 'icon/collect.svg'
      },
      {
        label: '我的追蹤',
        value: 'follow',
        img: 'icon/follow.svg'
      },
      {
        label: '我的留言',
        value: 'comment',
        img: 'icon/member-comment.svg'
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
        value: 'announcement',
        img: 'icon/announcement.svg'
      },
      {
        label: '我的通知',
        value: 'personal',
        badge: 'notice',
        img: 'icon/personal.svg'
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

const newsNav: NavItemType[] = ['首頁', ...newsCategory()]
  .map((e, index) => ({
    label: e,
    value: index ? `/news?category=${e}` : '/news',
    badge: '',
    img: ''
  }))
  .concat({ label: '精選雜誌', value: '/magazine', badge: 'Plus', img: '' });

export default () => ({
  memberNav,
  memberSubNav,
  newsNav
});
