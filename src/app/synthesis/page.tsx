'use client';

import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Difficulty = 'easy' | 'medium' | 'hard';
type CourseId = '008A' | '008B' | '008C';

interface SolutionStep {
  step: number;
  reagents: string;
  reactionType: string;
  product: string;
}

interface SynthesisProblem {
  title: string;
  startingMaterial: string;
  targetMolecule: string;
  numSteps: number;
  context: string;
  hints: string[];
  solution: SolutionStep[];
  explanation: string;
}

interface SavedProblem {
  id: string;
  savedAt: string;
  courseId: CourseId;
  difficulty: Difficulty;
  problem: SynthesisProblem;
}

type AppState = 'idle' | 'loading' | 'problem' | 'solution';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COURSE_META: Record<CourseId, { label: string; color: string; ring: string; bg: string; description: string }> = {
  '008A': {
    label: 'CHEM 008A',
    color: 'text-emerald-400',
    ring: 'ring-emerald-500',
    bg: 'bg-emerald-500/10',
    description: 'SN1/SN2, E1/E2, Stereochemistry',
  },
  '008B': {
    label: 'CHEM 008B',
    color: 'text-sky-400',
    ring: 'ring-sky-500',
    bg: 'bg-sky-500/10',
    description: 'Alkenes, Carbonyls, Oxidation/Reduction',
  },
  '008C': {
    label: 'CHEM 008C',
    color: 'text-violet-400',
    ring: 'ring-violet-500',
    bg: 'bg-violet-500/10',
    description: 'Aromatics, Amines, Diels-Alder',
  },
};

const DIFFICULTY_META: Record<Difficulty, { label: string; color: string; ring: string; bg: string; badge: string; steps: string; description: string }> = {
  easy: {
    label: 'Easy',
    color: 'text-green-400',
    ring: 'ring-green-500',
    bg: 'bg-green-500/10',
    badge: 'bg-green-900/60 text-green-300 border border-green-700',
    steps: '2 steps',
    description: 'Single reaction type, common reagents',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-400',
    ring: 'ring-amber-500',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-900/60 text-amber-300 border border-amber-700',
    steps: '3 steps',
    description: 'Multiple reaction types, some stereochemistry',
  },
  hard: {
    label: 'Hard',
    color: 'text-rose-400',
    ring: 'ring-rose-500',
    bg: 'bg-rose-500/10',
    badge: 'bg-rose-900/60 text-rose-300 border border-rose-700',
    steps: '4–5 steps',
    description: 'Protecting groups, retrosynthesis, stereochemical control',
  },
};

const STORAGE_KEY = 'ucr-synthesis-saved';
const RECENT_KEY = 'ucr-synthesis-recent';

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-emerald-400 border-b-transparent border-l-transparent animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
      </div>
      <p className="text-slate-300 text-lg font-medium tracking-wide animate-pulse">
        Claude is designing a synthesis problem…
      </p>
      <p className="text-slate-500 text-sm">Thinking retrosynthetically</p>
    </div>
  );
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function SynthesisPage() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('008A');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [problem, setProblem] = useState<SynthesisProblem | null>(null);
  const [activeCourse, setActiveCourse] = useState<CourseId>('008A');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('medium');
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>([]);
  const [recentProblems, setRecentProblems] = useState<SavedProblem[]>([]);
  const [savedPanelOpen, setSavedPanelOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSavedProblems(JSON.parse(raw));
      const rawRecent = localStorage.getItem(RECENT_KEY);
      if (rawRecent) setRecentProblems(JSON.parse(rawRecent));
    } catch {
      // ignore
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  async function generateProblem() {
    setError(null);
    setAppState('loading');
    setHintsRevealed(0);
    setSolutionRevealed(false);
    setProblem(null);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          synthesisMode: true,
          synthesisCourseId: selectedCourse,
          synthesisdifficulty: selectedDifficulty,
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const text = await res.text();

      // Strip markdown fences if Claude returned them anyway
      const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      const parsed: SynthesisProblem = JSON.parse(cleaned);

      setProblem(parsed);
      setActiveCourse(selectedCourse);
      setActiveDifficulty(selectedDifficulty);
      setAppState('problem');

      // Save to recent (last 5)
      const entry: SavedProblem = {
        id: `recent-${Date.now()}`,
        savedAt: new Date().toISOString(),
        courseId: selectedCourse,
        difficulty: selectedDifficulty,
        problem: parsed,
      };
      setRecentProblems(prev => {
        const updated = [entry, ...prev].slice(0, 5);
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to generate problem. Please try again.');
      setAppState('idle');
    }
  }

  function revealNextHint() {
    if (!problem) return;
    setHintsRevealed(prev => Math.min(prev + 1, problem.hints.length));
  }

  function showSolution() {
    setSolutionRevealed(true);
    setAppState('solution');
  }

  function saveProblem() {
    if (!problem) return;
    const entry: SavedProblem = {
      id: `saved-${Date.now()}`,
      savedAt: new Date().toISOString(),
      courseId: activeCourse,
      difficulty: activeDifficulty,
      problem,
    };
    setSavedProblems(prev => {
      const updated = [entry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function loadProblem(saved: SavedProblem) {
    setProblem(saved.problem);
    setActiveCourse(saved.courseId);
    setActiveDifficulty(saved.difficulty);
    setHintsRevealed(0);
    setSolutionRevealed(false);
    setAppState('problem');
  }

  function deleteSaved(id: string) {
    setSavedProblems(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function resetToIdle() {
    setAppState('idle');
    setProblem(null);
    setHintsRevealed(0);
    setSolutionRevealed(false);
    setError(null);
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  const courseMeta = COURSE_META[activeCourse];
  const diffMeta = DIFFICULTY_META[activeDifficulty];

  // ---------------------------------------------------------------------------
  // IDLE STATE
  // ---------------------------------------------------------------------------

  if (appState === 'idle') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold tracking-widest uppercase mb-2">
              UCR Organic Chemistry
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Synthesis Problem Generator
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Practice multi-step organic synthesis with AI-generated problems tailored to your course and skill level.
            </p>
          </div>

          {/* Course Selector */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Select Course</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(COURSE_META) as CourseId[]).map(cid => {
                const meta = COURSE_META[cid];
                const active = selectedCourse === cid;
                return (
                  <button
                    key={cid}
                    onClick={() => setSelectedCourse(cid)}
                    className={`relative flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-all duration-150
                      ${active
                        ? `${meta.bg} border-current ${meta.color} ring-1 ${meta.ring}`
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                      }`}
                  >
                    {active && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-current" />
                    )}
                    <span className={`font-bold text-base ${active ? meta.color : ''}`}>{meta.label}</span>
                    <span className="text-xs text-slate-400 leading-snug">{meta.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Select Difficulty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(DIFFICULTY_META) as Difficulty[]).map(d => {
                const meta = DIFFICULTY_META[d];
                const active = selectedDifficulty === d;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`relative flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all duration-150
                      ${active
                        ? `${meta.bg} border-current ${meta.color} ring-1 ${meta.ring}`
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                      }`}
                  >
                    {active && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-current" />
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-base ${active ? meta.color : ''}`}>{meta.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${active ? meta.badge : 'bg-slate-700 text-slate-400'}`}>
                        {meta.steps}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 leading-snug">{meta.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-sm">
              <span className="text-rose-400 text-lg">!</span>
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateProblem}
            className="w-full py-4 rounded-2xl font-bold text-lg tracking-wide bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 text-white shadow-lg shadow-violet-900/40 transition-all duration-150 active:scale-[0.98]"
          >
            Generate Problem
          </button>

          {/* Recent Problems */}
          {recentProblems.length > 0 && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Recent Problems</h2>
              <div className="space-y-2">
                {recentProblems.map(rp => (
                  <button
                    key={rp.id}
                    onClick={() => loadProblem(rp)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-left group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
                        {rp.problem.title}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {new Date(rp.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COURSE_META[rp.courseId].bg} ${COURSE_META[rp.courseId].color}`}>
                        {rp.courseId}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_META[rp.difficulty].badge}`}>
                        {rp.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // LOADING STATE
  // ---------------------------------------------------------------------------

  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <div className="max-w-3xl mx-auto px-4 py-12 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-200">Synthesis Problem Generator</h1>
          </div>
          <Spinner />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // PROBLEM STATE & SOLUTION STATE
  // ---------------------------------------------------------------------------

  if ((appState === 'problem' || appState === 'solution') && problem) {
    const isSolutionState = appState === 'solution';
    const alreadySaved = savedProblems.some(s => s.problem.title === problem.title);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

          {/* Back button */}
          <button
            onClick={resetToIdle}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span className="text-lg leading-none">&larr;</span>
            New Problem
          </button>

          {/* Problem Header Card */}
          <div className="bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
            {/* Top accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${
              activeDifficulty === 'easy'
                ? 'from-green-500 to-emerald-400'
                : activeDifficulty === 'medium'
                ? 'from-amber-500 to-orange-400'
                : 'from-rose-500 to-pink-400'
            }`} />

            <div className="p-6 space-y-4">
              {/* Title row */}
              <div className="flex flex-wrap items-start gap-3 justify-between">
                <h2 className="text-xl font-bold text-white leading-tight">{problem.title}</h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`${COURSE_META[activeCourse].bg} ${COURSE_META[activeCourse].color} border ${COURSE_META[activeCourse].ring}`}>
                    {activeCourse}
                  </Badge>
                  <Badge className={DIFFICULTY_META[activeDifficulty].badge}>
                    {DIFFICULTY_META[activeDifficulty].label}
                  </Badge>
                </div>
              </div>

              {/* Context */}
              <div className="flex gap-3 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-lg mt-0.5 flex-shrink-0">&#x1F30D;</span>
                <p className="text-slate-300 text-sm leading-relaxed italic">{problem.context}</p>
              </div>

              {/* Synthesis diagram */}
              <div className="mt-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Synthesis Challenge</p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Starting Material */}
                  <div className="flex-1 w-full bg-emerald-950/40 border border-emerald-700/60 rounded-xl p-4 space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Starting Material</span>
                    <p className="text-emerald-200 font-medium text-sm leading-snug">{problem.startingMaterial}</p>
                  </div>

                  {/* Arrow with steps */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <span className="text-slate-400 text-xs font-semibold whitespace-nowrap">
                      {problem.numSteps} step{problem.numSteps !== 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-6 sm:w-10 h-0.5 bg-slate-500" />
                      <span className="text-slate-400 text-xl leading-none">&#8594;</span>
                      <div className="w-1 h-0.5 bg-transparent" />
                    </div>
                    <span className="text-slate-500 text-xs italic">?</span>
                  </div>

                  {/* Target */}
                  <div className="flex-1 w-full bg-sky-950/40 border border-sky-700/60 rounded-xl p-4 space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">Target Molecule</span>
                    <p className="text-sky-200 font-medium text-sm leading-snug">{problem.targetMolecule}</p>
                  </div>
                </div>
              </div>

              {/* Step placeholder boxes */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  Your Steps ({problem.numSteps} total)
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: problem.numSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 min-w-[80px] h-16 rounded-xl border-2 border-dashed flex items-center justify-center transition-all
                        ${isSolutionState
                          ? 'border-amber-600/50 bg-amber-950/20'
                          : 'border-slate-700 bg-slate-800/30'
                        }`}
                    >
                      <span className={`text-sm font-bold ${isSolutionState ? 'text-amber-400' : 'text-slate-600'}`}>
                        Step {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hints Section */}
          {!isSolutionState && (
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Hints</h3>
                <span className="text-xs text-slate-500">{hintsRevealed}/{problem.hints.length} revealed</span>
              </div>

              {/* Revealed hints */}
              {hintsRevealed > 0 && (
                <div className="space-y-2">
                  {problem.hints.slice(0, hintsRevealed).map((hint, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 rounded-xl bg-violet-950/40 border border-violet-700/50">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-violet-200 text-sm leading-relaxed">{hint}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Hint / Solution buttons */}
              <div className="flex flex-wrap gap-3">
                {hintsRevealed < problem.hints.length && (
                  <button
                    onClick={revealNextHint}
                    className="flex-1 py-2.5 rounded-xl border border-violet-600/50 bg-violet-900/20 text-violet-300 text-sm font-semibold hover:bg-violet-900/40 hover:border-violet-500 transition-all"
                  >
                    Reveal Hint {hintsRevealed + 1}
                  </button>
                )}
                <button
                  onClick={showSolution}
                  className="flex-1 py-2.5 rounded-xl border border-amber-600/50 bg-amber-900/20 text-amber-300 text-sm font-semibold hover:bg-amber-900/40 hover:border-amber-500 transition-all"
                >
                  Show Solution
                </button>
              </div>
            </div>
          )}

          {/* Solution Section */}
          {isSolutionState && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 border border-amber-800/40 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-widest">Step-by-Step Solution</h3>
                </div>
                <div className="p-6 space-y-3">
                  {problem.solution.map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      {/* Step badge */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600/20 border border-amber-600/50 text-amber-400 text-sm font-bold flex items-center justify-center">
                        {step.step}
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Reagents */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Reagents</span>
                          <span className="px-3 py-1 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-sm font-mono font-medium">
                            {step.reagents}
                          </span>
                        </div>
                        {/* Reaction type */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Type</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-900/40 border border-sky-700/50 text-sky-300 text-xs font-semibold">
                            {step.reactionType}
                          </span>
                        </div>
                        {/* Product */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 flex-shrink-0">Product</span>
                          <span className="text-slate-300 text-sm">{step.product}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy explanation */}
              <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <h3 className="font-semibold text-violet-300 text-sm uppercase tracking-widest">Overall Strategy</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{problem.explanation}</p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={resetToIdle}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 text-white transition-all active:scale-[0.98]"
                >
                  Generate New Problem
                </button>
                {!alreadySaved && (
                  <button
                    onClick={saveProblem}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm border border-emerald-600/50 bg-emerald-900/20 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-500 transition-all"
                  >
                    Save This Problem
                  </button>
                )}
                {alreadySaved && (
                  <div className="flex-1 py-3 rounded-xl font-semibold text-sm border border-slate-600 bg-slate-800/30 text-slate-500 text-center cursor-default">
                    Saved
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Show all hints in solution state */}
          {isSolutionState && problem.hints.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <h3 className="font-semibold text-violet-300 text-sm uppercase tracking-widest">Hints (for reference)</h3>
              </div>
              <div className="space-y-2">
                {problem.hints.map((hint, i) => (
                  <div key={i} className="flex gap-3 px-4 py-3 rounded-xl bg-violet-950/30 border border-violet-800/40">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-700/60 text-violet-300 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-violet-200/80 text-sm leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Problems Panel */}
          {savedProblems.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
              <button
                onClick={() => setSavedPanelOpen(p => !p)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                    Saved Problems
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-400 text-xs font-bold border border-emerald-700/50">
                    {savedProblems.length}
                  </span>
                </div>
                <span className={`text-slate-400 text-sm transition-transform duration-200 ${savedPanelOpen ? 'rotate-180' : ''}`}>
                  &#9660;
                </span>
              </button>

              {savedPanelOpen && (
                <div className="border-t border-slate-800 divide-y divide-slate-800">
                  {savedProblems.map(sp => (
                    <div key={sp.id} className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800/20 transition-colors group">
                      <button
                        onClick={() => loadProblem(sp)}
                        className="flex-1 text-left min-w-0"
                      >
                        <p className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors truncate">
                          {sp.problem.title}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {new Date(sp.savedAt).toLocaleDateString()}
                        </p>
                      </button>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COURSE_META[sp.courseId].bg} ${COURSE_META[sp.courseId].color}`}>
                          {sp.courseId}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_META[sp.difficulty].badge}`}>
                          {sp.difficulty}
                        </span>
                        <button
                          onClick={() => deleteSaved(sp.id)}
                          className="ml-1 text-slate-600 hover:text-rose-400 transition-colors text-sm"
                          title="Delete"
                        >
                          &#10005;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
