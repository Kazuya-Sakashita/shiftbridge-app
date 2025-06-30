# ShiftBridge

Next.js × React × Prisma × Supabase で構築する
**学習コミュニティ型フォーラムアプリケーション**

---

## 📦 使用技術

- Next.js 14.2.3（App Router 対応の安定版）
- React 18.2.0
- Prisma ORM
- Supabase（Auth + DB + Storage）
- Tailwind CSS
- Radix UI
- Zod（バリデーション）

---

## 🏗️ ディレクトリ構成

```
src/
├── app/ # ページと API ルート
├── \_components/ # UI コンポーネント
├── \_lib/ # Prisma、Supabase クライアント
├── \_utils/ # 汎用関数
├── \_types/ # 型定義
├── prisma/ # Prisma の設定とマイグレーション
├── public/ # 静的ファイル
└── styles/ # グローバル CSS
```

## ⚙️ セットアップ手順

### 1️⃣ リポジトリをクローン

```
git clone git@github.com:Kazuya-Sakashita/shiftbridge-app.git
cd shiftbridge

npm install
```

### 3️⃣ 環境変数を設定

`.env.local` を作成して以下を追加

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### 4️⃣ Prisma のセットアップ

```
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ 開発サーバーを起動

→ `http://localhost:3000` にアクセス

## 🔐 認証

- Supabase の Auth（メール/パスワード）
- JWT ベースの認証
- 認証ガード（middleware）対応

---

## 🗃️ データベース

- Supabase の PostgreSQL
- Prisma でマイグレーション＆型安全管理

---

## 🚀 機能一覧

- ✅ ユーザー認証（メール/パスワード）
- ✅ フォーラム投稿（質問・コメント）
- ✅ 質問へのコメント・いいね
- ✅ プロフィール編集
- ✅ ロール管理（学生・卒業生・講師・管理者）
- ✅ 投稿の非公開設定
- ✅ Radix UI + Tailwind でモダン UI

---

## 🧑‍💻 コマンド一覧

| コマンド                 | 説明                         |
| ------------------------ | ---------------------------- |
| `npm run dev`            | 開発サーバー起動             |
| `npm run build`          | 本番ビルド                   |
| `npm run start`          | 本番サーバー起動             |
| `npx prisma studio`      | DB 管理 GUI（Prisma Studio） |
| `npx prisma migrate dev` | マイグレーションの作成と適用 |
| `npm run prisma:seed`    | シードデータ投入（必要なら） |

---

## 🌟 今後のアップデート予定

- 🔸 通知機能（リアルタイム）
- 🔸 ダッシュボード
- 🔸 ソーシャルログイン（Google、GitHub）
- 🔸 ダークモード強化

---

## 👨‍💻 制作者

- [@Kazuya-Sakashita](https://github.com/Kazuya-Sakashita)

---
