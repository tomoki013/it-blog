# 🤖 AI 駆動開発ガイドライン (統合版)

このファイルは、AI（Gemini もしくは Jules）と共同でこの IT ブログプロジェクトを開発する上でのルールと共通認識を定義するものです。

Gemini もしくは Jules に開発を依頼する際は、**必ずこのガイドラインを前提とするよう指示してください。**

## 1. プロジェクト概要

- **目的**: 筆者の備忘録兼ポートフォリオとしての IT ブログ。
- **デザインコンセプト**: **「サイバーパンク感」** と **「テック感」** の共存。ネオンカラー、グリッチエフェクト、独自アニメーションを多用し、デザイン性を最優先する。
- **UI/UX**: Framer Motion による**独自性の高いアニメーション**と**心地よい UX**を追求する。

## 2. 厳守すべき技術スタック (絶対)

生成するコードは、必ず以下の最新スタックに基づいている必要があります。

- **Next.js**: **v16** (App Router)
- **React**: **v19** (Actions, `useFormState`, `use` の活用)
- **Tailwind CSS**: **v4**
- **コンテンツ管理**: **`fs` + `gray-matter`**
- **MDX レンダリング**: **`next-mdx-remote`**
- **テーマ管理**: **`next-themes`**
- **アニメーション**: **`framer-motion`**

## 3. コーディング規約

### 3-1. Tailwind CSS (最重要)

- **`tailwind.config.ts` は存在しません。**
- Tailwind v4 の規約に従い、`tailwind.config.ts` を**作成・参照するコードは禁止**します。
- カスタムテーマ（色、フォントなど）や `darkMode: 'class'` の設定は、すべて **`src/app/global.css`** 内の `@theme` ルールで定義します。
- スタイルクラスの結合には `clsx` （または `tailwind-merge`）の使用を推奨します。

### 3-2. TypeScript とコンテンツ管理

- **`"strict": true` 必須**: `tsconfig.json` の `strict` モードは常に `true` とします。
- **`any` の禁止**: `any` 型の使用は原則禁止します。型が不明な場合は `unknown` を使用し、型ガードを行ってから使用します。
- **記事データ取得**: 記事データの取得は、`src/lib/posts.ts` に実装された関数 (`getPostData`, `getAllPostSlugs` など) を介して行います。
- **MDX レンダリング**: 記事本文のレンダリングには `next-mdx-remote` を使用します。
  - シンタックスハイライトには `rehype-pretty-code` と `shiki` を使用します。

### 3-3. ディレクトリ構造

- **`src` ディレクトリ** を使用します。
- **`posts` ディレクトリ** はプロジェクトルートに配置します。
- **コンポーネント配置**:
  - `src/components/common/`: 汎用部品 (Button, Icon)
  - `src/components/ui/`: 独自 UI (NeonCard, NeonProgressBar, GlitchText)
  - `src/components/layout/`: Header, Footer, Sidebar
  - `src/components/features/`: 機能単位 (SearchModal, ContactForm, DarkModeToggle)
  - `src/components/pages/`: ページ固有 (AboutMeProfile)
- **サーバーロジック**:
  - `src/lib/`: 汎用ヘルパー関数、DB 接続、記事取得ロジック (`posts.ts`)
  - `src/actions/`: React v19 Server Actions (`.ts` ファイル)
- **型定義**: グローバルな型定義は `src/types/` に配置します。

なお、このガイドラインは本リポジトリの現状構成に基づいて作成されています。参考までに本リポジトリの `src/app` は主に次のような構成になっています：

- `src/app/globals.css`（グローバルスタイル）
- `src/app/layout.tsx`（アプリ全体のレイアウト）
- `src/app/page.tsx`（トップページ）
- `src/app/(pages)/`（ページ群のセグメント）
  - `about/`, `blog/`, `contact/`, `cookie-policy/`, `privacy-policy/`, `terms-of-service/` などのルートページ
- `src/components/`（UI・機能コンポーネント群）

この実ディレクトリ構成を前提に、上記ルール（Server Component 優先や Client Component の分離、`src/lib/posts.ts` 経由での記事取得など）に従って実装してください。

### 3-4. React v19 と App Router

- **フォーム処理**: お問い合わせフォーム（`ContactForm`）は、**React v19 Server Actions** と **`useFormState`** フックを使用して実装します。
  - `src/app/api/route.ts` を使う従来の方法は採用しません。
- **サーバーコンポーネント (RSC) の優先**:
  - デフォルトはすべて**サーバーコンポーネント**として記述します。
  - `'use client'` ディレクティブは、フック (`useState`, `useEffect`, `useContext`等) やイベントハンドラ (`onClick`等) が必要なコンポーネントにのみ、**ファイルの先頭**に記述します。
- **Client Component の最小化**:
  - `'use client'` を記述するコンポーネントは、可能な限り小さく保ちます。
  - インタラクティブな部分だけを別の Client Component として切り出し、親となる Server Component から`children`または Props として渡す設計（"Leave in the Leaves" パターン）を厳守します。

### 3-5. パフォーマンス最適化

- **`next/image`**: すべての `<img>` タグは、`next/image` コンポーネントに置き換えます。`width`, `height`, `alt` 属性は必須です。
- **`next/font`**: すべての Web フォントは `next/font` を使用して最適化し、`src/app/layout.tsx` で適用します。
- **Dynamic Imports**: 初期表示に不要な重いコンポーネント（例：`SearchModal` や記事本文 `ArticleBody`）は、`next/dynamic` を使用して動的インポート（遅延読み込み）します。

### 3-6. Error と Loading

- **`loading.tsx`**: 主要なルートセグメント（例: `src/app/blog/[slug]/loading.tsx`）には `loading.tsx` ファイルを作成し、`Suspense` を利用したローディング UI（スケルトンなど）を実装します。
- **`error.tsx`**: ルートセグメント単位で `error.tsx` ファイルを作成し、エラーバウンダリを実装します。

### 3-7. コード品質

- **`console.log` の削除**: デバッグ用の `console.log` は、マージ前にすべて削除します。
- **コメントアウトされたコードの削除**: 不要なコメントアウトされたコードはすべて削除します。（Git の履歴で管理します）
- **JSDoc**: `src/lib/` や `src/actions/` 内の関数、複雑なロジックを持つカスタムフックには、JSDoc 形式でパラメータと戻り値のコメントを追加します。

## 4. AI への指示（プロンプト）のルール

- 依頼時は、この `GEMINI.md`（統合版ガイドライン）を参照することを明示してください。
- コンポーネント作成を依頼する際は、上記のディレクトリ構造（例: `src/components/ui/NeonCard.tsx`）を指定してください。
- デザインコンセプト（サイバーパンク、ネオン）を頻繁にリマインドし、生成される Tailwind のクラス名に反映させてください。
- （例: `text-cyan-400`, `shadow-[0_0_15px_rgba(0,255,255,0.7)]`, `border-cyan-500`）

## 5. README.md の整備

- 開発の進捗に応じて、`README.md` の更新も依頼します。
- `README.md` には、使用技術、セットアップ方法、機能一覧を必ず含めます。

---

## 6. 本ガイドラインへの追記について

本プロジェクトの開発を通じて、このガイドラインに記載すべき新たなルールや知見（例：特定のライブラリの画期的な使い方、プロジェクト固有の注意点など）が生まれた場合は、開発担当者（AI もしくは人間）が適宜このファイルに追記・更新するものとします。

## 7. README.md の確認

開発終了後、都度 `README.md` を確認し、必要であれば修正・追加の作業を行ってください。ただし、必要ない場合はそのままで問題ありません。
