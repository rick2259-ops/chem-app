import { Mechanism } from '@/types/mechanism';

export const grignardMechanism: Mechanism = {
  id: 'grignard',
  name: 'Grignard Reaction (RMgBr + Ketone → Tertiary Alcohol)',
  courseId: 'CHEM008B',
  topicId: 'carbonyl-reactions',
  reactionType: 'carbonyl',
  overview:
    'The Grignard reaction is a powerful carbon–carbon bond-forming reaction in which an organomagnesium halide (RMgBr, a Grignard reagent) acts as a carbanion nucleophile and attacks the electrophilic carbonyl carbon of a ketone (or aldehyde, ester, etc.). The magnesium coordinates with the carbonyl oxygen, activating the carbonyl while the R group attacks. This produces a magnesium alkoxide tetrahedral intermediate, which is then protonated during acidic workup (H₃O⁺) to give the final alcohol product. When a Grignard reagent attacks a ketone, the product is always a tertiary alcohol. Grignard reagents must be prepared and used in anhydrous, aprotic conditions (typically dry diethyl ether or THF) because they react violently with water and protic solvents.',
  steps: [
    {
      stepNumber: 1,
      title: 'Grignard Reagent Attacks Carbonyl Carbon',
      explanation:
        'The Grignard reagent (RMgBr) acts as a source of a carbanion nucleophile. The R group bears significant negative charge because magnesium is much less electronegative than carbon, making the C–Mg bond highly polarized (Cδ⁻–Mgδ⁺). The electron-rich R group attacks the electrophilic carbonyl carbon (Cδ⁺) of the ketone. Simultaneously, the C=O π bond begins to break, shifting electron density toward oxygen. The magnesium coordinates with the developing negative charge on oxygen, acting as a Lewis acid that stabilizes the transition state. At this stage the R–Mg bond is breaking as the R–C(carbonyl) bond begins to form.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'r_grign', element: 'R', x: 100, y: 150, highlight: 'attack' },
          { id: 'mg', element: 'Mg', x: 170, y: 150, highlight: 'none' },
          { id: 'br', element: 'Br', x: 230, y: 150, highlight: 'none' },
          { id: 'c_carbonyl', element: 'C', x: 450, y: 150, highlight: 'none' },
          { id: 'o_carb', element: 'O', x: 560, y: 80, highlight: 'none', lonePairs: 2 },
          { id: 'ch3_a', element: 'CH₃', x: 370, y: 230, highlight: 'none' },
          { id: 'ch3_b', element: 'CH₃', x: 530, y: 230, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-r-mg', fromAtomId: 'r_grign', toAtomId: 'mg', order: 1, isBreaking: true },
          { id: 'b-mg-br', fromAtomId: 'mg', toAtomId: 'br', order: 1 },
          { id: 'b-c-o', fromAtomId: 'c_carbonyl', toAtomId: 'o_carb', order: 2, isBreaking: true },
          { id: 'b-c-ch3a', fromAtomId: 'c_carbonyl', toAtomId: 'ch3_a', order: 1 },
          { id: 'b-c-ch3b', fromAtomId: 'c_carbonyl', toAtomId: 'ch3_b', order: 1 },
        ],
        arrows: [
          {
            id: 'arr-r-attack',
            fromX: 120,
            fromY: 148,
            toX: 390,
            toY: 150,
            controlX: 260,
            controlY: 120,
            arrowType: 'full',
            color: '#2563eb',
          },
          {
            id: 'arr-co-break',
            fromX: 490,
            fromY: 148,
            toX: 555,
            toY: 100,
            controlX: 540,
            controlY: 130,
            arrowType: 'full',
            color: '#dc2626',
          },
        ],
        labels: [
          { id: 'lbl-rmgbr', x: 80, y: 120, text: 'RMgBr (Grignard)', color: '#2563eb', fontSize: 13 },
          { id: 'lbl-carbanion', x: 62, y: 175, text: 'R = carbanion (Cδ⁻)', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-ketone', x: 410, y: 120, text: 'δ+', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-odel', x: 550, y: 60, text: 'δ−', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 1: R⁻ attacks electrophilic carbonyl carbon; C=O π bond breaks toward O', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'The C–Mg bond is highly polarized (Cδ⁻–Mgδ⁺), making R act as a carbanion nucleophile',
        'The carbonyl carbon is electrophilic (Cδ⁺) due to the electronegative oxygen withdrawing electron density',
        'Grignard reagents must be used in anhydrous conditions — water destroys them instantly (RMgBr + H₂O → RH + Mg(OH)Br)',
        'Typical solvents: dry diethyl ether (Et₂O) or dry THF — these stabilize the Grignard via coordination to Mg',
        'This step forms a new C–C bond, which is the synthetic power of the Grignard reaction',
      ],
    },
    {
      stepNumber: 2,
      title: 'Tetrahedral Alkoxide Intermediate',
      explanation:
        'After the nucleophilic attack, the carbonyl carbon has been converted from sp² (trigonal planar, 3 groups) to sp³ (tetrahedral, 4 groups). The C=O double bond has fully broken to become a single C–O bond, and oxygen now bears a formal negative charge (alkoxide, O⁻), stabilized by coordination to the magnesium cation (forming O–MgBr). The new R–C bond is fully formed. The four groups on the central carbon are: R (newly added), two CH₃ groups (from the original ketone), and O⁻MgBr. This magnesium alkoxide intermediate is the product before aqueous workup.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'r_prod', element: 'R', x: 200, y: 150, highlight: 'none' },
          { id: 'c_central', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'o_mgbr', element: 'OMgBr', x: 510, y: 75, highlight: 'forming', formalCharge: -1 },
          { id: 'ch3_a', element: 'CH₃', x: 330, y: 235, highlight: 'none' },
          { id: 'ch3_b', element: 'CH₃', x: 470, y: 235, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-r-c', fromAtomId: 'r_prod', toAtomId: 'c_central', order: 1, isForming: true },
          { id: 'b-c-omgbr', fromAtomId: 'c_central', toAtomId: 'o_mgbr', order: 1 },
          { id: 'b-c-ch3a', fromAtomId: 'c_central', toAtomId: 'ch3_a', order: 1 },
          { id: 'b-c-ch3b', fromAtomId: 'c_central', toAtomId: 'ch3_b', order: 1 },
        ],
        arrows: [],
        labels: [
          { id: 'lbl-intermediate', x: 280, y: 30, text: 'Magnesium Alkoxide Intermediate', color: '#16a34a', fontSize: 15 },
          { id: 'lbl-sp3', x: 400, y: 120, text: 'sp³', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-omgbr', x: 520, y: 55, text: '(Mg²⁺ stabilizes O⁻)', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-newbond', x: 230, y: 125, text: 'new C–C bond', color: '#16a34a', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 2: C is now sp³; R–C bond formed; O⁻ stabilized by Mg²⁺ coordination', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'The carbonyl carbon rehybridizes from sp² to sp³ upon nucleophilic attack',
        'The C–O bond is now a single bond; oxygen bears a formal negative charge (alkoxide)',
        'Magnesium coordinates with the alkoxide oxygen, forming a Mg–O bond that stabilizes the intermediate',
        'Four different groups on the central carbon may create a new chiral center',
        'This tetrahedral intermediate is stable and persists until aqueous acidic workup is performed',
      ],
    },
    {
      stepNumber: 3,
      title: 'Acidic Workup (H₃O⁺) → Tertiary Alcohol Product',
      explanation:
        'In the workup step, dilute aqueous acid (typically dilute HCl or NH₄Cl solution) is added to the reaction mixture. The proton (H⁺) protonates the alkoxide oxygen (O⁻MgBr), converting it to a hydroxyl group (–OH). Magnesium is released as a soluble salt (Mg²⁺ or Mg(OH)Br). The final product is a tertiary alcohol because the carbon bearing –OH is attached to three carbon substituents (R, CH₃, CH₃). The reaction summary: ketone + RMgBr → (1) Et₂O, then (2) H₃O⁺ → tertiary alcohol.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'r_final', element: 'R', x: 200, y: 150, highlight: 'none' },
          { id: 'c_final', element: 'C', x: 400, y: 150, highlight: 'none' },
          { id: 'oh', element: 'OH', x: 510, y: 75, highlight: 'none' },
          { id: 'ch3_a', element: 'CH₃', x: 330, y: 235, highlight: 'none' },
          { id: 'ch3_b', element: 'CH₃', x: 470, y: 235, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-r-c', fromAtomId: 'r_final', toAtomId: 'c_final', order: 1 },
          { id: 'b-c-oh', fromAtomId: 'c_final', toAtomId: 'oh', order: 1 },
          { id: 'b-c-ch3a', fromAtomId: 'c_final', toAtomId: 'ch3_a', order: 1 },
          { id: 'b-c-ch3b', fromAtomId: 'c_final', toAtomId: 'ch3_b', order: 1 },
        ],
        arrows: [],
        labels: [
          { id: 'lbl-product', x: 270, y: 30, text: 'Tertiary Alcohol Product', color: '#16a34a', fontSize: 16 },
          { id: 'lbl-workup', x: 570, y: 60, text: 'H₃O⁺ workup', color: '#9333ea', fontSize: 13 },
          { id: 'lbl-tert', x: 355, y: 118, text: '3°', color: '#dc2626', fontSize: 14 },
          { id: 'lbl-mgout', x: 570, y: 90, text: '+ MgBr⁺ released', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 280, text: 'Step 3: H₃O⁺ protonates O⁻ → OH; Mg²⁺ released; tertiary alcohol formed', color: '#374151', fontSize: 13 },
        ],
      },
      keyPoints: [
        'Acidic workup (dilute HCl or NH₄Cl) protonates the alkoxide to give the final alcohol',
        'Grignard + ketone always gives a tertiary alcohol (C bearing –OH has 3 C substituents)',
        'Grignard + aldehyde gives a secondary alcohol; Grignard + formaldehyde gives a primary alcohol',
        'Grignard + ester (2 equiv RMgBr) or CO₂ (then H₃O⁺) gives other useful products',
        'The overall reaction forms one new C–C bond per equivalent of Grignard — a key disconnection in retrosynthesis',
      ],
    },
  ],
};
