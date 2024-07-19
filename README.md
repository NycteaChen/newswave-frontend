# NewsWave

<!-- 底下標籤來源參考寫法可至：https://github.com/Envoy-VC/awesome-badges#github-stats -->

![start](https://img.shields.io/github/stars/r37111081/newswave-backend.svg)｜
![forks](https://img.shields.io/github/forks/r37111081/newswave-backend.svg)｜
![issues-pr](https://img.shields.io/github/issues-pr/r37111081/newswave-backend.svg)｜
![issues](https://img.shields.io/github/issues/r37111081/newswave-backend.svg)


<img width="500" src="https://i.imgur.com/4ARRsXj.jpeg" />

- DEMO: [NewsWave](https://newswave-92gm.onrender.com/)

NewsWave 是一個提供零廣告干擾的免費新聞閱讀應用程式，無論何時何地，只要透過可連接網路的行動裝置，NewsWave 便能為您提供最新、最有價值的新聞資訊。會員可收藏喜歡的文章、與其他用戶留言互動、追蹤有興趣的新聞主題，系統將推播最新相關文章通知，除此之外，會員亦可透過訂閱制服務無限制觀看精選雜誌專欄文章，打造專屬於使用者的閱讀之旅。

## 測試帳號

```bash
Account： user@gmail.com
Password： user1234
```

## 畫面

![首頁](https://i.imgur.com/YHTYhNt.png)
![新聞列表](https://i.imgur.com/X5SMoos.png)
![會員中心](https://images.cakeresume.com/post-images/60d46732-fb97-4cf3-81d9-91e964dcdba0.png)

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`18.17.1` 以上

### 取得專案

```bash
git clone https://github.com/NycteaChen/newswave-frontend.git
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:4000/
```

## 環境變數說明

```env
NODE_ENV= # 區分開發環境或正式環境(development、production)
NUXT_PUBLIC_API_BASE= # api 域名，請參照後台專案的 localhost: https://github.com/r37111081/newswave-backend
NUXT_SOCKET_BASE= # socket 域名，請參照後台專案的 localhost: https://github.com/r37111081/newswave-backend
NUXT_PUBLIC_WEATHER_KEY= # 中央氣象局 api key，需自行至中央氣象局產生 auth key
```

## 資料夾

- assets - 靜態資源放置處
  - scss - scss 檔案放置處
  - image - 圖片放置處
  - sprite
    - svg - svg icon 放置處
- components - 拆分元件放置處
  - _pages - 頁面獨有元件
  - 全域共用元件
- composables - 通用功能放置處（例：API）
- layouts - 頁面佈局
- middleware - 頁面身份驗證
- pages - 頁面路由
- plugins - 擴充插件、搭配 Composables、Provide 定義全局變數
- public - 靜態資源放置處 ( favicon、robots.txt）
- stores - pinia 狀態管理
- types - 全域共用 type 放置處
- utils - 自訂共用方法
- .env - 環境變數
- nuxt.config.js - nuxt 3 設定


## Technologies

- Node.js v18.17.1
- Vue v3.4.21
- Vue-router v4.3.0
- Nuxt v3.11.2
- Pinia v2.1.7
- Bootstrap v5.3.3
- Socket.io-client v1.2.2
- Vueuse v10.9.0
- Nuxt-swiper: v1.2.2
- Nuxt-svg-sprite: v1.0.2


## Third-party Service

- 綠界 ECPay
- 中央氣象局天氣預報 API


## Codeing Style Tools

- Eslint v8.57.0
- Stylelint v16.4.0
- Prettier v3.2.5
- Husky v8.0.0
- Lint-staged v15.2.2

## CI/CD

此專案有使用 Render 服務部屬，當專案 merge 到 master 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 部署到 render

## 開發團隊

- [chsiyu](https://github.com/sihyun-user)
- [chrisT](https://github.com/r37111081)
- [Ciel](https://github.com/NycteaChen)
- [kiki880409](https://github.com/kilee0409)
- [Alan](https://github.com/LOOFOO)
