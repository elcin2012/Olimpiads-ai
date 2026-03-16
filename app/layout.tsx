import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'olimpiads.ai',
  description: 'Онлайн-платформа олимпиад и AI-подготовки для школьников'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-indigo-700">olimpiads.ai</Link>
            <div className="flex gap-4 text-sm text-slate-600">
              <Link href="/olympiads" className="hover:text-indigo-700">Каталог</Link>
              <Link href="/dashboard/student" className="hover:text-indigo-700">Ученик</Link>
              <Link href="/dashboard/parent" className="hover:text-indigo-700">Родитель</Link>
              <Link href="/admin" className="hover:text-indigo-700">Админ</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
