'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { allMechanisms } from '@/data/mechanisms';
import MechanismCanvas from '@/components/mechanisms/MechanismCanvas';
import { Mechanism, MechanismStep } from '@/types/mechanism';

// ─── Types ─────────────────────────────────────────────────────────────────

interface DrillCard {
  mechanism: Mechanism;
  step: MechanismStep;
  stepIndex: number;
  options: string[];       // 4 titles: correct + 3 distractors
  correctOptionIndex: number;
}

interface Attempt {
  card: DrillCard;
  selectedIndex: number;
  isCorrect: boolean;
}

type State = 'setup' | 'drilling' | 'feedback' | 'complete';

const COURSE_COLORS: Record<string, { badge: string; border: string; text: string }> = {
  CHEM008A: { badge: 'bg-blue-600',   border: 'border-blue-500/30',   text: 'text-blue-300' },
  CHEM008B: { badge: 'bg-green-600',  border: 'border-green-500/30',  text: 'text-green-300' },
  CHEM008C: { badge: 'bg-purple-600', border: 'border-purple-500/30', text: 'text-purple-300' },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(selectedIds: Set<string>, count: number): DrillCard[] {
  const selected = allMechanisms.filter(m => selectedIds.has(m.id));
  if (selected.length === 0) return [];

  // All step titles across ALL mechanisms (for distractors)
  const allTitles = allMechanisms.flatMap(m => m.steps.map(s => s.title));

  // Build a pool of all (mechanism, step) pairs from selected mechanisms
  const pool: { mechanism: Mechanism; step: MechanismStep; stepIndex: number }[] = [];
  for (const m of selected) {
    m.steps.forEach((step, i) => pool.push({ mechanism: m, step, stepIndex: i }));
  }

  const shuffledPool = shuffle(pool);
  const picked = shuffledPool.slice(0, count);

  return picked.map(({ mechanism, step, stepIndex }) => {
    const correctTitle = step.title;
    // Distractors: random titles that are not the correct one
    const distractors = shuffle(allTitles.filter(t => t !== correctTitle)).slice(0, 3);
    const optionsShuffled = shuffle([correctTitle, ...distractors]);
    return {
      mechanism,
      step,
      stepIndex,
      options: optionsShuffled,
      correctOptionIndex: optionsShuffled.indexOf(correctTitle),
    };
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ScoreRing({ pct, size = 80 }: { pct: number; size?: number }) {
  const r = size * 0.4;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#ca8a04' : '#dc2626';
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#334155" strokeWidth={size*0.09} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.09}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-white" style={{ fontSize: size * 0.22 }}>{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function MechanismDrillPage() {
  const [state, setState] = useState<State>('setup');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(allMechanisms.map(m => m.id))
  );
  const [drillCount, setDrillCount] = useState(10);
  const [deck, setDeck] = useState<DrillCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const currentCard = deck[currentIndex];

  const toggleMechanism = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => setSelectedIds(new Set(allMechanisms.map(m => m.id))), []);
  const selectCourse = useCallback((courseId: string) => {
    setSelectedIds(new Set(allMechanisms.filter(m => m.courseId === courseId).map(m => m.id)));
  }, []);

  const startDrill = useCallback(() => {
    const built = buildDeck(selectedIds, drillCount);
    if (built.length === 0) return;
    setDeck(built);
    setCurrentIndex(0);
    setAttempts([]);
    setSelectedOption(null);
    setState('drilling');
  }, [selectedIds, drillCount]);

  const submitAnswer = useCallback((optionIdx: number) => {
    if (!currentCard) return;
    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentCard.correctOptionIndex;
    setAttempts(prev => [...prev, { card: currentCard, selectedIndex: optionIdx, isCorrect }]);
    setState('feedback');
  }, [currentCard]);

  const next = useCallback(() => {
    if (currentIndex + 1 >= deck.length) {
      setState('complete');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setState('drilling');
    }
  }, [currentIndex, deck.length]);

  const restart = useCallback(() => {
    setState('setup');
    setDeck([]);
    setAttempts([]);
    setSelectedOption(null);
    setCurrentIndex(0);
  }, []);

  // ── Setup ──
  if (state === 'setup') {
    const courseIds = ['CHEM008A', 'CHEM008B', 'CHEM008C'] as const;
    const courseLabels: Record<string, string> = {
      CHEM008A: 'Chem 008A',
      CHEM008B: 'Chem 008B',
      CHEM008C: 'Chem 008C',
    };

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/mechanisms" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Mechanisms
          </Link>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">⚗️</div>
            <h1 className="text-2xl font-bold text-white mb-1">Mechanism Drill</h1>
            <p className="text-slate-400 text-sm">
              You'll see each step's diagram and identify what's happening. Tests your visual understanding of electron pushing.
            </p>
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 flex-wrap mb-5">
            <button onClick={selectAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
              All Mechanisms
            </button>
            {courseIds.map(c => (
              <button key={c} onClick={() => selectCourse(c)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${COURSE_COLORS[c].badge} text-white hover:opacity-90`}>
                {courseLabels[c]} only
              </button>
            ))}
          </div>

          {/* Mechanism checkboxes grouped by course */}
          <div className="space-y-4 mb-6">
            {courseIds.map(courseId => {
              const mechs = allMechanisms.filter(m => m.courseId === courseId);
              const colors = COURSE_COLORS[courseId];
              return (
                <div key={courseId}>
                  <div className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>
                    {courseLabels[courseId]}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {mechs.map(m => {
                      const checked = selectedIds.has(m.id);
                      return (
                        <button
                          key={m.id}
                          onClick={() => toggleMechanism(m.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                            checked
                              ? `${colors.border} bg-slate-700`
                              : 'border-slate-700/40 hover:bg-slate-700/40'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                            checked ? `${colors.badge} border-transparent` : 'border-slate-600'
                          }`}>
                            {checked && <span className="text-white text-xs leading-none">✓</span>}
                          </div>
                          <div className="min-w-0">
                            <div className="text-white text-xs font-medium truncate">{m.name}</div>
                            <div className="text-slate-500 text-xs">{m.steps.length} steps</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Round count */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Questions</div>
            <div className="flex gap-2">
              {[10, 15, 20].map(n => (
                <button key={n} onClick={() => setDrillCount(n)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    drillCount === n ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 mb-5">
            {selectedIds.size} mechanism{selectedIds.size !== 1 ? 's' : ''} selected ·{' '}
            {allMechanisms.filter(m => selectedIds.has(m.id)).reduce((s, m) => s + m.steps.length, 0)} total steps
          </div>

          <button
            onClick={startDrill}
            disabled={selectedIds.size === 0}
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold text-lg rounded-xl transition-colors"
          >
            Start Drill →
          </button>
        </div>
      </div>
    );
  }

  // ── Complete ──
  if (state === 'complete') {
    const correct = attempts.filter(a => a.isCorrect).length;
    const pct = Math.round((correct / attempts.length) * 100);
    const wrong = attempts.filter(a => !a.isCorrect);

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-5">Drill Complete!</h2>
          <div className="flex items-center justify-center gap-10 mb-6">
            <ScoreRing pct={pct} size={96} />
            <div className="text-left space-y-1.5">
              <div className="text-white">
                <span className="text-3xl font-bold text-green-400">{correct}</span>
                <span className="text-slate-400"> / {attempts.length} correct</span>
              </div>
              <div className={`text-sm font-medium ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {pct >= 80 ? 'Excellent mechanism recall!' : pct >= 60 ? 'Good — keep drilling!' : 'Review the mechanisms and try again'}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={startDrill}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
              Drill Again
            </button>
            <button onClick={restart}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors">
              Change Setup
            </button>
          </div>
        </div>

        {wrong.length > 0 && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Steps to Review ({wrong.length})</h3>
            <div className="space-y-4">
              {wrong.map((att, i) => {
                const colors = COURSE_COLORS[att.card.mechanism.courseId] ?? COURSE_COLORS.CHEM008A;
                return (
                  <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge} text-white`}>
                        {att.card.mechanism.courseId}
                      </span>
                      <span className="text-slate-400 text-xs">{att.card.mechanism.name}</span>
                      <span className="text-slate-500 text-xs">· Step {att.card.stepIndex + 1}</span>
                    </div>
                    <div className="text-red-400 text-xs mb-1">
                      You chose: <span className="text-red-300">{att.card.options[att.selectedIndex]}</span>
                    </div>
                    <div className="text-green-400 text-xs mb-2">
                      Correct: <span className="text-green-300 font-medium">{att.card.step.title}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{att.card.step.explanation}</p>
                    <Link
                      href={`/mechanisms/${att.card.mechanism.id}`}
                      className="inline-block mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Review {att.card.mechanism.name} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Drilling / Feedback ──
  if (!currentCard) return null;

  const colors = COURSE_COLORS[currentCard.mechanism.courseId] ?? COURSE_COLORS.CHEM008A;
  const progressPct = (currentIndex / deck.length) * 100;
  const correctSoFar = attempts.filter(a => a.isCorrect).length;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-violet-400 font-bold text-sm">⚗️ Mechanism Drill</span>
          <span className="text-slate-500 text-xs">·</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge} text-white`}>
            {currentCard.mechanism.courseId}
          </span>
        </div>
        <span className="text-slate-400 text-sm">{currentIndex + 1} / {deck.length}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        {attempts.length > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{correctSoFar} correct so far</span>
            <span>{Math.round((correctSoFar / attempts.length) * 100)}% accuracy</span>
          </div>
        )}
      </div>

      {/* Mechanism name + step badge */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-white font-semibold text-lg">{currentCard.mechanism.name}</h2>
        <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
          Step {currentCard.stepIndex + 1} of {currentCard.mechanism.steps.length}
        </span>
      </div>

      {/* SVG canvas — re-mount on new card */}
      <div className="mb-5">
        <MechanismCanvas
          key={`${currentCard.mechanism.id}-${currentCard.stepIndex}-${currentIndex}`}
          scene={currentCard.step.svgScene}
          stepNumber={currentCard.stepIndex}
        />
      </div>

      {/* Question */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-4">
        <p className="text-white font-medium mb-4">What is the name of this step?</p>

        <div className="space-y-3">
          {currentCard.options.map((option, idx) => {
            let cls = 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer';
            if (state === 'feedback') {
              if (idx === currentCard.correctOptionIndex) cls = 'border-green-500 bg-green-500/20';
              else if (idx === selectedOption) cls = 'border-red-500 bg-red-500/20';
              else cls = 'border-slate-700 opacity-40';
            }
            return (
              <button
                key={idx}
                onClick={() => state === 'drilling' && submitAnswer(idx)}
                disabled={state !== 'drilling'}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${cls}`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  state === 'feedback' && idx === currentCard.correctOptionIndex ? 'bg-green-500 text-white' :
                  state === 'feedback' && idx === selectedOption ? 'bg-red-500 text-white' :
                  'bg-slate-700 text-slate-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-slate-200 text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback panel */}
      {state === 'feedback' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4 animate-fadeInUp">
          <div className="flex items-center gap-2 mb-3">
            {attempts[attempts.length - 1]?.isCorrect ? (
              <span className="text-green-400 font-semibold text-sm">✓ Correct!</span>
            ) : (
              <span className="text-red-400 font-semibold text-sm">✗ Not quite</span>
            )}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-4">{currentCard.step.explanation}</p>

          {currentCard.step.keyPoints.length > 0 && (
            <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-700/60 mb-3">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">Key Points</div>
              <ul className="space-y-1.5">
                {currentCard.step.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-violet-400 flex-shrink-0 mt-0.5">◆</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/mechanisms/${currentCard.mechanism.id}`}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Review full {currentCard.mechanism.name} mechanism →
          </Link>
        </div>
      )}

      {/* Next button */}
      {state === 'feedback' && (
        <button
          onClick={next}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors"
        >
          {currentIndex + 1 >= deck.length ? 'See Results →' : 'Next Step →'}
        </button>
      )}
    </div>
  );
}
