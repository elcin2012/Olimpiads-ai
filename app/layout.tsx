import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Олимпиадный AI ассистент',
  description: 'MVP-платформа для генерации и разбора олимпиадных задач'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-indigo-700">Олимпиадный AI</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/workspace" className="hover:text-indigo-700">Рабочая зона</Link>
              <Link href="/admin" className="hover:text-indigo-700">Debug</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
