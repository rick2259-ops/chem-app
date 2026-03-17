'use client';
import Link from 'next/link';

const MEMORIZE_SECTIONS = [
  {
    priority: 1,
    label: 'Must Memorize — No Way Around It',
    color: 'border-red-500/40 bg-red-500/5',
    headerColor: 'text-red-400',
    badgeColor: 'bg-red-500/20 text-red-300',
    items: [
      {
        title: 'Functional Groups',
        why: 'You cannot identify a reaction if you cannot instantly name what you are looking at. Functional groups are the alphabet — without them you cannot read any reaction.',
        how: 'Drill the carbonyl family daily: aldehyde (RCHO) → ketone (RCOR) → ester (RCOOR) → acid (RCOOH) → amide (RCONR₂). Each differs by one oxygen or nitrogen. Use flashcards until recognition is instant — under 2 seconds per structure.',
        keyItems: ['Aldehyde vs ketone vs ester vs acid vs amide', 'Alkene, alkyne, aromatic ring', 'Amine (1°/2°/3°), alcohol, thiol, ether', 'Nitrile, epoxide, enol/enolate'],
        link: '/flashcards',
        linkLabel: 'Drill Functional Groups',
      },
      {
        title: 'Reagent → Outcome Table',
        why: 'Exams ask "which reagent gives anti-Markovnikov alcohol?" There is no derivation pathway — you either know BH₃/H₂O₂ or you lose the point. Reagents are facts, not logic.',
        how: 'Group by reaction type, not by reagent name. Study all alkene addition reagents together, then all oxidants together. Make a one-page cheat sheet per course. Rewrite it from memory every week — the act of recall cements it.',
        keyItems: [
          'BH₃·THF / H₂O₂, NaOH → anti-Markovnikov syn-OH',
          'Hg(OAc)₂ / NaBH₄ → Markovnikov, no rearrangement',
          'OsO₄ → syn diol (both OH same face)',
          'mCPBA → epoxide; then acid opens anti',
          'O₃ / DMS → aldehyde or ketone; O₃ / H₂O₂ → carboxylic acid',
          'PCC → aldehyde (stops there); KMnO₄ hot → carboxylic acid',
          'LiAlH₄ → reduces everything; NaBH₄ → ketones/aldehydes only',
          'NaNH₂ → deprotonates terminal alkyne (pKa ~25)',
        ],
        link: '/reactions',
        linkLabel: 'View Reaction Reference',
      },
      {
        title: 'Named Reactions',
        why: 'Professors use these names on exams, in lecture, and in synthesis problems. If you hear "do a Wittig here" and you do not know what goes in and what comes out, you are stuck. Named reactions are shorthand for entire synthetic steps.',
        how: 'For each named reaction, memorize exactly three things: (1) what bond is formed, (2) what the reagent is, (3) one stereochemistry note. Do not try to memorize the full mechanism — understand it, but recall the input/output pair.',
        keyItems: [
          'Grignard: RMgX + carbonyl → alcohol (adds C–C bond)',
          'Wittig: phosphorus ylide + carbonyl → alkene (no E/Z ambiguity with Ph₃P=CH₂)',
          'Aldol: enolate + carbonyl → β-hydroxy carbonyl',
          'Diels-Alder: diene + dienophile → cyclohexene (syn, endo rule)',
          'Gabriel synthesis: phthalimide → 1° amine only',
          'Sandmeyer: diazonium → Cl/Br/CN/OH via CuX',
          'Hofmann rearrangement: amide + Br₂/NaOH → amine (loses one carbon)',
          'Reductive amination: ketone + amine + NaBH₃CN → secondary amine',
        ],
        link: '/quiz',
        linkLabel: 'Quiz Named Reactions',
      },
      {
        title: 'Leaving Group Ability Order',
        why: 'This single ranking determines whether SN1, SN2, E1, or E2 is viable. Wrong leaving group = wrong mechanism = wrong product. It is tested constantly and there is no way to derive the order from scratch in exam conditions.',
        how: 'Memorize as a sentence: "I Brought Clean Fluffy Towels" → I > Br > Cl > F. Then add: OTs (tosylate) > I. OH is terrible until protonated (then H₂O leaves easily).',
        keyItems: [
          'I⁻ > Br⁻ > Cl⁻ >> F⁻ (F never leaves)',
          'TsO⁻ > I⁻ (tosylate is the best common leaving group)',
          'OH⁻ is terrible; H₂O is good → must protonate OH first',
          'NH₂⁻ never leaves; NR₃ (quaternary ammonium) can leave',
        ],
        link: '/drill',
        linkLabel: 'Drill Weak Spots',
      },
    ],
  },
  {
    priority: 2,
    label: 'High Priority — Tested on Every Exam',
    color: 'border-orange-500/40 bg-orange-500/5',
    headerColor: 'text-orange-400',
    badgeColor: 'bg-orange-500/20 text-orange-300',
    items: [
      {
        title: 'Spectroscopy Values (IR + NMR)',
        why: 'Spectroscopy problems are pure pattern recognition. There is no logic pathway from pKa or electronegativity to "aldehyde C-H appears at 2720 cm⁻¹." These numbers must be memorized. Fortunately there are only ~10 critical IR values and ~6 NMR ranges.',
        how: 'IR: group by functional group, not by wavenumber. Start with C=O (1710 carbonyl family) and O-H (3300 broad). NMR: use a simple number line — TMS (0), alkyl (1), next to O (3.5), vinyl (5-6), aromatic (7-8), aldehyde (9-10), carboxylic acid (11-12).',
        keyItems: [
          'IR ~3300 broad → O-H or N-H stretch',
          'IR ~2500 very broad → carboxylic acid O-H',
          'IR ~2720 + 2820 (two weak peaks) → aldehyde C-H',
          'IR ~1710 → ketone/acid C=O; ~1735 → ester; ~1680 → amide',
          'IR ~2200 → C≡C or C≡N',
          'NMR: alkyl ~1 ppm; next to C=O ~2 ppm; allylic/benzylic ~2.5',
          'NMR: next to O ~3.5 ppm; vinyl H 5–6; aromatic 7–8',
          'NMR: aldehyde H ~9–10; RCOOH ~11–12 (very broad)',
        ],
        link: '/quiz',
        linkLabel: 'Practice Spectroscopy Questions',
      },
      {
        title: 'Amino Acid Structures (CHEM 008C)',
        why: 'The 20 amino acids are biological facts — their side chains, charges, and pKa values cannot be derived. UCR 008C tests pI calculations, peptide chemistry, and protein folding concepts that all depend on knowing these structures cold.',
        how: 'Group into 5 families, not 20 individuals: (1) acidic (Asp, Glu), (2) basic (Lys, Arg, His — His is unique with pKa ~6), (3) sulfur-containing (Cys, Met), (4) aromatic (Phe, Tyr, Trp), (5) everything else. Learn the exceptions first.',
        keyItems: [
          'Acidic: Asp (D), Glu (E) — extra COOH side chain',
          'Basic: Lys (K) — extra NH₂; Arg (R) — guanidinium; His (H) — imidazole, pKa ~6',
          'Sulfur: Cys (C) — SH, forms disulfide; Met (M) — S-CH₃',
          'Aromatic: Phe (F) — no heteroatom; Tyr (Y) — has OH; Trp (W) — indole',
          'pI = average of the two pKa values flanking the zwitterion form',
          'All 20 are L-amino acids (S configuration, except Cys which is R due to priority)',
        ],
        link: '/flashcards',
        linkLabel: 'Review Amino Acid Flashcards',
      },
      {
        title: 'Carbohydrate Configurations (CHEM 008C)',
        why: 'D-glucose has four stereocenters — 16 possible configurations. The professor will ask you to draw it, convert it to Haworth, or identify epimers. The specific arrangement of OH groups is a biological fact you must memorize.',
        how: 'Memorize D-glucose as your anchor (all OH right except C-3 left in Fischer). Then remember relationships: galactose = glucose with C-4 OH flipped (they are C-4 epimers). Fructose = ketose (C-2), but C-3, 4, 5 same as glucose. Mannose = glucose with C-2 OH flipped.',
        keyItems: [
          'D-glucose: right, right, left, right (C-2 to C-5 OH direction)',
          'D-galactose: right, right, right, right (C-4 flipped vs glucose)',
          'D-fructose: ketose (C-2 ketone); C-3,4,5 = same as glucose',
          'Haworth rule: OH right in Fischer → down in Haworth',
          'D-sugars: C-5 OH on right in Fischer → same side as CH₂OH in Haworth',
          'Anomers (α/β): α = OH axial (down in Haworth); β = OH equatorial (up)',
        ],
        link: '/quiz',
        linkLabel: 'Quiz Carbohydrates',
      },
    ],
  },
  {
    priority: 3,
    label: 'Understand Deeply — Never Memorize These',
    color: 'border-blue-500/40 bg-blue-500/5',
    headerColor: 'text-blue-400',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    items: [
      {
        title: 'Electron Arrow Pushing',
        why: 'This is the grammar of orgo. Once you understand that electrons always flow from nucleophile (electron-rich) to electrophile (electron-poor), you can follow or draw any mechanism — even ones you have never seen. Memorizing mechanisms without understanding arrow pushing gives you nothing on unfamiliar problems.',
        how: 'Practice one rule: electrons move toward positive charge or away from negative charge. For every arrow you draw, ask: "Where are the electrons coming from, and is the destination electron-poor?" Verify by checking formal charges after each step.',
        keyItems: [
          'Full arrow (→) = 2 electrons move; half arrow (⇀) = 1 electron (radical)',
          'Nucleophile always has electrons to donate (lone pair or π bond)',
          'Electrophile always has electron deficiency (+ charge, partial +, or empty orbital)',
          'Every arrow must start ON electrons (lone pair or bond) and point TO an atom',
        ],
        link: '/mechanisms',
        linkLabel: 'Practice Mechanisms',
      },
      {
        title: 'SN1 / SN2 / E1 / E2 Competition Logic',
        why: 'There are only ~6 variables (substrate class, nucleophile, base strength, solvent, temperature, leaving group). Understanding how they interact lets you predict the winner in any combination — far more powerful than memorizing a table.',
        how: 'Build a decision tree in your head: (1) Is the substrate 3°? → SN1/E1 only (no SN2). (2) Is there a strong base? → E2 preferred. (3) Polar protic solvent? → favors SN1. (4) Weak nucleophile + 3° → SN1. (5) Strong, hindered base + 2° or 3° → E2. Work through 20 practice problems until the tree runs automatically.',
        keyItems: [
          '3° substrate: SN2 impossible (steric); choose SN1 vs E1 vs E2',
          'Strong, unhindered nucleophile → SN2; strong, hindered base → E2',
          'Polar protic solvent (H₂O, ROH) stabilizes carbocation → SN1/E1',
          'Polar aprotic (DMSO, DMF, acetone) → SN2 favored',
          'High temperature → favors elimination over substitution',
          'Zaitsev product (more substituted alkene) = thermodynamic; Hofmann = kinetic/bulky base',
        ],
        link: '/drill',
        linkLabel: 'Drill SN1/SN2/E1/E2',
      },
      {
        title: 'Stability Trends',
        why: 'Stability questions underlie every reaction outcome: which carbocation forms, which acid is stronger, which product is favored. Understand the hierarchy once, apply it everywhere.',
        how: 'Learn the order of influence: resonance > hybridization > induction > hyperconjugation. Resonance is by far the biggest stabilizer. A resonance-stabilized carbocation (allylic, benzylic) beats any tertiary non-stabilized one.',
        keyItems: [
          'Carbocation stability: resonance-stabilized >> 3° > 2° > 1° > methyl',
          'Carbanion stability: opposite of carbocation (more substituted = less stable)',
          'Acid strength: resonance stabilization of conjugate base = key factor',
          'Alkene stability: more substituted = more stable (more hyperconjugation)',
          'sp > sp² > sp³ for carbanion stability (more s character = holds electrons tighter)',
        ],
        link: '/quiz',
        linkLabel: 'Test Yourself',
      },
    ],
  },
];

const STUDY_PLAN = [
  { week: 'Before Lecture', action: 'Skim the reaction list for the upcoming topic. Note which reagents are new.', icon: '📖' },
  { week: 'During Lecture', action: 'Focus on the why — why does this reagent do this? Write the mechanism, not just the product.', icon: '✏️' },
  { week: 'Same Evening', action: 'Do 10 flashcards on the day\'s topic. Write the reagent → product mapping from memory.', icon: '🃏' },
  { week: 'Before Exam', action: 'Drill weak spots (use the Drill page). Rewrite your one-page reagent cheat sheet from memory. Do one practice exam.', icon: '🎯' },
];

export default function GuidePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
            🧭
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">How to Study Orgo</h1>
            <p className="text-slate-400 text-sm">What to memorize, what to understand, and why it matters</p>
          </div>
        </div>
      </div>

      {/* Big Picture Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800 border border-slate-600 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">The One Rule That Changes Everything</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wide">Memorize</div>
            <div className="text-white text-sm font-medium mb-2">The Vocabulary</div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reagents, functional groups, named reactions, spectroscopy values, amino acid structures. These are <span className="text-red-300 font-semibold">facts with no derivation path</span>. You either know them or you lose the point. On a 50-minute exam you cannot re-derive what OsO₄ does.
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-wide">Understand</div>
            <div className="text-white text-sm font-medium mb-2">The Grammar</div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Arrow pushing, SN1/SN2/E1/E2 logic, stability trends, stereochemistry geometry. These have an <span className="text-blue-300 font-semibold">underlying principle</span> — learn the principle once and it applies to every molecule, even ones you have never seen.
            </p>
          </div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-slate-300 text-sm">
            A student who only memorizes gets stuck on unfamiliar problems. A student who only understands runs out of time.{' '}
            <span className="text-white font-semibold">You need both — but they require completely different study methods.</span>
          </p>
        </div>
      </div>

      {/* Daily Study Plan */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Study Rhythm That Works</h2>
        <div className="grid grid-cols-2 gap-3">
          {STUDY_PLAN.map((step) => (
            <div key={step.week} className="flex gap-3 p-3 bg-slate-700/50 rounded-lg">
              <span className="text-2xl flex-shrink-0">{step.icon}</span>
              <div>
                <div className="text-white text-sm font-semibold">{step.week}</div>
                <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{step.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memorize vs Understand sections */}
      {MEMORIZE_SECTIONS.map((section) => (
        <div key={section.priority} className={`border ${section.color} rounded-2xl p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${section.badgeColor}`}>
              Priority {section.priority}
            </span>
            <h2 className={`text-base font-bold ${section.headerColor}`}>{section.label}</h2>
          </div>

          <div className="space-y-5">
            {section.items.map((item) => (
              <div key={item.title} className="bg-slate-800/70 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-white font-semibold text-base">{item.title}</h3>
                  <Link
                    href={item.link}
                    className="flex-shrink-0 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {item.linkLabel} →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Why memorize</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.why}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">How to memorize</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.how}</p>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Key items to drill</div>
                  <div className="flex flex-wrap gap-2">
                    {item.keyItems.map((ki, i) => (
                      <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg leading-relaxed">
                        {ki}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
        <h2 className="text-white font-bold text-lg mb-2">Ready to Study?</h2>
        <p className="text-slate-400 text-sm mb-5">
          Start with flashcards to build vocabulary, then quiz yourself to test application. Use Drill Mode when the exam is close.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/flashcards" className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            🃏 Start Flashcards
          </Link>
          <Link href="/quiz" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            ✏️ Practice Quiz
          </Link>
          <Link href="/drill" className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            🎯 Drill Weak Spots
          </Link>
          <Link href="/mechanisms" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            ⚗️ View Mechanisms
          </Link>
        </div>
      </div>
    </div>
  );
}
