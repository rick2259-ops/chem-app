'use client';
import { use, useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getQuizQuestions } from '@/data/quizzes';
import { getTopic } from '@/data/courses';
import { useQuizSession } from '@/hooks/useQuizSession';
import { useCustomQuestions } from '@/hooks/useCustomQuestions';
import { useProgress } from '@/hooks/useProgress';
import { Question } from '@/types/quiz';
import { CourseId } from '@/types/course';

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? '#16a34a' : score >= 60 ? '#ca8a04' : '#dc2626';
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#334155" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{score}%</span>
      </div>
    </div>
  );
}

// Focused AI panel — same approach as flashcards, scoped to the exact question
function QuizAIPanel({ mode, questionPrompt, correctAnswer, resetKey, label, icon, borderColor, textColor, bgColor }: {
  mode: 'reallife' | 'minilecture';
  questionPrompt: string;
  correctAnswer: string;
  resetKey: string;        // changes on each new question to auto-reset
  label: string;
  icon: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  // Reset when question changes
  useEffect(() => {
    setIsOpen(false);
    setText('');
    setIsLoading(false);
    hasFetched.current = false;
  }, [resetKey]);

  const handleOpen = async () => {
    if (hasFetched.current) { setIsOpen(o => !o); return; }
    hasFetched.current = true;
    setIsOpen(true);
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [mode === 'reallife' ? 'flashcardRealLifeMode' : 'flashcardMiniLectureMode']: true,
          cardFront: questionPrompt,
          cardBack: correctAnswer,
          cardCategory: 'quiz-question',
        }),
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
    } catch {
      setText('Could not load. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleOpen}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor} ${bgColor} ${textColor} hover:opacity-90 transition-all text-xs font-medium`}
      >
        <span>{icon}</span>
        {label}
        <span className="ml-auto text-slate-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={`mt-1 rounded-xl border ${borderColor} bg-slate-900 p-4 animate-fadeInUp`}>
          {isLoading && !text && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              Generating...
            </div>
          )}
          {text && (
            <div className="text-xs leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 text-slate-200">{children}</p>,
                  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                  code: ({ children }) => <code className="bg-slate-800 text-green-300 px-1 rounded font-mono">{children}</code>,
                  ul: ({ children }) => <ul className="space-y-1 mb-2">{children}</ul>,
                  li: ({ children }) => <li className="flex gap-1.5 text-slate-200"><span className="text-blue-400 flex-shrink-0">•</span><span>{children}</span></li>,
                }}
              >{text}</ReactMarkdown>
              {isLoading && <span className="streaming-cursor text-blue-400" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuizTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const topic = getTopic(topicId);
  const baseQuestions = getQuizQuestions(topicId);
  const { customQuestions, addQuestions, clearQuestions } = useCustomQuestions(topicId);
  const { progress } = useProgress();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [generateCount, setGenerateCount] = useState(10);
  const [freshQuestions, setFreshQuestions] = useState<Question[]>([]);
  const [sessionMode, setSessionMode] = useState<'saved' | 'fresh'>('saved');

  const savedQuestions = useMemo(
    () => [...baseQuestions, ...customQuestions],
    [baseQuestions, customQuestions]
  );

  const questions = sessionMode === 'fresh' && freshQuestions.length > 0
    ? freshQuestions
    : savedQuestions;

  async function generateQuestions(masteryMode: boolean): Promise<Question[]> {
    if (!topic) return [];
    const existingPrompts = savedQuestions.map(q => q.prompt);
    const res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizGenerateMode: true,
        quizTopicTitle: topic.title,
        quizCourseId: topic.courseId,
        quizDescription: topic.description,
        generateCount,
        quizExistingPrompts: existingPrompts,
        quizMasteryMode: masteryMode,
      }),
    });
    if (!res.ok) throw new Error('API error');
    const raw: Array<{
      type: string; difficulty: number; prompt: string;
      options?: string[]; correctIndex?: number;
      correctAnswer?: string; explanation: string;
    }> = await res.json();
    return raw.map((q, i) => ({
      id: `session-${topicId}-${Date.now()}-${i}`,
      topicId,
      courseId: topic.courseId as CourseId,
      type: q.type === 'short-answer' ? 'short-answer' : 'multiple-choice',
      difficulty: ([1, 2, 3].includes(q.difficulty) ? q.difficulty : 2) as 1 | 2 | 3,
      prompt: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      tags: [],
    }));
  }

  async function handleAddToBank() {
    if (!topic) return;
    setIsGenerating(true);
    setGenerateError('');
    try {
      const newQuestions = await generateQuestions(false);
      addQuestions(newQuestions);
    } catch {
      setGenerateError('Could not generate questions. Check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  const pendingFreshStart = useRef(false);

  async function handleFreshPractice() {
    if (!topic) return;
    setIsGenerating(true);
    setGenerateError('');
    try {
      const newQuestions = await generateQuestions(true);
      setFreshQuestions(newQuestions);
      setSessionMode('fresh');
      pendingFreshStart.current = true;
    } catch {
      setGenerateError('Could not generate questions. Check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  const {
    state, currentQuestion, currentIndex, totalQuestions,
    attempts, selectedIndex, textAnswer, setTextAnswer,
    aiFeedback, isGrading, score, start, submitMC, submitShortAnswer, next,
  } = useQuizSession(questions, topicId, topic?.courseId ?? 'CHEM008A');

  useEffect(() => {
    if (pendingFreshStart.current && sessionMode === 'fresh' && freshQuestions.length > 0) {
      pendingFreshStart.current = false;
      start();
    }
  }, [sessionMode, freshQuestions, start]);

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-white text-xl font-semibold mb-2">Topic not found</div>
          <Link href="/quiz" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Quizzes</Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-slate-800 rounded-2xl border border-slate-700 p-10 max-w-md">
          <div className="text-4xl mb-4">📭</div>
          <div className="text-white text-xl font-semibold mb-2">No questions yet</div>
          <div className="text-slate-400 text-sm mb-6">Questions for this topic are coming soon.</div>
          <Link href="/quiz" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Quizzes</Link>
        </div>
      </div>
    );
  }

  // ── Idle / Start screen ──────────────────────────────────────────────
  if (state === 'idle') {
    const topicScore = progress?.topicScores?.[topicId];
    const masteryLevel = topicScore?.masteryLevel ?? 'not-started';
    const masteryColors: Record<string, string> = {
      'mastered': 'text-green-400 bg-green-500/10 border-green-500/30',
      'proficient': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      'developing': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      'novice': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      'not-started': 'text-slate-400 bg-slate-700 border-slate-600',
    };
    const masteryLabels: Record<string, string> = {
      'mastered': 'Mastered', 'proficient': 'Proficient',
      'developing': 'Developing', 'novice': 'Novice', 'not-started': 'Not started',
    };

    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">✏️</div>
            <h1 className="text-2xl font-bold text-white mb-1">{topic.title}</h1>
            <p className="text-slate-400 text-sm mb-3">{topic.description}</p>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${masteryColors[masteryLevel]}`}>
              {masteryLabels[masteryLevel]}
              {topicScore && ` · ${topicScore.averageScore}% avg · ${topicScore.quizAttempts} session${topicScore.quizAttempts !== 1 ? 's' : ''}`}
            </span>
          </div>

          {/* New to this topic? */}
          {masteryLevel === 'not-started' && (
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 mb-4 text-left">
              <div className="text-amber-300 text-xs font-semibold mb-1">📖 New to this topic?</div>
              <p className="text-slate-400 text-xs leading-relaxed mb-2">
                Read the lecture first — it explains everything from scratch before you test yourself.
              </p>
              <Link href={`/lecture/${topicId}`}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium">
                📖 Read Lecture First
              </Link>
            </div>
          )}

          {/* Count selector */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 whitespace-nowrap">Questions:</span>
            <input
              type="number" min={1} value={generateCount}
              onChange={e => setGenerateCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm text-center focus:outline-none focus:border-blue-500"
            />
            <span className="text-xs text-slate-500">per session</span>
          </div>

          {/* Primary CTA: Fresh Practice */}
          <button onClick={handleFreshPractice} disabled={isGenerating}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 mb-2">
            {isGenerating && sessionMode === 'fresh' ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating fresh questions...</>
            ) : (
              <>⚡ Fresh Practice — New Questions Every Time</>
            )}
          </button>
          <p className="text-xs text-slate-500 text-center mb-4">
            AI generates brand-new questions each session — prove you understand the concept, not just the answer.
          </p>

          {/* Secondary: Saved bank */}
          {savedQuestions.length > 0 && (
            <button onClick={() => { setSessionMode('saved'); start(); }}
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white text-sm font-medium transition-colors mb-2">
              Practice Saved Questions ({savedQuestions.length})
            </button>
          )}

          {/* Add to bank */}
          <div className="border-t border-slate-700/60 pt-4 mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Question bank: {savedQuestions.length} saved</span>
              {customQuestions.length > 0 && (
                <button onClick={clearQuestions} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  Clear AI questions
                </button>
              )}
            </div>
            <button onClick={handleAddToBank} disabled={isGenerating}
              className="w-full py-2 bg-slate-700/60 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-2">
              {isGenerating && sessionMode === 'saved' ? (
                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Adding {generateCount} questions to bank...</>
              ) : (
                <>+ Add {generateCount} Questions to Saved Bank</>
              )}
            </button>
          </div>

          {generateError && <p className="text-red-400 text-xs mt-2 text-center">{generateError}</p>}

          <Link href="/quiz" className="block mt-4 text-slate-400 hover:text-slate-300 text-sm transition-colors text-center">
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  // ── Results screen ───────────────────────────────────────────────────
  if (state === 'complete') {
    const correctCount = attempts.filter(a => a.isCorrect).length;
    const wrongAttempts = attempts.filter(a => !a.isCorrect);

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Quiz Complete!</h2>
          <div className="flex items-center justify-center gap-12 mb-6">
            <ScoreCircle score={score} />
            <div className="space-y-2">
              <div className="text-white">
                <span className="text-2xl font-bold text-green-400">{correctCount}</span>
                <span className="text-slate-400"> / {totalQuestions} correct</span>
              </div>
              <div className="text-slate-400 text-sm">{topic.title}</div>
              <div className={`text-sm font-medium ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {score >= 80 ? '🎉 Excellent work!' : score >= 60 ? '👍 Good effort!' : '📚 Keep studying!'}
              </div>
            </div>
          </div>

          {/* If score is low, suggest lecture */}
          {score < 70 && (
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-5">
              <div className="text-amber-300 font-semibold text-sm mb-1">💡 Struggling? Try the Lecture</div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                The AI lecture explains this topic from scratch with analogies and real-world examples. Many students improve significantly after reading it.
              </p>
              <div className="flex gap-2">
                <Link href={`/lecture/${topicId}`}
                  className="text-xs px-3 py-2 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium">
                  📖 Read the Lecture
                </Link>
                <Link href="/tutor"
                  className="text-xs px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  🤖 Ask AI Tutor
                </Link>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => { setFreshQuestions([]); setSessionMode('saved'); }}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors">
              Practice Again
            </button>
            <Link href="/quiz"
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors text-center">
              All Quizzes
            </Link>
          </div>
        </div>

        {/* Question review */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Question Review</h3>
          <div className="space-y-4">
            {attempts.map((attempt, idx) => {
              const q = questions[idx];
              if (!q) return null;
              return (
                <div key={attempt.questionId}
                  className={`p-4 rounded-xl border ${attempt.isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{attempt.isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium mb-1">Q{idx + 1}: {q.prompt}</div>
                      {q.type === 'multiple-choice' && q.options && (
                        <div className="text-sm mb-2">
                          {attempt.selectedIndex != null && (
                            <div className={attempt.isCorrect ? 'text-green-400' : 'text-red-400'}>
                              Your answer: {q.options[attempt.selectedIndex]}
                            </div>
                          )}
                          {!attempt.isCorrect && q.correctIndex != null && (
                            <div className="text-green-400">Correct: {q.options[q.correctIndex]}</div>
                          )}
                        </div>
                      )}
                      {attempt.aiFeedback && (
                        <div className="text-slate-400 text-xs leading-relaxed bg-slate-700/50 rounded-lg p-2 mb-2">
                          {attempt.aiFeedback}
                        </div>
                      )}

                      {/* Focused help for wrong answers */}
                      {!attempt.isCorrect && (
                        <div className="space-y-2 mt-3">
                          <QuizAIPanel
                            mode="reallife"
                            questionPrompt={q.prompt}
                            correctAnswer={
                              q.type === 'multiple-choice' && q.options && q.correctIndex != null
                                ? q.options[q.correctIndex]
                                : q.correctAnswer ?? q.explanation
                            }
                            resetKey={`results-${q.id}`}
                            label="Real Life Example for This Question"
                            icon="🌍"
                            borderColor="border-amber-500/30"
                            textColor="text-amber-300"
                            bgColor="bg-amber-500/10"
                          />
                          <QuizAIPanel
                            mode="minilecture"
                            questionPrompt={q.prompt}
                            correctAnswer={
                              q.type === 'multiple-choice' && q.options && q.correctIndex != null
                                ? q.options[q.correctIndex]
                                : q.correctAnswer ?? q.explanation
                            }
                            resetKey={`results-${q.id}`}
                            label="Mini Lecture — Explain This Concept"
                            icon="⚡"
                            borderColor="border-blue-500/30"
                            textColor="text-blue-300"
                            bgColor="bg-blue-500/10"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Active question ──────────────────────────────────────────────────
  const progressPct = (currentIndex / totalQuestions) * 100;
  const lastAttempt = attempts[attempts.length - 1];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>{topic.title}</span>
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        {attempts.length > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{attempts.filter(a => a.isCorrect).length} correct so far</span>
            <span>{score}%</span>
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
              className="w-full h-32 bg-slate-700 border border-slate-600 rounded-xl p-3 text-white text-sm placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 disabled:opacity-70"
            />
            {state === 'answering' && (
              <button
                onClick={() => submitShortAnswer(textAnswer)}
                disabled={!textAnswer.trim()}
                className="mt-3 w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors"
              >
                Submit Answer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feedback panel */}
      {state === 'feedback' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4 animate-fadeInUp">
          {isGrading ? (
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>AI is grading your answer...</span>
            </div>
          ) : (
            <>
              {/* Result badge */}
              <div className="flex items-center gap-2 mb-3">
                {lastAttempt?.isCorrect ? (
                  <span className="text-green-400 font-semibold text-sm">✓ Correct!</span>
                ) : (
                  <span className="text-red-400 font-semibold text-sm">✗ Not quite</span>
                )}
              </div>

              {/* Explanation */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{aiFeedback}</p>

              {/* ── Help options ── */}
              <div className="border-t border-slate-700 pt-4">
                <div className="text-slate-500 text-xs mb-3">
                  {lastAttempt?.isCorrect ? 'Want to learn more?' : 'Need help understanding this?'}
                </div>
                <div className="space-y-2">
                  <QuizAIPanel
                    mode="reallife"
                    questionPrompt={currentQuestion.prompt}
                    correctAnswer={
                      currentQuestion.type === 'multiple-choice' && currentQuestion.options && currentQuestion.correctIndex != null
                        ? currentQuestion.options[currentQuestion.correctIndex]
                        : currentQuestion.correctAnswer ?? aiFeedback
                    }
                    resetKey={currentQuestion.id}
                    label="Show Real Life Example for This Question"
                    icon="🌍"
                    borderColor="border-amber-500/30"
                    textColor="text-amber-300"
                    bgColor="bg-amber-500/10"
                  />
                  <QuizAIPanel
                    mode="minilecture"
                    questionPrompt={currentQuestion.prompt}
                    correctAnswer={
                      currentQuestion.type === 'multiple-choice' && currentQuestion.options && currentQuestion.correctIndex != null
                        ? currentQuestion.options[currentQuestion.correctIndex]
                        : currentQuestion.correctAnswer ?? aiFeedback
                    }
                    resetKey={currentQuestion.id}
                    label="Mini Lecture — Explain This Concept to Me"
                    icon="⚡"
                    borderColor="border-blue-500/30"
                    textColor="text-blue-300"
                    bgColor="bg-blue-500/10"
                  />
                  <Link
                    href={`/lecture/${topicId}`}
                    target="_blank"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600 bg-slate-700/40 text-slate-300 hover:bg-slate-700 transition-all text-xs font-medium"
                  >
                    <span>📖</span>
                    Review Full Topic Lecture
                    <span className="ml-auto text-slate-500">↗</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Next button */}
      {state === 'feedback' && !isGrading && (
        <button
          onClick={next}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
        >
          {currentIndex + 1 >= totalQuestions ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
