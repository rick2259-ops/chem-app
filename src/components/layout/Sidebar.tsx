'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/topics', label: 'Topics', icon: '📚' },
  { href: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { href: '/mechanisms', label: 'Mechanisms', icon: '⚗️' },
  { href: '/reactions', label: 'Reactions', icon: '🧪' },
  { href: '/quiz', label: 'Quizzes', icon: '✏️' },
  { href: '/drill', label: 'Drill Mode', icon: '🎯' },
  { href: '/exam', label: 'Practice Exam', icon: '📝' },
  { href: '/synthesis', label: 'Synthesis', icon: '🔬' },
  { href: '/tutor', label: 'AI Tutor', icon: '🤖' },
  { href: '/progress', label: 'Progress', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-800 border-r border-slate-700 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-bold text-white">
            ⚗
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">UCR Chem Trainer</div>
            <div className="text-xs text-slate-400">CHEM 008A / B / C</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Course badges */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Courses</div>
        <div className="space-y-1.5">
          {[
            { label: '008A — Orgo I', color: 'bg-blue-600' },
            { label: '008B — Orgo II', color: 'bg-green-600' },
            { label: '008C — Orgo III', color: 'bg-purple-600' },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-2 text-xs text-slate-400">
              <span className={`w-2 h-2 rounded-full ${c.color}`} />
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
