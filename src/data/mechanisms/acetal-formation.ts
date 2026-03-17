import { Mechanism } from '@/types/mechanism';

export const acetalFormationMechanism: Mechanism = {
  id: 'acetal-formation',
  name: 'Acetal Formation',
  courseId: 'CHEM008B',
  topicId: 'carbonyl-chemistry',
  reactionType: 'carbonyl',
  overview:
    'Acetal formation converts an aldehyde or ketone to an acetal (two OR groups on the same carbon) using excess alcohol and an acid catalyst. The reaction proceeds through: (1) protonation of the carbonyl, (2) nucleophilic addition of one alcohol → hemiacetal, (3) protonation of OH and loss of water → oxocarbenium ion, (4) second alcohol addition → protonated acetal, (5) deprotonation → acetal. Acetals are stable to base and nucleophiles but hydrolyzed by acid. They are used as protecting groups for carbonyls.',
  steps: [
    {
      stepNumber: 1,
      title: 'Protonation of Carbonyl Oxygen (Acid Activation)',
      explanation:
        'The acid catalyst (H+, TsOH, or HCl) protonates the carbonyl oxygen of the aldehyde or ketone. This converts the carbonyl into an oxocarbenium ion, making the carbonyl carbon much more electrophilic (strong partial positive charge). Protonation is fast and reversible. Without acid, the alcohol (a weak nucleophile) would react too slowly with the unactivated carbonyl.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'c', element: 'C', x: 360, y: 150, highlight: 'attack' },
          { id: 'o', element: 'O', x: 360, y: 260, highlight: 'attack' },
          { id: 'r1', element: 'R', x: 255, y: 110, highlight: 'none' },
          { id: 'r2', element: 'H', x: 465, y: 110, highlight: 'none' },
          { id: 'h', element: 'H⁺', x: 500, y: 275, highlight: 'attack' },
          { id: 'oh', element: 'OH⁺', x: 360, y: 270, highlight: 'forming' },
        ],
        bonds: [
          { id: 'b-co', fromAtomId: 'c', toAtomId: 'o', order: 2 },
          { id: 'b-cr1', fromAtomId: 'c', toAtomId: 'r1', order: 1 },
          { id: 'b-cr2', fromAtomId: 'c', toAtomId: 'r2', order: 1 },
        ],
        arrows: [
          { id: 'arr-h', fromX: 480, fromY: 268, toX: 415, toY: 268, controlX: 448, controlY: 255, arrowType: 'full', color: '#dc2626' },
        ],
        labels: [
          { id: 'lbl-prot', x: 200, y: 40, text: 'Step 1: H⁺ protonates carbonyl O → oxocarbenium ion', color: '#dc2626', fontSize: 15 },
          { id: 'lbl-elec', x: 380, y: 130, text: 'δ+', color: '#dc2626', fontSize: 15 },
          { id: 'lbl-cat', x: 150, y: 250, text: 'Acid catalyst activates\ncarbonyl for weak Nu', color: '#ca8a04', fontSize: 13 },
          { id: 'lbl-rev', x: 540, y: 180, text: 'Reversible\n(fast)', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 268, text: 'RCHO + H⁺ → RCH=OH⁺ (protonated carbonyl, much more electrophilic)', color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Acid catalyst (H+ or Lewis acid) protonates the carbonyl oxygen',
        'Protonated carbonyl (oxocarbenium ion) is highly electrophilic',
        'Alcohol is a weak nucleophile — needs carbonyl activation',
        'Step is fast and reversible',
        'No reaction occurs in absence of acid (alcohol + aldehyde = no reaction without acid)',
      ],
    },
    {
      stepNumber: 2,
      title: 'Nucleophilic Addition of Alcohol → Hemiacetal',
      explanation:
        'The oxygen lone pair of the alcohol (R\'OH) attacks the activated carbonyl carbon. The protonated oxocarbenium ion reacts readily with the alcohol nucleophile. Bond formation gives a tetrahedral intermediate (protonated hemiacetal). Loss of a proton to the solvent (or another alcohol molecule) gives the hemiacetal (R-CH(OH)-OR\'). The hemiacetal has an -OH and -OR\' on the same carbon.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'c', element: 'C', x: 360, y: 140, highlight: 'none' },
          { id: 'oh', element: 'OH', x: 360, y: 240, highlight: 'none' },
          { id: 'r1', element: 'R', x: 255, y: 100, highlight: 'none' },
          { id: 'r2', element: 'H', x: 465, y: 100, highlight: 'none' },
          { id: 'or', element: "O-R'", x: 260, y: 200, highlight: 'forming' },
          { id: 'roh', element: "R'OH", x: 130, y: 220, highlight: 'attack' },
        ],
        bonds: [
          { id: 'b-cr1', fromAtomId: 'c', toAtomId: 'r1', order: 1 },
          { id: 'b-cr2', fromAtomId: 'c', toAtomId: 'r2', order: 1 },
          { id: 'b-coh', fromAtomId: 'c', toAtomId: 'oh', order: 1 },
          { id: 'b-cor', fromAtomId: 'c', toAtomId: 'or', order: 1, isForming: true },
        ],
        arrows: [
          { id: 'arr-roh', fromX: 190, fromY: 218, toX: 310, toY: 175, controlX: 240, controlY: 190, arrowType: 'full', color: '#2563eb' },
        ],
        labels: [
          { id: 'lbl-nu', x: 100, y: 200, text: "R'OH\n(nucleophile)", color: '#2563eb', fontSize: 14 },
          { id: 'lbl-hemi', x: 440, y: 40, text: 'Hemiacetal', color: '#16a34a', fontSize: 15 },
          { id: 'lbl-hemi2', x: 390, y: 140, text: 'OH and OR\non same C', color: '#16a34a', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 268, text: "Step 2: R'OH attacks protonated carbonyl → hemiacetal (R-CH(OH)(OR'))", color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Alcohol oxygen (lone pair) attacks the electrophilic carbonyl carbon',
        'Tetrahedral intermediate forms (hemiorthoester-like)',
        'After proton transfer: hemiacetal = C with both -OH and -OR\'',
        'Hemiacetal formation is reversible — equilibrium often favors starting materials',
        'For acetal formation, need to drive equilibrium (excess alcohol, remove H2O)',
      ],
    },
    {
      stepNumber: 3,
      title: 'Hemiacetal → Oxocarbenium Ion (Loss of Water)',
      explanation:
        'The hemiacetal OH is protonated by the acid catalyst to give a good leaving group (H2O). Water departs, generating an oxocarbenium ion (resonance-stabilized carbocation with C=O+R\' character). This is a key intermediate — it is an electrophilic species that will be attacked by the second alcohol molecule. The oxocarbenium ion is much more stable than a simple carbocation because the oxygen donates electron density by resonance.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'c', element: 'C', x: 380, y: 140, highlight: 'attack' },
          { id: 'or', element: "OR'", x: 280, y: 200, highlight: 'none' },
          { id: 'r1', element: 'R', x: 275, y: 95, highlight: 'none' },
          { id: 'r2', element: 'H', x: 485, y: 95, highlight: 'none' },
          { id: 'h2o', element: 'H₂O', x: 540, y: 200, highlight: 'leaving' },
          { id: 'pos', element: '+', x: 410, y: 110, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-cor', fromAtomId: 'c', toAtomId: 'or', order: 2 },
          { id: 'b-cr1', fromAtomId: 'c', toAtomId: 'r1', order: 1 },
          { id: 'b-cr2', fromAtomId: 'c', toAtomId: 'r2', order: 1 },
        ],
        arrows: [
          { id: 'arr-water', fromX: 440, fromY: 165, toX: 510, toY: 195, controlX: 475, controlY: 175, arrowType: 'full', color: '#dc2626' },
        ],
        labels: [
          { id: 'lbl-oxo', x: 200, y: 40, text: 'Oxocarbenium Ion (resonance stabilized)', color: '#dc2626', fontSize: 15 },
          { id: 'lbl-res', x: 220, y: 220, text: "C⁺—OR' ↔ C=O⁺R'", color: '#9333ea', fontSize: 13 },
          { id: 'lbl-h2o', x: 520, y: 180, text: 'H₂O lost\n(good LG)', color: '#dc2626', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 268, text: "Step 3: -OH of hemiacetal protonated → H₂O leaves → oxocarbenium ion C=O⁺R'", color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Protonation of hemiacetal -OH converts it to a good leaving group',
        'Water departs → oxocarbenium ion (C=O+-R\')',
        'Oxocarbenium ion is electrophilic — resonance with O stabilizes the cation',
        'This intermediate is key: it explains why acid is required for both steps',
        'The driving force is loss of stable H2O molecule',
      ],
    },
    {
      stepNumber: 4,
      title: 'Second Alcohol Addition + Deprotonation → Acetal',
      explanation:
        'A second alcohol molecule (R\'OH) attacks the oxocarbenium ion carbon. This gives a protonated acetal, which loses a proton to give the neutral acetal (R-CH(OR\')2). The acetal has TWO -OR\' groups on the same carbon (no more -OH). Acetals are stable to basic conditions and nucleophiles. They are hydrolyzed back to the carbonyl under acidic aqueous conditions. This stability makes acetals excellent protecting groups for aldehydes and ketones in multi-step synthesis.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'c', element: 'C', x: 370, y: 140, highlight: 'none' },
          { id: 'or1', element: "OR'", x: 270, y: 200, highlight: 'none' },
          { id: 'or2', element: "OR'", x: 470, y: 200, highlight: 'forming' },
          { id: 'r1', element: 'R', x: 265, y: 95, highlight: 'none' },
          { id: 'r2', element: 'H', x: 475, y: 95, highlight: 'none' },
          { id: 'roh2', element: "R'OH", x: 600, y: 180, highlight: 'attack' },
        ],
        bonds: [
          { id: 'b-cr1', fromAtomId: 'c', toAtomId: 'r1', order: 1 },
          { id: 'b-cr2', fromAtomId: 'c', toAtomId: 'r2', order: 1 },
          { id: 'b-cor1', fromAtomId: 'c', toAtomId: 'or1', order: 1 },
          { id: 'b-cor2', fromAtomId: 'c', toAtomId: 'or2', order: 1, isForming: true },
        ],
        arrows: [
          { id: 'arr-roh2', fromX: 575, fromY: 178, toX: 460, toY: 170, controlX: 520, controlY: 158, arrowType: 'full', color: '#2563eb' },
        ],
        labels: [
          { id: 'lbl-acetal', x: 220, y: 40, text: "Acetal: R-CH(OR')₂", color: '#16a34a', fontSize: 16 },
          { id: 'lbl-stable', x: 150, y: 250, text: 'Stable to base & Nu⁻\nHydrolyzed by H⁺/H₂O', color: '#16a34a', fontSize: 13 },
          { id: 'lbl-prot', x: 470, y: 250, text: 'Protecting group\nfor C=O', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 268, text: "Step 4: 2nd R'OH attacks oxocarbenium → deprotonate → acetal R-CH(OR')₂ (stable)", color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Second alcohol attacks oxocarbenium ion → protonated acetal → deprotonate → acetal',
        "Acetal = C with two -OR' groups (no -OH)",
        'Stable to base, nucleophiles, and oxidants (unlike carbonyl)',
        'Hydrolyzed back to carbonyl under acidic aqueous conditions (reversible)',
        'Used as carbonyl protecting groups in synthesis: install in neutral/acidic, remove with H3O+',
      ],
    },
  ],
};
