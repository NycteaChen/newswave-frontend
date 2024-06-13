export default (collect: boolean) => {
  showToast({
    id: 'collect-success',
    message: collect ? '收藏成功' : '取消收藏成功'
  });
  return collect;
  // showToast({
  //   id: 'copy-fail',
  //   icon: 'icon/warning.svg',
  //   message: '操作失敗'
  // });
};
