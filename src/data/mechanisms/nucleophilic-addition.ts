import { Mechanism } from '@/types/mechanism';

export const nucleophilicAdditionMechanism: Mechanism = {
  id: 'nucleophilic-addition',
  name: 'Nucleophilic Addition to Carbonyl (NaBH₄ Reduction)',
  courseId: 'CHEM008B',
  topicId: 'carbonyl-reactions',
  reactionType: 'carbonyl',
  overview:
    'Nucleophilic addition to a carbonyl group is a fundamental reaction in organic chemistry. In NaBH₄ (sodium borohydride) reduction, the hydride ion (H⁻) acts as a nucleophile and attacks the electrophilic carbonyl carbon of an aldehyde or ketone. The π electrons of the C=O bond shift onto oxygen, forming an alkoxide intermediate, which is subsequently protonated by the protic solvent (MeOH or H₂O) to yield the alcohol product. NaBH₄ is a mild, selective reducing agent that reduces aldehydes and ketones but generally does not reduce esters, amides, or carboxylic acids under normal conditions. The reaction proceeds through a two-step sequence: (1) hydride delivery to carbonyl carbon, and (2) protonation of alkoxide by solvent.',
  steps: [
    {
      stepNumber: 1,
      title: 'Hydride Attacks Electrophilic Carbonyl Carbon',
      explanation:
        'NaBH₄ delivers a hydride ion (H⁻) to the electrophilic carbonyl carbon. The boron in BH₄⁻ is electron-rich, and the B–H bond acts as a source of two electrons (hydride). The hydride attacks the carbonyl carbon from the face of the molecule (no strict stereochemical requirement for achiral carbonyls). As H⁻ forms a new bond with carbon, the C=O π bond breaks, and both electrons of the π bond shift entirely onto oxygen, generating an alkoxide (O⁻). The carbonyl carbon rehybridizes from sp² (trigonal planar) to sp³ (tetrahedral). This is a concerted hydride transfer: H⁻ attacks C as the C=O π bond breaks.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'h_nuc', element: 'H⁻', x: 100, y: 150, highlight: 'attack', lonePairs: 1 },
          { id: 'c_carbonyl', element: 'C', x: 350, y: 150, highlight: 'none' },
          { id: 'o_carb', element: 'O', x: 470, y: 80, highlight: 'none', lonePairs: 2 },
          { id: 'r1', element: 'R₁', x: 270, y: 230, highlight: 'none' },
          { id: 'r2', element: 'R₂', x: 430, y: 230, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-c-o', fromAtomId: 'c_carbonyl', toAtomId: 'o_carb', order: 2, isBreaking: true },
          { id: 'b-c-r1', fromAtomId: 'c_carbonyl', toAtomId: 'r1', order: 1 },
          { id: 'b-c-r2', fromAtomId: 'c_carbonyl', toAtomId: 'r2', order: 1 },
        ],
        arrows: [
          {
            id: 'arr-h-attack',
            fromX: 130,
            fromY: 148,
            toX: 295,
            toY: 150,
            controlX: 215,
            controlY: 120,
            arrowType: 'full',
            color: '#2563eb',
          },
          {
            id: 'arr-co-break',
            fromX: 390,
            fromY: 145,
            toX: 462,
            toY: 100,
            controlX: 445,
            controlY: 128,
            arrowType: 'full',
            color: '#dc2626',
          },
        ],
        labels: [
          { id: 'lbl-nabh4', x: 60, y: 120, text: 'H⁻ (from NaBH₄)', color: '#2563eb', fontSize: 13 },
          { id: 'lbl-electrophile', x: 315, y: 118, text: 'δ+', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-o-del', x: 460, y: 60, text: 'δ−', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-sp2', x: 340, y: 225, text: 'sp² C', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 1: H⁻ from NaBH₄ attacks Cδ⁺; C=O π bond breaks; electrons shift to O', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'NaBH₄ delivers H⁻ (hydride) as the nucleophile — boron bears the negative charge formally',
        'The carbonyl carbon is electrophilic (Cδ⁺) due to C=O polarization toward oxygen',
        'Two electrons from the C=O π bond shift entirely onto oxygen, forming alkoxide (O⁻)',
        'Carbonyl carbon rehybridizes from sp² (planar, 3 groups) to sp³ (tetrahedral, 4 groups)',
        'NaBH₄ is selective: reduces aldehydes and ketones but typically not esters or amides',
      ],
    },
    {
      stepNumber: 2,
      title: 'Alkoxide Intermediate',
      explanation:
        'After hydride delivery, the alkoxide intermediate has formed. The carbon that was originally the carbonyl carbon is now sp³ hybridized and bears four substituents: H (newly added), R₁, R₂, and O⁻ (alkoxide). The boron-containing fragment (BH₃) is released or continues to deliver more hydrides to other carbonyl molecules. The alkoxide oxygen carries a formal negative charge (O⁻) and is a strong base. The negative charge makes O⁻ highly reactive toward electrophiles — in particular, the proton available from the protic solvent in the next step. The geometry around carbon is tetrahedral; if R₁ ≠ R₂, a new chiral center has been created (though NaBH₄ without chiral additives gives a racemic mixture).',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'h_prod', element: 'H', x: 200, y: 150, highlight: 'none' },
          { id: 'c_central', element: 'C', x: 380, y: 150, highlight: 'none' },
          { id: 'o_anion', element: 'O⁻', x: 480, y: 80, highlight: 'forming', lonePairs: 3, formalCharge: -1 },
          { id: 'r1', element: 'R₁', x: 305, y: 230, highlight: 'none' },
          { id: 'r2', element: 'R₂', x: 455, y: 230, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-h-c', fromAtomId: 'h_prod', toAtomId: 'c_central', order: 1, isForming: true },
          { id: 'b-c-o', fromAtomId: 'c_central', toAtomId: 'o_anion', order: 1 },
          { id: 'b-c-r1', fromAtomId: 'c_central', toAtomId: 'r1', order: 1 },
          { id: 'b-c-r2', fromAtomId: 'c_central', toAtomId: 'r2', order: 1 },
        ],
        arrows: [],
        labels: [
          { id: 'lbl-intermediate', x: 270, y: 30, text: 'Alkoxide Intermediate', color: '#16a34a', fontSize: 15 },
          { id: 'lbl-sp3', x: 370, y: 118, text: 'sp³', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-charge', x: 490, y: 60, text: 'O⁻ (strong base)', color: '#dc2626', fontSize: 13 },
          { id: 'lbl-newbond', x: 218, y: 125, text: 'new C–H', color: '#16a34a', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 2: Alkoxide intermediate — C is sp³; H–C bond formed; O bears negative charge', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'The alkoxide (O⁻) is a strong base and nucleophile, reactive toward electrophiles such as protons',
        'The central carbon is now sp³; if R₁ ≠ R₂, a new stereocentre is created',
        'Achiral NaBH₄ delivers hydride from both faces equally, giving a racemic mixture at the new chiral center',
        'BH₃ (released after each H⁻ delivery) can still act as Lewis acid toward the alkoxide — hence boron-oxygen ate complexes can form',
        'The alkoxide persists until protic solvent is present to protonate it',
      ],
    },
    {
      stepNumber: 3,
      title: 'Protonation by Protic Solvent → Alcohol Product',
      explanation:
        'The alkoxide intermediate is protonated by the protic solvent (MeOH, EtOH, or H₂O) that is used either as co-solvent or added during aqueous workup. The lone pair on O⁻ abstracts a proton (H⁺) from the solvent, converting –O⁻ to –OH. This step is simply an acid-base reaction: the alkoxide (pKa ~16–18) is a stronger base than MeO⁻ (pKa ~15.5), so protonation is favorable. The final product is an alcohol. For an aldehyde substrate, a primary alcohol is produced; for a ketone substrate, a secondary alcohol is produced. This protonation step is fast and occurs spontaneously in protic solvent.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'h_solv', element: 'H⁺', x: 580, y: 80, highlight: 'attack' },
          { id: 'h_prod', element: 'H', x: 200, y: 150, highlight: 'none' },
          { id: 'c_final', element: 'C', x: 380, y: 150, highlight: 'none' },
          { id: 'oh', element: 'OH', x: 480, y: 80, highlight: 'none' },
          { id: 'r1', element: 'R₁', x: 305, y: 230, highlight: 'none' },
          { id: 'r2', element: 'R₂', x: 455, y: 230, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-h-c', fromAtomId: 'h_prod', toAtomId: 'c_final', order: 1 },
          { id: 'b-c-oh', fromAtomId: 'c_final', toAtomId: 'oh', order: 1 },
          { id: 'b-c-r1', fromAtomId: 'c_final', toAtomId: 'r1', order: 1 },
          { id: 'b-c-r2', fromAtomId: 'c_final', toAtomId: 'r2', order: 1 },
        ],
        arrows: [
          {
            id: 'arr-proton',
            fromX: 562,
            fromY: 82,
            toX: 510,
            toY: 82,
            controlX: 535,
            controlY: 65,
            arrowType: 'full',
            color: '#2563eb',
          },
        ],
        labels: [
          { id: 'lbl-product', x: 270, y: 30, text: 'Alcohol Product', color: '#16a34a', fontSize: 16 },
          { id: 'lbl-solvent', x: 555, y: 60, text: 'from MeOH/H₂O', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-2alcohol', x: 350, y: 118, text: '2° alcohol (from ketone)', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 3: Protic solvent protonates O⁻ → OH; alcohol product formed', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'Protonation of alkoxide by protic solvent (MeOH or H₂O) is a simple acid-base step',
        'Aldehyde + NaBH₄ → primary alcohol; ketone + NaBH₄ → secondary alcohol',
        'NaBH₄ is a mild reducing agent — safe to use in MeOH or EtOH solvent',
        'LiAlH₄ (LAH) is a stronger hydride source that also reduces esters, acids, and amides',
        'The net transformation is: C=O + H₂ → C–OH (formal addition of H₂ across the C=O bond)',
      ],
    },
  ],
};
