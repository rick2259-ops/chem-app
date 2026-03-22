'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import MoleculeViewer from '@/components/drill/MoleculeViewer';
import { allMechanisms } from '@/data/mechanisms';
import MechanismCanvas from '@/components/mechanisms/MechanismCanvas';
import { Mechanism, MechanismStep } from '@/types/mechanism';
import { loadProgress } from '@/lib/storage/progressStorage';
import {
  loadDrillSessionFromSupabase,
  saveDrillSessionToSupabase,
  clearDrillSessionFromSupabase,
} from '@/lib/supabase/db';
import { getAuthUserId } from '@/lib/supabase/auth';

// ─── Types ─────────────────────────────────────────────────────────────────

type DrillMode = 'step-explorer' | 'problem-solving';
type State = 'setup' | 'generating' | 'drilling' | 'feedback' | 'complete';

// Step-explorer types
interface StepCard {
  mechanism: Mechanism;
  step: MechanismStep;
  stepIndex: number;
  options: string[];
  correctOptionIndex: number;
}
interface StepAttempt {
  card: StepCard;
  selectedIndex: number;
  isCorrect: boolean;
}

// Problem-solving types
interface StepAnswers {
  arrowFlow?: { from: string; to: string };
  substrate:  string;
  reagent:    string;
  conditions: string;
  mechanism:  string;
}

interface PracticeQuestion {
  mechanismFocus: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  smiles?: string;
  smilesLabel?: string;
  stepAnswers?: StepAnswers;
}
interface PracticeAttempt {
  question: PracticeQuestion;
  selectedIndex: number;
  isCorrect: boolean;
}

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

function buildStepDeck(selectedIds: Set<string>, count: number): StepCard[] {
  const selected = allMechanisms.filter(m => selectedIds.has(m.id));
  if (selected.length === 0) return [];
  const allTitles = allMechanisms.flatMap(m => m.steps.map(s => s.title));
  const pool: { mechanism: Mechanism; step: MechanismStep; stepIndex: number }[] = [];
  for (const m of selected) {
    m.steps.forEach((step, i) => pool.push({ mechanism: m, step, stepIndex: i }));
  }
  return shuffle(pool).slice(0, count).map(({ mechanism, step, stepIndex }) => {
    const correctTitle = step.title;
    const distractors = shuffle(allTitles.filter(t => t !== correctTitle)).slice(0, 3);
    const options = shuffle([correctTitle, ...distractors]);
    return { mechanism, step, stepIndex, options, correctOptionIndex: options.indexOf(correctTitle) };
  });
}

// ─── Step Challenge ───────────────────────────────────────────────────────

const STEP_DEFS = [
  {
    key: 'substrate' as const,
    icon: '🔬',
    label: 'Read the Substrate',
    question: 'What type is the reaction center?',
    options: [
      { value: 'primary',      label: 'Primary (1°)' },
      { value: 'secondary',    label: 'Secondary (2°)' },
      { value: 'tertiary',     label: 'Tertiary (3°)' },
      { value: 'alkene-alkyne',label: 'Alkene / Alkyne' },
      { value: 'carbonyl',     label: 'Carbonyl (C=O)' },
      { value: 'aromatic',     label: 'Aromatic' },
    ],
  },
  {
    key: 'reagent' as const,
    icon: '⚗️',
    label: 'Read the Reagent',
    question: 'What role does the reagent play?',
    options: [
      { value: 'nucleophile',    label: 'Nucleophile' },
      { value: 'base',           label: 'Base' },
      { value: 'electrophile',   label: 'Electrophile' },
      { value: 'oxidant',        label: 'Oxidant [O]' },
      { value: 'reductant',      label: 'Reductant [H]' },
      { value: 'acid-catalyst',  label: 'Acid catalyst' },
    ],
  },
  {
    key: 'conditions' as const,
    icon: '🧪',
    label: 'Read the Conditions',
    question: 'What are the key conditions?',
    options: [
      { value: 'polar-protic',   label: 'Polar protic (H₂O, ROH)' },
      { value: 'polar-aprotic',  label: 'Polar aprotic (DMSO, DMF)' },
      { value: 'nonpolar',       label: 'Nonpolar solvent' },
      { value: 'acid-catalyst',  label: 'Acid catalyst (H⁺, H₂SO₄)' },
      { value: 'heat',           label: 'Heat / high temperature' },
      { value: 'no-solvent',     label: 'No specific solvent given' },
    ],
  },
  {
    key: 'mechanism' as const,
    icon: '🗺️',
    label: 'Identify the Mechanism',
    question: 'Which mechanism operates here?',
    options: [
      { value: 'SN2',                   label: 'SN2' },
      { value: 'SN1',                   label: 'SN1' },
      { value: 'E2',                    label: 'E2' },
      { value: 'E1',                    label: 'E1' },
      { value: 'electrophilic-addition',label: 'Electrophilic addition' },
      { value: 'nucleophilic-addition', label: 'Nucleophilic addition' },
      { value: 'EAS',                   label: 'EAS (aromatic)' },
      { value: 'NAS',                   label: 'NAS (aromatic)' },
      { value: 'oxidation-reduction',   label: 'Oxidation / Reduction' },
      { value: 'diels-alder',           label: 'Diels-Alder' },
    ],
  },
] as const;

type StepKey = typeof STEP_DEFS[number]['key'];

// Arrow flow option sets (mirrors arrow-questions.ts vocabulary)
const ARROW_FROM_OPTS = [
  { value: 'lone-pair',    label: 'Lone pair (nucleophile N, O, X⁻)' },
  { value: 'pi-alkene',   label: 'π bond — alkene / aromatic' },
  { value: 'pi-carbonyl', label: 'π bond — carbonyl (C=O)' },
  { value: 'c-h-alpha',   label: 'C–H bond (alpha carbon)' },
  { value: 'c-lg-bond',   label: 'C–Leaving group bond (C–X, C–OTs)' },
  { value: 'carbanion',   label: 'Carbanion / C–Metal (hydride, Grignard)' },
];
const ARROW_TO_OPTS = [
  { value: 'sp3-carbon',      label: 'Electrophilic sp³ carbon (C–LG or carbocation)' },
  { value: 'carbonyl-carbon', label: 'Carbonyl carbon (electrophilic C=O)' },
  { value: 'leaving-group',   label: 'Leaving group (departs with electrons)' },
  { value: 'proton',          label: 'Proton / acidic H (abstracted by base)' },
  { value: 'electrophile',    label: 'External electrophile (Br₂, NO₂⁺, Lewis acid)' },
  { value: 'base',            label: 'Base (accepts proton)' },
];

type ArrowPhase = 'from' | 'to';

function StepChallenge({
  stepAnswers,
  questionIndex,
  onComplete,
}: {
  stepAnswers: StepAnswers | undefined;
  questionIndex: number;
  onComplete: () => void;
}) {
  // Step 0 = arrowFlow (from → to). Steps 1–4 = STEP_DEFS.
  // currentStep: -1 = arrowFrom, 0 = arrowTo, 1..4 = STEP_DEFS[0..3]
  const [phase, setPhase]             = useState<'arrow-from' | 'arrow-to' | 'steps'>('arrow-from');
  const [arrowFromSel, setArrowFromSel] = useState<string | null>(null);
  const [arrowToSel, setArrowToSel]   = useState<string | null>(null);
  const [arrowFromRevealed, setArrowFromRevealed] = useState(false);
  const [arrowToRevealed, setArrowToRevealed]     = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections]   = useState<Record<StepKey, string | null>>({
    substrate: null, reagent: null, conditions: null, mechanism: null,
  });
  const [revealed, setRevealed]       = useState<Record<StepKey, boolean>>({
    substrate: false, reagent: false, conditions: false, mechanism: false,
  });
  const completedRef = useRef(false);
  const prevIndex    = useRef(questionIndex);

  useEffect(() => {
    if (questionIndex !== prevIndex.current) {
      prevIndex.current = questionIndex;
      setPhase('arrow-from');
      setArrowFromSel(null); setArrowToSel(null);
      setArrowFromRevealed(false); setArrowToRevealed(false);
      setCurrentStep(0);
      setSelections({ substrate: null, reagent: null, conditions: null, mechanism: null });
      setRevealed({ substrate: false, reagent: false, conditions: false, mechanism: false });
      completedRef.current = false;
    }
  }, [questionIndex]);

  // If no stepAnswers from AI, skip the challenge and unlock immediately
  useEffect(() => {
    if (!stepAnswers && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [stepAnswers, onComplete]);

  // If stepAnswers has no arrowFlow, skip straight to steps phase
  useEffect(() => {
    if (stepAnswers && !stepAnswers.arrowFlow && phase === 'arrow-from') {
      setPhase('steps');
    }
  }, [stepAnswers, phase]);

  if (!stepAnswers) return null;

  const hasArrowFlow = !!stepAnswers.arrowFlow;
  const totalSteps   = (hasArrowFlow ? 2 : 0) + STEP_DEFS.length; // 2 = from+to

  // ── Arrow flow handlers ──
  const handleArrowFrom = (value: string) => {
    if (arrowFromRevealed) return;
    const correct = value === stepAnswers.arrowFlow?.from;
    setArrowFromSel(value);
    setArrowFromRevealed(true);
    setTimeout(() => setPhase('arrow-to'), correct ? 1200 : 2000);
  };

  const handleArrowTo = (value: string) => {
    if (arrowToRevealed) return;
    const correct = value === stepAnswers.arrowFlow?.to;
    setArrowToSel(value);
    setArrowToRevealed(true);
    setTimeout(() => setPhase('steps'), correct ? 1200 : 2000);
  };

  // ── STEP_DEFS handlers ──
  const stepDef    = STEP_DEFS[currentStep];
  const correctVal = stepAnswers[stepDef?.key as keyof StepAnswers] as string | undefined;

  const handleSelect = (value: string) => {
    const key    = stepDef.key;
    const correct = value === correctVal;
    setSelections(prev => ({ ...prev, [key]: value }));
    setRevealed(prev => ({ ...prev, [key]: true }));
    const advanceDelay = correct ? 1200 : 2000;
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep >= STEP_DEFS.length) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      } else {
        setCurrentStep(nextStep);
      }
    }, advanceDelay);
  };

  const isRevealed  = revealed[stepDef?.key];
  const mySelection = selections[stepDef?.key];

  // How many steps shown in header counter
  const arrowFromDone = arrowFromRevealed;
  const arrowToDone   = arrowToRevealed;
  const completedCount =
    (hasArrowFlow ? (arrowFromDone ? 1 : 0) + (arrowToDone ? 1 : 0) : 0) +
    STEP_DEFS.slice(0, currentStep).length +
    (phase === 'steps' && revealed[stepDef?.key] ? 1 : 0);

  const currentStepNum =
    phase === 'arrow-from' ? 1 :
    phase === 'arrow-to'   ? 2 :
    (hasArrowFlow ? 2 : 0) + currentStep + 1;

  return (
    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/60">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/40">
        <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">
          Step Analysis
        </span>
        <span className="text-xs text-slate-500">
          Step {currentStepNum} of {totalSteps} — unlock the answer choices
        </span>
      </div>

      {/* Completed arrow-flow pills */}
      {hasArrowFlow && (arrowFromDone || arrowToDone) && (
        <div className="flex flex-wrap gap-2 px-4 pt-3">
          {arrowFromDone && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              arrowFromSel === stepAnswers.arrowFlow?.from
                ? 'bg-green-500/15 text-green-400'
                : 'bg-red-500/15 text-red-400'
            }`}>
              ➡️ FROM: {ARROW_FROM_OPTS.find(o => o.value === stepAnswers.arrowFlow?.from)?.label ?? stepAnswers.arrowFlow?.from}
            </span>
          )}
          {arrowToDone && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              arrowToSel === stepAnswers.arrowFlow?.to
                ? 'bg-green-500/15 text-green-400'
                : 'bg-red-500/15 text-red-400'
            }`}>
              ➡️ TO: {ARROW_TO_OPTS.find(o => o.value === stepAnswers.arrowFlow?.to)?.label ?? stepAnswers.arrowFlow?.to}
            </span>
          )}
        </div>
      )}

      {/* Completed STEP_DEFS summary pills */}
      {phase === 'steps' && currentStep > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pt-3">
          {STEP_DEFS.slice(0, currentStep).map(s => {
            const sel     = selections[s.key];
            const correct = sel === stepAnswers[s.key as keyof StepAnswers];
            const label   = s.options.find((o: { value: string; label: string }) => o.value === stepAnswers[s.key as keyof StepAnswers])?.label ?? stepAnswers[s.key as keyof StepAnswers];
            return (
              <span key={s.key} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                correct ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
              }`}>
                {s.icon} {label as string}
              </span>
            );
          })}
        </div>
      )}

      {/* ── Arrow Flow: Step 0a — FROM ── */}
      {phase === 'arrow-from' && hasArrowFlow && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">⚡</span>
            <span className="text-sm font-semibold text-white">Trace the Arrow — Step 0</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Electrons always flow from electron-rich → electron-poor.<br />
            <strong className="text-amber-400">Where do the electrons come FROM?</strong>
          </p>
          <div className="flex flex-col gap-2">
            {ARROW_FROM_OPTS.map(opt => {
              const correct = opt.value === stepAnswers.arrowFlow?.from;
              let cls = 'border-slate-600 text-slate-300 hover:border-violet-500 hover:text-white cursor-pointer';
              if (arrowFromRevealed) {
                if (correct)                          cls = 'border-green-500 bg-green-500/15 text-green-300';
                else if (opt.value === arrowFromSel)  cls = 'border-red-500 bg-red-500/15 text-red-300';
                else                                  cls = 'border-slate-700 text-slate-600 opacity-40';
              }
              return (
                <button
                  key={opt.value}
                  onClick={() => handleArrowFrom(opt.value)}
                  disabled={arrowFromRevealed}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all ${cls}`}
                >
                  {correct && arrowFromRevealed && '✓ '}
                  {opt.value === arrowFromSel && !correct && arrowFromRevealed && '✗ '}
                  {opt.label}
                </button>
              );
            })}
          </div>
          {arrowFromRevealed && (
            <p className={`mt-2 text-xs font-medium ${arrowFromSel === stepAnswers.arrowFlow?.from ? 'text-green-400' : 'text-red-400'}`}>
              {arrowFromSel === stepAnswers.arrowFlow?.from
                ? 'Correct! Now identify where they go...'
                : 'Not quite — correct answer highlighted. Moving to TO...'}
            </p>
          )}
        </div>
      )}

      {/* ── Arrow Flow: Step 0b — TO ── */}
      {phase === 'arrow-to' && hasArrowFlow && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">⚡</span>
            <span className="text-sm font-semibold text-white">Trace the Arrow — Step 0</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            You identified the electron source. Now:<br />
            <strong className="text-amber-400">Where do the electrons go TO?</strong>
          </p>
          <div className="flex flex-col gap-2">
            {ARROW_TO_OPTS.map(opt => {
              const correct = opt.value === stepAnswers.arrowFlow?.to;
              let cls = 'border-slate-600 text-slate-300 hover:border-violet-500 hover:text-white cursor-pointer';
              if (arrowToRevealed) {
                if (correct)                         cls = 'border-green-500 bg-green-500/15 text-green-300';
                else if (opt.value === arrowToSel)   cls = 'border-red-500 bg-red-500/15 text-red-300';
                else                                 cls = 'border-slate-700 text-slate-600 opacity-40';
              }
              return (
                <button
                  key={opt.value}
                  onClick={() => handleArrowTo(opt.value)}
                  disabled={arrowToRevealed}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all ${cls}`}
                >
                  {correct && arrowToRevealed && '✓ '}
                  {opt.value === arrowToSel && !correct && arrowToRevealed && '✗ '}
                  {opt.label}
                </button>
              );
            })}
          </div>
          {arrowToRevealed && (
            <p className={`mt-2 text-xs font-medium ${arrowToSel === stepAnswers.arrowFlow?.to ? 'text-green-400' : 'text-red-400'}`}>
              {arrowToSel === stepAnswers.arrowFlow?.to
                ? 'Correct! Arrow traced. Analyzing the mechanism...'
                : 'Not quite — correct answer highlighted. Continuing...'}
            </p>
          )}
        </div>
      )}

      {/* ── STEP_DEFS 1–4 ── */}
      {phase === 'steps' && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">{stepDef.icon}</span>
            <span className="text-sm font-semibold text-white">{stepDef.label}</span>
            <span className="text-xs text-slate-500">— {stepDef.question}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {stepDef.options.map((opt: { value: string; label: string }) => {
              let cls = 'border-slate-600 text-slate-300 hover:border-violet-500 hover:text-white cursor-pointer';
              if (isRevealed) {
                if (opt.value === correctVal)       cls = 'border-green-500 bg-green-500/15 text-green-300';
                else if (opt.value === mySelection) cls = 'border-red-500 bg-red-500/15 text-red-300';
                else                               cls = 'border-slate-700 text-slate-600 opacity-40';
              }
              return (
                <button
                  key={opt.value}
                  onClick={() => !isRevealed && handleSelect(opt.value)}
                  disabled={isRevealed}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${cls}`}
                >
                  {opt.value === correctVal && isRevealed && '✓ '}
                  {opt.value === mySelection && opt.value !== correctVal && isRevealed && '✗ '}
                  {opt.label}
                </button>
              );
            })}
          </div>

          {isRevealed && (
            <p className={`mt-2 text-xs font-medium ${mySelection === correctVal ? 'text-green-400' : 'text-red-400'}`}>
              {mySelection === correctVal
                ? 'Correct! Moving to next step...'
                : 'Not quite — the answer is highlighted above. Moving on...'}
            </p>
          )}
        </div>
      )}

    </div>
  );
}

// ─── Legacy placeholder (kept for old PROTOCOL_STEPS reference, now unused) ──

const PROTOCOL_STEPS = [
  {
    id: 1,
    icon: '🔬',
    label: 'Read the Substrate',
    short: 'What carbon type, functional group, and leaving group?',
    detail: [
      '1°, 2°, or 3° carbon at the reaction site?',
      'Functional group: alkyl halide · alkene · alkyne · carbonyl · arene?',
      'Is there a leaving group (X⁻, OTs, OH after protonation)?',
      'Is there a π bond available for addition?',
      'Are there existing stereocenters?',
    ],
  },
  {
    id: 2,
    icon: '⚗️',
    label: 'Read the Reagent',
    short: 'Nuc / Base / E⁺ / [O] / [H] — and how strong?',
    detail: [
      'Nucleophile (lone pair attacks carbon): NaOH, NaCN, NaI, RMgX…',
      'Base (attacks H, not carbon): KO-t-Bu (bulky!), NaOMe, LDA…',
      'Electrophile: HX, Br₂, BH₃, mCPBA, AlCl₃…',
      'Oxidant [O]: KMnO₄, OsO₄, H₂O₂, mCPBA, CrO₃…',
      'Reductant [H]: NaBH₄ (mild), LiAlH₄ (strong), H₂/Pd…',
      'Strong = fast, irreversible. Bulky = steers toward elimination.',
    ],
  },
  {
    id: 3,
    icon: '🧪',
    label: 'Read the Conditions',
    short: 'Solvent + temperature = the tiebreaker',
    detail: [
      'Polar PROTIC (H₂O, ROH, AcOH) → stabilizes cations → SN1 / E1',
      'Polar APROTIC (DMSO, DMF, acetone) → naked nucleophile → SN2',
      'Nonpolar (hexane, CCl₄) → radical or pericyclic',
      'High temperature → favors elimination over substitution',
      'Acid catalyst (H⁺, H₂SO₄) → protonation step first',
      'Lewis acid (AlCl₃, BF₃) → electrophilic activation of substrate',
    ],
  },
  {
    id: 4,
    icon: '🗺️',
    label: 'Identify the Mechanism',
    short: 'Leaving group? → SN/E tree. π bond? → Addition tree.',
    detail: [
      '─── Leaving group on sp³ carbon ───',
      '1° + strong Nuc + aprotic → SN2',
      '1° or 2° + strong bulky base → E2 (anti-periplanar H needed)',
      '2° + protic + heat → SN1 / E1 mix (carbocation forms)',
      '3° + strong base → E2 (too hindered for SN2)',
      '3° + protic + weak Nuc → SN1 / E1',
      '─── π bond (alkene) ───',
      'HX, H₂O/H⁺ → Markovnikov addition',
      'Br₂ (no water) → anti addition via bromonium',
      'BH₃ then H₂O₂ → anti-Markovnikov syn addition',
      'H₂/Pd → syn addition',
      'mCPBA → epoxidation (syn, retention of geometry)',
      'OsO₄ / KMnO₄ cold dilute → syn dihydroxylation',
      '─── Carbonyl ───',
      'NaBH₄ / LiAlH₄ → nucleophilic addition of H⁻',
      'RMgX → nucleophilic addition of R⁻',
      'ROH / H⁺ → acetal formation',
      'NaOH + α-H → Aldol condensation',
    ],
  },
  {
    id: 5,
    icon: '🔄',
    label: 'Determine Stereochemical Outcome',
    short: 'The mechanism dictates the stereo — no memorizing needed.',
    detail: [
      'SN2 → INVERSION at the reaction center (Walden inversion)',
      'SN1 → RACEMIZATION (flat carbocation, attack from both faces)',
      'E2 → requires anti-periplanar H; gives trans/Zaitsev alkene',
      'Halogenation of alkene → ANTI addition',
      'H₂/Pd → SYN addition',
      'Hydroboration → SYN addition + anti-Markovnikov regiochemistry',
      'Epoxidation (mCPBA) → RETENTION of alkene geometry',
      'Epoxide opening → ANTI attack (inversion at attacked carbon)',
      'OsO₄ dihydroxylation → SYN (both OH same face)',
      'EAS → regiochemistry by substituent; no new stereocenter',
    ],
  },
];

function ThinkingProtocol({ questionIndex }: { questionIndex: number }) {
  // Start all collapsed except step 1 on the very first question
  const [openStep, setOpenStep] = useState<number | null>(questionIndex === 0 ? 1 : null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const prevIndex = useRef(questionIndex);

  useEffect(() => {
    if (questionIndex !== prevIndex.current) {
      prevIndex.current = questionIndex;
      setOpenStep(null);
      setChecked(new Set());
    }
  }, [questionIndex]);

  const toggleCheck = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === PROTOCOL_STEPS.length;

  return (
    <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl mb-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Thinking Protocol</span>
          <span className="text-xs text-slate-500">— work through each step before answering</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
          allChecked ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
        }`}>
          {checked.size}/{PROTOCOL_STEPS.length} done
        </span>
      </div>

      <div className="divide-y divide-slate-700/30">
        {PROTOCOL_STEPS.map(step => {
          const isOpen = openStep === step.id;
          const isDone = checked.has(step.id);
          return (
            <div key={step.id}>
              <button
                onClick={() => setOpenStep(isOpen ? null : step.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-800/50 transition-colors"
              >
                {/* Checkbox */}
                <div
                  onClick={e => toggleCheck(step.id, e)}
                  role="checkbox"
                  aria-checked={isDone}
                  tabIndex={0}
                  onKeyDown={e => e.key === ' ' && toggleCheck(step.id, e as unknown as React.MouseEvent)}
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors cursor-pointer ${
                    isDone ? 'bg-green-500 border-green-500' : 'border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {isDone && <span className="text-white text-xs leading-none">✓</span>}
                </div>

                <span className="text-base flex-shrink-0">{step.icon}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDone ? 'text-green-400' : 'text-slate-300'}`}>
                      Step {step.id}: {step.label}
                    </span>
                  </div>
                  {!isOpen && (
                    <p className="text-xs text-slate-500 truncate">{step.short}</p>
                  )}
                </div>

                <span className={`text-slate-500 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-3 pt-1 bg-slate-800/40">
                  <ul className="space-y-1.5">
                    {step.detail.map((line, i) => (
                      <li key={i} className={`text-xs leading-relaxed ${
                        line.startsWith('───') ? 'text-violet-400 font-semibold mt-2' : 'text-slate-300'
                      }`}>
                        {!line.startsWith('───') && (
                          <span className="text-violet-500 mr-1.5">›</span>
                        )}
                        {line}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={e => { toggleCheck(step.id, e); setOpenStep(null); }}
                    className={`mt-3 text-xs px-3 py-1 rounded-lg transition-colors ${
                      isDone
                        ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                        : 'bg-violet-600 hover:bg-violet-500 text-white'
                    }`}
                  >
                    {isDone ? 'Unmark' : '✓ Done with this step'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allChecked && (
        <div className="px-4 py-2 bg-green-500/10 border-t border-green-500/20">
          <p className="text-xs text-green-400 font-medium">
            All steps checked — now pick your answer with confidence, not guessing.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────────────

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

// ─── Setup Screen (shared) ─────────────────────────────────────────────────

function SetupScreen({
  mode, setMode, selectedIds, toggleMechanism, selectAll, selectCourse,
  drillCount, setDrillCount, onStart, isGenerating, error,
  pendingResume, checkingResume, onResume, onStartFresh,
}: {
  mode: DrillMode;
  setMode: (m: DrillMode) => void;
  selectedIds: Set<string>;
  toggleMechanism: (id: string) => void;
  selectAll: () => void;
  selectCourse: (c: string) => void;
  drillCount: number;
  setDrillCount: (n: number) => void;
  onStart: () => void;
  isGenerating: boolean;
  error: string;
  pendingResume: DrillSession | null;
  checkingResume: boolean;
  onResume: () => void;
  onStartFresh: () => void;
}) {
  const courseIds = ['CHEM008A', 'CHEM008B', 'CHEM008C'] as const;
  const courseLabels: Record<string, string> = {
    CHEM008A: 'Chem 008A', CHEM008B: 'Chem 008B', CHEM008C: 'Chem 008C',
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/mechanisms" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Mechanisms
        </Link>
      </div>

      {/* Resume banner */}
      {checkingResume && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 text-sm">
          <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          Checking for saved session...
        </div>
      )}

      {!checkingResume && pendingResume && (
        <div className="mb-4 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-violet-300 font-semibold text-sm mb-1">Unfinished session found</p>
              <p className="text-slate-400 text-xs">
                Problem Solving · Question {(pendingResume.index ?? 0) + 1} of {pendingResume.questions.length}
                {' · '}{pendingResume.attempts?.filter((a: PracticeAttempt) => a.isCorrect).length ?? 0} correct so far
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={onStartFresh}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
              >
                Start Fresh
              </button>
              <button
                onClick={onResume}
                className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
              >
                Resume →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">⚗️</div>
          <h1 className="text-2xl font-bold text-white mb-1">Mechanism Drill</h1>
          <p className="text-slate-400 text-sm">Choose a mode and which mechanisms to practice</p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-900 rounded-xl">
          <button
            onClick={() => setMode('step-explorer')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'step-explorer'
                ? 'bg-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Step Explorer
          </button>
          <button
            onClick={() => setMode('problem-solving')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'problem-solving'
                ? 'bg-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Problem Solving
          </button>
        </div>

        {/* Mode description */}
        <div className="bg-slate-900/60 rounded-xl p-3 mb-5 text-xs text-slate-400 leading-relaxed">
          {mode === 'step-explorer'
            ? 'See each mechanism step\'s diagram and identify what\'s happening by name. Great for memorizing the sequence and electron flow of each mechanism.'
            : 'AI-generated exam-style problems: given a substrate, reagent, and conditions, identify the mechanism, predict the product, or determine the stereochemical outcome.'}
        </div>

        {/* Quick filters */}
        <div className="flex gap-2 flex-wrap mb-4">
          <button onClick={selectAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
            All
          </button>
          {courseIds.map(c => (
            <button key={c} onClick={() => selectCourse(c)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${COURSE_COLORS[c].badge} text-white hover:opacity-90`}>
              {courseLabels[c]}
            </button>
          ))}
        </div>

        {/* Mechanism checkboxes */}
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
                      <button key={m.id} onClick={() => toggleMechanism(m.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                          checked ? `${colors.border} bg-slate-700` : 'border-slate-700/40 hover:bg-slate-700/40'
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

        {/* Question count */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Questions</div>
          <div className="flex gap-2">
            {[5, 10, 15].map(n => (
              <button key={n} onClick={() => setDrillCount(n)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  drillCount === n ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={onStart} disabled={selectedIds.size === 0 || isGenerating}
          className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold text-lg rounded-xl transition-colors flex items-center justify-center gap-2">
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating problems...
            </>
          ) : (
            'Start Drill →'
          )}
        </button>
        {error && (
          <p className="text-red-400 text-xs text-center mt-3">{error}</p>
        )}
      </div>
    </div>
  );
}

// ─── Persistence helpers ────────────────────────────────────────────────────

const SESSION_KEY = 'mech-drill-session-v1';
const PREFS_KEY   = 'mech-drill-prefs-v1';

interface DrillSession {
  questions: PracticeQuestion[];
  index: number;
  attempts: PracticeAttempt[];
  selected: number | null;
  state: 'drilling' | 'feedback' | 'complete';
}

interface DrillPrefs {
  mode: DrillMode;
  selectedIds: string[];
  drillCount: number;
}

function loadSession(): DrillSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as DrillSession) : null;
  } catch { return null; }
}

function getUserId(): string {
  return getAuthUserId() ?? loadProgress().userId;
}

function saveSession(s: DrillSession) {
  if (typeof window === 'undefined') return;
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* quota */ }
  // Background sync to Supabase
  saveDrillSessionToSupabase(getUserId(), s);
}

function clearSession() {
  if (typeof window === 'undefined') return;
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  clearDrillSessionFromSupabase(getUserId());
}

function loadPrefs(): DrillPrefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? (JSON.parse(raw) as DrillPrefs) : null;
  } catch { return null; }
}

function savePrefs(p: DrillPrefs) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch { /* quota */ }
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function MechanismDrillPage() {
  const savedPrefs   = typeof window !== 'undefined' ? loadPrefs()   : null;
  const savedSession = typeof window !== 'undefined' ? loadSession() : null;

  const [mode, setMode] = useState<DrillMode>(savedPrefs?.mode ?? 'step-explorer');
  const [state, setState] = useState<State>(savedSession?.state ?? 'setup');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => savedPrefs?.selectedIds
      ? new Set(savedPrefs.selectedIds)
      : new Set(allMechanisms.map(m => m.id))
  );
  const [drillCount, setDrillCount] = useState(savedPrefs?.drillCount ?? 10);

  // Step-explorer state
  const [stepDeck, setStepDeck]           = useState<StepCard[]>([]);
  const [stepIndex, setStepIndex]         = useState(0);
  const [stepAttempts, setStepAttempts]   = useState<StepAttempt[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [previewStepIdx, setPreviewStepIdx] = useState(0);

  // Problem-solving state
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>(
    savedSession?.questions ?? []
  );
  const [practiceIndex, setPracticeIndex]     = useState(savedSession?.index ?? 0);
  const [practiceAttempts, setPracticeAttempts] = useState<PracticeAttempt[]>(
    savedSession?.attempts ?? []
  );
  const [practiceSelected, setPracticeSelected] = useState<number | null>(
    savedSession?.selected ?? null
  );
  const [generateError, setGenerateError] = useState('');
  const [stepsComplete, setStepsComplete] = useState(false);

  // Resume banner: holds a session found in Supabase that the user hasn't decided on yet
  const [pendingResume, setPendingResume] = useState<DrillSession | null>(null);
  const [checkingResume, setCheckingResume] = useState(!savedSession);

  // On mount: if no sessionStorage session, check Supabase and surface a Resume banner
  useEffect(() => {
    if (savedSession) return; // already have local session, no need to check
    const userId = getUserId();
    loadDrillSessionFromSupabase(userId).then(remote => {
      if (remote) {
        const s = remote as DrillSession;
        if (s.questions?.length) {
          setPendingResume(s);
        }
      }
      setCheckingResume(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResume = useCallback(() => {
    if (!pendingResume) return;
    setPracticeQuestions(pendingResume.questions);
    setPracticeIndex(pendingResume.index ?? 0);
    setPracticeAttempts(pendingResume.attempts ?? []);
    setPracticeSelected(pendingResume.selected ?? null);
    setState(pendingResume.state ?? 'drilling');
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(pendingResume)); } catch { /* quota */ }
    setPendingResume(null);
    setMode('problem-solving');
  }, [pendingResume]);

  // Keep sessionStorage in sync whenever problem-solving state changes
  useEffect(() => {
    if (practiceQuestions.length === 0) return;
    const drillState = state === 'drilling' || state === 'feedback' || state === 'complete'
      ? state : 'drilling';
    saveSession({
      questions: practiceQuestions,
      index: practiceIndex,
      attempts: practiceAttempts,
      selected: practiceSelected,
      state: drillState as DrillSession['state'],
    });
  }, [practiceQuestions, practiceIndex, practiceAttempts, practiceSelected, state]);

  // Keep localStorage prefs in sync
  useEffect(() => {
    savePrefs({ mode, selectedIds: Array.from(selectedIds), drillCount });
  }, [mode, selectedIds, drillCount]);

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

  const restart = useCallback(() => {
    clearSession();
    setState('setup');
    setStepDeck([]); setStepIndex(0); setStepAttempts([]); setSelectedOption(null);
    setPracticeQuestions([]); setPracticeIndex(0); setPracticeAttempts([]); setPracticeSelected(null);
    setGenerateError('');
  }, []);

  const handleStart = useCallback(async () => {
    if (mode === 'step-explorer') {
      clearSession();
      const deck = buildStepDeck(selectedIds, drillCount);
      setStepDeck(deck);
      setStepIndex(0);
      setStepAttempts([]);
      setSelectedOption(null);
      setPreviewStepIdx(0);
      setState('drilling');
    } else {
      setState('generating');
      setGenerateError('');
      try {
        const selected = allMechanisms.filter(m => selectedIds.has(m.id));
        const res = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mechanismPracticeMode: true,
            mechanismPracticeMechanisms: selected.map(m => ({ name: m.name, overview: m.overview })),
            generateCount: drillCount,
          }),
        });
        const text = await res.text();
        if (!res.ok) {
          let detail = `status ${res.status}`;
          try { detail = JSON.parse(text).error ?? detail; } catch { /* ignore */ }
          throw new Error(detail);
        }
        // Strip markdown code fences if Claude wraps the JSON
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        const raw: PracticeQuestion[] = JSON.parse(cleaned);
        if (!Array.isArray(raw) || raw.length === 0) throw new Error('Empty response');
        setPracticeQuestions(raw);
        setPracticeIndex(0);
        setPracticeAttempts([]);
        setPracticeSelected(null);
        setState('drilling');
      } catch (err) {
        setGenerateError(`Could not generate problems: ${err instanceof Error ? err.message : 'unknown error'}. Try again.`);
        setState('setup');
      }
    }
  }, [mode, selectedIds, drillCount]);

  // ── Setup ──
  if (state === 'setup' || state === 'generating') {
    return (
      <SetupScreen
        mode={mode} setMode={setMode}
        selectedIds={selectedIds} toggleMechanism={toggleMechanism}
        selectAll={selectAll} selectCourse={selectCourse}
        drillCount={drillCount} setDrillCount={setDrillCount}
        onStart={handleStart} isGenerating={state === 'generating'}
        error={generateError}
        pendingResume={pendingResume}
        checkingResume={checkingResume}
        onResume={handleResume}
        onStartFresh={() => { clearSession(); setPendingResume(null); }}
      />
    );
  }

  // ── Complete ──
  if (state === 'complete') {
    const isStep = mode === 'step-explorer';
    const attempts = isStep ? stepAttempts : practiceAttempts;
    const correct = attempts.filter(a => a.isCorrect).length;
    const pct = Math.round((correct / attempts.length) * 100);

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
                {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good — keep drilling!' : 'Review the mechanisms and try again'}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleStart}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
              Drill Again
            </button>
            <button onClick={restart}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors">
              Change Setup
            </button>
          </div>
        </div>

        {/* Missed answers review */}
        {attempts.filter(a => !a.isCorrect).length > 0 && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Review ({attempts.filter(a => !a.isCorrect).length} missed)
            </h3>
            <div className="space-y-4">
              {attempts.filter(a => !a.isCorrect).map((att, i) => {
                if (isStep) {
                  const a = att as StepAttempt;
                  const colors = COURSE_COLORS[a.card.mechanism.courseId] ?? COURSE_COLORS.CHEM008A;
                  return (
                    <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge} text-white`}>
                          {a.card.mechanism.courseId}
                        </span>
                        <span className="text-slate-400 text-xs">{a.card.mechanism.name} · Step {a.card.stepIndex + 1}</span>
                      </div>
                      <div className="text-red-400 text-xs mb-1">You chose: <span className="text-red-300">{a.card.options[a.selectedIndex]}</span></div>
                      <div className="text-green-400 text-xs mb-2">Correct: <span className="text-green-300 font-medium">{a.card.step.title}</span></div>
                      <p className="text-slate-400 text-xs leading-relaxed">{a.card.step.explanation}</p>
                      <Link href={`/mechanisms/${a.card.mechanism.id}`}
                        className="inline-block mt-2 text-xs text-blue-400 hover:text-blue-300">
                        Review {a.card.mechanism.name} →
                      </Link>
                    </div>
                  );
                } else {
                  const a = att as PracticeAttempt;
                  return (
                    <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <div className="text-slate-400 text-xs mb-2 font-medium">{a.question.mechanismFocus}</div>
                      <p className="text-white text-sm mb-2">{a.question.prompt}</p>
                      <div className="text-red-400 text-xs mb-1">You chose: <span className="text-red-300">{a.question.options[a.selectedIndex]}</span></div>
                      <div className="text-green-400 text-xs mb-2">Correct: <span className="text-green-300 font-medium">{a.question.options[a.question.correctIndex]}</span></div>
                      <p className="text-slate-400 text-xs leading-relaxed">{a.question.explanation}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {generateError && <p className="text-red-400 text-xs text-center mt-3">{generateError}</p>}
      </div>
    );
  }

  // ── Step Explorer drill ────────────────────────────────────────────────────

  if (mode === 'step-explorer') {
    const currentCard = stepDeck[stepIndex];
    if (!currentCard) return null;

    const colors = COURSE_COLORS[currentCard.mechanism.courseId] ?? COURSE_COLORS.CHEM008A;
    const progressPct = (stepIndex / stepDeck.length) * 100;
    const correctSoFar = stepAttempts.filter(a => a.isCorrect).length;
    const displayStepIdx = state === 'feedback' ? previewStepIdx : currentCard.stepIndex;
    const displayStep = currentCard.mechanism.steps[displayStepIdx];

    const submitStep = (optionIdx: number) => {
      setSelectedOption(optionIdx);
      const isCorrect = optionIdx === currentCard.correctOptionIndex;
      setStepAttempts(prev => [...prev, { card: currentCard, selectedIndex: optionIdx, isCorrect }]);
      setPreviewStepIdx(currentCard.stepIndex);
      setState('feedback');
    };

    const nextStep = () => {
      if (stepIndex + 1 >= stepDeck.length) {
        setState('complete');
      } else {
        setStepIndex(i => i + 1);
        setSelectedOption(null);
        setPreviewStepIdx(0);
        setState('drilling');
      }
    };

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-violet-400 font-bold text-sm">⚗️ Step Explorer</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.badge} text-white`}>
              {currentCard.mechanism.courseId}
            </span>
          </div>
          <span className="text-slate-400 text-sm">{stepIndex + 1} / {stepDeck.length}</span>
        </div>

        <div className="mb-5">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          {stepAttempts.length > 0 && (
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>{correctSoFar} correct</span>
              <span>{Math.round((correctSoFar / stepAttempts.length) * 100)}% accuracy</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-white font-semibold text-lg">{currentCard.mechanism.name}</h2>
          <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
            {state === 'feedback'
              ? `Viewing step ${displayStepIdx + 1} of ${currentCard.mechanism.steps.length}`
              : `Step ${currentCard.stepIndex + 1} of ${currentCard.mechanism.steps.length}`}
          </span>
        </div>

        {state === 'feedback' && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {currentCard.mechanism.steps.map((s, idx) => (
              <button key={idx} onClick={() => setPreviewStepIdx(idx)} title={s.title}
                className={`transition-all duration-200 rounded-full font-bold text-xs flex items-center justify-center ${
                  idx === previewStepIdx
                    ? `${colors.badge} text-white w-9 h-9 scale-110 shadow-lg`
                    : idx === currentCard.stepIndex
                    ? 'bg-violet-800 text-violet-200 w-7 h-7 ring-1 ring-violet-400'
                    : 'bg-slate-700 text-slate-400 w-7 h-7 hover:bg-slate-600'
                }`}>
                {idx + 1}
              </button>
            ))}
            <span className="text-xs text-slate-500 ml-1">Click any step to explore</span>
          </div>
        )}

        <div className="mb-5">
          <MechanismCanvas
            key={`${currentCard.mechanism.id}-${displayStepIdx}-${stepIndex}`}
            scene={displayStep.svgScene}
            stepNumber={displayStepIdx}
          />
        </div>

        {state === 'feedback' && (
          <div className={`bg-slate-800 rounded-xl border ${colors.border} p-5 mb-4 animate-fadeInUp`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors.badge} text-white`}>
                {displayStepIdx + 1}
              </span>
              <h3 className="text-white font-semibold text-sm">{displayStep.title}</h3>
              {displayStepIdx === currentCard.stepIndex && (
                <span className="text-xs text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">drilled step</span>
              )}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{displayStep.explanation}</p>
            {displayStep.keyPoints.length > 0 && (
              <ul className="space-y-1.5">
                {displayStep.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-violet-400 flex-shrink-0 mt-0.5">◆</span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-4">
          <p className="text-white font-medium mb-4">
            {state === 'feedback' ? `The drilled step was: Step ${currentCard.stepIndex + 1}` : 'What is the name of this step?'}
          </p>
          <div className="space-y-3">
            {currentCard.options.map((option, idx) => {
              let cls = 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer';
              if (state === 'feedback') {
                if (idx === currentCard.correctOptionIndex) cls = 'border-green-500 bg-green-500/20';
                else if (idx === selectedOption) cls = 'border-red-500 bg-red-500/20';
                else cls = 'border-slate-700 opacity-40';
              }
              return (
                <button key={idx}
                  onClick={() => state === 'drilling' && submitStep(idx)}
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

        {state === 'feedback' && (
          <div className="flex items-center justify-between mb-4 px-1">
            <span className={stepAttempts[stepAttempts.length - 1]?.isCorrect ? 'text-green-400 font-semibold text-sm' : 'text-red-400 font-semibold text-sm'}>
              {stepAttempts[stepAttempts.length - 1]?.isCorrect ? '✓ Correct!' : '✗ Not quite — correct answer highlighted above'}
            </span>
            <Link href={`/mechanisms/${currentCard.mechanism.id}`} className="text-xs text-blue-400 hover:text-blue-300">
              Full mechanism →
            </Link>
          </div>
        )}

        {state === 'feedback' && (
          <button onClick={nextStep}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
            {stepIndex + 1 >= stepDeck.length ? 'See Results →' : 'Next Step →'}
          </button>
        )}
      </div>
    );
  }

  // ── Problem Solving drill ─────────────────────────────────────────────────

  const currentQ = practiceQuestions[practiceIndex];
  if (!currentQ) return null;

  const progressPct = (practiceIndex / practiceQuestions.length) * 100;
  const correctSoFar = practiceAttempts.filter(a => a.isCorrect).length;

  const submitPractice = (optionIdx: number) => {
    const isCorrect = optionIdx === currentQ.correctIndex;
    setPracticeSelected(optionIdx);
    setPracticeAttempts(prev => [...prev, { question: currentQ, selectedIndex: optionIdx, isCorrect }]);
    setState('feedback');
  };

  const nextPractice = () => {
    if (practiceIndex + 1 >= practiceQuestions.length) {
      setState('complete');
    } else {
      setPracticeIndex(i => i + 1);
      setPracticeSelected(null);
      setStepsComplete(false);
      setState('drilling');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-violet-400 font-bold text-sm">⚗️ Problem Solving</span>
        <span className="text-slate-400 text-sm">{practiceIndex + 1} / {practiceQuestions.length}</span>
      </div>

      <div className="mb-5">
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        {practiceAttempts.length > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{correctSoFar} correct</span>
            <span>{Math.round((correctSoFar / practiceAttempts.length) * 100)}% accuracy</span>
          </div>
        )}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">
            {currentQ.mechanismFocus}
          </span>
        </div>

        {currentQ.smiles && (
          <div className="flex justify-center mb-4">
            <MoleculeViewer
              smiles={currentQ.smiles}
              label={currentQ.smilesLabel}
              width={300}
              height={200}
            />
          </div>
        )}

        <p className="text-white text-base leading-relaxed mb-6">{currentQ.prompt}</p>

        {state === 'drilling' && (
          <StepChallenge
            stepAnswers={currentQ.stepAnswers}
            questionIndex={practiceIndex}
            onComplete={() => setStepsComplete(true)}
          />
        )}

        {state === 'drilling' && !stepsComplete && (
          <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-slate-900/50 border border-slate-700/40 mb-3">
            <div className="w-3.5 h-3.5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <span className="text-xs text-slate-400">Complete all 4 steps above to unlock the answer choices</span>
          </div>
        )}

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const locked = state === 'drilling' && !stepsComplete;
            let cls = locked
              ? 'border-slate-700/40 opacity-30 cursor-not-allowed'
              : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer';
            if (state === 'feedback') {
              if (idx === currentQ.correctIndex) cls = 'border-green-500 bg-green-500/20';
              else if (idx === practiceSelected) cls = 'border-red-500 bg-red-500/20';
              else cls = 'border-slate-700 opacity-40';
            }
            return (
              <button key={idx}
                onClick={() => state === 'drilling' && stepsComplete && submitPractice(idx)}
                disabled={state !== 'drilling' || !stepsComplete}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${cls}`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  state === 'feedback' && idx === currentQ.correctIndex ? 'bg-green-500 text-white' :
                  state === 'feedback' && idx === practiceSelected ? 'bg-red-500 text-white' :
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

      {state === 'feedback' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-4 animate-fadeInUp">
          <div className="flex items-center gap-2 mb-3">
            {practiceAttempts[practiceAttempts.length - 1]?.isCorrect
              ? <span className="text-green-400 font-semibold text-sm">✓ Correct!</span>
              : <span className="text-red-400 font-semibold text-sm">✗ Not quite</span>}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{currentQ.explanation}</p>
          <div className="border-t border-slate-700/50 pt-3">
            <p className="text-xs text-slate-500 font-medium mb-2">Reinforce the habit — ask yourself:</p>
            <ul className="space-y-1">
              {[
                'Which step (1–5) in the protocol was the key decision point here?',
                'Could you have ruled out the wrong answers using the decision tree alone?',
                'Did solvent or temperature change your answer? (Step 3)',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                  <span className="text-violet-500 flex-shrink-0 mt-0.5">›</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {state === 'feedback' && (
        <button onClick={nextPractice}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-medium transition-colors">
          {practiceIndex + 1 >= practiceQuestions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
