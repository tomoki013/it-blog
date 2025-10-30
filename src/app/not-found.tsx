import Link from 'next/link';
import { GlitchText } from '@/components/ui/GlitchText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-dark-bg)] text-[var(--color-text-light)] p-4">
      <main className="text-center">
        <GlitchText as="h1" text="404" className="text-7xl md:text-9xl" />
        <p className="mt-4 text-lg md:text-xl text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
          System Error // Page Not Found
        </p>
        <p className="mt-2 text-sm text-[var(--color-secondary)] animate-pulse">
          [trans-com.net] connection terminated.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 font-mono text-lg uppercase border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-dark-bg)] hover:shadow-[0_0_20px_var(--color-primary)]"
        >
          &gt; Return to Base
        </Link>
      </main>
      <footer className="absolute bottom-4 text-xs text-[var(--color-text-muted)] font-mono">
        <p>REASON: Request timed out. Resource locator is invalid.</p>
      </footer>
    </div>
  );
}
