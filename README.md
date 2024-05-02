# NewsWave-Frontend

<img width="500" src="https://i.imgur.com/4ARRsXj.jpeg" />

- DEMO: [NewsWave Website](https://newswave-frontend.onrender.com/)

## Features

Test Account

```bash
Account： user@gmail.com
Password： user1234
```

- [x] Login
- [x] Logout
...

## Views

![範例圖片 1](https://fakeimg.pl/500/)
![範例圖片 2](https://fakeimg.pl/500/)
![範例圖片 3](https://fakeimg.pl/500/)

## Install

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`16.15.0` 以上...

### 取得專案

```bash
git clone git@github.com:hsiangfeng/README-Example-Template.git
```

### 移動到專案內

```bash
cd README-Example-Template
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
npm run serve
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```

## 環境變數說明

```env
APIPATH= # API 位置
COUSTOMPATH= # 自訂變數
...
```

## Files

- views - 畫面放置處
- assets - 靜態資源放置處
  - scss - scss 檔案放置處
  - images - 圖片放置處
...

## Technologies

- Node.js v16.15.0
- Vue v3.2.20
- Vite v4.0.4
- Vue Router v4.0.11
- Axios v0.24.0
- Bootstrap v5.1.3
...

## Third-party Service

- Algolia
- Google Analytics
...

## CI/CD

此專案有使用 Github Actions，所以發起 PR 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
...

當專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
- 部署到 Github Pages
...

## Development Team

- [chsiyu](https://github.com/sihyun-user)
- [chrisT](https://github.com/r37111081)
- [Ciel](https://github.com/NycteaChen)
- [kiki880409](https://github.com/kiki880409)
- [Alan](https://github.com/LOOFOO)
