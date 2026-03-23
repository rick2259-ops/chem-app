'use client';

import { useState, useCallback, useRef } from 'react';
import { addStudySession } from '@/lib/storage/progressStorage';
import Link from 'next/link';
import MoleculeViewer from '@/components/drill/MoleculeViewer';
import {
  arrowQuestions,
  FROM_OPTIONS,
  TO_OPTIONS,
  type ArrowQuestion,
  type FromValue,
  type ToValue,
} from '@/data/drill/arrow-questions';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'setup' | 'from' | 'to' | 'feedback' | 'complete';

interface Attempt {
  question: ArrowQuestion;
  selectedFrom: FromValue;
  selectedTo: ToValue;
  fromCorrect: boolean;
  toCorrect: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ScoreRing({ pct, size = 80 }: { pct: number; size?: number }) {
  const r    = size * 0.4;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#ca8a04' : '#dc2626';
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#334155" strokeWidth={size * 0.09} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size * 0.09}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-white" style={{ fontSize: size * 0.22 }}>{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ArrowPushingDrillPage() {
  const [phase, setPhase]           = useState<Phase>('setup');
  const [count, setCount]           = useState(10);
  const [deck, setDeck]             = useState<ArrowQuestion[]>([]);
  const [index, setIndex]           = useState(0);
  const [attempts, setAttempts]     = useState<Attempt[]>([]);
  const startTimeRef = useRef(Date.now());

  // Per-question state
  const [selectedFrom, setSelectedFrom] = useState<FromValue | null>(null);
  const [selectedTo, setSelectedTo]     = useState<ToValue | null>(null);
  const [fromRevealed, setFromRevealed] = useState(false);
  const [toRevealed, setToRevealed]     = useState(false);

  const currentQ = deck[index];

  const handleStart = useCallback(() => {
    startTimeRef.current = Date.now();
    const filtered = shuffle(arrowQuestions).slice(0, count);
    setDeck(filtered);
    setIndex(0);
    setAttempts([]);
    setSelectedFrom(null);
    setSelectedTo(null);
    setFromRevealed(false);
    setToRevealed(false);
    setPhase('from');
  }, [count]);

  const handleFromSelect = useCallback((val: FromValue) => {
    if (fromRevealed) return;
    setSelectedFrom(val);
    setFromRevealed(true);
    // Auto-advance to TO selection after brief reveal
    setTimeout(() => setPhase('to'), val === currentQ.correctFrom ? 1000 : 1800);
  }, [fromRevealed, currentQ]);

  const handleToSelect = useCallback((val: ToValue) => {
    if (toRevealed || !selectedFrom) return;
    setSelectedTo(val);
    setToRevealed(true);
    const fromCorrect = selectedFrom === currentQ.correctFrom;
    const toCorrect   = val === currentQ.correctTo;
    setAttempts(prev => [...prev, {
      question: currentQ,
      selectedFrom: selectedFrom,
      selectedTo: val,
      fromCorrect,
      toCorrect,
    }]);
    setTimeout(() => setPhase('feedback'), 1000);
  }, [toRevealed, selectedFrom, currentQ]);

  const handleNext = useCallback(() => {
    if (index + 1 >= deck.length) {
      const allAttempts = [...attempts];
      const correct = allAttempts.filter(a => a.fromCorrect && a.toCorrect).length;
      const score = allAttempts.length > 0 ? Math.round((correct / allAttempts.length) * 100) : 0;
      addStudySession({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        topicId: 'arrow-pushing-drill',
        courseId: 'CHEM008A',
        activityType: 'mechanism',
        durationMinutes: Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000)),
        score,
      });
      setPhase('complete');
    } else {
      setIndex(i => i + 1);
      setSelectedFrom(null);
      setSelectedTo(null);
      setFromRevealed(false);
      setToRevealed(false);
      setPhase('from');
    }
  }, [index, deck.length]);

  const handleRestart = useCallback(() => {
    setPhase('setup');
    setDeck([]);
    setIndex(0);
    setAttempts([]);
    setSelectedFrom(null);
    setSelectedTo(null);
    setFromRevealed(false);
    setToRevealed(false);
  }, []);

  // ── Setup ──
  if (phase === 'setup') {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/drill" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Drill Mode
          </Link>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center">
          <div className="text-5xl mb-3">⚡</div>
          <h1 className="text-2xl font-bold text-white mb-2">Arrow Pushing Drill</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            The foundation of every mechanism.<br />
            Electrons always flow from <span className="text-violet-300 font-semibold">electron-rich → electron-poor</span>.<br />
            Identify the source and sink for each reaction step.
          </p>

          <div className="bg-slate-900/60 rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">How it works</p>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-violet-400 flex-shrink-0">1.</span>
              Read the reaction scenario
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-violet-400 flex-shrink-0">2.</span>
              Select where the electron pair comes FROM
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-violet-400 flex-shrink-0">3.</span>
              Select where it goes TO — both must be correct
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-violet-400 flex-shrink-0">4.</span>
              Read the explanation — understand WHY
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Questions</p>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                min={1}
                max={arrowQuestions.length}
                value={count}
                onChange={e => setCount(Math.min(arrowQuestions.length, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-24 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm text-center focus:outline-none focus:border-violet-500"
              />
              <span className="text-xs text-slate-500">questions (max {arrowQuestions.length} in bank)</span>
            </div>
          </div>

          <button onClick={handleStart}
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg rounded-xl transition-colors">
            Start Drill →
          </button>
        </div>
      </div>
    );
  }

  // ── Complete ──
  if (phase === 'complete') {
    const bothCorrect  = attempts.filter(a => a.fromCorrect && a.toCorrect).length;
    const partCorrect  = attempts.filter(a => (a.fromCorrect || a.toCorrect) && !(a.fromCorrect && a.toCorrect)).length;
    const bothWrong    = attempts.filter(a => !a.fromCorrect && !a.toCorrect).length;
    const pct          = Math.round((bothCorrect / attempts.length) * 100);

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-5">Drill Complete!</h2>
          <div className="flex items-center justify-center gap-10 mb-4">
            <ScoreRing pct={pct} size={96} />
            <div className="text-left space-y-1.5">
              <div className="text-white">
                <span className="text-3xl font-bold text-green-400">{bothCorrect}</span>
                <span className="text-slate-400"> / {attempts.length} both correct</span>
              </div>
              {partCorrect > 0 && (
                <div className="text-yellow-400 text-sm">{partCorrect} partially correct</div>
              )}
              {bothWrong > 0 && (
                <div className="text-red-400 text-sm">{bothWrong} both wrong</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleStart}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
              Drill Again
            </button>
            <button onClick={handleRestart}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors">
              Change Setup
            </button>
          </div>
        </div>

        {/* Review missed */}
        {attempts.filter(a => !a.fromCorrect || !a.toCorrect).length > 0 && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Review ({attempts.filter(a => !a.fromCorrect || !a.toCorrect).length} to improve)
            </h3>
            <div className="space-y-4">
              {attempts.filter(a => !a.fromCorrect || !a.toCorrect).map((att, i) => {
                const correctFromLabel = FROM_OPTIONS.find(o => o.value === att.question.correctFrom)?.label;
                const correctToLabel   = TO_OPTIONS.find(o => o.value === att.question.correctTo)?.label;
                return (
                  <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1 font-medium">{att.question.mechanismName}</p>
                    <p className="text-slate-300 text-sm mb-3">{att.question.scenario}</p>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs text-slate-500">FROM:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${att.fromCorrect ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
                        {FROM_OPTIONS.find(o => o.value === att.selectedFrom)?.label}
                      </span>
                      {!att.fromCorrect && (
                        <>
                          <span className="text-slate-600 text-xs">→ should be</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300">{correctFromLabel}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="text-xs text-slate-500">TO:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${att.toCorrect ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
                        {TO_OPTIONS.find(o => o.value === att.selectedTo)?.label}
                      </span>
                      {!att.toCorrect && (
                        <>
                          <span className="text-slate-600 text-xs">→ should be</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300">{correctToLabel}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/50 pt-2">
                      <span className="text-violet-400 font-semibold">Key: </span>{att.question.principle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Drill ──
  if (!currentQ) return null;

  const progressPct   = (index / deck.length) * 100;
  const bothAnswered  = fromRevealed && toRevealed;
  const fromCorrectNow = selectedFrom === currentQ.correctFrom;
  const toCorrectNow   = selectedTo === currentQ.correctTo;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-violet-400 font-bold text-sm">⚡ Arrow Pushing</span>
        <span className="text-slate-400 text-sm">{index + 1} / {deck.length}</span>
      </div>
      <div className="mb-5">
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Principle banner */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-violet-500/10 border border-violet-500/20 rounded-lg">
        <span className="text-violet-400 text-xs font-bold">RULE</span>
        <span className="text-xs text-slate-300">Electrons flow from <strong className="text-violet-300">electron-rich (source)</strong> → <strong className="text-violet-300">electron-poor (sink)</strong></span>
      </div>

      {/* Scenario */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 font-medium">
            {currentQ.mechanismName}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            currentQ.difficulty === 1 ? 'bg-green-500/15 text-green-400' :
            currentQ.difficulty === 2 ? 'bg-yellow-500/15 text-yellow-400' :
            'bg-red-500/15 text-red-400'
          }`}>
            {currentQ.difficulty === 1 ? 'Basic' : currentQ.difficulty === 2 ? 'Intermediate' : 'Advanced'}
          </span>
        </div>

        {/* Molecule structure */}
        <div className="flex justify-center mb-4">
          <MoleculeViewer
            smiles={currentQ.smiles}
            label={currentQ.smilesLabel}
            fallback={currentQ.structural}
            size={280}
          />
        </div>

        <p className="text-white font-medium mb-1">{currentQ.scenario}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{currentQ.context}</p>
      </div>

      {/* FROM selection */}
      <div className={`bg-slate-800 rounded-xl border p-5 mb-4 transition-all ${
        fromRevealed ? 'border-slate-700/50' : 'border-violet-500/40'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            fromRevealed
              ? (fromCorrectNow ? 'bg-green-500' : 'bg-red-500')
              : 'bg-violet-600'
          } text-white`}>
            {fromRevealed ? (fromCorrectNow ? '✓' : '✗') : '1'}
          </span>
          <span className="text-sm font-semibold text-white">
            The arrow for <span className="text-violet-300">{currentQ.arrowLabel}</span> comes FROM:
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {FROM_OPTIONS.map(opt => {
            let cls = 'border-slate-600 text-slate-300 hover:border-violet-500 hover:bg-slate-700/50 cursor-pointer';
            if (fromRevealed) {
              if (opt.value === currentQ.correctFrom) cls = 'border-green-500 bg-green-500/15 text-green-300';
              else if (opt.value === selectedFrom)    cls = 'border-red-500 bg-red-500/15 text-red-300';
              else                                   cls = 'border-slate-700/40 text-slate-600 opacity-40';
            }
            return (
              <button key={opt.value}
                onClick={() => handleFromSelect(opt.value)}
                disabled={fromRevealed}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${cls}`}
              >
                {fromRevealed && opt.value === currentQ.correctFrom && '✓ '}
                {fromRevealed && opt.value === selectedFrom && opt.value !== currentQ.correctFrom && '✗ '}
                {opt.label}
              </button>
            );
          })}
        </div>
        {fromRevealed && (
          <p className={`mt-2 text-xs font-medium ${fromCorrectNow ? 'text-green-400' : 'text-red-400'}`}>
            {fromCorrectNow ? 'Correct! Now identify where it goes...' : 'Not quite — correct answer highlighted. Now identify where it goes...'}
          </p>
        )}
      </div>

      {/* TO selection — only visible after FROM answered */}
      {(phase === 'to' || phase === 'feedback') && (
        <div className={`bg-slate-800 rounded-xl border p-5 mb-4 transition-all ${
          toRevealed ? 'border-slate-700/50' : 'border-violet-500/40'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              toRevealed
                ? (toCorrectNow ? 'bg-green-500' : 'bg-red-500')
                : 'bg-violet-600'
            } text-white`}>
              {toRevealed ? (toCorrectNow ? '✓' : '✗') : '2'}
            </span>
            <span className="text-sm font-semibold text-white">The arrow points TO:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {TO_OPTIONS.map(opt => {
              let cls = 'border-slate-600 text-slate-300 hover:border-violet-500 hover:bg-slate-700/50 cursor-pointer';
              if (toRevealed) {
                if (opt.value === currentQ.correctTo) cls = 'border-green-500 bg-green-500/15 text-green-300';
                else if (opt.value === selectedTo)    cls = 'border-red-500 bg-red-500/15 text-red-300';
                else                                 cls = 'border-slate-700/40 text-slate-600 opacity-40';
              }
              return (
                <button key={opt.value}
                  onClick={() => handleToSelect(opt.value)}
                  disabled={toRevealed}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${cls}`}
                >
                  {toRevealed && opt.value === currentQ.correctTo && '✓ '}
                  {toRevealed && opt.value === selectedTo && opt.value !== currentQ.correctTo && '✗ '}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Feedback */}
      {phase === 'feedback' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`font-semibold text-sm ${bothAnswered && fromCorrectNow && toCorrectNow ? 'text-green-400' : 'text-yellow-400'}`}>
              {fromCorrectNow && toCorrectNow ? '✓ Perfect — both correct!' : '⚠ Review below'}
            </span>
          </div>

          {/* Bond summary */}
          <div className="flex gap-4 mb-3 text-xs">
            <div className="flex-1 bg-green-500/10 rounded-lg p-2">
              <p className="text-green-400 font-semibold mb-0.5">Bond formed</p>
              <p className="text-slate-300">{currentQ.bondFormed}</p>
            </div>
            <div className="flex-1 bg-red-500/10 rounded-lg p-2">
              <p className="text-red-400 font-semibold mb-0.5">Bond broken</p>
              <p className="text-slate-300">{currentQ.bondBroken}</p>
            </div>
          </div>

          {/* Principle */}
          <div className="bg-violet-500/10 rounded-lg p-3 mb-3">
            <p className="text-xs text-violet-400 font-semibold mb-1">Key principle</p>
            <p className="text-xs text-slate-300">{currentQ.principle}</p>
          </div>

          {/* Full explanation */}
          <p className="text-slate-400 text-xs leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {phase === 'feedback' && (
        <button onClick={handleNext}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
          {index + 1 >= deck.length ? 'See Results →' : 'Next →'}
        </button>
      )}
    </div>
  );
}
