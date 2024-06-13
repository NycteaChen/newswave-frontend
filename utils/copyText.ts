export default async ({ text = '', message = '' }) => {
  if (text) {
    await navigator.clipboard.writeText(text);
    showToast({
      id: 'copy-success',
      message: message || '複製成功'
    });
  } else {
    showToast({
      id: 'copy-fail',
      icon: 'icon/warning.svg',
      message: '複製文字失敗'
    });
  }
};
