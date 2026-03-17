'use client';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { courses } from '@/data/courses';
import { TopicScore } from '@/types/progress';

// ─── Topic metadata: gap type + 3-step sequences ────────────────────────────

type GapType = 'memorize' | 'understand' | 'both';

interface TopicMeta {
  gapType: GapType;
  gapLabel: string;           // shown in the callout
  guideAnchor: string;        // what to tell the student about the Study Guide
  hasMechanism: boolean;
}

const TOPIC_META: Record<string, TopicMeta> = {
  'structure-bonding': {
    gapType: 'understand',
    gapLabel: 'Conceptual understanding',
    guideAnchor: 'Arrow pushing & orbital logic — see "Understand Deeply" in the Study Guide.',
    hasMechanism: false,
  },
  'functional-groups': {
    gapType: 'memorize',
    gapLabel: 'Memorization gap',
    guideAnchor: 'Functional groups are Priority 1 in the Study Guide — the vocabulary you cannot skip.',
    hasMechanism: false,
  },
  'stereochemistry': {
    gapType: 'understand',
    gapLabel: 'Conceptual understanding',
    guideAnchor: 'Stereochemistry is geometry logic, not memorization — see "Understand Deeply" in the Study Guide.',
    hasMechanism: false,
  },
  'acids-bases': {
    gapType: 'both',
    gapLabel: 'Memorization + understanding',
    guideAnchor: 'pKa trends require understanding stability; specific pKa values need memorization — both covered in the Study Guide.',
    hasMechanism: false,
  },
  'sn1-sn2': {
    gapType: 'both',
    gapLabel: 'Memorization + understanding',
    guideAnchor: 'Leaving group order = memorize (Priority 1). SN1/SN2 decision logic = understand deeply. Both in the Study Guide.',
    hasMechanism: true,
  },
  'e1-e2': {
    gapType: 'understand',
    gapLabel: 'Conceptual understanding',
    guideAnchor: 'E1/E2 competition is pure logic — see "SN1/SN2/E1/E2 Competition" in the Study Guide.',
    hasMechanism: true,
  },
  'alkene-addition': {
    gapType: 'memorize',
    gapLabel: 'Reagent memorization gap',
    guideAnchor: 'This topic is almost entirely a reagent table. Priority 1 in the Study Guide — rewrite the table from memory.',
    hasMechanism: false,
  },
  'alkyne-reactions': {
    gapType: 'memorize',
    gapLabel: 'Reagent memorization gap',
    guideAnchor: 'Alkyne reagents (Lindlar vs Na/NH3, Hg vs hydroboration) must be memorized. See Reagent Table in the Study Guide.',
    hasMechanism: false,
  },
  'oxidation-reduction': {
    gapType: 'memorize',
    gapLabel: 'Reagent memorization gap',
    guideAnchor: 'Oxidants vs reductants is a memorization task. PCC, KMnO4, OsO4, LiAlH4 — see Priority 1 Reagent Table.',
    hasMechanism: false,
  },
  'nmr-spectroscopy': {
    gapType: 'memorize',
    gapLabel: 'Memorization gap',
    guideAnchor: 'NMR/IR values are pure memorization — Priority 2 in the Study Guide. No way to derive them.',
    hasMechanism: false,
  },
  'carbonyl-chemistry': {
    gapType: 'both',
    gapLabel: 'Memorization + understanding',
    guideAnchor: 'Carbonyl mechanisms must be understood (arrow pushing). Reactivity order (acyl Cl > anhydride > ester > amide) must be memorized.',
    hasMechanism: true,
  },
  'aromatic-chemistry': {
    gapType: 'both',
    gapLabel: 'Memorization + understanding',
    guideAnchor: 'EAS directing logic is conceptual (understand deeply). Activating/deactivating group list must be memorized.',
    hasMechanism: true,
  },
  'amines': {
    gapType: 'memorize',
    gapLabel: 'Named reaction memorization',
    guideAnchor: 'Gabriel, Sandmeyer, Hofmann, reductive amination — these are named reactions (Priority 1). Study them as input/output pairs.',
    hasMechanism: false,
  },
  'carbohydrates': {
    gapType: 'memorize',
    gapLabel: 'Memorization gap',
    guideAnchor: 'D-glucose, D-galactose, Fischer→Haworth conversion — Priority 2 in the Study Guide. Biological facts, not derivable.',
    hasMechanism: false,
  },
  'amino-acids-proteins': {
    gapType: 'memorize',
    gapLabel: 'Memorization gap',
    guideAnchor: 'The 20 amino acids are Priority 2. Group by family (acidic/basic/sulfur/aromatic) — do not try to memorize all 20 individually.',
    hasMechanism: false,
  },
  'lipids': {
    gapType: 'understand',
    gapLabel: 'Conceptual understanding',
    guideAnchor: 'Lipid chemistry is largely mechanistic (ester hydrolysis, saponification). Focus on understanding the reactions.',
    hasMechanism: false,
  },
  'diels-alder': {
    gapType: 'understand',
    gapLabel: 'Conceptual understanding',
    guideAnchor: 'Diels-Alder is orbital logic (endo rule, syn stereochemistry, s-cis diene). Understand it deeply — don\'t memorize outcomes.',
    hasMechanism: true,
  },
};

// ─── Score tier ──────────────────────────────────────────────────────────────

type Tier = 'not-started' | 'struggling' | 'needs-work' | 'on-track' | 'mastered';

function getTier(score?: TopicScore): Tier {
  if (!score) return 'not-started';
  const s = score.averageScore;
  if (s < 60) return 'struggling';
  if (s < 75) return 'needs-work';
  if (s < 85) return 'on-track';
  return 'mastered';
}

const TIER_CONFIG: Record<Tier, { label: string; color: string; badge: string; bar: string; urgency: number }> = {
  'not-started':  { label: 'Not Started',  color: 'text-slate-400',  badge: 'bg-slate-700 text-slate-300',       bar: 'bg-slate-600',   urgency: 2 },
  'struggling':   { label: 'Struggling',   color: 'text-red-400',    badge: 'bg-red-500/20 text-red-300',         bar: 'bg-red-500',     urgency: 1 },
  'needs-work':   { label: 'Needs Work',   color: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300',   bar: 'bg-yellow-500',  urgency: 3 },
  'on-track':     { label: 'On Track',     color: 'text-green-400',  badge: 'bg-green-500/20 text-green-300',     bar: 'bg-green-500',   urgency: 4 },
  'mastered':     { label: 'Mastered',     color: 'text-emerald-400',badge: 'bg-emerald-500/20 text-emerald-300', bar: 'bg-emerald-500', urgency: 5 },
};

// ─── 3-step action sequence ───────────────────────────────────────────────────

interface ActionStep {
  step: number;
  label: string;
  href: string;
  color: string;
}

function getActionSequence(topicId: string, tier: Tier, courseId: string): ActionStep[] {
  const meta = TOPIC_META[topicId];
  const mechanismHref = '/mechanisms';
  const quizHref = `/quiz/${topicId}`;
  const flashHref = '/flashcards';
  const drillHref = '/drill';
  const guideHref = '/guide';
  const topicHref = `/topics/${courseId}/${topicId}`;

  if (tier === 'not-started') {
    return [
      { step: 1, label: 'Read Topic Overview', href: topicHref, color: 'bg-blue-600 hover:bg-blue-500' },
      { step: 2, label: meta?.hasMechanism ? 'Study the Mechanism' : 'Review Flashcards', href: meta?.hasMechanism ? mechanismHref : flashHref, color: 'bg-purple-600 hover:bg-purple-500' },
      { step: 3, label: 'Take a Quiz', href: quizHref, color: 'bg-green-600 hover:bg-green-500' },
    ];
  }

  if (tier === 'struggling') {
    if (meta?.gapType === 'memorize') {
      return [
        { step: 1, label: 'Study Guide — Memorize Section', href: guideHref, color: 'bg-red-600 hover:bg-red-500' },
        { step: 2, label: 'Drill Flashcards', href: flashHref, color: 'bg-orange-600 hover:bg-orange-500' },
        { step: 3, label: 'Take Quiz to Test Recall', href: quizHref, color: 'bg-green-600 hover:bg-green-500' },
      ];
    }
    if (meta?.gapType === 'understand') {
      return [
        { step: 1, label: meta?.hasMechanism ? 'Watch the Mechanism Step-by-Step' : 'Ask AI Tutor to Explain', href: meta?.hasMechanism ? mechanismHref : '/tutor', color: 'bg-red-600 hover:bg-red-500' },
        { step: 2, label: 'Study Guide — Understand Section', href: guideHref, color: 'bg-orange-600 hover:bg-orange-500' },
        { step: 3, label: 'Take Quiz', href: quizHref, color: 'bg-green-600 hover:bg-green-500' },
      ];
    }
    // both
    return [
      { step: 1, label: meta?.hasMechanism ? 'Study the Mechanism' : 'Study Guide Overview', href: meta?.hasMechanism ? mechanismHref : guideHref, color: 'bg-red-600 hover:bg-red-500' },
      { step: 2, label: 'Flashcards for Memorization', href: flashHref, color: 'bg-orange-600 hover:bg-orange-500' },
      { step: 3, label: 'Take Quiz', href: quizHref, color: 'bg-green-600 hover:bg-green-500' },
    ];
  }

  if (tier === 'needs-work') {
    return [
      { step: 1, label: 'Flashcard Review', href: flashHref, color: 'bg-yellow-600 hover:bg-yellow-500' },
      { step: 2, label: 'Take Quiz', href: quizHref, color: 'bg-blue-600 hover:bg-blue-500' },
      { step: 3, label: 'Drill Weak Spots', href: drillHref, color: 'bg-orange-600 hover:bg-orange-500' },
    ];
  }

  // on-track / mastered — review
  return [
    { step: 1, label: 'Quick Flashcard Review', href: flashHref, color: 'bg-slate-600 hover:bg-slate-500' },
    { step: 2, label: 'Take Quiz to Confirm', href: quizHref, color: 'bg-blue-600 hover:bg-blue-500' },
    { step: 3, label: 'Move On — You\'re Good!', href: '/dashboard', color: 'bg-emerald-700 hover:bg-emerald-600' },
  ];
}

// ─── Course colors ────────────────────────────────────────────────────────────

const COURSE_COLORS: Record<string, { badge: string; bar: string }> = {
  CHEM008A: { badge: 'bg-blue-600',   bar: 'bg-blue-500' },
  CHEM008B: { badge: 'bg-green-600',  bar: 'bg-green-500' },
  CHEM008C: { badge: 'bg-purple-600', bar: 'bg-purple-500' },
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PlanPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400 animate-pulse">Loading your plan...</div>
      </div>
    );
  }

  // Build enriched topic list
  const allTopics = courses.flatMap(course =>
    course.topics.map(topic => {
      const score = progress.topicScores[topic.id];
      const tier = getTier(score);
      const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
      const dueForReview = score && score.lastStudied < sevenDaysAgo && tier !== 'struggling';
      return { topic, course, score, tier, dueForReview };
    })
  );

  // Pick "Focus Today": struggling (lowest score) → not-started → needs-work → due-for-review
  const struggling   = allTopics.filter(t => t.tier === 'struggling').sort((a, b) => (a.score?.averageScore ?? 0) - (b.score?.averageScore ?? 0));
  const notStarted   = allTopics.filter(t => t.tier === 'not-started');
  const needsWork    = allTopics.filter(t => t.tier === 'needs-work');
  const dueForReview = allTopics.filter(t => t.dueForReview);

  const focusTopic = struggling[0] ?? notStarted[0] ?? needsWork[0] ?? dueForReview[0] ?? null;
  const focusActions = focusTopic
    ? getActionSequence(focusTopic.topic.id, focusTopic.tier, focusTopic.course.id)
    : [];

  // Stats
  const masteredCount  = allTopics.filter(t => t.tier === 'mastered').length;
  const onTrackCount   = allTopics.filter(t => t.tier === 'on-track').length;
  const needsWorkCount = allTopics.filter(t => t.tier === 'needs-work').length;
  const strugglingCount = allTopics.filter(t => t.tier === 'struggling').length;
  const notStartedCount = allTopics.filter(t => t.tier === 'not-started').length;
  const total = allTopics.length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Your Study Plan</h1>
        <p className="text-slate-400 text-sm">Personalized guidance based on your actual performance</p>
      </div>

      {/* Snapshot bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-white">Course Coverage — {total} topics</span>
          <span className="text-xs text-slate-400">{masteredCount + onTrackCount} of {total} in good shape</span>
        </div>
        <div className="flex rounded-full overflow-hidden h-3 mb-3">
          {[
            { count: masteredCount,   color: 'bg-emerald-500' },
            { count: onTrackCount,    color: 'bg-green-500' },
            { count: needsWorkCount,  color: 'bg-yellow-500' },
            { count: strugglingCount, color: 'bg-red-500' },
            { count: notStartedCount, color: 'bg-slate-600' },
          ].map(({ count, color }, i) => (
            count > 0 && (
              <div
                key={i}
                className={`${color} transition-all`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            )
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          {[
            { label: 'Mastered',    count: masteredCount,   color: 'text-emerald-400' },
            { label: 'On Track',    count: onTrackCount,    color: 'text-green-400' },
            { label: 'Needs Work',  count: needsWorkCount,  color: 'text-yellow-400' },
            { label: 'Struggling',  count: strugglingCount, color: 'text-red-400' },
            { label: 'Not Started', count: notStartedCount, color: 'text-slate-400' },
          ].map(({ label, count, color }) => (
            <span key={label} className={`${color} font-medium`}>{count} {label}</span>
          ))}
        </div>
      </div>

      {/* Focus Today */}
      {focusTopic ? (
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/40 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎯</span>
            <span className="text-orange-400 font-bold text-sm uppercase tracking-wide">Focus Today</span>
          </div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-white text-xl font-bold">{focusTopic.topic.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TIER_CONFIG[focusTopic.tier].badge}`}>
                  {TIER_CONFIG[focusTopic.tier].label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${COURSE_COLORS[focusTopic.course.id]?.badge ?? 'bg-slate-600'} text-white`}>
                  {focusTopic.course.id}
                </span>
                {focusTopic.score && (
                  <span className={`text-sm font-bold ${TIER_CONFIG[focusTopic.tier].color}`}>
                    {focusTopic.score.averageScore}% avg
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Why this topic */}
          <div className="bg-slate-800/60 rounded-xl p-4 mb-5 text-sm text-slate-300 leading-relaxed">
            {focusTopic.tier === 'struggling' && (
              <>This is your lowest-scoring topic at <span className="text-red-300 font-semibold">{focusTopic.score?.averageScore ?? 0}%</span>. That is a failing score. Fix this before the exam or it will cost you points on every related question.</>
            )}
            {focusTopic.tier === 'not-started' && (
              <>You have never practiced this topic. It will appear on the exam. Every topic not started is a guaranteed gap — start now to give yourself enough time to build fluency.</>
            )}
            {focusTopic.tier === 'needs-work' && (
              <>You are at <span className="text-yellow-300 font-semibold">{focusTopic.score?.averageScore ?? 0}%</span> here — borderline. One more focused session could push this to solid. Do not let it slide before the exam.</>
            )}
            {focusTopic.tier === 'on-track' && focusTopic.dueForReview && (
              <>You scored well here but have not reviewed in over a week. A quick session now prevents forgetting and locks in long-term retention.</>
            )}
          </div>

          {/* 3-step sequence */}
          <div className="mb-5">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">Your 3-Step Action Plan</div>
            <div className="grid grid-cols-3 gap-3">
              {focusActions.map(action => (
                <Link
                  key={action.step}
                  href={action.href}
                  className={`${action.color} text-white rounded-xl p-4 text-center transition-colors`}
                >
                  <div className="text-xs font-bold opacity-70 mb-1">Step {action.step}</div>
                  <div className="text-sm font-semibold leading-tight">{action.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Study Guide callout */}
          {TOPIC_META[focusTopic.topic.id] && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 flex items-start gap-2">
              <span className="text-blue-400 text-lg flex-shrink-0">🧭</span>
              <div>
                <div className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-0.5">Study Guide Says</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {TOPIC_META[focusTopic.topic.id].guideAnchor}{' '}
                  <Link href="/guide" className="text-blue-400 hover:text-blue-300 underline">Open Study Guide →</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-white font-bold text-lg mb-1">You're on top of everything!</div>
          <p className="text-slate-400 text-sm">All topics are in good shape. Keep reviewing to maintain your scores.</p>
        </div>
      )}

      {/* Full topic breakdown by course */}
      <div className="space-y-6">
        {courses.map(course => {
          const courseTopics = allTopics.filter(t => t.course.id === course.id);
          const cc = COURSE_COLORS[course.id];
          return (
            <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className={`${cc.badge} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
                  {course.id}
                </span>
                <h2 className="text-white font-semibold">{course.name}</h2>
                <span className="text-xs text-slate-500">
                  {courseTopics.filter(t => t.tier === 'mastered' || t.tier === 'on-track').length} / {courseTopics.length} in good shape
                </span>
              </div>

              <div className="space-y-2">
                {courseTopics.map(({ topic, score, tier, dueForReview }) => {
                  const tc = TIER_CONFIG[tier];
                  const actions = getActionSequence(topic.id, tier, course.id);
                  const firstAction = actions[0];

                  return (
                    <div
                      key={topic.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                        tier === 'struggling' ? 'border-red-500/30 bg-red-500/5' :
                        tier === 'not-started' ? 'border-slate-600 bg-slate-700/30' :
                        tier === 'needs-work' ? 'border-yellow-500/20 bg-yellow-500/5' :
                        'border-slate-700 bg-slate-700/20'
                      }`}
                    >
                      {/* Score bar */}
                      <div className="w-12 flex-shrink-0">
                        <div className="text-center">
                          {score ? (
                            <span className={`text-sm font-bold ${tc.color}`}>
                              {score.averageScore}%
                            </span>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                          <div
                            className={`${tc.bar} h-1 rounded-full`}
                            style={{ width: score ? `${score.averageScore}%` : '0%' }}
                          />
                        </div>
                      </div>

                      {/* Topic info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white text-sm font-medium">{topic.title}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${tc.badge}`}>
                            {tc.label}
                          </span>
                          {dueForReview && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                              Due for review
                            </span>
                          )}
                          {score && (
                            <span className="text-xs text-slate-500">
                              {score.quizAttempts} attempt{score.quizAttempts !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        {TOPIC_META[topic.id] && (
                          <div className="text-xs text-slate-500 mt-0.5">{TOPIC_META[topic.id].gapLabel}</div>
                        )}
                      </div>

                      {/* Next action */}
                      {tier !== 'mastered' && (
                        <Link
                          href={firstAction.href}
                          className="flex-shrink-0 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                        >
                          {tier === 'not-started' ? 'Start →' : 'Next step →'}
                        </Link>
                      )}
                      {tier === 'mastered' && (
                        <span className="flex-shrink-0 text-xs text-emerald-500 font-semibold px-3">✓ Done</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom — action CTA for worst areas */}
      {(strugglingCount > 0 || notStartedCount > 0) && (
        <div className="mt-8 bg-slate-800 border border-orange-500/30 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold mb-0.5">
              {strugglingCount > 0
                ? `${strugglingCount} topic${strugglingCount > 1 ? 's' : ''} need urgent attention`
                : `${notStartedCount} topic${notStartedCount > 1 ? 's' : ''} not yet started`}
            </div>
            <p className="text-slate-400 text-sm">
              Drill Mode will pull questions directly from these weak areas and show you your improvement.
            </p>
          </div>
          <Link
            href="/drill"
            className="flex-shrink-0 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            🎯 Start Drill
          </Link>
        </div>
      )}
    </div>
  );
}
