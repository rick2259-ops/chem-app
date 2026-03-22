import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import SupabaseHydrator from '@/components/SupabaseHydrator';
import AuthGate from '@/components/AuthGate';

export const metadata: Metadata = {
  title: 'UCR Chem Trainer | CHEM 008A/B/C',
  description: 'Ace your UCR Organic Chemistry course with AI-powered study tools',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-900">
        <AuthGate>
          <SupabaseHydrator />
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen overflow-auto">
            {children}
          </main>
        </AuthGate>
      </body>
    </html>
  );
}
