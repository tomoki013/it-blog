import { LoadingAnimation } from '@/components/ui/LoadingAnimation';

/**
 * Next.js App Router の規約に基づくグローバルな Loading UI。
 * Suspense のフォールバックとして自動的に使用される。
 */
export default function Loading() {
  // `LoadingAnimation` コンポーネントを呼び出すだけで、
  // 全画面表示のサイバーパンク風ローディング画面が実装される。
  return <LoadingAnimation />;
}
