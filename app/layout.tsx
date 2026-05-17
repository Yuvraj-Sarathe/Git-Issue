import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
// Removed GeistSans import: package not present in build environment
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Global Issue Explorer',
  description: 'Git Issue — cross-repo GitHub issue search',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={syne.variable}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[var(--ground)] text-[var(--text-primary)] selection:bg-[var(--primary)]/20"
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[var(--primary)]/5 blur-[150px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/5 blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-emerald-500/4 blur-[120px]" />
        </div>
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.025] -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />
        {children}
      </body>
    </html>
  );
}
