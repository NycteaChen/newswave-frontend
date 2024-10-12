# NewsWave

<!-- 底下標籤來源參考寫法可至：https://github.com/Envoy-VC/awesome-badges#github-stats -->

![start](https://img.shields.io/github/stars/r37111081/newswave-backend.svg)｜
![forks](https://img.shields.io/github/forks/r37111081/newswave-backend.svg)｜
![issues-pr](https://img.shields.io/github/issues-pr/r37111081/newswave-backend.svg)｜
![issues](https://img.shields.io/github/issues/r37111081/newswave-backend.svg)


<img width="500" src="https://i.imgur.com/4ARRsXj.jpeg" />

- DEMO 1: https://newswave-frontend.onrender.com/
- DEMO 2: https://newswave-92gm.onrender.com/


NewsWave is a free news reading app that offers an ad-free experience. No matter when or where, as long as you have an internet-connected mobile device, NewsWave provides you with the latest and most valuable news updates. Members can bookmark their favorite articles, interact with other users through comments, and follow topics of interest, with the system sending notifications about related news updates. Additionally, through a subscription service, members can enjoy unlimited access to selected magazine columns, creating a personalized reading journey tailored to each user's preferences.

NewsWave 是一個提供零廣告干擾的免費新聞閱讀應用程式，無論何時何地，只要透過可連接網路的行動裝置，NewsWave 便能為您提供最新、最有價值的新聞資訊。會員可收藏喜歡的文章、與其他用戶留言互動、追蹤有興趣的新聞主題，系統將推播最新相關文章通知，除此之外，會員亦可透過訂閱制服務無限制觀看精選雜誌專欄文章，打造專屬於使用者的閱讀之旅。

## Test Account

```bash
Account： user@gmail.com
Password： user1234
```

## Views

### Home
![Home](https://i.imgur.com/YHTYhNt.png)

### News List
![News list](https://i.imgur.com/X5SMoos.png)

### Register
![Register](https://i.imgur.com/oKYooFQ.png)

### Magazine List & Notification
![Magazine list & notice](https://i.imgur.com/ErHtPRx.png)

### Member Center
![Member center](https://images.cakeresume.com/post-images/60d46732-fb97-4cf3-81d9-91e964dcdba0.png)

## Install

Node.js at least `v18.17.1`

### Clone repo

```bash
git clone https://github.com/NycteaChen/newswave-frontend.git
```

### Install package

```bash
npm install
```

### Env setting

Please enter `cp .env.example .env` in the terminal to copy the .env.example file and adjust the relevant fields according to the contents of `.env`.

### Run repo

```bash
npm run dev
```

```bash
http://localhost:4000/
```

## About Env

```env
NODE_ENV= # (development、production)
NUXT_PUBLIC_API_BASE= # api domain, follow the backend repo localhost: https://github.com/r37111081/newswave-backend
NUXT_SOCKET_BASE= # socket domain, follow the backend repo localhost: https://github.com/r37111081/newswave-backend
NUXT_PUBLIC_WEATHER_KEY= # Central Weather Administration api key
```

## Files

- assets - Static resource
  - scss 
  - image
  - sprite
    - svg - Svg icons
- components 
  - _pages - Page components
  - Global components
- composables - General functions（e.g. Api）
- layouts 
- middleware - Router auth
- pages - Page router view
- plugins
- public - Favicon, robots.txt
- stores - Pinia store
- types - Global Type 
- utils - Custom sharing method
- .env 
- nuxt.config.js


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

- ECPay
- Central Weather Administration API


## Codeing Style Tools

- Eslint v8.57.0
- Stylelint v16.4.0
- Prettier v3.2.5
- Husky v8.0.0
- Lint-staged v15.2.2

## CI/CD

Use Render to auto-build, when merging to master :

- Build Node.js environment
- Install package
- Compile code
- Build to Render

## Development Team

- [chsiyu](https://github.com/sihyun-user)
- [chrisT](https://github.com/r37111081)
- [Ciel](https://github.com/NycteaChen)
- [kiki880409](https://github.com/kilee0409)
- [Alan](https://github.com/LOOFOO)
