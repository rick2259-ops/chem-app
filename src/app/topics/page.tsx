'use client';
import { useState } from 'react';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { Course, Topic } from '@/types/course';
import { useProgress } from '@/hooks/useProgress';

const courseConfig = {
  CHEM008A: {
    label: '008A — Orgo I',
    activeClass: 'bg-blue-600 text-white border-blue-600',
    badgeClass: 'bg-blue-600',
    borderClass: 'border-blue-500/30',
    tagClass: 'bg-blue-500/20 text-blue-300',
  },
  CHEM008B: {
    label: '008B — Orgo II',
    activeClass: 'bg-green-600 text-white border-green-600',
    badgeClass: 'bg-green-600',
    borderClass: 'border-green-500/30',
    tagClass: 'bg-green-500/20 text-green-300',
  },
  CHEM008C: {
    label: '008C — Orgo III',
    activeClass: 'bg-purple-600 text-white border-purple-600',
    badgeClass: 'bg-purple-600',
    borderClass: 'border-purple-500/30',
    tagClass: 'bg-purple-500/20 text-purple-300',
  },
} as const;

type TabId = keyof typeof courseConfig;

function TopicCard({ topic, course, score }: { topic: Topic; course: Course; score?: number }) {
  const config = courseConfig[course.id as TabId];
  return (
    <div className={`bg-slate-800 rounded-xl border ${config.borderClass} p-5 flex flex-col gap-4 hover:bg-slate-750 transition-colors`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-semibold text-base leading-tight">{topic.title}</h3>
          {score != null ? (
            <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg ${score >= 80 ? 'bg-green-600/80 text-green-100' : score >= 60 ? 'bg-yellow-600/80 text-yellow-100' : 'bg-red-600/80 text-red-100'}`}>
              {score}%
            </span>
          ) : (
            <span className="flex-shrink-0 text-xs px-2 py-1 rounded-lg bg-slate-700 text-slate-400">
              Not started
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{topic.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {topic.tags.map(tag => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${config.tagClass}`}>
            {tag.replace(/-/g, ' ')}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>⏱ ~{topic.estimatedMinutes} min</span>
        {topic.mechanismIds.length > 0 && (
          <span>{topic.mechanismIds.length} mechanism{topic.mechanismIds.length > 1 ? 's' : ''}</span>
        )}
      </div>

      <div className="flex gap-2 pt-1 border-t border-slate-700">
        <Link
          href={`/quiz/${topic.id}`}
          className="flex-1 text-center text-xs py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          ✏️ Quiz
        </Link>
        <Link
          href={`/flashcards`}
          className="flex-1 text-center text-xs py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          🃏 Cards
        </Link>
        {topic.mechanismIds.length > 0 && (
          <Link
            href={`/mechanisms/${topic.mechanismIds[0]}`}
            className="flex-1 text-center text-xs py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
          >
            ⚗️ Mechanism
          </Link>
        )}
        <Link
          href={`/topics/${course.id}/${topic.id}`}
          className={`flex-1 text-center text-xs py-2 rounded-lg ${config.badgeClass} hover:opacity-90 text-white transition-opacity`}
        >
          View →
        </Link>
      </div>
    </div>
  );
}

export default function TopicsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('CHEM008A');
  const { progress, isLoaded } = useProgress();

  const activeCourse = courses.find(c => c.id === activeTab)!;
  const config = courseConfig[activeTab];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Topics</h1>
        <p className="text-slate-400">Browse all topics across CHEM 008A, 008B, and 008C</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {courses.map(course => {
          const cfg = courseConfig[course.id as TabId];
          const isActive = activeTab === course.id;
          return (
            <button
              key={course.id}
              onClick={() => setActiveTab(course.id as TabId)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                isActive ? cfg.activeClass : 'border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Course header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{activeCourse.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{activeCourse.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-sm">{activeCourse.topics.length} topics</div>
            <div className="text-slate-500 text-xs mt-0.5">
              {activeCourse.topics.filter(t => !!progress.topicScores[t.id]).length} studied
            </div>
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-2 gap-4">
        {activeCourse.topics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            course={activeCourse}
            score={
              isLoaded && progress.topicScores[topic.id]
                ? progress.topicScores[topic.id].averageScore
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
