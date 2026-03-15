import { Mechanism } from '@/types/mechanism';

export const sn2Mechanism: Mechanism = {
  id: 'sn2',
  name: 'SN2 Nucleophilic Substitution',
  courseId: 'CHEM008A',
  topicId: 'sn1-sn2',
  reactionType: 'nucleophilic-substitution',
  overview:
    'SN2 (Substitution Nucleophilic Bimolecular) is a concerted, one-step mechanism where the nucleophile attacks the backside of the electrophilic carbon simultaneously with the departure of the leaving group. The result is inversion of stereochemistry (Walden inversion). Rate depends on both nucleophile and substrate concentration. Favored by primary substrates, strong nucleophiles, polar aprotic solvents.',
  steps: [
    {
      stepNumber: 1,
      title: 'Starting Materials: Nucleophile Approaches',
      explanation:
        'The nucleophile (Nu⁻, here :Br⁻ acting as nucleophile) approaches the electrophilic carbon from the backside — 180° opposite to the leaving group (Cl). The carbon bears four substituents in a tetrahedral arrangement. The C-Cl bond is polarized (C⁺δ–Cl⁻δ), making carbon electrophilic. At this stage, no bonds have formed or broken yet.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'nu', element: 'Nu', x: 80, y: 150, highlight: 'attack', lonePairs: 1 },
          { id: 'c1', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'h1', element: 'H', x: 370, y: 90, highlight: 'none' },
          { id: 'h2', element: 'H', x: 430, y: 90, highlight: 'none' },
          { id: 'ch3', element: 'CH₃', x: 400, y: 220, highlight: 'none' },
          { id: 'lg', element: 'Cl', x: 620, y: 150, highlight: 'leaving' },
        ],
        bonds: [
          { id: 'b-c-h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c-h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c-ch3', fromAtomId: 'c1', toAtomId: 'ch3', order: 1 },
          { id: 'b-c-lg', fromAtomId: 'c1', toAtomId: 'lg', order: 1, isBreaking: true },
        ],
        arrows: [
          {
            id: 'arr-approach',
            fromX: 130,
            fromY: 150,
            toX: 340,
            toY: 150,
            controlX: 230,
            controlY: 130,
            arrowType: 'full',
            color: '#2563eb',
          },
        ],
        labels: [
          { id: 'lbl-nu', x: 60, y: 130, text: 'Nu⁻', color: '#2563eb', fontSize: 16 },
          { id: 'lbl-backside', x: 200, y: 110, text: 'backside attack (180°)', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-polar', x: 490, y: 130, text: 'δ+  δ−', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 1: Nu⁻ approaches from backside', color: '#374151', fontSize: 14 },
        ],
      },
      keyPoints: [
        'Nucleophile approaches 180° opposite to leaving group',
        'C-Cl bond is polarized, making carbon electrophilic',
        'Steric accessibility at carbon is crucial — primary substrates react fastest',
        'Strong, unhindered nucleophiles (e.g., I⁻, CN⁻, RS⁻) react fastest',
      ],
    },
    {
      stepNumber: 2,
      title: 'Transition State: Pentacoordinate Carbon',
      explanation:
        'In the single transition state of SN2, the carbon is simultaneously bonded to both the incoming nucleophile and the departing leaving group. The three other substituents adopt a trigonal bipyramidal-like geometry, becoming planar (umbrella shape). This is the highest energy point. The C-Nu bond is partially formed (dashed) and the C-LG bond is partially broken (dashed). Formal negative charges are partially on both Nu and LG.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'nu', element: 'Nu', x: 100, y: 150, highlight: 'forming' },
          { id: 'c1', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'h1', element: 'H', x: 340, y: 80, highlight: 'none' },
          { id: 'h2', element: 'H', x: 460, y: 80, highlight: 'none' },
          { id: 'ch3', element: 'CH₃', x: 400, y: 240, highlight: 'none' },
          { id: 'lg', element: 'Cl', x: 700, y: 150, highlight: 'breaking' },
        ],
        bonds: [
          { id: 'b-nu-c', fromAtomId: 'nu', toAtomId: 'c1', order: 1, isForming: true },
          { id: 'b-c-h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c-h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c-ch3', fromAtomId: 'c1', toAtomId: 'ch3', order: 1 },
          { id: 'b-c-lg', fromAtomId: 'c1', toAtomId: 'lg', order: 1, isBreaking: true },
        ],
        arrows: [],
        labels: [
          { id: 'lbl-ts', x: 320, y: 30, text: '‡ Transition State', color: '#dc2626', fontSize: 16 },
          { id: 'lbl-planar', x: 300, y: 260, text: '← H, H, CH₃ in plane (trigonal planar) →', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-partial', x: 70, y: 180, text: 'δ−', color: '#dc2626', fontSize: 14 },
          { id: 'lbl-partial2', x: 680, y: 180, text: 'δ−', color: '#dc2626', fontSize: 14 },
          { id: 'lbl-brackets', x: 260, y: 155, text: '[', color: '#374151', fontSize: 40 },
          { id: 'lbl-brackets2', x: 520, y: 155, text: ']', color: '#374151', fontSize: 40 },
          { id: 'lbl-step', x: 30, y: 285, text: 'Step 2: Pentacoordinate TS — bonds simultaneously forming & breaking', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'Single concerted transition state — no intermediate formed',
        'Carbon is pentacoordinate at the transition state',
        'Three substituents are coplanar (trigonal bipyramidal geometry)',
        'Both C-Nu and C-LG bonds have partial bond character',
        'Rate law: rate = k[substrate][nucleophile] — bimolecular',
      ],
    },
    {
      stepNumber: 3,
      title: 'Bond Formation & Inversion',
      explanation:
        'As the nucleophile\'s lone pair forms a bond with the carbon, the leaving group\'s bond breaks. The three remaining substituents "flip" through the plane like an umbrella in the wind — inversion of configuration. The carbon goes from one tetrahedral arrangement to the inverted tetrahedral arrangement. The leaving group departs with the electron pair from the original C-LG bond.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'nu', element: 'Nu', x: 180, y: 150, highlight: 'forming' },
          { id: 'c1', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'h1', element: 'H', x: 460, y: 80, highlight: 'none' },
          { id: 'h2', element: 'H', x: 340, y: 80, highlight: 'none' },
          { id: 'ch3', element: 'CH₃', x: 400, y: 240, highlight: 'none' },
          { id: 'lg', element: 'Cl⁻', x: 650, y: 150, highlight: 'leaving' },
        ],
        bonds: [
          { id: 'b-nu-c', fromAtomId: 'nu', toAtomId: 'c1', order: 1 },
          { id: 'b-c-h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c-h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c-ch3', fromAtomId: 'c1', toAtomId: 'ch3', order: 1 },
        ],
        arrows: [
          {
            id: 'arr-lgeave',
            fromX: 480,
            fromY: 150,
            toX: 610,
            toY: 150,
            controlX: 550,
            controlY: 130,
            arrowType: 'full',
            color: '#dc2626',
          },
          {
            id: 'arr-inversion-top',
            fromX: 460,
            fromY: 100,
            toX: 340,
            toY: 100,
            controlX: 400,
            controlY: 70,
            arrowType: 'full',
            color: '#9333ea',
          },
        ],
        labels: [
          { id: 'lbl-inversion', x: 280, y: 55, text: 'Inversion (Walden)', color: '#9333ea', fontSize: 14 },
          { id: 'lbl-lgout', x: 620, y: 130, text: 'LG⁻ departs', color: '#dc2626', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 285, text: 'Step 3: Nu-C bond forms; C-LG breaks; substituents invert (umbrella flip)', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'C-Nu bond fully forms as C-LG bond fully breaks',
        'Stereochemistry is inverted at the carbon (Walden inversion)',
        'R configuration substrate → S product with same-priority nucleophile',
        'Leaving group departs as stable anion (Cl⁻, Br⁻, I⁻, TsO⁻)',
      ],
    },
    {
      stepNumber: 4,
      title: 'Product: Substituted with Inverted Configuration',
      explanation:
        'The product has the nucleophile in place of the leaving group, with inverted configuration at the carbon. For a chiral substrate, SN2 always gives 100% inversion (assuming a non-racemic starting material). The leaving group is now a stable anion in solution. The overall reaction is: R-LG + Nu⁻ → R-Nu + LG⁻, with stereochemical inversion.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'nu-prod', element: 'Nu', x: 200, y: 150, highlight: 'none' },
          { id: 'c1', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'h1', element: 'H', x: 470, y: 90, highlight: 'none' },
          { id: 'h2', element: 'H', x: 330, y: 90, highlight: 'none' },
          { id: 'ch3', element: 'CH₃', x: 400, y: 230, highlight: 'none' },
          { id: 'lg-prod', element: 'Cl⁻', x: 620, y: 150, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-nu-c', fromAtomId: 'nu-prod', toAtomId: 'c1', order: 1 },
          { id: 'b-c-h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c-h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c-ch3', fromAtomId: 'c1', toAtomId: 'ch3', order: 1 },
        ],
        arrows: [],
        labels: [
          { id: 'lbl-product', x: 300, y: 40, text: 'Product: Nu-R (inverted)', color: '#16a34a', fontSize: 16 },
          { id: 'lbl-plus', x: 550, y: 145, text: '+', color: '#374151', fontSize: 20 },
          { id: 'lbl-lganion', x: 590, y: 130, text: 'Cl⁻ (free anion)', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-summary', x: 30, y: 265, text: 'SN2 Summary: 1° > 2° >> 3° substrate; strong Nu; polar aprotic solvent; 100% inversion', color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Product has nucleophile attached with inverted stereochemistry',
        'Overall reaction: R-LG + Nu⁻ → R-Nu + LG⁻',
        'Best substrates: methyl > primary > secondary (tertiary = no reaction via SN2)',
        'Best nucleophiles: I⁻ > Br⁻ > Cl⁻ > F⁻; RS⁻ > RO⁻; CN⁻; N3⁻',
        'Best solvents: polar aprotic (DMSO, acetone, DMF) — do not solvate nucleophile',
      ],
    },
  ],
};
