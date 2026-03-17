import { Flashcard, Deck } from '@/types/flashcard';

export const alkyneCards: Flashcard[] = [
  {
    id: 'alk-001',
    deckId: 'alkynes',
    category: 'functional-group',
    front: { text: 'What is the hybridization and geometry of a carbon in a triple bond (alkyne)?', formula: 'R-C≡C-R' },
    back: {
      text: 'sp hybridized. Each alkyne carbon forms 2 sigma bonds (one to the other alkyne C, one to a substituent) and has 2 p-orbitals that form 2 pi bonds (one pi bond in each perpendicular plane). Geometry: linear (180° bond angle). The two pi bonds are perpendicular to each other and to the C-C sigma bond axis.',
      formula: 'sp carbon: 2σ + 2π, linear 180°',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-002',
    deckId: 'alkynes',
    category: 'functional-group',
    front: { text: 'Why are terminal alkyne C-H bonds more acidic (pKa ~25) than alkene C-H (pKa ~44) or alkane C-H (pKa ~50)?' },
    back: {
      text: 'Acidity depends on the stability of the conjugate base (carbanion). sp carbon is more electronegative than sp2 or sp3 because it has higher s-character (50% s for sp vs 33% for sp2 vs 25% for sp3). Higher s-character = electrons held closer to nucleus = carbanion more stable. Therefore sp C-H is more acidic: pKa ~25 (alkyne) < 44 (alkene) < 50 (alkane).',
      formula: 'pKa: terminal alkyne ~25 < alkene ~44 < alkane ~50',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-003',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What strong bases deprotonate terminal alkynes to give acetylide anions?' },
    back: {
      text: 'Terminal alkynes (pKa ~25) can be deprotonated by bases stronger than pKa ~25:\n1. NaNH2 (sodium amide) in liquid NH3 — pKa of NH3 = 38\n2. n-BuLi or sec-BuLi in THF — very strong bases\n3. NaH in THF (pKa of H2 = 35)\nProduct: RC≡C⁻ Na⁺ (sodium acetylide) — a strong nucleophile for SN2 alkylation.\nNOT deprotonated by: NaOH (pKa H2O = 15.7), NaOEt (pKa EtOH = 16)',
      formula: 'R-C≡C-H + NaNH2 → R-C≡C⁻Na⁺ + NH3',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-004',
    deckId: 'alkynes',
    category: 'named-reaction',
    front: { text: 'How do you use an acetylide anion to extend a carbon chain (alkylation)?' },
    back: {
      text: 'Acetylide anions (RC≡C⁻) are strong nucleophiles that do SN2 on primary alkyl halides:\nRC≡C⁻ + R\'CH2-X → RC≡C-CH2R\' (new C-C bond)\nLimitations: SN2 only → primary or methyl halides; secondary/tertiary substrates give E2 instead.\nUse cases: build up carbon chain, synthesize internal alkynes from terminal alkynes.\nExample: HC≡C⁻Na⁺ + CH3CH2Br → HC≡C-CH2CH3 (1-butyne)',
      formula: 'RC≡C⁻ + R\'X (1°) → RC≡C-R\' + X⁻',
    },
    tags: ['addition', 'nucleophilic-substitution', 'CHEM008B'],
  },
  {
    id: 'alk-005',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is the product of adding 1 equivalent of HX to an alkyne?' },
    back: {
      text: 'Markovnikov addition of HX to an alkyne gives a vinyl halide (haloalkene):\nRC≡CH + HX → RCX=CH2 (Markovnikov: X adds to more substituted C)\nWith 2 equivalents HX: gives geminal dihalide RCX2-CH3\nNote: vinyl carbocation intermediate is less stable than a secondary carbocation, so HX addition to alkynes is slower than to alkenes. With HBr and peroxides (anti-Markovnikov radical addition): X adds to terminal carbon (less substituted).',
      formula: 'RC≡CH + HX → RCX=CH2 (1 eq, Markovnikov)',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-006',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What product forms when a terminal alkyne undergoes acid-catalyzed hydration (H2O/H2SO4/HgSO4)?' },
    back: {
      text: 'Markovnikov hydration of a terminal alkyne gives a methyl ketone (not an aldehyde):\nRC≡CH + H2O (H2SO4/HgSO4) → Markovnikov addition → vinyl alcohol (enol) intermediate → tautomerizes to ketone: RC(=O)CH3\nKeto-enol tautomerism: the enol is thermodynamically less stable; the ketone is the stable product.\nException: hydration of acetylene (HC≡CH) gives acetaldehyde (CH3CHO) — the only case where alkyne hydration gives an aldehyde (terminal addition gives formyl = aldehyde).',
      formula: 'RC≡CH + H2O/H⁺/HgSO4 → RCOCH3 (methyl ketone)',
    },
    tags: ['addition', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'alk-007',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is hydroboration-oxidation of an alkyne and what product does it give?' },
    back: {
      text: 'Hydroboration of a terminal alkyne with R2BH (bulky borane like disiamylborane) adds BH across the triple bond with anti-Markovnikov regioselectivity (B adds to terminal carbon). Oxidation (H2O2/NaOH) gives a vinyl alcohol (enol) that tautomerizes to an aldehyde:\nRC≡CH + (1) R2BH → (2) H2O2/NaOH → RCH2-CHO (aldehyde)\nThis is the complement to Hg-catalyzed hydration (which gives ketone from terminal alkynes).',
      formula: 'RC≡CH → (R2BH then H2O2/NaOH) → RCH2CHO (aldehyde)',
    },
    tags: ['addition', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-008',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is the product of adding Br2 (1 eq) to an alkyne, and what is the stereochemistry?' },
    back: {
      text: 'Anti addition of Br2 to an alkyne gives a trans (E) dibromoalkene:\nRC≡CR\' + Br2 → (E)-RCBr=CR\'Br (trans-dibromoalkene)\nMechanism: bromonium ion intermediate → Br⁻ attacks from back → anti addition. Two equivalents of Br2 give the tetrabromoalkane: RCBr2-CR\'Br2. The trans selectivity in the vinyl bromide is analogous to trans addition to alkenes — anti addition through the cyclic bromonium ion.',
      formula: 'RC≡CR\' + Br2 (1 eq) → trans-RCBr=CR\'Br',
    },
    tags: ['addition', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'alk-009',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'How do you reduce an alkyne to a cis (Z) alkene?' },
    back: {
      text: "Lindlar's catalyst: partial hydrogenation with H2 gas over Pd/CaCO3 poisoned with lead acetate (Lindlar's catalyst) or quinoline.\nRC≡CR' + H2 / Lindlar's cat. → cis (Z)-RCH=CHR'\nMechanism: both H atoms add to the same face of the alkyne (syn addition on the catalyst surface) → cis alkene.\nDo NOT use Pd/C or PtO2 (over-reduce to alkane). Lindlar's catalyst is selective for alkyne → alkene, stops there.",
      formula: "RC≡CR' + H2 / Lindlar's → (Z)-RCH=CHR' (cis)",
    },
    tags: ['addition', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'alk-010',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'How do you reduce an alkyne to a trans (E) alkene?' },
    back: {
      text: 'Dissolving metal reduction: Na (or Li) metal in liquid NH3 (Birch-type conditions for alkynes).\nRC≡CR\' + Na/NH3 (liq.) → trans (E)-RCH=CHR\'\nMechanism: single electron from Na adds to alkyne → vinyl radical anion → protonation by NH3 → vinyl radical → second electron from Na → vinyl carbanion → protonation by NH3 → trans alkene. The trans product forms because the carbanion prefers trans geometry (less steric strain in the intermediate).',
      formula: 'RC≡CR\' + Na/NH3(l) → (E)-RCH=CHR\' (trans)',
    },
    tags: ['addition', 'stereochemistry', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-011',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: "What does ozonolysis (O3, then Zn/H2O) do to an alkyne?" },
    back: {
      text: 'Ozonolysis of an alkyne cleaves the C≡C triple bond and oxidizes both carbons to carboxylic acids (or CO2 if terminal):\nRC≡CR\' + (1) O3 (2) H2O → RCOOH + R\'COOH\nFor terminal alkyne: RC≡CH → RCOOH + CO2 + H2O\nNote: alkyne ozonolysis gives carboxylic acids (not aldehydes/ketones as with alkenes) because the carbon is at a higher oxidation state in an alkyne.',
      formula: 'RC≡CR\' + O3/H2O → RCOOH + R\'COOH',
    },
    tags: ['addition', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-012',
    deckId: 'alkynes',
    category: 'named-reaction',
    front: { text: 'How do you prepare an alkyne from a geminal or vicinal dihalide?' },
    back: {
      text: 'Double dehydrohalogenation using a strong base (NaNH2 or KOH/alcohol):\n1. Geminal dihalide: RCHBr2 + 2 NaNH2 → RC≡CH + 2 NaBr + 2 NH3\n2. Vicinal dihalide: RCHBr-CH2Br + 2 NaNH2 → RC≡CH (proceeds via vinyl halide intermediate)\nTwo E2 eliminations occur sequentially. The first gives vinyl halide (alkenyl halide); the second gives the alkyne.\nNote: excess strong base needed (2 equivalents minimum).',
      formula: 'RCHBr2 + 2 NaNH2 → RC≡CH (double elimination)',
    },
    tags: ['addition', 'elimination', 'CHEM008B'],
  },
  {
    id: 'alk-013',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What product forms when HC≡CH reacts with NaNH2, then CH3CH2Br?' },
    back: {
      text: 'Step 1: HC≡CH + NaNH2 → HC≡C⁻Na⁺ + NH3 (deprotonation, pKa acetylene ~25 < pKa NH3 ~38)\nStep 2: HC≡C⁻ + CH3CH2Br → HC≡C-CH2CH3 (1-butyne, SN2 alkylation)\nThis is a carbon chain extension: 2-carbon acetylene → 4-carbon 1-butyne.\nNote: CH3CH2Br is primary — SN2 works. Would fail with secondary or tertiary halide (E2 instead).',
      formula: 'HC≡CH → NaNH2 → HC≡C⁻ → CH3CH2Br → HC≡C-Et (1-butyne)',
    },
    tags: ['addition', 'nucleophilic-substitution', 'CHEM008B'],
  },
  {
    id: 'alk-014',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'Compare alkyne hydration (Markovnikov) vs hydroboration-oxidation. What product does each give from a terminal alkyne?' },
    back: {
      text: 'From RC≡CH:\n\nHydration (H2O/H2SO4/HgSO4, Markovnikov):\n→ Enol (Markovnikov, OH on internal C) → tautomerizes → METHYL KETONE (RCOCH3)\n\nHydroboration-oxidation (R2BH, anti-Markovnikov, then H2O2/NaOH):\n→ Enol (anti-Markovnikov, OH on terminal C) → tautomerizes → ALDEHYDE (RCH2CHO)\n\nKey: both go through enol intermediates, but regioselectivity differs → different carbonyl products.',
      formula: 'Hg/H2O → ketone; HBR2/ox → aldehyde (from same terminal alkyne)',
    },
    tags: ['addition', 'carbonyl', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-015',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What happens when a terminal alkyne reacts with AgNO3 in ammonia solution?' },
    back: {
      text: 'Terminal alkynes (RC≡C-H, pKa ~25) react with Ag(NH3)2⁺ to form an insoluble silver acetylide precipitate:\nRC≡C-H + Ag(NH3)2NO3 → RC≡C-Ag↓ (white/cream precipitate) + NH4NO3 + NH3\nThis is a diagnostic test for terminal alkynes. Internal alkynes do NOT react (no acidic C-H). Also used with Cu(NH3)2⁺ (gives red copper acetylide). CAUTION: heavy metal acetylides are shock-sensitive explosives when dry.',
      formula: 'RC≡CH + Ag(NH3)2⁺ → RC≡CAg↓ (terminal alkyne test)',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-016',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is the product of complete catalytic hydrogenation of an alkyne (excess H2, Pt or Pd/C)?' },
    back: {
      text: 'Complete hydrogenation (excess H2 / Pt or Pd/C) reduces the alkyne all the way to an alkane:\nRC≡CR\' + 2 H2 (Pd/C) → RCH2-CH2R\' (alkane)\nThe alkene intermediate forms but is immediately hydrogenated further. To stop at the alkene stage, use Lindlar\'s catalyst (cis alkene) or Na/NH3 (trans alkene).\nComplete hydrogenation: one equivalent H2 → alkene; two equivalents → alkane.',
      formula: 'RC≡CR\' + 2H2 / Pd → RCH2CH2R\' (alkane)',
    },
    tags: ['addition', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-017',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What reagents convert a 1,2-dibromoalkane to an alkyne?' },
    back: {
      text: 'Two sequential E2 eliminations with strong base:\n1. RCHBr-CH2Br + NaNH2 (1 eq) → RCH=CHBr + NaBr + NH3 (vinyl bromide)\n2. RCH=CHBr + NaNH2 (1 eq) → RC≡CH + NaBr + NH3 (terminal alkyne)\nAlternatively: use 2 equivalents NaNH2 in one step or KOH at high temperature.\nThis is the retrosynthetic disconnection: alkyne ← dihalide ← alkene + Br2.',
      formula: 'RCHBr-CH2Br + 2 NaNH2 → RC≡CH + 2 NaBr + 2 NH3',
    },
    tags: ['addition', 'elimination', 'CHEM008B'],
  },
  {
    id: 'alk-018',
    deckId: 'alkynes',
    category: 'mechanism-step',
    front: { text: 'Keto-enol tautomerism: which form is more stable, and what catalyzes the interconversion?' },
    back: {
      text: 'The KETO form is thermodynamically more stable (lower energy) for simple carbonyl compounds. Typically >99% keto at equilibrium. Exceptions: phenol (enol of cyclohexadienone) favors enol form because aromaticity is regained.\nCatalysis: both acid and base catalyze tautomerism:\n• Acid: protonates C=O oxygen → oxocarbenium ion → deprotonation at α-carbon → enol\n• Base: deprotonates α-carbon → enolate anion → protonation at oxygen → enol\nKey for alkynes: hydration and hydroboration both proceed through enol intermediates that tautomerize to the carbonyl product.',
      formula: 'C=C-OH (enol) ⇌ C-C=O (keto); keto favored',
    },
    tags: ['carbonyl', 'addition', 'CHEM008B'],
  },
  {
    id: 'alk-019',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is the product of treating 2-butyne (CH3C≡CCH3) with: (a) H2/Lindlar, (b) Na/NH3, (c) H2O/H2SO4/HgSO4?' },
    back: {
      text: '(a) H2 / Lindlar\'s catalyst → cis-2-butene (Z)-CH3CH=CHCH3\n(b) Na/liquid NH3 → trans-2-butene (E)-CH3CH=CHCH3\n(c) H2O/H2SO4/HgSO4 → 2-butanone (methyl ethyl ketone, CH3COCH2CH3) via symmetric enol addition — both carbons are equivalent in 2-butyne, so either Markovnikov orientation gives the same ketone.\nNote: (c) gives only ONE ketone product from internal symmetric alkyne.',
      formula: 'Internal alkyne: Lindlar→cis; Na/NH3→trans; H3O+/Hg→ketone',
    },
    tags: ['addition', 'stereochemistry', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'alk-020',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'How do you synthesize 4-octyne starting from 1-bromobutane using alkyne chemistry?' },
    back: {
      text: 'Retrosynthesis: 4-octyne = CH3CH2CH2CH2-C≡C-CH2CH2CH2CH3. Disconnect at C≡C → need two 1-bromobutane units and acetylene.\n\nSynthesis:\n1. HC≡CH + NaNH2 → HC≡C⁻Na⁺\n2. HC≡C⁻ + CH3CH2CH2CH2Br → HC≡C-C4H9 (1-octyne)\n3. HC≡C-C4H9 + NaNH2 → ⁻C≡C-C4H9\n4. ⁻C≡C-C4H9 + CH3CH2CH2CH2Br → C4H9-C≡C-C4H9 (4-octyne)\n\nKey: two sequential SN2 alkylations of acetylide anions, each using primary alkyl halide.',
      formula: 'HC≡CH → 2× (NaNH2 then n-BuBr) → n-Bu-C≡C-n-Bu (4-octyne)',
    },
    tags: ['addition', 'nucleophilic-substitution', 'CHEM008B'],
  },
  {
    id: 'alk-021',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What is the product of treating 1-pentyne with 2 equivalents of HBr?' },
    back: {
      text: '1-pentyne: HC≡C-CH2CH2CH3\nFirst HBr (Markovnikov): adds to give 2-bromo-1-penten-1-yl intermediate → actually gives 2-bromopent-1-ene (vinyl bromide): CH2=CBr-CH2CH2CH3\nSecond HBr (Markovnikov on the vinyl bromide): H adds to CH2= (less substituted), Br adds to CBr carbon → geminal dihalide: CH3-CBr2-CH2CH2CH3 (2,2-dibromopentane)\nOverall: RC≡CH + 2 HBr → RCBr2-CH3 (geminal dihalide with Markovnikov regiochemistry).',
      formula: 'RC≡CH + 2 HBr → RCBr2-CH3 (2,2-dihalide)',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'alk-022',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: 'What are the products of treating an internal alkyne with KMnO4 (hot, acidic)?' },
    back: {
      text: 'Hot, acidic KMnO4 is a strong oxidant that cleaves the C≡C bond of alkynes:\nRC≡CR\' + KMnO4 (hot, H3O⁺) → RCOOH + R\'COOH (two carboxylic acids)\nFor terminal alkyne: RC≡CH → RCOOH + CO2 + H2O\nThis is oxidative cleavage — same concept as ozonolysis but with KMnO4. Useful for structure determination: identify the carboxylic acids formed → deduce the original alkyne structure.',
      formula: 'RC≡CR\' + KMnO4/H3O⁺ (hot) → RCOOH + R\'COOH',
    },
    tags: ['addition', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-023',
    deckId: 'alkynes',
    category: 'spectroscopy',
    front: { text: 'What IR and ¹H NMR signals identify a terminal alkyne?' },
    back: {
      text: 'IR spectroscopy:\n• ≡C-H stretch: sharp, strong ~3300 cm⁻¹ (distinguishing feature of terminal alkynes)\n• C≡C stretch: medium, 2100–2260 cm⁻¹ (absent or very weak in internal symmetric alkynes — no dipole change)\n\n¹H NMR:\n• Terminal alkyne C-H (≡C-H): δ 1.8–3.3 ppm (relatively upfield for C-H due to anisotropic shielding of the triple bond magnetic cylinder)\n• sp carbon is in the shielding cone of the triple bond — shifted upfield compared to vinyl H (~5-6 ppm) or aryl H (~7-8 ppm)',
      formula: 'IR: 3300 cm⁻¹ (≡CH); NMR: δ ~2 ppm',
    },
    tags: ['spectroscopy', 'addition', 'CHEM008B'],
  },
  {
    id: 'alk-024',
    deckId: 'alkynes',
    category: 'reagent',
    front: { text: "What is the difference between Lindlar's catalyst and Na/NH3 in terms of mechanism and product stereochemistry?" },
    back: {
      text: "Lindlar's catalyst (H2/Pd-CaCO3/Pb(OAc)2 or quinoline):\n• Heterogeneous catalysis: both H atoms delivered from catalyst surface to same face of alkyne\n• Syn addition → cis (Z) alkene\n• Mechanism: H2 adsorbs onto Pd surface; alkyne coordinates; both H delivered syn\n\nNa/liquid NH3 (dissolving metal reduction):\n• Homogeneous radical mechanism: single electron transfer from Na → vinyl radical → protonation → vinyl radical → second electron → vinyl carbanion → protonation\n• The carbanion intermediate adopts the less strained trans geometry before protonation\n• Anti addition → trans (E) alkene\n• Memory: Lindlar = cis; Na/NH3 = trans",
      formula: "Lindlar's = syn → (Z); Na/NH3 = anti → (E)",
    },
    tags: ['addition', 'stereochemistry', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'alk-025',
    deckId: 'alkynes',
    category: 'mechanism-step',
    front: { text: 'Alkyne reaction summary: what reagent gives what product from RC≡CH?' },
    back: {
      text: 'Terminal alkyne RC≡CH:\n• + H2/Lindlar → cis RCH=CH2 (then over-reduce with excess H2/Pd → alkane)\n• + Na/NH3 → trans RCH=CH2 (if internal, gives trans; terminal gives same result)\n• + HX (1 eq) → RCX=CH2 (vinyl halide, Markovnikov)\n• + HX (2 eq) → RCX2CH3 (geminal dihalide)\n• + H2O/H⁺/HgSO4 → RCOCH3 (methyl ketone)\n• + HBR2/H2O2 → RCH2CHO (aldehyde)\n• + Br2 (1 eq) → trans-RCBr=CHBr\n• + NaNH2 → RC≡C⁻Na⁺ (acetylide, then SN2 alkylation)\n• + O3/H2O → RCOOH + CO2',
    },
    tags: ['addition', 'CHEM008B'],
  },
];

export const alkynesDeck: Deck = {
  id: 'alkynes',
  title: 'Alkyne Reactions',
  description: 'Triple bond chemistry: reductions, additions, hydration, acetylide anions, and synthesis strategies',
  courseId: 'CHEM008B',
  topicId: 'alkyne-reactions',
  cardIds: [
    'alk-001', 'alk-002', 'alk-003', 'alk-004', 'alk-005',
    'alk-006', 'alk-007', 'alk-008', 'alk-009', 'alk-010',
    'alk-011', 'alk-012', 'alk-013', 'alk-014', 'alk-015',
    'alk-016', 'alk-017', 'alk-018', 'alk-019', 'alk-020',
    'alk-021', 'alk-022', 'alk-023', 'alk-024', 'alk-025',
  ],
  icon: '⚗️',
};
