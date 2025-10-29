# IT Blog "CyberNote"

AI 駆動開発によって構築された、サイバーパンクとテック感をコンセプトにした IT ブログです。
Framer Motion を活用した独自性の高いアニメーションと心地よい UX を追求しています。

## ✨ 機能一覧

- **ブログ記事**: Markdown (`.mdx`) ファイルベースの記事投稿・表示機能。
- **シンタックスハイライト**: `rehype-pretty-code` と `shiki` を利用した、コードブロックのシンタックスハイライト。
- **ダークモード**: `next-themes` を利用した、OS 設定と連動するライト/ダークモード切替機能。
- **お問い合わせフォーム**: React v19 Server Actions と `useFormState` を活用した、モダンなフォーム実装。
- **独自 UI コンポーネント**: ネオン・グリッチエフェクトを多用した、デザインコンセプトに沿った UI。
- **パフォーマンス最適化**: `next/image`, `next/font`, Dynamic Imports などを活用したパフォーマンス最適化。

## 🛠️ 技術スタック

本プロジェクトは、以下の技術スタックで構築されています。`package.json` に記載のバージョンを正確に反映しています。

| カテゴリ       | 技術                                | バージョン |
| :------------- | :---------------------------------- | :--------- |
| **フレームワーク** | [Next.js](https://nextjs.org/)      | `16.0.1`   |
| **UI ライブラリ**  | [React](https://react.dev/)         | `19.2.0`   |
| **スタイリング**   | [Tailwind CSS](https://tailwindcss.com/) | `^4`        |
| **言語**         | [TypeScript](https://www.typescriptlang.org/) | `^5`       |
| **アニメーション** | [Framer Motion](https://www.framer.com/motion/) | `^12.23.24`      |
| **コンテンツ管理** | `fs` + `gray-matter`              | `^4.0.3`   |
| **MDX**        | [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) | `^5.0.0`   |
| **テーマ管理**     | [next-themes](https://github.com/pacocoursey/next-themes) | `^0.4.6`   |
| **バリデーション** | [Zod](https://zod.dev/)             | `^4.1.12`  |


## 🚀 セットアップと実行方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。
