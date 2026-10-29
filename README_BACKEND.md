# 聖誕探索號：即時同步後端

遊戲使用 Node.js、Express 與 Socket.IO 保存目前狀態，並同步主持人控制台和投影畫面。

## 本機啟動

在專案根目錄安裝前後端套件：

```bash
npm install
cd server && npm install && cd ..
npm run dev:all
```

前端預設使用 `http://localhost:3000`，後端預設使用 `http://localhost:3001`。只需啟動一端時，可分別執行 `npm run dev` 或 `npm run dev:server`。

若前後端部署在不同網址，請設定 `NEXT_PUBLIC_SERVER_URL` 指向 Socket.IO 後端，並設定後端的 `CLIENT_URL` 為前端來源。

## 同步事件

- `game:start`：開始新局並設定隊伍。
- `game:update`：套用遊戲狀態變更並廣播。
- `game:reset`：清除本局狀態並返回設定畫面。
- `game:state`：伺服器向連線中的畫面傳送最新狀態。

HTTP 健康檢查位於 `/api/health`，目前遊戲狀態位於 `/api/game`。
