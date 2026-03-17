'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Question } from '@/types/quiz';
import { getQuestionsByCourse, getRandomQuestions } from '@/data/quizzes';
import { CourseId } from '@/types/course';

// ─── Types ────────────────────────────────────────────────────────────────────

type CourseSelection = CourseId | 'ALL';
type QuestionCount = 10 | 20 | 30;
type TimeLimitMinutes = 30 | 50 | null; // null = no timer

type ExamState = 'config' | 'exam' | 'grading' | 'results';

interface ExamAnswer {
  selectedIndex?: number;   // for multiple-choice
  textAnswer?: string;      // for short-answer
  flagged: boolean;
  aiResult?: { isCorrect: boolean; score: number; feedback: string };
}

interface TopicBreakdown {
  topicId: string;
  total: number;
  correct: number;
  manualReview: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COURSE_OPTIONS: { id: CourseSelection; label: string; sub: string }[] = [
  { id: 'CHEM008A', label: 'CHEM 008A', sub: 'Organic Chemistry I' },
  { id: 'CHEM008B', label: 'CHEM 008B', sub: 'Organic Chemistry II' },
  { id: 'CHEM008C', label: 'CHEM 008C', sub: 'Organic Chemistry III' },
  { id: 'ALL',      label: 'All Courses', sub: 'Combined exam' },
];

const COUNT_OPTIONS: QuestionCount[] = [10, 20, 30];

const TIME_OPTIONS: { value: TimeLimitMinutes; label: string }[] = [
  { value: 30,   label: '30 minutes' },
  { value: 50,   label: '50 minutes' },
  { value: null, label: 'No timer' },
];

const COURSE_BADGE: Record<CourseId, string> = {
  CHEM008A: 'bg-blue-600',
  CHEM008B: 'bg-green-600',
  CHEM008C: 'bg-purple-600',
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function letterGrade(pct: number): string {
  if (pct >= 90) return 'A';
  if (pct >= 80) return 'B';
  if (pct >= 70) return 'C';
  if (pct >= 60) return 'D';
  return 'F';
}

function gradeColor(pct: number): string {
  if (pct >= 90) return 'text-green-400';
  if (pct >= 80) return 'text-blue-400';
  if (pct >= 70) return 'text-yellow-400';
  if (pct >= 60) return 'text-orange-400';
  return 'text-red-400';
}

function buildAnswers(count: number): ExamAnswer[] {
  return Array.from({ length: count }, () => ({ flagged: false }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConfigScreen({
  onStart,
}: {
  onStart: (course: CourseSelection, count: QuestionCount, timeLimit: TimeLimitMinutes) => void;
}) {
  const [course, setCourse] = useState<CourseSelection>('CHEM008A');
  const [count, setCount] = useState<QuestionCount>(20);
  const [timeLimit, setTimeLimit] = useState<TimeLimitMinutes>(50);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Practice Exam</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Simulate UCR exam conditions with timed questions drawn from real course material.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 space-y-8">

          {/* Course selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Select Course
            </label>
            <div className="grid grid-cols-2 gap-3">
              {COURSE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCourse(opt.id)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                    course === opt.id
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-semibold text-sm">{opt.label}</span>
                  <span className={`text-xs mt-0.5 ${course === opt.id ? 'text-blue-300' : 'text-slate-500'}`}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Number of Questions
            </label>
            <div className="flex gap-3">
              {COUNT_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    count === n
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Time limit */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Time Limit
            </label>
            <div className="flex gap-3">
              {TIME_OPTIONS.map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => setTimeLimit(opt.value)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    timeLimit === opt.value
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* UCR note */}
          <div className="flex gap-3 bg-amber-900/20 border border-amber-700/40 rounded-xl p-4">
            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              This exam simulates UCR Organic Chemistry exam conditions. Questions are randomly selected
              from the course question bank. Short-answer questions are automatically graded by AI
              after you submit — results are ready in seconds.
            </p>
          </div>

          {/* Start button */}
          <button
            onClick={() => onStart(course, count, timeLimit)}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-base"
          >
            Start Exam
          </button>
        </div>

        <div className="text-center mt-6">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Exam Screen ──────────────────────────────────────────────────────────────

function ExamScreen({
  questions,
  answers,
  timeLimit,
  onAnswerChange,
  onFlagToggle,
  onSubmit,
}: {
  questions: Question[];
  answers: ExamAnswer[];
  timeLimit: TimeLimitMinutes;
  onAnswerChange: (index: number, answer: Partial<ExamAnswer>) => void;
  onFlagToggle: (index: number) => void;
  onSubmit: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    timeLimit !== null ? timeLimit * 60 : null
  );
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft <= 0) {
      onSubmit();
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === null || prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (secondsLeft === 0) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const question = questions[currentIndex];
  const answer = answers[currentIndex];
  const answeredCount = answers.filter(a => a.selectedIndex !== undefined || (a.textAnswer?.trim() ?? '') !== '').length;
  const flaggedCount = answers.filter(a => a.flagged).length;
  const isTimerCritical = secondsLeft !== null && secondsLeft < 300; // < 5 min

  function getQuestionStatus(i: number): 'answered' | 'flagged' | 'unanswered' {
    const a = answers[i];
    const hasAnswer = a.selectedIndex !== undefined || (a.textAnswer?.trim() ?? '') !== '';
    if (a.flagged) return 'flagged';
    if (hasAnswer) return 'answered';
    return 'unanswered';
  }

  const statusColors = {
    answered: 'bg-green-600 text-white border-green-500',
    flagged:  'bg-amber-500 text-white border-amber-400',
    unanswered: 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600 hover:text-white',
  };

  const handleSubmitClick = () => {
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0) {
      setShowSubmitConfirm(true);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-30 bg-slate-900 border-b border-slate-700 px-6 py-3 flex items-center justify-between gap-4">
        {/* Timer */}
        <div className={`flex items-center gap-2 font-mono text-lg font-bold min-w-[90px] ${
          secondsLeft === null ? 'text-slate-500' : isTimerCritical ? 'text-red-400 animate-pulse' : 'text-white'
        }`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {secondsLeft === null ? 'No limit' : formatTime(secondsLeft)}
        </div>

        {/* Progress */}
        <div className="flex-1 max-w-sm">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Q {currentIndex + 1} / {questions.length}</span>
            <span>{answeredCount} answered{flaggedCount > 0 ? ` · ${flaggedCount} flagged` : ''}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmitClick}
          className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Submit Exam
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar: question navigator */}
        <aside className="w-56 flex-shrink-0 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Questions
          </div>
          <div className="flex flex-col gap-1.5">
            {questions.map((_, i) => {
              const status = getQuestionStatus(i);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    i === currentIndex
                      ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-800 ' + statusColors[status]
                      : statusColors[status]
                  }`}
                >
                  <span className="w-5 text-center font-mono">{i + 1}</span>
                  <span className="flex-1 text-left truncate">
                    {questions[i].type === 'short-answer' ? 'Free response' : 'Multiple choice'}
                  </span>
                  {answers[i].flagged && (
                    <svg className="w-3 h-3 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-1.5 border-t border-slate-700 pt-4">
            {[
              { color: 'bg-green-600', label: 'Answered' },
              { color: 'bg-amber-500', label: 'Flagged' },
              { color: 'bg-slate-700', label: 'Unanswered' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-slate-500">
                <span className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Main question area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">

            {/* Question header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg font-mono">
                  Q{currentIndex + 1}
                </span>
                {question.courseId && (
                  <span className={`${COURSE_BADGE[question.courseId]} text-white text-xs font-bold px-2 py-1 rounded-lg`}>
                    {question.courseId}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  question.difficulty === 1 ? 'bg-green-500/20 text-green-300' :
                  question.difficulty === 2 ? 'bg-yellow-500/20 text-yellow-300' :
                                              'bg-red-500/20 text-red-300'
                }`}>
                  {question.difficulty === 1 ? 'Easy' : question.difficulty === 2 ? 'Medium' : 'Hard'}
                </span>
              </div>

              <button
                onClick={() => onFlagToggle(currentIndex)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  answer.flagged
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-amber-500/50 hover:text-amber-300'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill={answer.flagged ? 'currentColor' : 'none'} viewBox="0 0 20 20" stroke="currentColor" strokeWidth={answer.flagged ? 0 : 1.5}>
                  <path fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd" />
                </svg>
                {answer.flagged ? 'Flagged' : 'Flag for Review'}
              </button>
            </div>

            {/* Prompt */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
              <p className="text-white text-base leading-relaxed">{question.prompt}</p>
            </div>

            {/* Answer area */}
            {question.type === 'multiple-choice' && question.options ? (
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => onAnswerChange(currentIndex, { selectedIndex: i })}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                      answer.selectedIndex === i
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-750'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                      answer.selectedIndex === i
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-slate-400'
                    }`}>
                      {OPTION_LETTERS[i]}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed">{opt}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Your Answer
                  <span className="ml-2 text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                    Free response — AI graded on submit
                  </span>
                </label>
                <textarea
                  value={answer.textAnswer ?? ''}
                  onChange={e => onAnswerChange(currentIndex, { textAnswer: e.target.value })}
                  placeholder="Type your answer here..."
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none transition-colors"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <span className="text-xs text-slate-500">
                {currentIndex + 1} of {questions.length}
              </span>

              <button
                onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex === questions.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Submit Exam?</h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? 's' : ''} unanswered
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              You still have {questions.length - answeredCount} unanswered question{questions.length - answeredCount !== 1 ? 's' : ''}.
              Unanswered questions will be marked incorrect. Are you sure you want to submit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Keep Working
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────────

function ResultsScreen({
  questions,
  answers,
  onRetake,
}: {
  questions: Question[];
  answers: ExamAnswer[];
  onRetake: () => void;
}) {
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Grade all questions
  const graded = questions.map((q, i) => {
    const a = answers[i];
    if (q.type === 'short-answer') {
      if (a.aiResult) {
        return { correct: a.aiResult.isCorrect, manualReview: false };
      }
      return { correct: false, manualReview: true };
    }
    const hasAnswer = a.selectedIndex !== undefined;
    const correct = hasAnswer && a.selectedIndex === q.correctIndex;
    return { correct, manualReview: false };
  });

  const mcQuestions = questions.filter((q, i) => !graded[i].manualReview);
  const correctCount = graded.filter(g => g.correct).length;
  const manualCount = graded.filter(g => g.manualReview).length;
  const gradableCount = questions.length - manualCount;
  const pct = gradableCount > 0 ? Math.round((correctCount / gradableCount) * 100) : 0;
  const grade = letterGrade(pct);
  const gColor = gradeColor(pct);

  // Topic breakdown
  const topicMap = new Map<string, TopicBreakdown>();
  questions.forEach((q, i) => {
    const existing = topicMap.get(q.topicId) ?? { topicId: q.topicId, total: 0, correct: 0, manualReview: 0 };
    existing.total++;
    if (graded[i].correct) existing.correct++;
    if (graded[i].manualReview) existing.manualReview++;
    topicMap.set(q.topicId, existing);
  });
  const topicBreakdown = Array.from(topicMap.values()).sort((a, b) => {
    const aPct = a.total > a.manualReview ? a.correct / (a.total - a.manualReview) : 0;
    const bPct = b.total > b.manualReview ? b.correct / (b.total - b.manualReview) : 0;
    return aPct - bPct; // worst first
  });

  if (reviewMode) {
    const q = questions[reviewIndex];
    const a = answers[reviewIndex];
    const g = graded[reviewIndex];

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        {/* Review top bar */}
        <div className="sticky top-0 z-30 bg-slate-900 border-b border-slate-700 px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setReviewMode(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Results
          </button>
          <span className="text-slate-400 text-sm">
            Reviewing Q{reviewIndex + 1} / {questions.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
              disabled={reviewIndex === 0}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium disabled:opacity-30 hover:bg-slate-700 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setReviewIndex(i => Math.min(questions.length - 1, i + 1))}
              disabled={reviewIndex === questions.length - 1}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium disabled:opacity-30 hover:bg-slate-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Review sidebar + content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-48 flex-shrink-0 bg-slate-800 border-r border-slate-700 p-3 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Questions</div>
            <div className="flex flex-col gap-1">
              {questions.map((_, i) => {
                const g2 = graded[i];
                const isActive = i === reviewIndex;
                const cls = g2.manualReview
                  ? 'bg-slate-600 border-slate-500 text-slate-300'
                  : g2.correct
                    ? 'bg-green-600/30 border-green-500/60 text-green-300'
                    : 'bg-red-600/30 border-red-500/60 text-red-300';
                return (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${cls} ${
                      isActive ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-800' : ''
                    }`}
                  >
                    Q{i + 1}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Review question */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              {/* Status badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${
                g.manualReview
                  ? 'bg-slate-600/40 text-slate-300'
                  : g.correct
                    ? 'bg-green-600/20 text-green-300'
                    : 'bg-red-600/20 text-red-300'
              }`}>
                {g.manualReview ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    </svg>
                    Not graded
                  </>
                ) : g.correct ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Correct
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Incorrect
                  </>
                )}
              </div>

              {/* Question */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-5">
                <p className="text-white text-sm leading-relaxed">{q.prompt}</p>
              </div>

              {/* MC options */}
              {q.type === 'multiple-choice' && q.options && (
                <div className="space-y-2.5 mb-5">
                  {q.options.map((opt, i) => {
                    const isSelected = a.selectedIndex === i;
                    const isCorrect = i === q.correctIndex;
                    let cls = 'bg-slate-800 border-slate-700 text-slate-400';
                    if (isCorrect) cls = 'bg-green-600/15 border-green-500/60 text-green-200';
                    else if (isSelected && !isCorrect) cls = 'bg-red-600/15 border-red-500/60 text-red-200';

                    return (
                      <div key={i} className={`flex items-start gap-4 p-3.5 rounded-xl border ${cls}`}>
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCorrect ? 'bg-green-600 text-white' :
                          isSelected ? 'bg-red-600 text-white' :
                          'bg-slate-700 text-slate-500'
                        }`}>
                          {OPTION_LETTERS[i]}
                        </span>
                        <span className="text-sm pt-0.5 leading-relaxed">{opt}</span>
                        {isCorrect && (
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0 ml-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd" />
                          </svg>
                        )}
                        {isSelected && !isCorrect && (
                          <svg className="w-4 h-4 text-red-400 flex-shrink-0 ml-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Short answer: show what they wrote + AI feedback */}
              {q.type === 'short-answer' && (
                <div className="mb-5 space-y-3">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">Your Answer</div>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {a.textAnswer?.trim() ? a.textAnswer : <span className="text-slate-600 italic">No answer provided</span>}
                    </p>
                  </div>
                  {a.aiResult && (
                    <div className={`rounded-xl p-4 border ${a.aiResult.isCorrect ? 'bg-green-600/10 border-green-500/30' : 'bg-amber-600/10 border-amber-500/30'}`}>
                      <div className={`text-xs mb-1.5 font-medium uppercase tracking-wide flex items-center gap-2 ${a.aiResult.isCorrect ? 'text-green-400' : 'text-amber-400'}`}>
                        <span>{a.aiResult.isCorrect ? '✓' : '~'}</span>
                        AI Grade: {a.aiResult.score}/100 — {a.aiResult.isCorrect ? 'Correct' : 'Needs Improvement'}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{a.aiResult.feedback}</p>
                    </div>
                  )}
                  {q.correctAnswer && (
                    <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-4">
                      <div className="text-xs text-green-400 mb-1.5 font-medium uppercase tracking-wide">Sample Answer</div>
                      <p className="text-green-200 text-sm leading-relaxed">{q.correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation */}
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">Explanation</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ── Summary view ──
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Score hero */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
          <div className="text-slate-400 text-sm mb-1 uppercase tracking-wide font-medium">Exam Complete</div>
          <div className={`text-7xl font-black mb-2 ${gColor}`}>{grade}</div>
          <div className="text-white text-3xl font-bold mb-1">{pct}%</div>
          <div className="text-slate-400 text-sm">
            {correctCount} / {gradableCount} correct
            {manualCount > 0 && (
              <span className="ml-2 text-slate-500">
                ({manualCount} question{manualCount !== 1 ? 's' : ''} need manual review)
              </span>
            )}
          </div>

          {/* Grade bar */}
          <div className="relative w-full bg-slate-700 rounded-full h-3 mt-6 mb-2">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                pct >= 90 ? 'bg-green-500' : pct >= 80 ? 'bg-blue-500' : pct >= 70 ? 'bg-yellow-500' : pct >= 60 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>0%</span>
            <span className="text-red-600">F&lt;60</span>
            <span className="text-orange-600">D</span>
            <span className="text-yellow-600">C</span>
            <span className="text-blue-600">B</span>
            <span className="text-green-600">A≥90</span>
            <span>100%</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Correct', value: correctCount, color: 'text-green-400' },
            { label: 'Incorrect', value: gradableCount - correctCount, color: 'text-red-400' },
            { label: manualCount > 0 ? 'Manual Review' : 'AI Graded', value: manualCount > 0 ? manualCount : questions.filter(q => q.type === 'short-answer').length, color: manualCount > 0 ? 'text-amber-400' : 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Topic breakdown */}
        {topicBreakdown.length > 0 && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Performance by Topic</h2>
            <div className="space-y-3">
              {topicBreakdown.map(tb => {
                const gradable = tb.total - tb.manualReview;
                const topicPct = gradable > 0 ? Math.round((tb.correct / gradable) * 100) : null;
                const topicLabel = tb.topicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

                return (
                  <div key={tb.topicId} className="flex items-center gap-4">
                    <div className="w-40 flex-shrink-0">
                      <div className="text-white text-xs font-medium truncate" title={topicLabel}>
                        {topicLabel}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {tb.correct}/{gradable} correct
                        {tb.manualReview > 0 && ` · ${tb.manualReview} manual`}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      {topicPct !== null && (
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${
                            topicPct >= 80 ? 'bg-green-500' : topicPct >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${topicPct}%` }}
                        />
                      )}
                    </div>
                    <div className={`w-12 text-right text-xs font-semibold ${
                      topicPct === null ? 'text-slate-500' :
                      topicPct >= 80 ? 'text-green-400' : topicPct >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {topicPct !== null ? `${topicPct}%` : 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => setReviewMode(true)}
            className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Review Answers
          </button>
          <button
            onClick={onRetake}
            className="flex-1 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Take Another Exam
          </button>
          <Link
            href="/dashboard"
            className="flex-1 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors text-sm text-center"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExamPage() {
  const [examState, setExamState] = useState<ExamState>('config');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [timeLimit, setTimeLimit] = useState<TimeLimitMinutes>(50);

  const handleStart = useCallback((
    course: CourseSelection,
    count: QuestionCount,
    limit: TimeLimitMinutes,
  ) => {
    let pool: Question[] = [];

    if (course === 'ALL') {
      const a = getQuestionsByCourse('CHEM008A');
      const b = getQuestionsByCourse('CHEM008B');
      const c = getQuestionsByCourse('CHEM008C');
      pool = shuffleArray([...a, ...b, ...c]).slice(0, count);
    } else {
      pool = getRandomQuestions(course as CourseId, count);
    }

    setQuestions(pool);
    setAnswers(buildAnswers(pool.length));
    setTimeLimit(limit);
    setExamState('exam');
  }, []);

  const handleAnswerChange = useCallback((index: number, partial: Partial<ExamAnswer>) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...partial };
      return next;
    });
  }, []);

  const handleFlagToggle = useCallback((index: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], flagged: !next[index].flagged };
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    setExamState('grading');

    const updatedAnswers = [...answers];
    const gradingTasks = questions.map(async (q, i) => {
      if (q.type !== 'short-answer') return;
      const textAnswer = answers[i].textAnswer?.trim();
      if (!textAnswer) {
        updatedAnswers[i] = { ...updatedAnswers[i], aiResult: { isCorrect: false, score: 0, feedback: 'No answer provided.' } };
        return;
      }
      try {
        const res = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gradingMode: true,
            question: q.prompt,
            correctAnswer: q.correctAnswer,
            studentAnswer: textAnswer,
          }),
        });
        const data = await res.json();
        updatedAnswers[i] = { ...updatedAnswers[i], aiResult: { isCorrect: data.isCorrect, score: data.score, feedback: data.feedback } };
      } catch {
        updatedAnswers[i] = { ...updatedAnswers[i], aiResult: { isCorrect: false, score: 0, feedback: 'Could not grade — see sample answer for comparison.' } };
      }
    });

    await Promise.all(gradingTasks);
    setAnswers(updatedAnswers);
    setExamState('results');
  }, [questions, answers]);

  const handleRetake = useCallback(() => {
    setQuestions([]);
    setAnswers([]);
    setExamState('config');
  }, []);

  if (examState === 'config') {
    return <ConfigScreen onStart={handleStart} />;
  }

  if (examState === 'exam') {
    return (
      <ExamScreen
        questions={questions}
        answers={answers}
        timeLimit={timeLimit}
        onAnswerChange={handleAnswerChange}
        onFlagToggle={handleFlagToggle}
        onSubmit={handleSubmit}
      />
    );
  }

  if (examState === 'grading') {
    const saCount = questions.filter(q => q.type === 'short-answer' && answers[questions.indexOf(q)].textAnswer?.trim()).length;
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 max-w-sm w-full text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <div className="text-white font-semibold text-lg mb-2">Grading your exam...</div>
          <div className="text-slate-400 text-sm">
            AI is reviewing {saCount} short-answer question{saCount !== 1 ? 's' : ''}. This takes a few seconds.
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResultsScreen
      questions={questions}
      answers={answers}
      onRetake={handleRetake}
    />
  );
}
