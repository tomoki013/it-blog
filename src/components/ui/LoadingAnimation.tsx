'use client';

import clsx from 'clsx';
import { GlitchText } from './GlitchText';

type LoadingAnimationProps = {
  className?: string;
  fullScreen?: boolean;
};

/**
 * サイバーパンク風のローディングアニメーションを表示するコンポーネント
 * @param className 追加のCSSクラス
 * @param fullScreen 画面全体に表示するかどうか (デフォルト: true)
 */
export const LoadingAnimation = ({
  className,
  fullScreen = true,
}: LoadingAnimationProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center bg-[var(--color-dark-bg)]',
        fullScreen && 'fixed inset-0 z-50',
        className,
      )}
    >
      <div className="relative w-48 h-12">
        <div className="absolute top-0 left-0 w-full h-full border border-[var(--color-primary)] animate-pulse" />
        <div
          className="absolute top-0 left-0 w-full h-full bg-[var(--color-primary)] opacity-10 animate-flicker"
          style={{ animationDelay: '0.2s' }}
        />
        <GlitchText text="LOADING..." as="div" className="text-2xl" />
      </div>
      <style jsx>{`
        @keyframes flicker {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-flicker {
          animation: flicker 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
