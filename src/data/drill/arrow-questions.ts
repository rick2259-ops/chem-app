// ─── Universal option sets ────────────────────────────────────────────────────
// Using consistent vocabulary so students learn the terms, not guess by position

export const FROM_OPTIONS = [
  { value: 'lone-pair',    label: 'Lone pair on nucleophile (N, O, X⁻)' },
  { value: 'pi-alkene',   label: 'π bond of alkene / aromatic ring' },
  { value: 'pi-carbonyl', label: 'π bond of C=O (carbonyl)' },
  { value: 'c-h-alpha',   label: 'C–H bond (alpha carbon)' },
  { value: 'c-lg-bond',   label: 'C–Leaving group bond (C–X, C–OTs…)' },
  { value: 'carbanion',   label: 'Carbanion / C–Metal bond (hydride, Grignard)' },
] as const;

export const TO_OPTIONS = [
  { value: 'sp3-carbon',      label: 'Electrophilic sp³ carbon (carbocation or C–LG)' },
  { value: 'carbonyl-carbon', label: 'Carbonyl carbon (C=O, electrophilic)' },
  { value: 'leaving-group',   label: 'Leaving group (departs with electrons)' },
  { value: 'proton',          label: 'Proton / acidic H (abstracted by base)' },
  { value: 'electrophile',    label: 'External electrophile (Br₂, NO₂⁺, Lewis acid)' },
  { value: 'base',            label: 'Base (accepts proton, lone pair on B)' },
] as const;

export type FromValue = typeof FROM_OPTIONS[number]['value'];
export type ToValue   = typeof TO_OPTIONS[number]['value'];

// ─── Question type ────────────────────────────────────────────────────────────

export interface ArrowQuestion {
  id: string;
  category: string;
  difficulty: 1 | 2 | 3;
  mechanismName: string;
  scenario: string;       // one sentence: what species are reacting
  context: string;        // 2-3 sentences: more detail on what's happening
  arrowLabel: string;     // "the FIRST curved arrow" or "the key curved arrow"
  correctFrom: FromValue;
  correctTo: ToValue;
  bondFormed: string;
  bondBroken: string;
  principle: string;      // one-line rule being illustrated
  explanation: string;    // full explanation shown after answering
}

// ─── Question bank ────────────────────────────────────────────────────────────

export const arrowQuestions: ArrowQuestion[] = [
  // ── SN2 ──────────────────────────────────────────────────────────────────
  {
    id: 'arr-001',
    category: 'SN2',
    difficulty: 1,
    mechanismName: 'SN2 Nucleophilic Substitution',
    scenario: 'NaCN attacks CH₃Br in DMSO (polar aprotic solvent).',
    context:
      'CN⁻ is a strong nucleophile with a lone pair on carbon. It approaches CH₃Br from the back — opposite the bromide leaving group. This is an SN2 reaction.',
    arrowLabel: 'the key curved arrow (the attack step)',
    correctFrom: 'lone-pair',
    correctTo: 'sp3-carbon',
    bondFormed: 'C–CN bond',
    bondBroken: 'C–Br bond',
    principle: 'Nucleophile (electron-rich) donates its lone pair to the electrophilic carbon (electron-poor).',
    explanation:
      'CN⁻ has a lone pair on its carbon atom. The electrophilic center is the carbon bearing the bromine — bromine is electronegative and pulls electron density away, making that carbon δ⁺. The arrow flows FROM the lone pair on CN⁻ TO the electrophilic carbon. Simultaneously, the C–Br bond breaks and Br⁻ leaves with both electrons.',
  },
  {
    id: 'arr-002',
    category: 'SN2',
    difficulty: 2,
    mechanismName: 'SN2 Nucleophilic Substitution',
    scenario: 'NaOH attacks (R)-2-bromobutane in acetone.',
    context:
      'OH⁻ is the nucleophile. The carbon bearing bromine is a secondary sp³ carbon — electrophilic because bromine withdraws electron density. SN2 proceeds with inversion of configuration.',
    arrowLabel: 'the first curved arrow',
    correctFrom: 'lone-pair',
    correctTo: 'sp3-carbon',
    bondFormed: 'O–C bond',
    bondBroken: 'C–Br bond',
    principle: 'In SN2, the nucleophile lone pair attacks the back lobe of the C–LG σ* orbital.',
    explanation:
      'The oxygen of OH⁻ carries lone pairs and is electron-rich (nucleophile). The carbon bonded to Br is electron-poor (electrophile). The first arrow goes FROM the lone pair on O TO the electrophilic carbon — forming the new O–C bond while the C–Br bond simultaneously breaks. This backside attack causes inversion of configuration at the stereocenter.',
  },

  // ── SN1 ──────────────────────────────────────────────────────────────────
  {
    id: 'arr-003',
    category: 'SN1 — Step 1: Ionization',
    difficulty: 1,
    mechanismName: 'SN1 Nucleophilic Substitution',
    scenario: '(CH₃)₃CBr ionizes in water (polar protic solvent).',
    context:
      'The first step of SN1 is ionization: the C–Br bond breaks heterolytically. Both electrons go with the more electronegative bromine. Water stabilizes both ions via hydrogen bonding.',
    arrowLabel: 'the ionization arrow (Step 1)',
    correctFrom: 'c-lg-bond',
    correctTo: 'leaving-group',
    bondFormed: 'none (bond only breaks)',
    bondBroken: 'C–Br bond (heterolytic cleavage)',
    principle: 'In SN1 step 1, the C–LG bond breaks; both electrons go to the leaving group.',
    explanation:
      'The C–Br bond is the electron source here — both electrons in that bond flow toward the more electronegative bromine atom, which departs as Br⁻. This leaves behind a tertiary carbocation. The arrow goes FROM the C–Br bond TO the Br (leaving group). This is heterolytic cleavage — both electrons go to one atom.',
  },
  {
    id: 'arr-004',
    category: 'SN1 — Step 2: Nucleophilic attack',
    difficulty: 2,
    mechanismName: 'SN1 Nucleophilic Substitution',
    scenario: 'Water attacks the tert-butyl carbocation formed in Step 1.',
    context:
      'After ionization, a planar carbocation forms. Water acts as a nucleophile, donating a lone pair to the empty p orbital. This is Step 2 of SN1.',
    arrowLabel: 'the nucleophilic attack arrow (Step 2)',
    correctFrom: 'lone-pair',
    correctTo: 'sp3-carbon',
    bondFormed: 'O–C bond',
    bondBroken: 'none (bond only forms)',
    principle: 'In SN1 step 2, any nucleophile can donate a lone pair to the empty orbital of the carbocation.',
    explanation:
      'The carbocation has an empty p orbital — it is highly electrophilic (electron-poor). Water has lone pairs on oxygen — it is nucleophilic (electron-rich). The arrow goes FROM the lone pair on oxygen TO the carbocation carbon. Attack from either face gives the product (hence racemization in SN1).',
  },

  // ── E2 ───────────────────────────────────────────────────────────────────
  {
    id: 'arr-005',
    category: 'E2 Elimination',
    difficulty: 2,
    mechanismName: 'E2 Elimination',
    scenario: 'KO-t-Bu (strong, bulky base) reacts with 2-bromobutane.',
    context:
      'E2 is concerted: three things happen simultaneously. In the key arrow flow, the base abstracts the anti-periplanar beta hydrogen. The electrons cascade through: base ← H, C–H → C=C, C–Br → Br⁻.',
    arrowLabel: 'the FIRST curved arrow (base abstracts the beta-H)',
    correctFrom: 'lone-pair',
    correctTo: 'proton',
    bondFormed: 'O–H bond (on the base)',
    bondBroken: 'C–H bond (beta carbon)',
    principle: 'In E2, the base abstracts a proton — its lone pair attacks the acidic beta-H.',
    explanation:
      'KO-t-Bu is a strong base. Its oxygen lone pair attacks the beta-H (anti-periplanar to Br). Arrow 1: lone pair on O → H (proton). Simultaneously, arrow 2: C–H bond electrons → form C=C (π bond). Arrow 3: C–Br bond electrons → Br⁻ (leaving group). All three arrows flow in one concerted step — that is the definition of E2.',
  },
  {
    id: 'arr-006',
    category: 'E2 Elimination',
    difficulty: 3,
    mechanismName: 'E2 Elimination',
    scenario: 'In E2, after the base abstracts H, the C–H bond electrons cascade.',
    context:
      'Once the base pulls the proton, the electrons from the C–H bond don\'t stay on carbon — they shift to form the new π bond between the alpha and beta carbons.',
    arrowLabel: 'the SECOND curved arrow (C–H electrons form the π bond)',
    correctFrom: 'c-h-alpha',
    correctTo: 'sp3-carbon',
    bondFormed: 'C=C π bond (alkene)',
    bondBroken: 'C–H bond (fully broken), C–Br bond (simultaneously)',
    principle: 'In E2, C–H bond electrons flow to form the alkene π bond as the leaving group departs.',
    explanation:
      'As the base pulls H away, the electrons in the C–H bond cascade: FROM the C–H bond (alpha carbon) TO the adjacent carbon (alpha), forming the π bond of the alkene. Simultaneously the C–Br bond breaks and Br⁻ leaves. The C–H bond here IS the alpha bond relative to the leaving group — in textbooks this is often called the "beta" C–H.',
  },

  // ── Proton transfer ───────────────────────────────────────────────────────
  {
    id: 'arr-007',
    category: 'Acid-Base / Proton Transfer',
    difficulty: 1,
    mechanismName: 'Proton Transfer',
    scenario: 'A carboxylate ion (CH₃COO⁻) is protonated by H₃O⁺.',
    context:
      'The carboxylate is the base here — it accepts a proton from the hydronium ion. This is a simple proton transfer, the most common elementary step in organic chemistry.',
    arrowLabel: 'the proton transfer arrow',
    correctFrom: 'lone-pair',
    correctTo: 'proton',
    bondFormed: 'O–H bond (on carboxylate oxygen)',
    bondBroken: 'O–H bond (on H₃O⁺)',
    principle: 'In every proton transfer, a lone pair on the base attacks the acidic proton.',
    explanation:
      'The carboxylate oxygen has a lone pair and is electron-rich (base). The proton on H₃O⁺ is electron-poor (electrophile). The arrow goes FROM the lone pair on the carboxylate oxygen TO the proton. This is the most fundamental arrow in organic chemistry — lone pair attacks proton — and it appears as a sub-step in almost every mechanism.',
  },
  {
    id: 'arr-008',
    category: 'Acid-Base / Proton Transfer',
    difficulty: 2,
    mechanismName: 'Alpha-deprotonation (Enolization)',
    scenario: 'LDA (strong base) deprotonates the alpha carbon of acetone.',
    context:
      'LDA is a strong, hindered base that deprotonates C–H bonds alpha to carbonyls. The alpha-H is slightly acidic because the resulting carbanion is stabilized by the adjacent C=O.',
    arrowLabel: 'the deprotonation arrow',
    correctFrom: 'c-h-alpha',
    correctTo: 'base',
    bondFormed: 'N–H bond (on LDA nitrogen)',
    bondBroken: 'C–H bond (alpha carbon)',
    principle: 'Bases abstract alpha-H because the C–H bond electrons can be stabilized by the adjacent carbonyl.',
    explanation:
      'The C–H bond at the alpha carbon is the electron source — those two electrons flow toward the nitrogen of LDA (the base). The arrow goes FROM the C–H bond TO the base (LDA nitrogen). This breaks the C–H bond, forming a carbanion at alpha-C, stabilized by resonance with the C=O group — forming the enolate.',
  },

  // ── Nucleophilic addition to carbonyl ─────────────────────────────────────
  {
    id: 'arr-009',
    category: 'Nucleophilic Addition to Carbonyl',
    difficulty: 1,
    mechanismName: 'Reduction with NaBH₄',
    scenario: 'NaBH₄ reduces acetaldehyde (CH₃CHO) in methanol.',
    context:
      'Hydride (H⁻) from NaBH₄ is the nucleophile — a carbanion equivalent. The carbonyl carbon is electrophilic because oxygen pulls electron density away via the C=O π bond.',
    arrowLabel: 'the hydride attack arrow',
    correctFrom: 'carbanion',
    correctTo: 'carbonyl-carbon',
    bondFormed: 'C–H bond (at former carbonyl carbon)',
    bondBroken: 'C=O π bond (becomes C–O single bond)',
    principle: 'Hydride (H⁻) is a carbanion — its electrons attack the electrophilic carbonyl carbon.',
    explanation:
      'NaBH₄ delivers hydride (H⁻) — a carbanion. The carbonyl carbon is δ⁺ because O is electronegative and pulls electrons through the C=O π bond. Arrow: FROM the H–B bond (hydride) TO the carbonyl carbon. The C=O π bond electrons shift to oxygen, giving an alkoxide intermediate. This is the core step of all carbonyl reductions.',
  },
  {
    id: 'arr-010',
    category: 'Nucleophilic Addition to Carbonyl',
    difficulty: 2,
    mechanismName: 'Grignard Addition',
    scenario: 'CH₃MgBr (methylmagnesium bromide) attacks benzaldehyde.',
    context:
      'Grignard reagents are carbanions — the C–Mg bond is so polarized that carbon bears significant negative charge. The carbonyl carbon of benzaldehyde is electrophilic.',
    arrowLabel: 'the Grignard attack arrow',
    correctFrom: 'carbanion',
    correctTo: 'carbonyl-carbon',
    bondFormed: 'C–C bond (new carbon-carbon bond)',
    bondBroken: 'C=O π bond (becomes C–O single bond)',
    principle: 'Grignard reagents act as carbanions — carbon nucleophiles attacking electrophilic carbonyl carbon.',
    explanation:
      'The C–Mg bond in a Grignard is highly polar — Mg is electropositive, making carbon nucleophilic (carbanion character). Arrow: FROM the C–Mg bond (carbon end) TO the carbonyl carbon. The π electrons of C=O shift to O, forming an alkoxide. This is how Grignard reactions build new C–C bonds — the most powerful bond-forming tool in synthesis.',
  },
  {
    id: 'arr-011',
    category: 'Nucleophilic Addition to Carbonyl',
    difficulty: 2,
    mechanismName: 'Hemiacetal Formation',
    scenario: 'Methanol (CH₃OH) attacks the carbonyl of acetaldehyde under acid catalysis.',
    context:
      'After protonation of the carbonyl oxygen (by H⁺ catalyst), the carbonyl carbon becomes even more electrophilic. Methanol acts as a nucleophile.',
    arrowLabel: 'the nucleophilic attack arrow (oxygen attacks carbonyl)',
    correctFrom: 'lone-pair',
    correctTo: 'carbonyl-carbon',
    bondFormed: 'O–C bond',
    bondBroken: 'C=O π bond',
    principle: 'Any lone pair donor (alcohol, water, amine) can attack an electrophilic carbonyl carbon.',
    explanation:
      'Methanol\'s oxygen has lone pairs — it is a weak nucleophile, but acid catalysis makes the carbonyl carbon more electrophilic (protonation of O gives an oxocarbenium ion). Arrow: FROM the lone pair on methanol oxygen TO the carbonyl carbon. The C=O π electrons shift to oxygen. This is the first step of acetal/hemiacetal formation — a critical step in carbohydrate chemistry.',
  },

  // ── Electrophilic addition to alkene ──────────────────────────────────────
  {
    id: 'arr-012',
    category: 'Electrophilic Addition to Alkene',
    difficulty: 1,
    mechanismName: 'Markovnikov Addition of HBr (Step 1)',
    scenario: 'HBr adds to propene (CH₃CH=CH₂). Step 1: protonation of the alkene.',
    context:
      'The alkene π bond is electron-rich. The H of HBr is electrophilic (δ⁺). The π electrons attack the proton — this is electrophilic addition, Step 1.',
    arrowLabel: 'the first arrow (π bond attacks the proton)',
    correctFrom: 'pi-alkene',
    correctTo: 'proton',
    bondFormed: 'C–H bond (at the less-substituted carbon)',
    bondBroken: 'C=C π bond, H–Br bond',
    principle: 'Alkene π electrons are nucleophilic — they attack electrophiles (protons, Br₂, carbocations).',
    explanation:
      'The π bond of the alkene is the electron source — high electron density between the two carbons. The H of HBr is the electrophile (δ⁺ due to Br pulling electrons). Arrow: FROM the π bond TO the proton (H). The π electrons form the new C–H bond, the Br⁻ leaves, and a carbocation forms at the more substituted carbon (Markovnikov\'s rule). Step 2: Br⁻ attacks the carbocation.',
  },
  {
    id: 'arr-013',
    category: 'Electrophilic Addition to Alkene',
    difficulty: 2,
    mechanismName: 'Markovnikov Addition of HBr (Step 2)',
    scenario: 'Br⁻ attacks the secondary carbocation formed in Step 1.',
    context:
      'After protonation, a carbocation forms at the more substituted carbon. Br⁻ (released in Step 1) is a good nucleophile with lone pairs. Step 2 is just an SN1-like nucleophilic capture.',
    arrowLabel: 'the second arrow (Br⁻ attacks the carbocation)',
    correctFrom: 'lone-pair',
    correctTo: 'sp3-carbon',
    bondFormed: 'C–Br bond',
    bondBroken: 'none (bond only forms)',
    principle: 'After carbocation formation, any nucleophile donates a lone pair to the empty orbital.',
    explanation:
      'The carbocation has an empty p orbital — extremely electrophilic. Br⁻ has lone pairs — nucleophilic. Arrow: FROM lone pair on Br⁻ TO the carbocation (sp³ electrophilic carbon). This forms the product alkyl bromide. Notice Step 2 looks exactly like SN1 Step 2 — the carbocation is always the sink, and any nucleophile is the source.',
  },

  // ── EAS ───────────────────────────────────────────────────────────────────
  {
    id: 'arr-014',
    category: 'Electrophilic Aromatic Substitution — Step 1',
    difficulty: 2,
    mechanismName: 'EAS (Bromination of benzene)',
    scenario: 'Benzene reacts with Br₂/AlBr₃ (Lewis acid catalyst). Step 1: π attack.',
    context:
      'AlBr₃ activates Br₂ by pulling electron density toward Al, making one Br highly electrophilic. The benzene π system (6 electrons, electron-rich) attacks this electrophilic Br.',
    arrowLabel: 'the first arrow (benzene π system attacks Br)',
    correctFrom: 'pi-alkene',
    correctTo: 'electrophile',
    bondFormed: 'C–Br bond (one carbon of benzene)',
    bondBroken: 'Br–Br bond',
    principle: 'In EAS, the aromatic π system is the nucleophile — it attacks the external electrophile.',
    explanation:
      'Benzene\'s delocalized π electrons are electron-rich. The Br activated by AlBr₃ is electrophilic (Br–Br–AlBr₃ complex pulls electrons toward Al, making the near Br δ⁺). Arrow: FROM the aromatic π system TO the electrophilic Br. This forms the sigma complex (arenium ion). The aromaticity is temporarily lost — Step 2 (base abstracts H) restores it.',
  },
  {
    id: 'arr-015',
    category: 'Electrophilic Aromatic Substitution — Step 2',
    difficulty: 2,
    mechanismName: 'EAS (Rearomatization)',
    scenario: 'The arenium ion (sigma complex) loses H⁺ to regenerate aromaticity.',
    context:
      'After Br attacks benzene, one carbon becomes sp³ and has both H and Br. AlBr₄⁻ acts as a base and abstracts the proton, restoring aromaticity. This is the second step of all EAS reactions.',
    arrowLabel: 'the rearomatization arrow (C–H electrons restore the ring)',
    correctFrom: 'c-h-alpha',
    correctTo: 'base',
    bondFormed: 'H–AlBr₄⁻ (H is transferred to base)',
    bondBroken: 'C–H bond (sp³ carbon of arenium ion)',
    principle: 'In EAS step 2, the C–H bond at the sp³ center breaks — electrons restore aromaticity.',
    explanation:
      'The arenium ion has an sp³ carbon bearing H and Br. To restore aromaticity, this C–H bond must break. AlBr₄⁻ is the base. Arrow: FROM the C–H bond TO the base (AlBr₄⁻ nitrogen... wait, to Al or H on base). The electrons from C–H flow into the ring, restoring the aromatic π system. Simultaneously the ring regains aromaticity (huge thermodynamic driving force — ~36 kcal/mol resonance energy recovered).',
  },

  // ── Acyl substitution ─────────────────────────────────────────────────────
  {
    id: 'arr-016',
    category: 'Nucleophilic Acyl Substitution',
    difficulty: 3,
    mechanismName: 'Ester Formation from Acyl Chloride',
    scenario: 'Ethanol attacks acetyl chloride (CH₃COCl) to form an ester.',
    context:
      'Acyl chloride is highly electrophilic at the carbonyl carbon — both Cl and O withdraw electrons. Ethanol acts as the nucleophile. This is addition-elimination (tetrahedral intermediate).',
    arrowLabel: 'the first arrow (ethanol oxygen attacks carbonyl carbon)',
    correctFrom: 'lone-pair',
    correctTo: 'carbonyl-carbon',
    bondFormed: 'O–C bond (to carbonyl carbon)',
    bondBroken: 'C=O π bond (temporarily, forms tetrahedral intermediate)',
    principle: 'In acyl substitution, nucleophile attacks the carbonyl carbon — more electrophilic than a ketone because of the leaving group on carbon.',
    explanation:
      'Ethanol\'s oxygen has lone pairs. The carbonyl carbon of acetyl chloride is highly electrophilic: the C=O pulls electrons one way, and Cl further withdraws electrons. Arrow: FROM lone pair on O of ethanol TO the carbonyl carbon. The C=O π electrons shift to O, forming the tetrahedral intermediate. In step 2, those electrons push the Cl⁻ out as a leaving group, regenerating the carbonyl and forming the ester product.',
  },
];
