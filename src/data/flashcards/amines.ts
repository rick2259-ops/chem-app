import { Flashcard, Deck } from '@/types/flashcard';

export const amineCards: Flashcard[] = [
  {
    id: 'amine-001',
    deckId: 'amines',
    category: 'functional-group',
    front: { text: 'What are the three classes of amines and how are they named?' },
    back: {
      text: 'Primary (1°): one alkyl/aryl group on N (RNH2)\nSecondary (2°): two groups on N (R2NH)\nTertiary (3°): three groups on N (R3N)\nQuaternary ammonium salt: four groups on N, N bears a + charge (R4N⁺)\nNaming: simple amines = substituents + "amine" (e.g., methylamine, diethylamine, trimethylamine). IUPAC: use "-amine" suffix or "amino-" prefix.',
      formula: 'RNH2 (1°), R2NH (2°), R3N (3°), R4N⁺ (quaternary)',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-002',
    deckId: 'amines',
    category: 'functional-group',
    front: { text: 'Why are amines basic? What structural features increase or decrease amine basicity?' },
    back: {
      text: 'Amines are basic because the lone pair on nitrogen can accept a proton (Brønsted base) or donate to a Lewis acid.\nBasicity increases with:\n• Electron-donating groups (alkyl groups donate e⁻ by induction → N more electron-rich → stronger base)\n• Solution phase: 2° > 1° > 3° (steric and solvation effects: 3° can\'t be solvated as well)\nBasicity decreases with:\n• Electron-withdrawing groups (nitro, carbonyl, CF3 decrease e⁻ density at N)\n• Resonance delocalization of N lone pair (amides, anilines) — lone pair donated to C=O or ring\n• sp2 N (pyridine, pKaH ~5.3 vs ~10 for alkylamines)',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-003',
    deckId: 'amines',
    category: 'functional-group',
    front: { text: 'Rank these from most to least basic: aniline, methylamine, dimethylamine, ammonia, acetamide' },
    back: {
      text: 'Most → least basic (pKaH of conjugate acid):\n1. Dimethylamine ~11.1 (2° alkylamine, 2 EDG)\n2. Methylamine ~10.6 (1° alkylamine, 1 EDG)\n3. Ammonia ~9.3 (no substituents)\n4. Aniline ~4.6 (N lone pair delocalized into aromatic ring)\n5. Acetamide ~0.5 (N lone pair delocalized into C=O of amide)\nKey: alkyl amines (strong), unsubstituted NH3 (moderate), aromatic amines (weak, resonance), amides (barely basic, amide resonance very strong)',
      formula: 'R2NH > RNH2 > NH3 >> ArNH2 >> RCONH2',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-004',
    deckId: 'amines',
    category: 'named-reaction',
    front: { text: 'What is diazotization and what are the conditions required?' },
    back: {
      text: 'Diazotization converts a primary aromatic amine to a diazonium salt:\nArNH2 + NaNO2 + HCl → ArN2⁺Cl⁻ + NaCl + H2O\nConditions: 0–5°C (ice bath) — diazonium salts decompose rapidly above this temperature.\nMechanism: HNO2 forms in situ; protonation → NO⁺; attack on ArNH2 → N-nitroso amine → tautomerize → ArN=NH⁺ → deprotonate → ArN=N (diazonium).\nDiazonium salts are key synthetic intermediates — they can be replaced by Cl, Br, I, F, CN, OH, H via Sandmeyer and related reactions.',
      formula: 'ArNH2 + NaNO2/HCl, 0°C → ArN2⁺Cl⁻',
    },
    tags: ['aromatic', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-005',
    deckId: 'amines',
    category: 'named-reaction',
    front: { text: 'Sandmeyer reactions: what group replaces ArN2⁺ and with what reagent?' },
    back: {
      text: 'Sandmeyer reaction replaces the diazonium group (N2⁺) with various groups using Cu(I) catalysts:\n• ArN2⁺ + CuCl → ArCl + N2 (Sandmeyer)\n• ArN2⁺ + CuBr → ArBr + N2 (Sandmeyer)\n• ArN2⁺ + CuCN → ArCN + N2 (Sandmeyer; then hydrolyze ArCN → ArCOOH)\n• ArN2⁺ + KI → ArI + N2 (no Cu needed)\n• ArN2⁺ + HBF4 → heat → ArF + N2 + BF3 (Balz-Schiemann, for F)\n• ArN2⁺ + H3PO2 → ArH + N2 (reductive deamination)\n• ArN2⁺ + H2O/H⁺ → ArOH + N2 + HCl (hydrolysis)',
      formula: 'ArN2⁺ + CuX → ArX + N2 (X = Cl, Br, CN)',
    },
    tags: ['aromatic', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-006',
    deckId: 'amines',
    category: 'named-reaction',
    front: { text: 'What is the Gabriel synthesis and what type of amine does it make?' },
    back: {
      text: "Gabriel synthesis makes PRIMARY amines with no 2° or 3° contamination:\n1. Phthalimide (cyclic imide) + KOH → potassium phthalimide (anion, N-nucleophile)\n2. N-anion + R-X (primary alkyl halide, SN2) → N-alkylphthalimide\n3. Hydrazinolysis: N-alkylphthalimide + N2H4 → RNH2 + phthalhydrazide (precipitates)\n   Alternatively: acid/base hydrolysis\nWhy it gives only 1°: phthalimide has only ONE N-H, so only one alkylation can occur. The ring structure prevents double alkylation.\nLimitation: only works with primary alkyl halides (SN2 required).",
      formula: 'Phthalimide → K-salt → SN2 → hydrazinolysis → RNH2 (primary)',
    },
    tags: ['functional-groups', 'nucleophilic-substitution', 'CHEM008C'],
  },
  {
    id: 'amine-007',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What is reductive amination and what does it make?' },
    back: {
      text: 'Reductive amination: react aldehyde or ketone with an amine + a reducing agent → amine product.\nR2C=O + RNH2 → [R2C=NR (imine, Schiff base)] + H2 (NaBH3CN or NaBH4) → R2CH-NHR (secondary amine)\nSteps:\n1. Amine attacks carbonyl → hemiaminal (tetrahedral intermediate)\n2. Dehydration → imine (C=N)\n3. Reduction of C=N (NaBH3CN at mildly acidic pH, or H2/Pd, or NaBH(OAc)3)\nUsed to make: 1° amines (RCHO + NH3 → RCH2NH2), 2° amines (RCHO + R\'NH2 → RCH2NHR\'), 3° amines (RCHO + R\'2NH → RCH2NR\'2)',
      formula: 'R2C=O + H2NR\' → imine → NaBH3CN → R2CH-NHR\'',
    },
    tags: ['functional-groups', 'carbonyl', 'oxidation-reduction', 'CHEM008C'],
  },
  {
    id: 'amine-008',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do you reduce a nitrile (R-C≡N) to a primary amine?' },
    back: {
      text: 'Nitriles are reduced to primary amines by:\n1. LiAlH4 (THF, then H2O workup) → RCH2NH2 (1° amine, C≡N → CH2-NH2, adds 1 carbon if from RCN)\n2. H2/Raney Ni (catalytic hydrogenation)\nMechanism (LiAlH4): H⁻ adds to C≡N → imine anion → second H⁻ → amine anion → protonation\nNote: NABH4 does NOT reduce nitriles (too weak). Only LiAlH4 or catalytic hydrogenation.\nCareful: the product is a 1° amine with one more carbon than the starting carboxylic acid (if nitrile came from R-COOH → R-CN → R-CH2NH2).',
      formula: 'R-C≡N + LiAlH4 → R-CH2-NH2 (primary amine)',
    },
    tags: ['functional-groups', 'oxidation-reduction', 'CHEM008C'],
  },
  {
    id: 'amine-009',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do you reduce a nitro group to an amine?' },
    back: {
      text: 'Reduction of ArNO2 → ArNH2:\n1. Fe or Sn + HCl (classic, industrial) → ArNH2\n2. H2/Pd (catalytic hydrogenation) → ArNH2\n3. SnCl2/HCl in ethanol\n4. Zn/NH4Cl (milder conditions)\nThis is the key step to make anilines. Combined with EAS nitration of benzene, allows synthesis of substituted anilines:\nBenzene → nitration (HNO3/H2SO4) → nitrobenzene → reduction (Fe/HCl) → aniline\nFor selective reduction in the presence of other reducible groups: use transfer hydrogenation or specific conditions.',
      formula: 'ArNO2 + Fe/HCl (or H2/Pd) → ArNH2',
    },
    tags: ['functional-groups', 'oxidation-reduction', 'aromatic', 'CHEM008C'],
  },
  {
    id: 'amine-010',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What is the Hofmann rearrangement (degradation) and what does it make?' },
    back: {
      text: 'Hofmann rearrangement converts a primary amide to a primary amine with ONE FEWER carbon:\nRCONH2 + Br2 + NaOH → RNH2 + CO2 + NaBr\nMechanism:\n1. NaOH + Br2 → NaOBr (hypobromine)\n2. NaOBr brominates amide NH2 → N-bromoamide\n3. NaOH deprotonates → N-bromo anion → loss of Br⁻ → nitrene intermediate\n4. Nitrene rearranges (1,2-alkyl/aryl shift) → isocyanate (R-N=C=O)\n5. Isocyanate + H2O (basic) → carbamic acid → CO2 + RNH2\nKey: amide RCONH2 → amine RNH2 (one carbon lost as CO2). Useful for degradation/synthesis.',
      formula: 'RCONH2 + Br2/NaOH → RNH2 + CO2 (1 fewer carbon)',
    },
    tags: ['functional-groups', 'carbonyl', 'CHEM008C'],
  },
  {
    id: 'amine-011',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do amines react with acyl chlorides (acid chlorides)? What products form with 1°, 2°, 3° amines?' },
    back: {
      text: 'Amines are nucleophiles that react with acyl chlorides (RCOCl) via nucleophilic acyl substitution:\n• 1° amine + RCOCl → RCONHR\' + HCl (secondary amide)\n• 2° amine + RCOCl → RCONR\'2 + HCl (tertiary amide)\n• 3° amine + RCOCl → no amide (no N-H to give); forms salt (but 3° amine is less reactive nucleophile)\nA base (pyridine or excess amine) is used to neutralize the HCl byproduct.\nThis is a fast reaction used to make amides, protect amines as amides, or characterize amines.',
      formula: 'RNH2 + R\'COCl → R\'CONHR + HCl (secondary amide)',
    },
    tags: ['functional-groups', 'carbonyl', 'CHEM008C'],
  },
  {
    id: 'amine-012',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What is the Curtius rearrangement and how does it relate to Hofmann rearrangement?' },
    back: {
      text: 'Curtius rearrangement: converts an acyl azide to an isocyanate by loss of N2 and 1,2-shift.\nRCON3 → (heat) → R-N=C=O + N2 (isocyanate)\nThe isocyanate then reacts with H2O → carbamic acid → CO2 + RNH2 (primary amine, one fewer carbon than starting acid).\nRelated reactions (all convert carboxylic acid derivatives to primary amines, net loss of one carbon):\n• Hofmann: amide + Br2/NaOH → amine\n• Curtius: acyl azide → isocyanate → amine\n• Lossen: hydroxamic acid + activating reagent → amine\nAll proceed through nitrene/isocyanate intermediates.',
      formula: 'RCON3 → heat → RN=C=O + N2 → H2O → RNH2',
    },
    tags: ['functional-groups', 'carbonyl', 'CHEM008C'],
  },
  {
    id: 'amine-013',
    deckId: 'amines',
    category: 'mechanism-step',
    front: { text: 'Why is aniline less basic than cyclohexylamine?' },
    back: {
      text: "Aniline (PhNH2): pKaH ~4.6. Cyclohexylamine: pKaH ~10.6.\nThe 36 pKa unit difference is due to resonance delocalization in aniline. The nitrogen lone pair in aniline overlaps with the aromatic ring's pi system (N is sp2-like, lone pair in p-orbital parallel to ring). This delocalization spreads electron density into the ring, removing it from N → less available for protonation. Protonation of aniline's NH3⁺ would destroy this resonance stabilization. In contrast, cyclohexylamine's N lone pair is localized (sp3 hybridization, no adjacent pi system) → full availability for protonation → much stronger base.",
    },
    tags: ['functional-groups', 'aromatic', 'CHEM008C'],
  },
  {
    id: 'amine-014',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What is the Mannich reaction?' },
    back: {
      text: 'Mannich reaction: a three-component condensation of an aldehyde (usually formaldehyde), an amine (primary or secondary), and an enolizable carbonyl compound (ketone, aldehyde).\nR2NH + HCHO + CH2(COR) → R2N-CH2-CH2COR (beta-amino carbonyl compound = Mannich base)\nMechanism:\n1. Amine + HCHO → iminium ion (R2N⁺=CH2)\n2. Enol/enolate of ketone attacks iminium → beta-amino carbonyl\nProducts: beta-amino carbonyl compounds (Mannich bases) — important in pharmaceutical synthesis (alkaloid synthesis) and as cross-linking agents.',
      formula: 'R2NH + CH2O + RCH2COR\' → R2NCH2-CHRCOR\'',
    },
    tags: ['functional-groups', 'carbonyl', 'CHEM008C'],
  },
  {
    id: 'amine-015',
    deckId: 'amines',
    category: 'spectroscopy',
    front: { text: 'What are the key IR and ¹H NMR signals for identifying amines?' },
    back: {
      text: 'IR spectroscopy:\n• 1° amine (RNH2): two N-H stretches at 3300–3500 cm⁻¹ (two peaks for symmetric and asymmetric stretch)\n• 2° amine (R2NH): ONE N-H stretch at 3300 cm⁻¹ (one peak, weaker and broader than OH)\n• 3° amine (R3N): NO N-H stretch (diagnostic: absence of N-H)\n• N-H bend: 1580–1650 cm⁻¹ (primary amines)\n\n¹H NMR:\n• N-H proton: variable position, δ 0.5–5 ppm (broad, exchangeable with D2O)\n• α-CH2 next to N: δ 2.2–2.9 ppm (shifted downfield by N, but less than OH effect)',
      formula: 'IR: 1° = 2 NH peaks; 2° = 1 NH peak; 3° = no NH',
    },
    tags: ['spectroscopy', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-016',
    deckId: 'amines',
    category: 'mechanism-step',
    front: { text: 'What is nitrogen inversion and why does it prevent isolation of chiral amines with no other stereocenters?' },
    back: {
      text: "Nitrogen inversion: a tertiary amine (R3N) with three different substituents is formally chiral (3 different groups + lone pair = 4 different groups). However, the lone pair rapidly inverts through a planar trigonal transition state — like an umbrella flipping. Energy barrier: ~6 kcal/mol → inversion rate ~2×10¹¹ s⁻¹ at room temperature (too fast to isolate separately). Therefore, amine enantiomers interconvert spontaneously and cannot be isolated.\nException: if N is in a ring (aziridine, restricted inversion), quaternary ammonium salts (N⁺, no lone pair), or sulfonamides (restricted), then chiral N can be isolable.",
    },
    tags: ['functional-groups', 'stereochemistry', 'CHEM008C'],
  },
  {
    id: 'amine-017',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do you make a secondary amine via alkylation? What is the main problem?' },
    back: {
      text: 'Direct alkylation of amines with alkyl halides:\nNH3 + RX → RNH3⁺X⁻ → (base) → RNH2 (1°) + RX → R2NH (2°) + RX → R3N (3°) + RX → R4N⁺X⁻ (quaternary)\nProblem: over-alkylation. Each product is more nucleophilic/basic (with 1° and 2°), so the reaction doesn\'t stop cleanly at one stage.\nSolutions to get a specific amine:\n• Gabriel synthesis → 1° only\n• Reductive amination → 1°, 2°, or 3° cleanly\n• Exhaustive methylation → quaternary ammonium salt (intentional)\n• Control stoichiometry (hard in practice)',
      formula: 'NH3 + RX → RNH2 → R2NH → R3N → R4N⁺ (hard to control)',
    },
    tags: ['functional-groups', 'nucleophilic-substitution', 'CHEM008C'],
  },
  {
    id: 'amine-018',
    deckId: 'amines',
    category: 'named-reaction',
    front: { text: "What is Hofmann's elimination (Hofmann degradation of quaternary ammonium salts)?" },
    back: {
      text: "NOT the same as Hofmann rearrangement!\nHofmann elimination: treatment of a quaternary ammonium salt (R4N⁺) with AgOH (silver oxide), then heat → produces the LESS substituted alkene (anti-Markovnikov/Hofmann product) + a tertiary amine.\nR4N⁺OH⁻ → heat → alkene (less substituted) + R3N + H2O\nWhy less substituted: the bulky R3N⁺ group makes the more substituted β-H sterically inaccessible; the base removes the less hindered (less substituted) β-H → less substituted alkene.\nContrast with E2 using KOtBu: also gives less substituted (Hofmann) alkene for the same steric reason.",
      formula: 'R4N⁺OH⁻ → heat → less substituted alkene + R3N',
    },
    tags: ['elimination', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-019',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What happens when a diazonium salt couples with an activated aromatic ring (azo coupling)?' },
    back: {
      text: 'Azo coupling: diazonium salt (ArN2⁺) reacts with an electron-rich aromatic ring (aniline, phenol, naphthol) as an electrophile in EAS:\nArN2⁺ + Ar\'H (activated) → Ar-N=N-Ar\' (azo compound) + H⁺\nConditions: mildly basic pH for phenols (pH ~8-10); mildly acidic for amines. The diazonium is a weak electrophile — only reacts with activated (electron-rich) rings.\nAzo compounds: characterized by -N=N- chromophore → brightly colored (orange, red, yellow). Azo dyes are the largest class of synthetic dyes.',
      formula: 'ArN2⁺ + Ar\'OH → Ar-N=N-Ar\'-OH (azo dye)',
    },
    tags: ['aromatic', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-020',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do you synthesize a specific aniline derivative? (Outline the general strategy)' },
    back: {
      text: 'The diazonium salt strategy is key — it allows introduction of almost any group at a specific position on benzene:\n1. Start with benzene (or substituted benzene)\n2. Nitration (HNO3/H2SO4) → nitrobenzene (directional, meta director for next EAS)\n3. Reduction (Fe/HCl or H2/Pd) → aniline (ortho/para director)\n4. If need meta substituent relative to NH2: install it BEFORE reducing NO2\n5. Diazotize aniline (NaNO2/HCl, 0°C) → diazonium\n6. Sandmeyer or related → replace N2⁺ with Cl, Br, I, CN, OH, F, H\nThis allows access to aryl halides, nitriles, phenols, and carboxylic acids with precise regiochemistry.',
    },
    tags: ['aromatic', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-021',
    deckId: 'amines',
    category: 'functional-group',
    front: { text: 'Compare basicity: pyridine vs piperidine (hexahydropyridine). Explain the difference.' },
    back: {
      text: 'Pyridine: pKaH ~5.3 (weak base). The N is sp2 hybridized; its lone pair is in an sp2 orbital (in the plane of the ring, perpendicular to the ring pi system). The lone pair is NOT in the pi system (unlike pyrrole, where N lone pair IS in pi system). But sp2 orbital holds electrons tighter than sp3 → less basic than alkylamines.\nPiperidine: pKaH ~11.1 (strong base). The N is sp3 hybridized (six-membered saturated ring). Lone pair is in an sp3 orbital → more available, less tightly held → stronger base.\nComparison: sp3 amine (piperidine) >> sp2 amine (pyridine) >> pyrrole-type N (lone pair in pi system, pKaH ~0).',
      formula: 'pKaH: piperidine ~11 >> pyridine ~5.3 >> pyrrole ~0',
    },
    tags: ['functional-groups', 'aromatic', 'CHEM008C'],
  },
  {
    id: 'amine-022',
    deckId: 'amines',
    category: 'reagent',
    front: { text: "What is the Birch reduction and what does it do to aromatic rings?" },
    back: {
      text: 'Birch reduction: dissolving metal reduction of an aromatic ring using Na (or Li) in liquid NH3 with an alcohol (proton source) → partially reduced 1,4-cyclohexadiene (unconjugated diene).\nBenzene + Na/NH3/ROH → 1,4-cyclohexadiene\nRegiochemistry:\n• EDG (like -OCH3, -NR2) on ring: unsubstituted positions reduced; substituent ends up on the double bond\n• EWG (like -COOH, -COR) on ring: substituted positions reduced; substituent ends up on the double bond\nMechanism: radical anion → anion → protonation (sequential, single electron steps). Different from alkyne dissolving metal reduction.',
      formula: 'ArH + Na/NH3/t-BuOH → 1,4-cyclohexadiene (unconjugated)',
    },
    tags: ['aromatic', 'oxidation-reduction', 'CHEM008C'],
  },
  {
    id: 'amine-023',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'What reagent converts an amide (RCONH2) to an amine (RNH2) using LiAlH4?' },
    back: {
      text: 'LiAlH4 reduces amides to amines (no change in carbon count, unlike Hofmann rearrangement):\nRCONHR\' + LiAlH4 → RCH2NHR\' (1° or 2° amine, same carbon count)\nMechanism: H⁻ (hydride) adds to C=O of amide → tetrahedral intermediate → elimination of -OR or -O⁻ → iminium → second hydride addition → amine\nContrast:\n• LiAlH4 on RCONH2 → RCH2NH2 (same carbon count)\n• Hofmann on RCONH2 → RNH2 (one fewer carbon)\nLiAlH4 can reduce: carboxylic acids, esters, aldehydes, ketones, amides, nitriles, epoxides',
      formula: 'RCONH2 + LiAlH4 → RCH2NH2 (reduction, same carbons)',
    },
    tags: ['functional-groups', 'carbonyl', 'oxidation-reduction', 'CHEM008C'],
  },
  {
    id: 'amine-024',
    deckId: 'amines',
    category: 'mechanism-step',
    front: { text: 'Summarize 5 ways to make a primary amine (RNH2)' },
    back: {
      text: '1. Gabriel synthesis: phthalimide + K⁺ → SN2 with RX → hydrazinolysis → RNH2 (1° only, no contamination)\n2. Reductive amination: RCHO + NH3 + NaBH3CN → RCH2NH2\n3. Nitrile reduction: R-C≡N + LiAlH4 → RCH2NH2 (one extra carbon!)\n4. Amide reduction: RCONH2 + LiAlH4 → RCH2NH2\n5. Hofmann rearrangement: RCONH2 + Br2/NaOH → RNH2 (one fewer carbon)\n6. Nitro reduction: ArNO2 + Fe/HCl → ArNH2 (for aromatic amines)\n7. Azide reduction: R-N3 + LiAlH4 → RNH2',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'amine-025',
    deckId: 'amines',
    category: 'reagent',
    front: { text: 'How do primary amines react with ninhydrin, and why is this used in biochemistry?' },
    back: {
      text: "Ninhydrin (triketohydrindene) reacts with primary amino groups (including alpha-amino acids):\nR-CH(NH2)-COOH + ninhydrin → purple/violet product (Ruhemann's purple) + CO2 + RCHO\nThe purple color forms from the condensation of ammonia (released from the amino acid) with ninhydrin.\nBiochemistry uses: (1) TLC visualization of amino acids (spray plates with ninhydrin, heat → purple spots); (2) qualitative detection of amino acids; (3) proline gives a yellow color (secondary amine, no free NH2). Color intensity can be quantified for amino acid analysis. Negative for 3° amines (no NH).",
      formula: 'Amino acid + ninhydrin → purple (Ruhemann\'s purple) + CO2',
    },
    tags: ['functional-groups', 'amino-acids', 'CHEM008C'],
  },
];

export const aminesDeck: Deck = {
  id: 'amines',
  title: 'Amines',
  description: 'Amine basicity, synthesis (Gabriel, reductive amination, Hofmann), diazotization, and Sandmeyer reactions',
  courseId: 'CHEM008C',
  topicId: 'amines',
  cardIds: [
    'amine-001', 'amine-002', 'amine-003', 'amine-004', 'amine-005',
    'amine-006', 'amine-007', 'amine-008', 'amine-009', 'amine-010',
    'amine-011', 'amine-012', 'amine-013', 'amine-014', 'amine-015',
    'amine-016', 'amine-017', 'amine-018', 'amine-019', 'amine-020',
    'amine-021', 'amine-022', 'amine-023', 'amine-024', 'amine-025',
  ],
  icon: '🧪',
};
