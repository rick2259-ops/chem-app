'use client';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { getQuestionsByTopic } from '@/data/quizzes';
import { useProgress } from '@/hooks/useProgress';

const courseConfig = {
  CHEM008A: { badge: 'bg-blue-600', border: 'border-blue-500/30', tag: 'bg-blue-500/20 text-blue-300' },
  CHEM008B: { badge: 'bg-green-600', border: 'border-green-500/30', tag: 'bg-green-500/20 text-green-300' },
  CHEM008C: { badge: 'bg-purple-600', border: 'border-purple-500/30', tag: 'bg-purple-500/20 text-purple-300' },
} as const;

type CourseId = keyof typeof courseConfig;

const difficultyLabels: Record<number, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const difficultyColors: Record<number, string> = {
  1: 'bg-green-500/20 text-green-300',
  2: 'bg-yellow-500/20 text-yellow-300',
  3: 'bg-red-500/20 text-red-300',
};

export default function QuizPage() {
  const { progress, isLoaded } = useProgress();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Quizzes</h1>
        <p className="text-slate-400">Test your knowledge topic by topic with instant AI feedback</p>
      </div>

      {courses.map(course => {
        const config = courseConfig[course.id as CourseId];
        return (
          <div key={course.id} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className={`${config.badge} text-white text-xs font-bold px-3 py-1.5 rounded-lg`}>
                {course.id}
              </span>
              <h2 className="text-lg font-semibold text-white">{course.name}</h2>
            </div>

            <div className="space-y-3">
              {course.topics.map(topic => {
                const questions = getQuestionsByTopic(topic.id);
                if (questions.length === 0) return null;

                const topicScore = isLoaded ? progress.topicScores[topic.id] : null;
                const difficulties = [1, 2, 3].filter(d => questions.some(q => q.difficulty === d));
                const maxDifficulty = Math.max(...questions.map(q => q.difficulty)) as 1 | 2 | 3;

                return (
                  <div
                    key={topic.id}
                    className={`bg-slate-800 rounded-xl border ${config.border} p-5 flex items-center justify-between gap-4 hover:bg-slate-750 transition-colors`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-white font-medium">{topic.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[maxDifficulty]}`}>
                          {difficultyLabels[maxDifficulty]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
                        <span>·</span>
                        <span>
                          {questions.filter(q => q.type === 'multiple-choice').length} MC
                          {questions.filter(q => q.type === 'short-answer').length > 0 &&
                            ` · ${questions.filter(q => q.type === 'short-answer').length} free response`}
                        </span>
                        {topicScore && (
                          <>
                            <span>·</span>
                            <span>{topicScore.quizAttempts} attempt{topicScore.quizAttempts !== 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {topicScore && (
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            topicScore.bestScore >= 80 ? 'text-green-400' :
                            topicScore.bestScore >= 60 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {topicScore.bestScore}%
                          </div>
                          <div className="text-slate-500 text-xs">best score</div>
                        </div>
                      )}
                      <Link
                        href={`/quiz/${topic.id}`}
                        className={`${config.badge} hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-opacity whitespace-nowrap`}
                      >
                        {topicScore ? 'Retake Quiz' : 'Start Quiz'} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
