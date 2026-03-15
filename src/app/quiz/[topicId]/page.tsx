'use client';
import { use } from 'react';
import Link from 'next/link';
import { getQuizQuestions } from '@/data/quizzes';
import { getTopic } from '@/data/courses';
import { useQuizSession } from '@/hooks/useQuizSession';

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? '#16a34a' : score >= 60 ? '#ca8a04' : '#dc2626';
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#334155" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{score}%</span>
      </div>
    </div>
  );
}

export default function QuizTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const topic = getTopic(topicId);
  const questions = getQuizQuestions(topicId);

  const {
    state,
    currentQuestion,
    currentIndex,
    totalQuestions,
    attempts,
    selectedIndex,
    textAnswer,
    setTextAnswer,
    aiFeedback,
    isGrading,
    score,
    start,
    submitMC,
    submitShortAnswer,
    next,
  } = useQuizSession(questions, topicId, topic?.courseId ?? 'CHEM008A');

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

  // Idle/Start screen
  if (state === 'idle') {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✏️</div>
          <h1 className="text-2xl font-bold text-white mb-2">{topic.title}</h1>
          <p className="text-slate-400 text-sm mb-2">{topic.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-8 mt-4">
            <span>{questions.length} questions</span>
            <span>·</span>
            <span>{questions.filter(q => q.type === 'multiple-choice').length} multiple choice</span>
            {questions.filter(q => q.type === 'short-answer').length > 0 && (
              <>
                <span>·</span>
                <span>{questions.filter(q => q.type === 'short-answer').length} free response</span>
              </>
            )}
          </div>
          <button
            onClick={start}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-semibold text-lg transition-colors"
          >
            Start Quiz
          </button>
          <Link href="/quiz" className="block mt-3 text-slate-400 hover:text-slate-300 text-sm transition-colors">
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  // Results screen
  if (state === 'complete') {
    const correctCount = attempts.filter(a => a.isCorrect).length;
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Quiz Complete!</h2>
          <div className="flex items-center justify-center gap-12 mb-8">
            <ScoreCircle score={score} />
            <div className="space-y-2">
              <div className="text-white">
                <span className="text-2xl font-bold text-green-400">{correctCount}</span>
                <span className="text-slate-400"> / {totalQuestions} correct</span>
              </div>
              <div className="text-slate-400 text-sm">{topic.title}</div>
              <div className={`text-sm font-medium ${
                score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {score >= 80 ? '🎉 Excellent work!' : score >= 60 ? '👍 Good effort!' : '📚 Keep studying!'}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={start}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
            >
              Retake Quiz
            </button>
            <Link
              href="/quiz"
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors text-center"
            >
              All Quizzes
            </Link>
          </div>
        </div>

        {/* Review */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Question Review</h3>
          <div className="space-y-4">
            {attempts.map((attempt, idx) => {
              const q = questions[idx];
              if (!q) return null;
              return (
                <div
                  key={attempt.questionId}
                  className={`p-4 rounded-xl border ${
                    attempt.isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">
                      {attempt.isCorrect ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium mb-1">Q{idx + 1}: {q.prompt}</div>
                      {q.type === 'multiple-choice' && q.options && (
                        <div className="text-sm mb-2">
                          {attempt.selectedIndex != null && (
                            <div className={`${attempt.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              Your answer: {q.options[attempt.selectedIndex]}
                            </div>
                          )}
                          {!attempt.isCorrect && q.correctIndex != null && (
                            <div className="text-green-400">
                              Correct: {q.options[q.correctIndex]}
                            </div>
                          )}
                        </div>
                      )}
                      {q.type === 'short-answer' && attempt.textAnswer && (
                        <div className="text-slate-300 text-xs mb-2 italic">
                          Your answer: {attempt.textAnswer}
                        </div>
                      )}
                      {attempt.aiFeedback && (
                        <div className="text-slate-400 text-xs leading-relaxed bg-slate-700/50 rounded-lg p-2">
                          {attempt.aiFeedback}
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

  // Active question
  const progressPct = ((currentIndex) / totalQuestions) * 100;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>{topic.title}</span>
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* Running score */}
        {attempts.length > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{attempts.filter(a => a.isCorrect).length} correct so far</span>
            <span>{score}%</span>
          </div>
        )}
      </div>

      {/* Question card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-4">
        {/* Difficulty badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            currentQuestion.difficulty === 1 ? 'bg-green-500/20 text-green-300' :
            currentQuestion.difficulty === 2 ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {currentQuestion.difficulty === 1 ? 'Easy' : currentQuestion.difficulty === 2 ? 'Medium' : 'Hard'}
          </span>
          <span className="text-xs text-slate-500">{currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 'Free Response'}</span>
        </div>

        <p className="text-white text-lg leading-relaxed mb-6">{currentQuestion.prompt}</p>

        {/* Multiple choice */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let optionClass = 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer';
              if (state === 'feedback') {
                if (idx === currentQuestion.correctIndex) {
                  optionClass = 'border-green-500 bg-green-500/20';
                } else if (idx === selectedIndex && idx !== currentQuestion.correctIndex) {
                  optionClass = 'border-red-500 bg-red-500/20';
                } else {
                  optionClass = 'border-slate-700 opacity-50';
                }
              }
              return (
                <button
                  key={idx}
                  onClick={() => state === 'answering' && submitMC(idx)}
                  disabled={state !== 'answering'}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${optionClass}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    state === 'feedback' && idx === currentQuestion.correctIndex
                      ? 'bg-green-500 text-white'
                      : state === 'feedback' && idx === selectedIndex
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-700 text-slate-300'
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

      {/* Feedback */}
      {state === 'feedback' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4 animate-fadeInUp">
          {isGrading ? (
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>AI is grading your answer...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                {attempts[attempts.length - 1]?.isCorrect ? (
                  <><span className="text-green-400 font-semibold">✓ Correct!</span></>
                ) : (
                  <><span className="text-red-400 font-semibold">✗ Incorrect</span></>
                )}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{aiFeedback}</p>
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
