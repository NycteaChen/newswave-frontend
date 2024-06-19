const homeFaq = [
  {
    title: 'NewsWave 是什麼？',
    content:
      'NewsWave 是一個致力於提供零廣告干擾的免費新聞閱讀應用程式，讓您能輕鬆快速地瀏覽世界最新動態，專注於真正重要的內容。無論何時何地，只要透過可連接網路的行動裝置，NewsWave 便能為您提供最新、最有價值的新聞資訊。'
  },
  {
    title: 'NewsWave可閱讀什麼樣內容？',
    content:
      'NewsWave 為您整理的六大熱門新聞主題，不論國際新聞、財經資訊、科技趨勢還是娛樂八卦，都能在 NewsWave 找到您想要的新聞！'
  },
  {
    title: 'NewsWave Plus 是什麼？',
    content:
      'NewsWave Plus 是 NewsWave 提供的訂閱服務，一個月最多只要 100 元，便能專享限定的雜誌內容，豐富您的閱讀生活。'
  }
];

const userFaq = [
  {
    title: 'NewsWave 會員有分級嗎？',
    content: 'NewsWave 會員分成一般會員與訂閱會員（即有訂閱 NewsWave Plus 服務的會員）。'
  },
  {
    title: 'NewsWave 會員可以使用什麼服務？',
    content:
      '會員可以自訂個性大頭貼、暱稱，並在文章內留言分享自己的看法、收藏喜歡的文章、追蹤感興趣的新聞主題，NewsWave 將會依據會員追蹤的主題推薦相關的新文章。一般會員可免費體驗 NewsWave Plus 服務，我們提供您 3 次雜誌文章的閱讀次數。'
  },
  {
    title: '一個會員只能免費體驗 3 次 NewsWave Plus 服務嗎？',
    content:
      '是的，一個會員只提供 3 次免費閱讀雜誌文章的額度，系統會依據您目前的訂閱狀態判斷，若您是已經訂閱會員，您的免費次數將不會受到影響，待方案到期使您的身份變成一般會員時，才需要用免費次數去閱讀雜誌文章。'
  }
];

const plusFaq = [
  {
    title: '可以在 NewsWave Plus 觀看什麼內容？',
    content:
      'NewsWave Plus 擁有各大雜誌商精選文章，主題超過 10 種以上，包括科技、娛樂、文藝、健康、時尚等熱門話題，隨時隨地盡情閱讀。'
  },
  {
    title: 'NewsWave Plus 如何計費？',
    content:
      '只要支付一筆固定月費，就能用您的行動裝置、電腦觀看 NewsWave Plus 提供的各大雜誌文章，各方案介於每月 80 元至 100 元，無額外費用。'
  },
  {
    title: '如何取消訂閱？',
    content:
      'NewsWave Plus 提供取消續訂服務，只需點個兩下輕鬆操作即可取消訂閱，無取消費用。您可至「會員中心」的「訂閱管理」取消續訂，您的 NewsWave Plus 服務將持續至最新一筆訂單的期限為止，待訂單到期時，系統會自動停止對您的帳戶扣款。'
  }
];

const planFaq = [...plusFaq];
planFaq.unshift(homeFaq[2]);

export default (type: 'home' | 'plan' | 'total') => {
  switch (type) {
    case 'home':
      return homeFaq;
    case 'plan':
      return planFaq;
    default:
      return [...homeFaq, ...userFaq, ...plusFaq];
  }
};
