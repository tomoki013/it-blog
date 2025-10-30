'use client';

import { useId } from 'react';
import clsx from 'clsx';

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
};

/**
 * サイバーパンク風のグリッチアニメーションをテキストに適用するコンポーネント
 * @param text 表示するテキスト
 * @param className 追加のCSSクラス
 * @param as レンダリングするHTML要素 (デフォルト: 'div')
 */
export const GlitchText = ({
  text,
  className,
  as: Component = 'div',
}: GlitchTextProps) => {
  const id = useId();
  const keyframes = `
    @keyframes glitch-top-${id} {
      2%, 64% { transform: translate(2px, -2px); }
      4%, 60% { transform: translate(-2px, 2px); }
      62% { transform: translate(13px, -1px) skew(-13deg); }
    }
    @keyframes glitch-bottom-${id} {
      2%, 64% { transform: translate(-2px, 0); }
      4%, 60% { transform: translate(-2px, 0); }
      62% { transform: translate(-22px, 5px) skew(21deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <Component
        className={clsx('glitch-container', className)}
        style={{
          '--glitch-text': `"${text}"`,
        } as React.CSSProperties}
      >
        <span
          className="glitch-main"
          style={{
            animation: `glitch-top-${id} 1s linear infinite`,
            animationTimingFunction: 'steps(2, end)',
          }}
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="glitch-after"
          style={{
            '--glitch-text': `"${text}"`,
            animation: `glitch-bottom-${id} 1.5s linear infinite`,
            animationTimingFunction: 'steps(2, end)',
          } as React.CSSProperties}
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="glitch-before"
          style={{
            '--glitch-text': `"${text}"`,
          } as React.CSSProperties}
        >
          {text}
        </span>
      </Component>
      <style jsx>{`
        .glitch-container {
          position: relative;
          color: var(--color-primary);
          font-family: var(--font-mono);
          text-transform: uppercase;
          font-size: var(--font-size-5xl);
          font-weight: 700;
        }

        .glitch-main,
        .glitch-after,
        .glitch-before {
          display: block;
          position: relative;
          text-shadow: 0 0 5px var(--color-primary), 0 0 15px var(--color-primary);
        }

        .glitch-after,
        .glitch-before {
          content: var(--glitch-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-dark-bg);
          overflow: hidden;
        }

        .glitch-before {
          left: 2px;
          text-shadow: -1px 0 var(--color-secondary);
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-after {
          left: -2px;
          text-shadow: -1px 0 var(--color-accent), 1px 1px var(--color-lime);
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }
      `}</style>
    </>
  );
};

export default GlitchText;
