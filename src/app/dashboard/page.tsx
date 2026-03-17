'use client';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { courses } from '@/data/courses';

const courseColors: Record<string, { bar: string; badge: string; border: string }> = {
  CHEM008A: { bar: 'bg-blue-500', badge: 'bg-blue-600', border: 'border-blue-500/30' },
  CHEM008B: { bar: 'bg-green-500', badge: 'bg-green-600', border: 'border-green-500/30' },
  CHEM008C: { bar: 'bg-purple-500', badge: 'bg-purple-600', border: 'border-purple-500/30' },
};

const actionIcons: Record<string, string> = {
  quiz: '✏️',
  flashcards: '🃏',
  mechanism: '⚗️',
  tutor: '🤖',
};

const actionLabels: Record<string, string> = {
  quiz: 'Practice Quiz',
  flashcards: 'Review Cards',
  mechanism: 'View Mechanism',
  tutor: 'Ask AI Tutor',
};

const actionHrefs: Record<string, (topicId: string) => string> = {
  quiz: (topicId) => `/quiz/${topicId}`,
  flashcards: (topicId) => `/flashcards`,
  mechanism: (topicId) => `/mechanisms`,
  tutor: (topicId) => `/tutor`,
};

export default function DashboardPage() {
  const { progress, weakAreas, isLoaded, getCourseScore } = useProgress();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalSessions = progress.studySessions.length;
  const avgScore =
    Object.values(progress.topicScores).length > 0
      ? Math.round(
          Object.values(progress.topicScores).reduce((sum, s) => sum + s.averageScore, 0) /
            Object.values(progress.topicScores).length
        )
      : 0;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400 text-lg animate-pulse">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Welcome back! 👋</h1>
        <p className="text-slate-400">{today}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="text-slate-400 text-sm mb-1">Study Sessions</div>
          <div className="text-3xl font-bold text-white">{totalSessions}</div>
          <div className="text-slate-500 text-xs mt-1">total sessions logged</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="text-slate-400 text-sm mb-1">Average Score</div>
          <div className="text-3xl font-bold text-white">{avgScore}%</div>
          <div className="text-slate-500 text-xs mt-1">across all topics</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-orange-500/30 p-5">
          <div className="text-slate-400 text-sm mb-1">Study Streak 🔥</div>
          <div className="text-3xl font-bold text-orange-400">
            {progress.studyStreak.currentStreak}
          </div>
          <div className="text-slate-500 text-xs mt-1">
            day streak · best: {progress.studyStreak.longestStreak} days
          </div>
        </div>
      </div>

      {/* Course progress */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Course Progress</h2>
        <div className="grid grid-cols-3 gap-4">
          {courses.map(course => {
            const score = getCourseScore(course.id);
            const colors = courseColors[course.id];
            const topicsStudied = course.topics.filter(
              t => !!progress.topicScores[t.id]
            ).length;
            return (
              <div
                key={course.id}
                className={`bg-slate-800 rounded-xl border ${colors.border} p-5 hover:bg-slate-750 transition-colors`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white text-sm">{course.name}</div>
                    <div className="text-xs text-slate-400">{course.subtitle}</div>
                  </div>
                  <span className={`${colors.badge} text-white text-xs font-bold px-2 py-1 rounded-lg`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <div
                    className={`${colors.bar} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500">
                  {topicsStudied} / {course.topics.length} topics studied
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Weak areas */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Areas to Improve</h2>
            <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
              Top {Math.min(weakAreas.length, 3)}
            </span>
          </div>
          {weakAreas.length === 0 ? (
            <div className="text-slate-400 text-sm py-4 text-center">
              🎉 No weak areas detected! Keep it up.
            </div>
          ) : (
            <div className="space-y-3">
              {weakAreas.slice(0, 3).map(area => {
                const reasonColors: Record<string, string> = {
                  'not-practiced': 'text-orange-400 bg-orange-400/10',
                  'low-score': 'text-red-400 bg-red-400/10',
                  'declining': 'text-yellow-400 bg-yellow-400/10',
                  'due-for-review': 'text-blue-400 bg-blue-400/10',
                };
                const reasonLabels: Record<string, string> = {
                  'not-practiced': 'Not started',
                  'low-score': 'Low score',
                  'declining': 'Declining',
                  'due-for-review': 'Due for review',
                };
                return (
                  <div key={area.topicId} className="flex items-center justify-between gap-3 p-3 bg-slate-750 rounded-lg border border-slate-700">
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{area.topicTitle}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${reasonColors[area.reason] || 'text-slate-400 bg-slate-700'}`}>
                          {reasonLabels[area.reason] || area.reason}
                        </span>
                        {area.averageScore > 0 && (
                          <span className="text-xs text-slate-500">{area.averageScore}% avg</span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={actionHrefs[area.recommendedAction]?.(area.topicId) ?? '/dashboard'}
                      className="flex-shrink-0 flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span>{actionIcons[area.recommendedAction]}</span>
                      <span>{actionLabels[area.recommendedAction]}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          {weakAreas.length > 0 && (
            <Link
              href="/drill"
              className="block text-center text-sm font-medium bg-orange-600 hover:bg-orange-500 text-white rounded-lg py-2 mt-4 transition-colors"
            >
              🎯 Start Drill on Weak Areas
            </Link>
          )}
          <Link href="/progress" className="block text-center text-xs text-blue-400 hover:text-blue-300 mt-3 transition-colors">
            View all weak areas →
          </Link>
        </div>

        {/* Quick actions */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/plan', icon: '📋', label: 'My Study Plan', desc: 'Personalized next steps', color: 'hover:border-cyan-500/50 hover:bg-cyan-600/10' },
              { href: '/guide', icon: '🧭', label: 'Study Guide', desc: 'What to memorize & why', color: 'hover:border-indigo-500/50 hover:bg-indigo-600/10' },
              { href: '/quiz', icon: '✏️', label: 'Start Quiz', desc: 'Test your knowledge', color: 'hover:border-blue-500/50 hover:bg-blue-600/10' },
              { href: '/flashcards', icon: '🃏', label: 'Flashcards', desc: 'Spaced repetition', color: 'hover:border-green-500/50 hover:bg-green-600/10' },
              { href: '/mechanisms', icon: '⚗️', label: 'Mechanisms', desc: 'Step-by-step reactions', color: 'hover:border-purple-500/50 hover:bg-purple-600/10' },
              { href: '/reactions', icon: '🧪', label: 'Reactions', desc: 'Reference sheet', color: 'hover:border-teal-500/50 hover:bg-teal-600/10' },
              { href: '/exam', icon: '📝', label: 'Practice Exam', desc: 'Timed mock exams', color: 'hover:border-red-500/50 hover:bg-red-600/10' },
              { href: '/synthesis', icon: '🔬', label: 'Synthesis', desc: 'AI-generated problems', color: 'hover:border-violet-500/50 hover:bg-violet-600/10' },
              { href: '/drill', icon: '🎯', label: 'Drill Mode', desc: 'Target weak spots', color: 'hover:border-orange-500/50 hover:bg-orange-600/10' },
              { href: '/tutor', icon: '🤖', label: 'AI Tutor', desc: 'Ask anything', color: 'hover:border-yellow-500/50 hover:bg-yellow-600/10' },
            ].map(action => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex flex-col items-center text-center p-4 bg-slate-700/50 border border-slate-600 rounded-xl transition-all ${action.color}`}
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <div className="text-white text-sm font-medium">{action.label}</div>
                <div className="text-slate-400 text-xs mt-0.5">{action.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent sessions */}
      {progress.studySessions.length > 0 && (
        <div className="mt-6 bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {[...progress.studySessions]
              .reverse()
              .slice(0, 5)
              .map(session => (
                <div key={session.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{actionIcons[session.activityType]}</span>
                    <div>
                      <div className="text-white text-sm">{session.topicId.replace(/-/g, ' ')}</div>
                      <div className="text-slate-500 text-xs">{session.date} · {session.durationMinutes}min</div>
                    </div>
                  </div>
                  {session.score != null && (
                    <span className={`text-sm font-semibold ${session.score >= 80 ? 'text-green-400' : session.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {session.score}%
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
