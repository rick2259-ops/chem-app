'use client';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProgress } from '@/hooks/useProgress';
import { courses } from '@/data/courses';
import { getCourseProgress } from '@/lib/utils/weakAreaDetection';
import { UserProgress, WeakArea } from '@/types/progress';

function buildProgressSummary(progress: UserProgress, weakAreas: WeakArea[]): string {
  const topicCount = Object.keys(progress.topicScores).length;
  const avgScore = topicCount > 0
    ? Math.round(Object.values(progress.topicScores).reduce((s, t) => s + t.averageScore, 0) / topicCount)
    : 0;
  const recentSessions = progress.studySessions.slice(-10);
  const activityBreakdown = recentSessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.activityType] = (acc[s.activityType] ?? 0) + 1;
    return acc;
  }, {});
  const weakList = weakAreas.slice(0, 5).map(w =>
    `- ${w.topicTitle} (${w.reason.replace(/-/g, ' ')}${w.averageScore > 0 ? `, score: ${w.averageScore}%` : ''})`
  ).join('\n');
  const recentList = recentSessions.slice(0, 5).map(s =>
    `- ${s.activityType} on ${s.topicId.replace(/-/g, ' ')} [${s.date}]${s.score != null ? ` — ${s.score}%` : ''}`
  ).join('\n');

  return `Total study sessions: ${progress.studySessions.length}
Study streak: ${progress.studyStreak.currentStreak} days (best: ${progress.studyStreak.longestStreak})
Topics studied: ${topicCount}
Overall average score: ${avgScore}%

Activity breakdown (last 10 sessions):
${Object.entries(activityBreakdown).map(([k, v]) => `- ${k}: ${v} sessions`).join('\n') || 'None yet'}

Weak/priority areas:
${weakList || 'None detected yet'}

Recent activity:
${recentList || 'No recent sessions'}`;
}

function StudyCoach({ progress, weakAreas }: { progress: UserProgress; weakAreas: WeakArea[] }) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setText('');
    try {
      const summary = buildProgressSummary(progress, weakAreas);
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insightsMode: true, insightsSummary: summary }),
      });
      if (!res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setText(acc);
      }
      setHasLoaded(true);
    } catch {
      setText('Could not generate analysis. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-indigo-500/30 p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">AI Study Coach</h2>
          <p className="text-slate-400 text-xs mt-0.5">Personalized analysis based on your activity</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>{hasLoaded ? '↻ Refresh Analysis' : '✦ Get AI Analysis'}</>
          )}
        </button>
      </div>

      {!text && !isLoading && (
        <div className="text-center py-8 text-slate-500 text-sm">
          Click "Get AI Analysis" to receive personalized study advice based on your performance data.
        </div>
      )}

      {(text || isLoading) && (
        <div className="text-sm leading-relaxed">
          {isLoading && !text && (
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
              <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              Generating your personalized coaching report...
            </div>
          )}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 className="text-white font-semibold text-sm mt-4 mb-1.5 first:mt-0">{children}</h2>,
              p: ({ children }) => <p className="text-slate-300 mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="space-y-1 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="space-y-1 mb-2 list-decimal list-inside">{children}</ol>,
              li: ({ children }) => <li className="flex gap-1.5 text-slate-300"><span className="text-indigo-400 flex-shrink-0">•</span><span>{children}</span></li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            }}
          >{text}</ReactMarkdown>
          {isLoading && <span className="inline-block w-1.5 h-3.5 bg-indigo-400 animate-pulse ml-0.5 align-middle" />}
        </div>
      )}
    </div>
  );
}

const courseConfig = {
  CHEM008A: { label: 'CHEM 008A', bar: 'bg-blue-500', badge: 'bg-blue-600', border: 'border-blue-500/30' },
  CHEM008B: { label: 'CHEM 008B', bar: 'bg-green-500', badge: 'bg-green-600', border: 'border-green-500/30' },
  CHEM008C: { label: 'CHEM 008C', bar: 'bg-purple-500', badge: 'bg-purple-600', border: 'border-purple-500/30' },
} as const;

type CourseId = keyof typeof courseConfig;

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
  tutor: 'Ask Tutor',
};

const actionHrefs: Record<string, (id: string) => string> = {
  quiz: id => `/quiz/${id}`,
  flashcards: () => '/flashcards',
  mechanism: () => '/mechanisms',
  tutor: () => '/tutor',
};

function HeatCell({ score }: { score?: number }) {
  if (score == null) {
    return <div className="w-full h-8 rounded bg-slate-700 opacity-40" title="Not attempted" />;
  }
  let bg: string;
  if (score >= 85) bg = 'bg-green-500';
  else if (score >= 70) bg = 'bg-green-600/70';
  else if (score >= 55) bg = 'bg-yellow-500';
  else if (score >= 40) bg = 'bg-orange-500';
  else bg = 'bg-red-600';

  return (
    <div
      className={`w-full h-8 rounded ${bg} flex items-center justify-center text-xs font-bold text-white`}
      title={`${score}%`}
    >
      {score}%
    </div>
  );
}

export default function ProgressPage() {
  const { progress, weakAreas, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400 animate-pulse">Loading progress...</div>
      </div>
    );
  }

  const topicScoreValues = Object.values(progress.topicScores);
  const avgScore = topicScoreValues.length > 0
    ? Math.round(topicScoreValues.reduce((s, t) => s + t.averageScore, 0) / topicScoreValues.length)
    : 0;
  const topicsStudied = topicScoreValues.length;
  const totalTopics = courses.reduce((s, c) => s + c.topics.length, 0);

  const recentSessions = [...progress.studySessions].reverse().slice(0, 10);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Progress</h1>
        <p className="text-slate-400">Your study analytics and performance overview</p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-center">
          <div className="text-3xl font-bold text-white">{topicsStudied}</div>
          <div className="text-slate-400 text-xs mt-1">Topics Studied</div>
          <div className="text-slate-600 text-xs mt-0.5">of {totalTopics} total</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-center">
          <div className={`text-3xl font-bold ${avgScore >= 80 ? 'text-green-400' : avgScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {avgScore}%
          </div>
          <div className="text-slate-400 text-xs mt-1">Average Score</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-orange-500/30 p-5 text-center">
          <div className="text-3xl font-bold text-orange-400">
            {progress.studyStreak.currentStreak}
          </div>
          <div className="text-slate-400 text-xs mt-1">Day Streak 🔥</div>
          <div className="text-slate-600 text-xs mt-0.5">best: {progress.studyStreak.longestStreak}</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {progress.studySessions.length}
          </div>
          <div className="text-slate-400 text-xs mt-1">Study Sessions</div>
        </div>
      </div>

      {/* Course progress */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-5">Course Progress</h2>
        <div className="space-y-6">
          {courses.map(course => {
            const courseScore = getCourseProgress(progress, course.id);
            const config = courseConfig[course.id as CourseId];
            const studiedTopics = course.topics.filter(t => !!progress.topicScores[t.id]);

            return (
              <div key={course.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`${config.badge} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
                      {config.label}
                    </span>
                    <span className="text-white font-medium text-sm">{course.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${courseScore >= 80 ? 'text-green-400' : courseScore >= 60 ? 'text-yellow-400' : 'text-slate-400'}`}>
                    {courseScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 mb-3">
                  <div
                    className={`${config.bar} h-2.5 rounded-full transition-all duration-700`}
                    style={{ width: `${courseScore}%` }}
                  />
                </div>
                {/* Per-topic mini bars */}
                <div className="grid grid-cols-3 gap-2">
                  {course.topics.map(topic => {
                    const ts = progress.topicScores[topic.id];
                    return (
                      <Link
                        key={topic.id}
                        href={`/topics/${course.id}/${topic.id}`}
                        className={`bg-slate-700/50 hover:bg-slate-700 border ${config.border} rounded-lg px-3 py-2 transition-colors`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-slate-400 truncate">{topic.title}</span>
                          {ts && (
                            <span className={`text-xs font-bold ${ts.averageScore >= 80 ? 'text-green-400' : ts.averageScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {ts.averageScore}%
                            </span>
                          )}
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-1">
                          <div
                            className={`${config.bar} h-1 rounded-full`}
                            style={{ width: `${ts?.averageScore ?? 0}%` }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Heat map */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Topic Score Heat Map</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 rounded bg-red-600" /><span>0–40</span>
            <div className="w-3 h-3 rounded bg-orange-500" /><span>40–55</span>
            <div className="w-3 h-3 rounded bg-yellow-500" /><span>55–70</span>
            <div className="w-3 h-3 rounded bg-green-600/70" /><span>70–85</span>
            <div className="w-3 h-3 rounded bg-green-500" /><span>85+</span>
          </div>
        </div>
        <div className="space-y-4">
          {courses.map(course => {
            const config = courseConfig[course.id as CourseId];
            return (
              <div key={course.id}>
                <div className="text-xs text-slate-500 mb-2">{config.label}</div>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${course.topics.length}, 1fr)` }}>
                  {course.topics.map(topic => {
                    const ts = progress.topicScores[topic.id];
                    return (
                      <div key={topic.id} title={topic.title}>
                        <HeatCell score={ts?.averageScore} />
                        <div className="text-xs text-slate-600 text-center mt-1 truncate" style={{ fontSize: '9px' }}>
                          {topic.title.split(' ').slice(0, 2).join(' ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-column bottom section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Weak areas */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Weak Areas</h2>
          {weakAreas.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-sm">
              🎉 No weak areas! Great job.
            </div>
          ) : (
            <div className="space-y-3">
              {weakAreas.map(area => (
                <div key={area.topicId} className="flex items-center justify-between gap-2 p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{area.topicTitle}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        area.reason === 'not-practiced' ? 'bg-orange-500/20 text-orange-300' :
                        area.reason === 'low-score' ? 'bg-red-500/20 text-red-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {area.reason.replace(/-/g, ' ')}
                      </span>
                      {area.averageScore > 0 && (
                        <span className="text-xs text-slate-500">{area.averageScore}%</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={actionHrefs[area.recommendedAction]?.(area.topicId) ?? '/dashboard'}
                    className="flex-shrink-0 flex items-center gap-1 bg-slate-600 hover:bg-slate-500 text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <span>{actionIcons[area.recommendedAction]}</span>
                    <span className="hidden sm:inline">{actionLabels[area.recommendedAction]}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          {recentSessions.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-sm">
              No sessions yet. Start studying!
            </div>
          ) : (
            <div className="space-y-2">
              {recentSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between gap-2 py-2 border-b border-slate-700 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{actionIcons[session.activityType]}</span>
                    <div>
                      <div className="text-white text-xs font-medium">
                        {session.topicId.replace(/-/g, ' ')}
                      </div>
                      <div className="text-slate-500 text-xs">{session.date} · {session.durationMinutes}min</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {session.score != null && (
                      <span className={`text-sm font-bold ${
                        session.score >= 80 ? 'text-green-400' :
                        session.score >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {session.score}%
                      </span>
                    )}
                    <div className="text-slate-600 text-xs">
                      {courseConfig[session.courseId as CourseId]?.label ?? session.courseId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StudyCoach progress={progress} weakAreas={weakAreas} />
    </div>
  );
}
