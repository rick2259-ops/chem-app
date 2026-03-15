'use client';
import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getMechanism } from '@/data/mechanisms';
import MechanismCanvas from '@/components/mechanisms/MechanismCanvas';

const courseColors: Record<string, { badge: string; border: string; ring: string }> = {
  CHEM008A: { badge: 'bg-blue-600',   border: 'border-blue-500/30',   ring: 'ring-blue-500/40' },
  CHEM008B: { badge: 'bg-green-600',  border: 'border-green-500/30',  ring: 'ring-green-500/40' },
  CHEM008C: { badge: 'bg-purple-600', border: 'border-purple-500/30', ring: 'ring-purple-500/40' },
};

const SPEEDS = [
  { label: '0.5×', ms: 6000 },
  { label: '1×',   ms: 3500 },
  { label: '1.5×', ms: 2200 },
  { label: '2×',   ms: 1400 },
];

export default function MechanismDetailPage({
  params,
}: {
  params: Promise<{ mechanismId: string }>;
}) {
  const { mechanismId } = use(params);
  const [currentStep, setCurrentStep]   = useState(0);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [speedIdx, setSpeedIdx]         = useState(1);   // default 1×
  const [animKey, setAnimKey]           = useState(0);   // bump to re-trigger text animation
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mechanism = getMechanism(mechanismId);

  // Re-trigger explanation animation whenever step changes
  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [currentStep]);

  // Auto-play loop
  useEffect(() => {
    if (isPlaying && mechanism) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev + 1 >= mechanism.steps.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, SPEEDS[speedIdx].ms);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, mechanism, speedIdx]);

  const goTo = (idx: number) => {
    setIsPlaying(false);
    setCurrentStep(idx);
  };

  if (!mechanism) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-white text-xl font-semibold mb-2">Mechanism not found</p>
          <Link href="/mechanisms" className="text-blue-400 hover:text-blue-300 text-sm">← Back</Link>
        </div>
      </div>
    );
  }

  const colors     = courseColors[mechanism.courseId] ?? courseColors['CHEM008A'];
  const step       = mechanism.steps[currentStep];
  const isFirst    = currentStep === 0;
  const isLast     = currentStep === mechanism.steps.length - 1;
  const progress   = ((currentStep + 1) / mechanism.steps.length) * 100;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/mechanisms" className="hover:text-white transition-colors">Mechanisms</Link>
        <span className="text-slate-600">→</span>
        <span className="text-slate-300">{mechanism.name}</span>
      </div>

      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <div className="flex items-start gap-3 mb-2">
          <span className={`${colors.badge} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
            {mechanism.courseId}
          </span>
          <span className="bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-lg capitalize">
            {mechanism.reactionType.replace(/-/g, ' ')}
          </span>
          <span className="bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-lg">
            {mechanism.steps.length} steps
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{mechanism.name}</h1>
        <p className="text-slate-300 leading-relaxed text-sm">{mechanism.overview}</p>
      </div>

      {/* Main viewer */}
      <div className={`bg-slate-800 rounded-xl border ${colors.border} p-6 mb-6`}>

        {/* Step dots + progress bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {mechanism.steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                title={s.title}
                className={`transition-all duration-300 rounded-full font-bold text-xs flex items-center justify-center ${
                  idx === currentStep
                    ? `${colors.badge} text-white w-9 h-9 scale-110 shadow-lg`
                    : idx < currentStep
                    ? 'bg-slate-500 text-slate-200 w-7 h-7'
                    : 'bg-slate-700 text-slate-500 w-7 h-7 hover:bg-slate-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <span className="text-slate-400 text-sm font-medium">
            Step {currentStep + 1} / {mechanism.steps.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-700 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            }}
          />
        </div>

        {/* SVG Canvas — key re-mounts it to restart animations */}
        <MechanismCanvas
          key={`${mechanismId}-${currentStep}`}
          scene={step.svgScene}
          stepNumber={currentStep}
        />

        {/* Step title + explanation — animated on step change */}
        <div
          key={`exp-${animKey}`}
          className="mt-5 explanation-animated"
        >
          <h2 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
            <span className={`${colors.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
              {currentStep + 1}
            </span>
            {step.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">{step.explanation}</p>
        </div>

        {/* Key points — staggered animation */}
        {step.keyPoints.length > 0 && (
          <div
            key={`kp-${animKey}`}
            className="mt-4 bg-slate-700/40 rounded-xl p-4 border border-slate-700/60"
          >
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-600 inline-block" />
              Key Points
              <span className="w-4 h-0.5 bg-slate-600 inline-block" />
            </div>
            <ul className="space-y-2">
              {step.keyPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-slate-300 keypoint-animated"
                  style={{ animationDelay: `${0.15 + idx * 0.1}s` }}
                >
                  <span className="text-blue-400 mt-0.5 flex-shrink-0 text-base leading-none">◆</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-700 flex-wrap">
          {/* Rewind */}
          <button
            onClick={() => goTo(0)}
            disabled={isFirst && !isPlaying}
            className="p-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-30 transition-colors text-sm"
            title="Restart"
          >⏮</button>

          {/* Prev */}
          <button
            onClick={() => goTo(Math.max(0, currentStep - 1))}
            disabled={isFirst}
            className="p-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-30 transition-colors text-sm"
            title="Previous step"
          >◀</button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(p => !p)}
            disabled={isLast && !isPlaying}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-30 ${
              isPlaying
                ? 'bg-orange-600 hover:bg-orange-500 text-white'
                : `${colors.badge} hover:opacity-90 text-white`
            }`}
          >
            {isPlaying ? (
              <><span className="text-base">⏸</span> Pause</>
            ) : (
              <><span className="text-base">▶</span> {isFirst ? 'Play Animation' : 'Continue'}</>
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => goTo(Math.min(mechanism.steps.length - 1, currentStep + 1))}
            disabled={isLast}
            className="p-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-30 transition-colors text-sm"
            title="Next step"
          >▶</button>

          {/* Skip to end */}
          <button
            onClick={() => goTo(mechanism.steps.length - 1)}
            disabled={isLast}
            className="p-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-30 transition-colors text-sm"
            title="Skip to end"
          >⏭</button>

          {/* Speed selector */}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-slate-500 text-xs mr-1">Speed</span>
            {SPEEDS.map((s, i) => (
              <button
                key={i}
                onClick={() => setSpeedIdx(i)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  speedIdx === i
                    ? `${colors.badge} text-white`
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All steps overview */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">All Steps</h2>
        <div className="space-y-2">
          {mechanism.steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                idx === currentStep
                  ? `${colors.border} bg-slate-700 ring-1 ${colors.ring}`
                  : 'border-slate-700/50 hover:bg-slate-700/50'
              }`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                idx === currentStep
                  ? `${colors.badge} text-white`
                  : idx < currentStep
                  ? 'bg-slate-600 text-slate-300'
                  : 'bg-slate-700 text-slate-500'
              }`}>
                {idx < currentStep ? '✓' : idx + 1}
              </span>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium">{s.title}</div>
                <div className="text-slate-400 text-xs mt-0.5 line-clamp-2 leading-relaxed">{s.explanation}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
