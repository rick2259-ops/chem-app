'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProgress } from '@/hooks/useProgress';
import { getQuizQuestions } from '@/data/quizzes';
import { Question } from '@/types/quiz';
import { WeakArea } from '@/types/progress';
import { updateTopicScore, addStudySession } from '@/lib/storage/progressStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

type DrillState = 'loading' | 'ready' | 'answering' | 'feedback' | 'grading' | 'complete';

interface DrillAttempt {
  questionId: string;
  topicId: string;
  isCorrect: boolean;
  selectedIndex?: number;
  textAnswer?: string;
  aiFeedback?: string;
}

interface TopicResult {
  topicId: string;
  topicTitle: string;
  courseId: string;
  correct: number;
  total: number;
  previousScore: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDrillQuestions(weakAreas: WeakArea[]): { questions: Question[]; topicTitles: Record<string, string> } {
  const topicTitles: Record<string, string> = {};
  const allQuestions: Question[] = [];

  // Prioritize: low-score first, then not-practiced, then due-for-review
  const prioritized = [...weakAreas].sort((a, b) => {
    const order = { 'low-score': 0, 'not-practiced': 1, 'due-for-review': 2, 'declining': 0 };
    return (order[a.reason] ?? 3) - (order[b.reason] ?? 3) || a.averageScore - b.averageScore;
  });

  for (const area of prioritized) {
    const qs = getQuizQuestions(area.topicId);
    if (qs.length === 0) continue;
    topicTitles[area.topicId] = area.topicTitle;
    // Take more questions from worse topics
    const quota = area.reason === 'low-score' ? 6 : area.reason === 'not-practiced' ? 5 : 3;
    allQuestions.push(...shuffle(qs).slice(0, quota));
  }

  return { questions: shuffle(allQuestions).slice(0, 20), topicTitles };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreRing({ pct, size = 80 }: { pct: number; size?: number }) {
  const r = size * 0.4;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#ca8a04' : '#dc2626';
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#334155" strokeWidth={size * 0.09} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.09}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-white" style={{ fontSize: size * 0.22 }}>{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DrillPage() {
  const { weakAreas, progress, isLoaded } = useProgress();

  const [state, setState] = useState<DrillState>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topicTitles, setTopicTitles] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<DrillAttempt[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const startTimeRef = useRef(Date.now());

  // Once progress loads, prepare questions
  useEffect(() => {
    if (!isLoaded) return;
    if (state !== 'loading') return;

    const { questions: qs, topicTitles: tt } = buildDrillQuestions(weakAreas);
    setQuestions(qs);
    setTopicTitles(tt);
    setState('ready');
  }, [isLoaded, weakAreas, state]);

  const currentQuestion = questions[currentIndex];

  const startDrill = useCallback(() => {
    setState('answering');
    setCurrentIndex(0);
    setAttempts([]);
    startTimeRef.current = Date.now();
  }, []);

  const submitMC = useCallback((idx: number) => {
    if (!currentQuestion) return;
    const isCorrect = idx === currentQuestion.correctIndex;
    setSelectedIndex(idx);
    setFeedback(currentQuestion.explanation);
    setState('feedback');
    setAttempts(prev => [...prev, {
      questionId: currentQuestion.id,
      topicId: currentQuestion.topicId,
      isCorrect,
      selectedIndex: idx,
      aiFeedback: currentQuestion.explanation,
    }]);
  }, [currentQuestion]);

  const submitShortAnswer = useCallback(async (answer: string) => {
    if (!currentQuestion) return;
    setState('grading');
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradingMode: true,
          question: currentQuestion.prompt,
          correctAnswer: currentQuestion.correctAnswer,
          studentAnswer: answer,
        }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
      setState('feedback');
      setAttempts(prev => [...prev, {
        questionId: currentQuestion.id,
        topicId: currentQuestion.topicId,
        isCorrect: data.isCorrect,
        textAnswer: answer,
        aiFeedback: data.feedback,
      }]);
    } catch {
      setFeedback(currentQuestion.explanation);
      setState('feedback');
      setAttempts(prev => [...prev, {
        questionId: currentQuestion.id,
        topicId: currentQuestion.topicId,
        isCorrect: false,
        textAnswer: answer,
      }]);
    }
  }, [currentQuestion]);

  const next = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // Save progress for each topic drilled
      const topicAttempts: Record<string, { correct: number; total: number; courseId: string }> = {};
      for (const att of [...attempts]) {
        if (!topicAttempts[att.topicId]) topicAttempts[att.topicId] = { correct: 0, total: 0, courseId: '' };
        topicAttempts[att.topicId].total++;
        if (att.isCorrect) topicAttempts[att.topicId].correct++;
      }
      // Find courseId for each topic
      for (const area of weakAreas) {
        if (topicAttempts[area.topicId]) {
          topicAttempts[area.topicId].courseId = area.courseId;
        }
      }
      // Save score per topic
      for (const [topicId, { correct, total, courseId }] of Object.entries(topicAttempts)) {
        if (total > 0 && courseId) {
          const score = Math.round((correct / total) * 100);
          updateTopicScore(topicId, courseId, score);
        }
      }
      addStudySession({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        topicId: 'drill',
        courseId: (weakAreas[0]?.courseId ?? 'CHEM008A') as any,
        activityType: 'quiz',
        durationMinutes: Math.round((Date.now() - startTimeRef.current) / 60000),
        score: Math.round((attempts.filter(a => a.isCorrect).length / questions.length) * 100),
      });
      setState('complete');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedIndex(null);
      setTextAnswer('');
      setFeedback('');
      setState('answering');
    }
  }, [currentIndex, questions.length, attempts, weakAreas]);

  // ── Loading ──
  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-slate-400 text-sm">Loading your weak areas...</div>
        </div>
      </div>
    );
  }

  // ── Ready / No weak areas ──
  if (state === 'ready') {
    if (questions.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-white mb-2">No weak spots found!</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              You haven't taken enough quizzes yet, or you're doing great on everything.
              Take some quizzes first to let the drill mode identify areas to improve.
            </p>
            <Link href="/quiz" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-center">
              Start a Quiz First
            </Link>
            <Link href="/dashboard" className="block mt-3 text-slate-400 hover:text-slate-300 text-sm transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    const topicsInDrill = [...new Set(questions.map(q => q.topicId))];

    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎯</div>
            <h1 className="text-2xl font-bold text-white mb-1">Weak Spot Drill</h1>
            <p className="text-slate-400 text-sm">
              {questions.length} questions across {topicsInDrill.length} topic{topicsInDrill.length !== 1 ? 's' : ''} you need to strengthen
            </p>
          </div>

          {/* Topics being drilled */}
          <div className="bg-slate-900/60 rounded-xl p-4 mb-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Topics in this drill</div>
            <div className="space-y-2">
              {weakAreas.filter(a => topicsInDrill.includes(a.topicId)).map(area => {
                const qCount = questions.filter(q => q.topicId === area.topicId).length;
                const reasonColor = {
                  'low-score': 'text-red-400 bg-red-400/10',
                  'not-practiced': 'text-orange-400 bg-orange-400/10',
                  'due-for-review': 'text-blue-400 bg-blue-400/10',
                  'declining': 'text-yellow-400 bg-yellow-400/10',
                }[area.reason] ?? 'text-slate-400 bg-slate-700';
                return (
                  <div key={area.topicId} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${reasonColor}`}>
                        {area.reason === 'low-score' ? `${area.averageScore}%` :
                         area.reason === 'not-practiced' ? 'New' :
                         area.reason === 'due-for-review' ? 'Review' : area.reason}
                      </span>
                      <span className="text-white text-sm truncate">{area.topicTitle}</span>
                    </div>
                    <span className="text-slate-500 text-xs flex-shrink-0">{qCount}q</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={startDrill}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-lg rounded-xl transition-colors"
          >
            Start Drill →
          </button>
          <Link href="/dashboard" className="block text-center mt-3 text-slate-400 hover:text-slate-300 text-sm transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ── Complete ──
  if (state === 'complete') {
    const correctCount = attempts.filter(a => a.isCorrect).length;
    const overallPct = Math.round((correctCount / questions.length) * 100);

    // Per-topic results
    const topicResultMap: Record<string, TopicResult> = {};
    for (const att of attempts) {
      if (!topicResultMap[att.topicId]) {
        const area = weakAreas.find(a => a.topicId === att.topicId);
        topicResultMap[att.topicId] = {
          topicId: att.topicId,
          topicTitle: topicTitles[att.topicId] ?? att.topicId,
          courseId: area?.courseId ?? '',
          correct: 0,
          total: 0,
          previousScore: area?.averageScore ?? 0,
        };
      }
      topicResultMap[att.topicId].total++;
      if (att.isCorrect) topicResultMap[att.topicId].correct++;
    }
    const topicResults = Object.values(topicResultMap).sort((a, b) => {
      const aPct = Math.round((a.correct / a.total) * 100);
      const bPct = Math.round((b.correct / b.total) * 100);
      return aPct - bPct; // worst first
    });

    return (
      <div className="p-8 max-w-2xl mx-auto">
        {/* Score hero */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-5">Drill Complete!</h2>
          <div className="flex items-center justify-center gap-10 mb-4">
            <ScoreRing pct={overallPct} size={96} />
            <div className="text-left space-y-1.5">
              <div className="text-white">
                <span className="text-3xl font-bold text-green-400">{correctCount}</span>
                <span className="text-slate-400"> / {questions.length} correct</span>
              </div>
              <div className={`text-sm font-medium ${overallPct >= 80 ? 'text-green-400' : overallPct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {overallPct >= 80 ? '🎉 Great improvement!' : overallPct >= 60 ? '👍 Getting better!' : '📚 Keep drilling!'}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => { setAttempts([]); setCurrentIndex(0); startDrill(); }}
              className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl text-white font-medium transition-colors"
            >
              Drill Again
            </button>
            <Link href="/dashboard" className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors text-center">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Per-topic breakdown */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Results by Topic</h3>
          <div className="space-y-4">
            {topicResults.map(tr => {
              const newPct = Math.round((tr.correct / tr.total) * 100);
              const improved = tr.previousScore > 0 && newPct > tr.previousScore;
              const diff = newPct - tr.previousScore;
              return (
                <div key={tr.topicId} className="flex items-center gap-4">
                  <div className="w-48 flex-shrink-0">
                    <div className="text-white text-sm font-medium truncate">{tr.topicTitle}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {tr.correct}/{tr.total} correct
                      {tr.previousScore > 0 && (
                        <span className={`ml-2 font-medium ${improved ? 'text-green-400' : diff === 0 ? 'text-slate-400' : 'text-red-400'}`}>
                          {improved ? `↑ +${diff}%` : diff === 0 ? '→ same' : `↓ ${diff}%`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${newPct >= 80 ? 'bg-green-500' : newPct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${newPct}%` }}
                    />
                  </div>
                  <div className={`w-10 text-right text-sm font-bold ${newPct >= 80 ? 'text-green-400' : newPct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {newPct}%
                  </div>
                  {newPct < 70 && (
                    <Link href={`/quiz/${tr.topicId}`} className="text-xs text-blue-400 hover:text-blue-300 flex-shrink-0">
                      Quiz →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Drilling ──
  if (!currentQuestion) return null;

  const progressPct = (currentIndex / questions.length) * 100;
  const correctSoFar = attempts.filter(a => a.isCorrect).length;
  const isDrilling = state === 'answering' || state === 'feedback' || state === 'grading';
  const topicTitle = topicTitles[currentQuestion.topicId] ?? currentQuestion.topicId;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold text-sm">🎯 Drill Mode</span>
          <span className="text-slate-500 text-xs">·</span>
          <span className="text-slate-400 text-xs">{topicTitle}</span>
        </div>
        <span className="text-slate-400 text-sm">{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        {attempts.length > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{correctSoFar} correct so far</span>
            <span>{Math.round((correctSoFar / (attempts.length)) * 100)}% accuracy</span>
          </div>
        )}
      </div>

      {/* Question card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            currentQuestion.difficulty === 1 ? 'bg-green-500/20 text-green-300' :
            currentQuestion.difficulty === 2 ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {currentQuestion.difficulty === 1 ? 'Easy' : currentQuestion.difficulty === 2 ? 'Medium' : 'Hard'}
          </span>
          <span className="text-xs text-slate-500">
            {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 'Free Response'}
          </span>
        </div>

        <p className="text-white text-lg leading-relaxed mb-6">{currentQuestion.prompt}</p>

        {/* Multiple choice */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let cls = 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer';
              if (state === 'feedback') {
                if (idx === currentQuestion.correctIndex) cls = 'border-green-500 bg-green-500/20';
                else if (idx === selectedIndex) cls = 'border-red-500 bg-red-500/20';
                else cls = 'border-slate-700 opacity-40';
              }
              return (
                <button key={idx}
                  onClick={() => state === 'answering' && submitMC(idx)}
                  disabled={state !== 'answering'}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${cls}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    state === 'feedback' && idx === currentQuestion.correctIndex ? 'bg-green-500 text-white' :
                    state === 'feedback' && idx === selectedIndex ? 'bg-red-500 text-white' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-slate-200 text-sm">{option}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Short answer */}
        {currentQuestion.type === 'short-answer' && (
          <div>
            <textarea
              value={textAnswer}
              onChange={e => setTextAnswer(e.target.value)}
              disabled={state !== 'answering'}
              placeholder="Type your answer here..."
              className="w-full h-32 bg-slate-700 border border-slate-600 rounded-xl p-3 text-white text-sm placeholder-slate-500 resize-none focus:outline-none focus:border-orange-500 disabled:opacity-70"
            />
            {state === 'answering' && (
              <button
                onClick={() => submitShortAnswer(textAnswer)}
                disabled={!textAnswer.trim()}
                className="mt-3 w-full py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors"
              >
                Submit Answer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feedback */}
      {(state === 'feedback' || state === 'grading') && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4 animate-fadeInUp">
          {state === 'grading' ? (
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <span>Grading your answer...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                {attempts[attempts.length - 1]?.isCorrect ? (
                  <span className="text-green-400 font-semibold text-sm">✓ Correct!</span>
                ) : (
                  <span className="text-red-400 font-semibold text-sm">✗ Not quite</span>
                )}
              </div>
              <div className="text-slate-300 text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                  }}
                >{feedback}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      )}

      {/* Next button */}
      {state === 'feedback' && (
        <button
          onClick={next}
          className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-xl text-white font-medium transition-colors"
        >
          {currentIndex + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
