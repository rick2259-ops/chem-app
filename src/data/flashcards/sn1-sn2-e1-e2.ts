import { Flashcard, Deck } from '@/types/flashcard';

export const sn1Sn2E1E2Cards: Flashcard[] = [
  // SN2
  {
    id: 'sub-001',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What are the 4 key characteristics of an SN2 reaction?' },
    back: {
      text: '1. Bimolecular (rate = k[substrate][nucleophile])\n2. Backside attack — nucleophile attacks 180° to leaving group\n3. Inversion of configuration (Walden inversion) at the electrophilic carbon\n4. Concerted — bond forming and bond breaking occur simultaneously (no intermediate)',
      formula: 'Nu:⁻ + R-LG → Nu-R + LG⁻',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-002',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'SN2 reactivity order: which carbon type reacts fastest?' },
    back: {
      text: 'Reactivity: methyl > primary > secondary >> tertiary (no reaction)\nReason: steric hindrance. SN2 requires backside attack — bulky groups around the electrophilic carbon block the nucleophile\'s approach. Tertiary carbons are too hindered; elimination (E2) competes instead.',
      formula: 'CH3-LG > 1° > 2° >> 3° (N/A)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-003',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What solvent and nucleophile favor SN2?' },
    back: {
      text: 'Solvent: polar aprotic (DMSO, DMF, acetone, acetonitrile). These solvents do NOT H-bond to the nucleophile, leaving it "naked" and highly reactive.\nNucleophile: strong, unhindered nucleophiles (I⁻, Br⁻, CN⁻, N3⁻, RS⁻, RO⁻, HO⁻)\nPolar protic solvents (water, alcohols) solvate nucleophiles → slower SN2.',
      formula: 'Polar aprotic + strong Nu → SN2',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-004',
    deckId: 'sn1-sn2-e1-e2',
    category: 'stereochemistry',
    front: { text: 'What stereochemical outcome does SN2 give at a chiral center?' },
    back: {
      text: 'Inversion of configuration (Walden inversion). The nucleophile attacks from the back face (180° to LG), pushing the three remaining substituents through a trigonal bipyramidal transition state like an umbrella inverting. If starting material is (R), product is (S), and vice versa. Note: R → S inversion in CIP priorities is not guaranteed — depends on how priorities change.',
    },
    tags: ['nucleophilic-substitution', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-005',
    deckId: 'sn1-sn2-e1-e2',
    category: 'reagent',
    front: { text: 'Rank leaving group ability for SN2: Cl, Br, I, F, OTs, OH' },
    back: {
      text: 'Best LG → worst LG:\nI⁻ > OTs⁻ ≈ OMs⁻ > Br⁻ > Cl⁻ >> F⁻ >> OH⁻\nLeaving group ability correlates with stability of the leaving group anion (conjugate base of strong acid leaves best). I⁻ is weakly basic (conjugate of HI, very strong acid) → best LG. OH⁻ is strongly basic → terrible LG. OTs/OMs are good LGs because the sulfonate anion is resonance-stabilized.',
      formula: 'I⁻ > OTs⁻ > Br⁻ > Cl⁻ >> F⁻ >> OH⁻',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  // SN1
  {
    id: 'sub-006',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What are the 4 key characteristics of an SN1 reaction?' },
    back: {
      text: '1. Unimolecular (rate = k[substrate] only — nucleophile not in rate law)\n2. Two-step: slow ionization forms carbocation, then fast nucleophilic attack\n3. Carbocation intermediate (planar, sp2)\n4. Racemization at chiral center (nucleophile attacks both faces equally). Often slight inversion excess due to ion pair shielding.',
      formula: 'R-LG → R⁺ + LG⁻ (slow) → R-Nu (fast)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-007',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'SN1 reactivity order and what conditions favor it?' },
    back: {
      text: 'Reactivity: tertiary > secondary > primary (primary SN1 almost never)\nFavored by:\n• Stable carbocation (3° > 2°, allylic, benzylic)\n• Polar protic solvents (water, ROH) — stabilize carbocation and LG⁻ by solvation\n• Weak nucleophiles or poor SN2 substrates\n• Substrate already tertiary or stabilized',
      formula: '3° > 2° >> 1° (for SN1)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-008',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What is a carbocation rearrangement and when does it occur?' },
    back: {
      text: 'Carbocation rearrangements occur when a less stable carbocation can convert to a more stable one. Types:\n1. 1,2-hydride shift: H migrates from adjacent C with its electrons → more stable carbocation\n2. 1,2-methyl shift: CH3 migrates similarly\nOccurs: during SN1 (or E1) when secondary → tertiary rearrangement is possible. Clue on exams: products that don\'t match direct substitution = rearrangement occurred.',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-009',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'How do you distinguish SN1 vs SN2 from the substrate + conditions?' },
    back: {
      text: 'SN2 favored:\n• Methyl or 1° substrate\n• Strong nucleophile (high concentration)\n• Polar aprotic solvent\n• Low temperature\n\nSN1 favored:\n• 3° (or allylic/benzylic) substrate\n• Weak nucleophile\n• Polar protic solvent (H2O, ROH)\n• High temperature\n\n2° substrate: competition — nucleophile strength and solvent decide.',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-010',
    deckId: 'sn1-sn2-e1-e2',
    category: 'reagent',
    front: { text: 'Allylic and benzylic halides — how do they behave in SN1 and SN2?' },
    back: {
      text: 'Both allylic and benzylic substrates are reactive in BOTH SN1 and SN2:\n• SN1: allylic/benzylic carbocations are stabilized by resonance → fast ionization\n• SN2: allylic/benzylic positions are primary or secondary but accessible (less hindered than 3°) → fast backside attack\nSN1 allylic: can give rearranged product (allylic transposition) if the carbocation resonance form puts + at a different carbon.',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  // E2
  {
    id: 'sub-011',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What are the key characteristics of an E2 reaction?' },
    back: {
      text: '1. Bimolecular (rate = k[substrate][base])\n2. Concerted: base removes β-H simultaneously as LG departs and C=C forms\n3. Anti-periplanar requirement: H and LG must be 180° (anti) to each other\n4. Requires a strong base (NaOEt, NaOH, KOtBu, NaNH2, LDA)\n5. Favored by bulky bases (KOtBu → Hofmann product) or strong/small bases (NaOEt → Zaitsev)',
      formula: 'B:⁻ + H-C-C-LG → alkene + B-H + LG⁻',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  {
    id: 'sub-012',
    deckId: 'sn1-sn2-e1-e2',
    category: 'stereochemistry',
    front: { text: 'What is the anti-periplanar requirement in E2, and how does it affect cyclohexane elimination?' },
    back: {
      text: 'Anti-periplanar: H and LG must both be axial (diaxial relationship) in a cyclohexane ring for E2 to occur — this geometry achieves the required 180° dihedral angle. If the H and LG cannot achieve diaxial orientation (e.g., both equatorial), E2 is very slow or impossible. To solve cyclohexane E2 problems: draw chair conformation, find the diaxial H-C-C-LG arrangement, determine which β-H is eliminated → that gives the alkene regiochemistry.',
    },
    tags: ['elimination', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-013',
    deckId: 'sn1-sn2-e1-e2',
    category: 'named-reaction',
    front: { text: "Zaitsev's rule vs Hofmann's rule — which product forms under what conditions?" },
    back: {
      text: "Zaitsev's rule: major product is the MORE substituted alkene (thermodynamically more stable, more hyperconjugation). Favored with small bases (NaOEt, NaOH) that can reach the more substituted β-H.\n\nHofmann's rule (anti-Zaitsev): major product is the LESS substituted alkene. Favored with bulky bases (KO-t-Bu, LDA) — steric bulk prevents approach to the more hindered β-H, so the less hindered (less substituted) terminal alkene forms preferentially.",
      formula: 'Bulky base → less substituted; small base → more substituted',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  // E1
  {
    id: 'sub-014',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What are the key characteristics of an E1 reaction?' },
    back: {
      text: '1. Unimolecular (rate = k[substrate]; base not in rate law)\n2. Two-step: ionization to carbocation (same as SN1), then base removes β-H\n3. No stereochemical requirement (unlike E2 anti-periplanar) — any β-H can be removed\n4. Same conditions as SN1 (3° substrate, polar protic, weak base)\n5. SN1 and E1 always compete — higher temp favors E1; more nucleophilic conditions favor SN1',
      formula: 'R-LG → R⁺ (slow) → alkene (fast, base removes H)',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  {
    id: 'sub-015',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'E1 vs E2: how do you distinguish them in a problem?' },
    back: {
      text: 'E2:\n• Requires strong base (KOH, NaOEt, KOtBu)\n• Rate depends on base concentration\n• Anti-periplanar H and LG required\n• Works at any carbon (1°, 2°, 3°)\n\nE1:\n• Weak base (water, alcohols) or no base\n• Only 3° (or stabilized 2°) — needs stable carbocation\n• Rate independent of base\n• Carbocation intermediate → possible rearrangement\n• Competes with SN1\n\nMemory: strong base = E2; weak base/protic solvent/3° = E1 (with SN1)',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  // Competition
  {
    id: 'sub-016',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Given: (CH3)3C-Br + NaOEt in ethanol — what are the major and minor products?' },
    back: {
      text: 'Substrate: tert-butyl bromide (3°). NaOEt = strong, bulky base.\nMajor: E2 elimination → isobutylene (2-methylpropene)\nReason: 3° carbon cannot do SN2 (too hindered). Strong base + 3° substrate = E2 overwhelmingly favored. NaOEt in ethanol = slightly protic, but strong base drives E2.\nMinor: possible SN1/E1 if weakly basic conditions, but here the strong base dominates E2.',
      formula: '(CH3)3CBr + NaOEt → CH2=C(CH3)2 (major, E2)',
    },
    tags: ['elimination', 'nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-017',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Given: CH3CH2Br + NaCN in DMSO — what is the major product and mechanism?' },
    back: {
      text: 'Substrate: ethyl bromide (1° alkyl halide). Nucleophile: CN⁻ (strong nucleophile). Solvent: DMSO (polar aprotic).\nMajor: SN2 → propanenitrile (CH3CH2CN)\nReason: 1° substrate + strong nucleophile + polar aprotic = classic SN2 conditions. No steric hindrance for backside attack. CN⁻ is an excellent nucleophile and also a mild base, but SN2 dominates with 1° substrate.',
      formula: 'CH3CH2Br + CN⁻ → CH3CH2CN (SN2, inversion at C1)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-018',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Given: (CH3)3C-Br + H2O — what products form?' },
    back: {
      text: 'Substrate: tert-butyl bromide (3°). Nucleophile: H2O (weak). Solvent: polar protic.\nMajor: SN1 → tert-butanol (via carbocation, racemization if chiral)\nMinor: E1 → isobutylene (alkene)\nReason: 3° substrate + weak nucleophile + polar protic → SN1 mechanism. H2O is a weak base so E2 is not favored. Carbocation forms first; water traps it (SN1) or β-H is lost (E1). Higher temp increases E1:SN1 ratio.',
      formula: '(CH3)3CBr + H2O → (CH3)3COH (major SN1) + CH2=C(CH3)2 (minor E1)',
    },
    tags: ['nucleophilic-substitution', 'elimination', 'CHEM008A'],
  },
  {
    id: 'sub-019',
    deckId: 'sn1-sn2-e1-e2',
    category: 'reagent',
    front: { text: 'What reagents convert an alcohol (R-OH) to an alkyl halide for SN2?' },
    back: {
      text: 'Problem: OH⁻ is a bad leaving group.\nSolutions:\n1. SOCl2 (thionyl chloride) → R-Cl (retention via front-side attack of Cl⁻ on chlorosulfite, or inversion — conditions dependent)\n2. PBr3 → R-Br (SN2 with inversion)\n3. HX with ZnCl2 catalyst (Lucas test): HCl/ZnCl2 → R-Cl; HBr → R-Br; HI → R-I\n4. Convert OH to OTs (TsCl/pyridine) → then SN2 with any nucleophile',
      formula: 'R-OH + SOCl2 → R-Cl; R-OH + PBr3 → R-Br',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-020',
    deckId: 'sn1-sn2-e1-e2',
    category: 'named-reaction',
    front: { text: 'What is a tosylate (OTs) and why is it useful in SN reactions?' },
    back: {
      text: "Tosylate (OTs) = p-toluenesulfonate ester. Formed: R-OH + TsCl/pyridine → R-OTs.\nWhy useful:\n1. Excellent leaving group (OTs⁻ is a resonance-stabilized, weakly basic anion — analogous to OMs, OTf)\n2. The C-O bond is NOT broken during tosylation (configuration at carbon is retained)\n3. After OTs formation, any SN2 nucleophile can displace OTs with inversion\n4. Allows 'inversion of alcohol configuration' in two steps: alcohol → OTs (retention) → SN2 (inversion) = net inversion.",
      formula: 'R-OH → TsCl/pyr → R-OTs → Nu⁻ → R-Nu (SN2)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-021',
    deckId: 'sn1-sn2-e1-e2',
    category: 'stereochemistry',
    front: { text: "What is the stereochemical outcome if (R)-2-bromobutane is reacted with NaI in acetone (SN2)?" },
    back: {
      text: 'SN2 with (R)-2-bromobutane + NaI in acetone (polar aprotic) → (S)-2-iodobutane.\nReasoning: SN2 gives backside attack = inversion of configuration. R → S (assuming CIP priorities change appropriately with the Br→I substitution). In this case: the carbon is (R) with Br. Replacing Br with I — I has higher priority than Br — so the spatial arrangement is still inverted but the CIP label must be re-assigned based on new priorities. The key physical fact is that the spatial arrangement of the other three groups is inverted.',
    },
    tags: ['nucleophilic-substitution', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-022',
    deckId: 'sn1-sn2-e1-e2',
    category: 'named-reaction',
    front: { text: 'What is the Finkelstein reaction?' },
    back: {
      text: "Finkelstein reaction: exchange of halides via SN2 using NaI in acetone.\nR-Cl + NaI (acetone) → R-I + NaCl↓\nWhy it works (Le Chatelier): NaCl and NaBr are insoluble in acetone and precipitate out, driving equilibrium toward product. NaI is soluble in acetone. Used to convert alkyl chlorides or bromides to iodides. Classic example of using equilibrium + solubility to drive an otherwise reversible SN2 reaction.",
      formula: 'R-X + NaI (acetone) → R-I + NaX↓ (X = Cl, Br)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-023',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'What are the 4 factors that determine SN1 vs SN2 vs E1 vs E2?' },
    back: {
      text: '1. Substrate: 1° → SN2 only; 2° → SN2/E2 (base) or SN1/E1 (weak base); 3° → E2 (strong base) or SN1/E1 (weak base)\n2. Nucleophile/Base: strong base → E2; strong nucleophile + polar aprotic → SN2; weak base/nucleophile → SN1/E1\n3. Solvent: polar aprotic (DMSO, DMF) → SN2; polar protic (H2O, ROH) → SN1/E1\n4. Temperature: higher temp → more elimination (E vs S); lower temp → more substitution',
    },
    tags: ['nucleophilic-substitution', 'elimination', 'CHEM008A'],
  },
  {
    id: 'sub-024',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Why does SN2 fail for tertiary alkyl halides?' },
    back: {
      text: "Steric hindrance. In SN2, the nucleophile must approach the electrophilic carbon from the back (180° to LG) through the three remaining substituents. In a tertiary substrate (3 alkyl groups), these three groups create a 'wall' that blocks the nucleophile's path to carbon. The activation energy becomes prohibitively high — the transition state is too crowded. E2 elimination competes instead: the base abstracts a β-H (more accessible than the α-carbon itself).",
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-025',
    deckId: 'sn1-sn2-e1-e2',
    category: 'stereochemistry',
    front: { text: 'meso compound + SN2 — what is the stereochemical outcome?' },
    back: {
      text: 'A meso compound has an internal plane of symmetry making it achiral despite having stereocenters. SN2 at one of the stereocenters inverts that center. The result is a chiral compound (the internal plane of symmetry is destroyed). Example: meso-2,3-dibromobutane treated with Nu⁻ at C2 (SN2) → (2R,3R) or (2S,3S) product depending on which face is attacked. Because only one center is inverted, the symmetry is broken and the product is optically active.',
    },
    tags: ['nucleophilic-substitution', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-026',
    deckId: 'sn1-sn2-e1-e2',
    category: 'reagent',
    front: { text: 'Which of these is a stronger nucleophile in polar aprotic solvent: F⁻, Cl⁻, Br⁻, I⁻?' },
    back: {
      text: 'In polar aprotic solvent: I⁻ > Br⁻ > Cl⁻ > F⁻\nPolarizability increases down the group → larger, more polarizable anions are stronger nucleophiles (better at sharing electron density with the electrophile in the TS).\nNote: in polar PROTIC solvents the order inverts (F⁻ most nucleophilic) because small ions are more heavily solvated by H-bonding, reducing their effective nucleophilicity. But in aprotic solvents, solvation is minimal and polarizability dominates.',
      formula: 'Polar aprotic: I⁻ > Br⁻ > Cl⁻ > F⁻',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-027',
    deckId: 'sn1-sn2-e1-e2',
    category: 'named-reaction',
    front: { text: 'What is the Williamson ether synthesis?' },
    back: {
      text: 'Williamson ether synthesis: SN2 reaction of an alkoxide ion with a primary alkyl halide (or tosylate) to form an ether.\nR-O⁻ + R\'CH2-X → R-O-CH2R\' + X⁻\nKey points:\n1. Must use primary (or methyl) alkyl halide — secondary gives poor yield (E2 competes); tertiary fails\n2. Alkoxide (RO⁻) is a strong nucleophile AND strong base\n3. The alcohol is deprotonated with NaH or Na metal to form the alkoxide first\nExample: (CH3)3CO⁻ + CH3I → (CH3)3C-O-CH3 (tert-butyl methyl ether)',
      formula: 'RO⁻ + R\'X (1°) → R-O-R\' (Williamson ether)',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'sub-028',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Why does E2 require anti-periplanar geometry (180° H-C-C-LG dihedral)?' },
    back: {
      text: 'E2 is concerted — the base removes β-H while the C-LG bond breaks and the C=C pi bond forms, all in one step. For the pi bond to form, the p-orbitals on Cα and Cβ must overlap. This requires the p-orbitals to be parallel (coplanar). The p-orbital at Cβ develops as H leaves; the p-orbital at Cα develops as LG leaves. Anti-periplanar geometry (180°) provides perfect orbital alignment for simultaneous bond breaking and pi bond formation. Syn-periplanar (0°) is also geometrically possible but much rarer (sterically unfavorable).',
    },
    tags: ['elimination', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-029',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: "What alkene product does E2 give from (1R,2R)-1-bromo-1,2-diphenylethane with KOtBu?" },
    back: {
      text: 'Need anti-periplanar H and Br. In (1R,2R) isomer, the anti relationship gives Br and H on opposite faces. E2 with base removes the anti-periplanar H → trans-stilbene (E)-PhCH=CHPh is the product. Stereochemical analysis: anti elimination of H and Br from the (1R,2R) isomer gives the E alkene. From (1R,2S) [meso] isomer, anti elimination gives Z alkene (cis-stilbene). The stereochemistry of the starting material determines which geometric isomer of alkene is produced.',
      formula: '(1R,2R) + KOtBu → E-stilbene (trans)',
    },
    tags: ['elimination', 'stereochemistry', 'CHEM008A'],
  },
  {
    id: 'sub-030',
    deckId: 'sn1-sn2-e1-e2',
    category: 'mechanism-step',
    front: { text: 'Summary: the SN1/SN2/E1/E2 decision tree' },
    back: {
      text: 'Step 1 — Substrate:\n• 3° + strong base → E2\n• 3° + weak base/nucleophile → SN1/E1 (mix)\n• 3° + strong nucleophile → still E2 (too hindered for SN2)\n• 2° + strong base → E2; 2° + strong Nu + polar aprotic → SN2; 2° + weak/protic → SN1/E1\n• 1° + strong Nu → SN2 almost always; 1° + strong bulky base → E2 possible\n• Methyl → SN2 only\n\nStep 2 — Temperature: high temp shifts toward elimination\nStep 3 — Solvent: polar aprotic → SN2/E2; polar protic → SN1/E1',
    },
    tags: ['nucleophilic-substitution', 'elimination', 'CHEM008A'],
  },
];

export const sn1Sn2E1E2Deck: Deck = {
  id: 'sn1-sn2-e1-e2',
  title: 'SN1 / SN2 / E1 / E2',
  description: 'Master substitution and elimination: mechanisms, stereochemistry, competition, and reaction prediction',
  courseId: 'CHEM008A',
  topicId: 'sn1-sn2',
  cardIds: [
    'sub-001', 'sub-002', 'sub-003', 'sub-004', 'sub-005',
    'sub-006', 'sub-007', 'sub-008', 'sub-009', 'sub-010',
    'sub-011', 'sub-012', 'sub-013', 'sub-014', 'sub-015',
    'sub-016', 'sub-017', 'sub-018', 'sub-019', 'sub-020',
    'sub-021', 'sub-022', 'sub-023', 'sub-024', 'sub-025',
    'sub-026', 'sub-027', 'sub-028', 'sub-029', 'sub-030',
  ],
  icon: '🔄',
};
