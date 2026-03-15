'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { allMechanisms } from '@/data/mechanisms';
import { allDecks } from '@/data/flashcards';
import { useProgress } from '@/hooks/useProgress';

const courseColors: Record<string, { badge: string; tag: string; border: string }> = {
  CHEM008A: { badge: 'bg-blue-600', tag: 'bg-blue-500/20 text-blue-300', border: 'border-blue-500/30' },
  CHEM008B: { badge: 'bg-green-600', tag: 'bg-green-500/20 text-green-300', border: 'border-green-500/30' },
  CHEM008C: { badge: 'bg-purple-600', tag: 'bg-purple-500/20 text-purple-300', border: 'border-purple-500/30' },
};

export default function TopicDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; topicId: string }>;
}) {
  const { courseId, topicId } = use(params);
  const { progress, isLoaded } = useProgress();
  const [checkedObjectives, setCheckedObjectives] = useState<Set<number>>(new Set());

  const course = courses.find(c => c.id === courseId);
  const topic = course?.topics.find(t => t.id === topicId);

  if (!course || !topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-white text-xl font-semibold mb-2">Topic not found</div>
          <Link href="/topics" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  const colors = courseColors[courseId] || courseColors['CHEM008A'];
  const topicScore = isLoaded ? progress.topicScores[topicId] : null;
  const mechanisms = allMechanisms.filter(m => topic.mechanismIds.includes(m.id));
  const decks = allDecks.filter(d => topic.flashcardDeckIds.includes(d.id));

  const toggleObjective = (idx: number) => {
    setCheckedObjectives(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/topics" className="hover:text-white transition-colors">Topics</Link>
        <span>→</span>
        <span className="text-slate-500">{course.name}</span>
        <span>→</span>
        <span className="text-slate-300">{topic.title}</span>
      </div>

      {/* Header */}
      <div className={`bg-slate-800 rounded-xl border ${colors.border} p-6 mb-6`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`${colors.badge} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
                {courseId}
              </span>
              {topicScore && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                  topicScore.averageScore >= 80 ? 'bg-green-600/80 text-green-100' :
                  topicScore.averageScore >= 60 ? 'bg-yellow-600/80 text-yellow-100' :
                  'bg-red-600/80 text-red-100'
                }`}>
                  Best: {topicScore.bestScore}%
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
          </div>
          <div className="text-right text-sm text-slate-400">
            <div>⏱ {topic.estimatedMinutes} min</div>
            {topicScore && <div className="text-xs text-slate-500 mt-0.5">{topicScore.quizAttempts} attempts</div>}
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{topic.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {topic.tags.map(tag => (
            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${colors.tag}`}>
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Learning objectives */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Learning Objectives</h2>
          <span className="text-xs text-slate-400">
            {checkedObjectives.size}/{topic.learningObjectives.length} completed
          </span>
        </div>
        <div className="space-y-3">
          {topic.learningObjectives.map((obj, idx) => (
            <button
              key={idx}
              onClick={() => toggleObjective(idx)}
              className="w-full flex items-start gap-3 text-left group"
            >
              <div className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 transition-all ${
                checkedObjectives.has(idx)
                  ? 'bg-green-500 border-green-500'
                  : 'border-slate-600 group-hover:border-slate-400'
              } flex items-center justify-center`}>
                {checkedObjectives.has(idx) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm leading-relaxed transition-colors ${
                checkedObjectives.has(idx) ? 'text-slate-500 line-through' : 'text-slate-300'
              }`}>
                {obj}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Available Activities</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link
            href={`/quiz/${topicId}`}
            className="flex flex-col items-center gap-2 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-colors text-center"
          >
            <span className="text-2xl">✏️</span>
            <div className="text-white text-sm font-medium">Practice Quiz</div>
            <div className="text-blue-300 text-xs">Test your knowledge</div>
          </Link>
          {decks.length > 0 && (
            <Link
              href={`/flashcards/${decks[0].id}`}
              className="flex flex-col items-center gap-2 p-4 bg-green-600/20 border border-green-500/30 rounded-xl hover:bg-green-600/30 transition-colors text-center"
            >
              <span className="text-2xl">🃏</span>
              <div className="text-white text-sm font-medium">Flashcards</div>
              <div className="text-green-300 text-xs">{decks[0].cardIds.length} cards</div>
            </Link>
          )}
          <Link
            href="/tutor"
            className="flex flex-col items-center gap-2 p-4 bg-orange-600/20 border border-orange-500/30 rounded-xl hover:bg-orange-600/30 transition-colors text-center"
          >
            <span className="text-2xl">🤖</span>
            <div className="text-white text-sm font-medium">AI Tutor</div>
            <div className="text-orange-300 text-xs">Ask questions</div>
          </Link>
        </div>
      </div>

      {/* Mechanisms */}
      {mechanisms.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Related Mechanisms</h2>
          <div className="space-y-3">
            {mechanisms.map(mechanism => (
              <Link
                key={mechanism.id}
                href={`/mechanisms/${mechanism.id}`}
                className={`flex items-center justify-between p-4 bg-slate-700/50 border ${colors.border} rounded-xl hover:bg-slate-700 transition-colors`}
              >
                <div>
                  <div className="text-white font-medium">{mechanism.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {mechanism.steps.length} steps · {mechanism.reactionType.replace(/-/g, ' ')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${colors.badge} text-white text-xs px-2 py-1 rounded-lg`}>
                    {mechanism.reactionType.replace(/-/g, ' ')}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
