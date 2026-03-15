import { Flashcard, Deck } from '@/types/flashcard';

export const reagentCards: Flashcard[] = [
  {
    id: 'rg-001',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does NaBH4 (sodium borohydride) do?', formula: 'NaBH4' },
    back: {
      text: 'NaBH4 is a mild reducing agent that reduces aldehydes and ketones to alcohols. It does NOT reduce esters, carboxylic acids, or amides under normal conditions. Delivers hydride (H⁻) to the electrophilic carbonyl carbon. Used in protic solvents (MeOH, EtOH). Useful for selective reduction in the presence of other carbonyl groups.',
      formula: 'Aldehyde → 1° alcohol; Ketone → 2° alcohol',
    },
    tags: ['oxidation-reduction', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'rg-002',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does LiAlH4 (lithium aluminum hydride) do?', formula: 'LiAlH4' },
    back: {
      text: 'LiAlH4 is a strong reducing agent that reduces essentially all carbonyl-containing functional groups: aldehydes, ketones, esters, carboxylic acids, amides, and acid chlorides to alcohols (or amines from amides). Must use anhydrous ethereal solvents (THF, Et2O) — reacts violently with water. More powerful than NaBH4. Commonly followed by aqueous workup.',
      formula: 'Ester → 1° alcohol; Amide → amine; RCOOH → 1° alcohol',
    },
    tags: ['oxidation-reduction', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'rg-003',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does OsO4 (osmium tetroxide) do?' },
    back: {
      text: 'OsO4 performs syn dihydroxylation of alkenes, adding two OH groups to the same face of the double bond. Forms a cyclic osmate ester intermediate, then cleaved by an oxidant (e.g., NMO in Upjohn conditions) or H2O2 to give a cis-diol. Since OsO4 is toxic and expensive, catalytic amounts are used with a co-oxidant (NMO). Gives opposite stereochemistry from mCPBA/H2O opening.',
      formula: 'Alkene → cis-1,2-diol (syn addition)',
    },
    tags: ['oxidation-reduction', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'rg-004',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does mCPBA (meta-chloroperoxybenzoic acid) do?' },
    back: {
      text: 'mCPBA is a peracid that epoxidizes alkenes by transferring an oxygen atom to the double bond. Reaction is syn (both atoms add to same face). The resulting epoxide can be opened by nucleophiles. Under acidic conditions, epoxide opens at more substituted carbon (Markovnikov). Under basic conditions, SN2-like attack at less hindered carbon. Opposite regiochemistry to acid-catalyzed opening.',
      formula: 'Alkene → epoxide (syn O addition)',
    },
    tags: ['oxidation-reduction', 'addition', 'CHEM008B'],
  },
  {
    id: 'rg-005',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does KMnO4 (potassium permanganate) do to alkenes?' },
    back: {
      text: 'KMnO4 is a strong oxidizing agent with two modes depending on conditions. Cold, dilute KMnO4 (basic, 0°C): syn dihydroxylation → cis-diol (same as OsO4 but less selective). Hot, concentrated KMnO4 or with acidic workup: oxidative cleavage of double bond. Terminal alkene → CO2; internal alkene cleavage gives carboxylic acids from disubstituted carbons, ketones from trisubstituted.',
      formula: 'Cold/dilute → cis-diol; Hot/conc → cleavage products',
    },
    tags: ['oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'rg-006',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does PCC (pyridinium chlorochromate) do?' },
    back: {
      text: 'PCC oxidizes primary alcohols to aldehydes (stops at aldehyde, does not over-oxidize to carboxylic acid) and secondary alcohols to ketones. Does NOT oxidize tertiary alcohols (no alpha-H on the OH-bearing carbon). Used in CH2Cl2. A mild Cr(VI) reagent. Compare: Jones reagent (CrO3/H2SO4) oxidizes primary alcohols all the way to carboxylic acids.',
      formula: '1° ROH → RCHO; 2° ROH → R2C=O',
    },
    tags: ['oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'rg-007',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does H2/Pd-C (catalytic hydrogenation) do?' },
    back: {
      text: 'Catalytic hydrogenation adds H2 across multiple bonds using a heterogeneous catalyst (Pd, Pt, or Ni on carbon). Syn addition: both hydrogens add to the same face of the alkene. Reduces alkenes → alkanes and alkynes → alkenes (or alkanes with excess H2). Lindlar catalyst (Pd/BaSO4 + quinoline) reduces alkynes specifically to cis-alkenes. Na/NH3 (Birch-type) gives trans-alkenes.',
      formula: 'Alkene + H2 → alkane (syn addition)',
    },
    tags: ['addition', 'oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'rg-008',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does HBr do to an alkene and what is Markovnikov\'s rule?' },
    back: {
      text: "HBr adds across C=C via electrophilic addition. Markovnikov's rule: H adds to the carbon with MORE hydrogens (less substituted), and Br adds to the carbon with FEWER hydrogens (more substituted). This is because the more substituted carbocation intermediate is more stable. Anti-Markovnikov addition (H adds to more substituted carbon) occurs with radical conditions (ROOR or hv, HBr).",
      formula: 'CH2=CHR + HBr → CH3-CHBr-R (Markovnikov)',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'rg-009',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does Br2 in CCl4 do to an alkene?' },
    back: {
      text: 'Br2 in an inert solvent (CCl4 or CH2Cl2) adds across alkenes via anti addition through a bromonium ion intermediate. The bromonium ion forms on one face of the alkene, and the nucleophilic Br⁻ attacks from the opposite face (backside attack), giving trans (anti) addition of two bromine atoms. From a cyclic alkene, this gives the trans-diaxial dibromide. Also used as a test: Br2/CCl4 decolorizes in the presence of an alkene.',
      formula: 'Alkene + Br2 → anti-1,2-dibromide',
    },
    tags: ['addition', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'rg-010',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does Hg(OAc)2 / NaBH4 do? (oxymercuration-demercuration)' },
    back: {
      text: 'Oxymercuration-demercuration adds water across an alkene with Markovnikov regiochemistry (OH on more substituted carbon) but WITHOUT carbocation rearrangements. Step 1: mercuric acetate adds to alkene via mercurinium ion (similar to bromonium), and water attacks the more substituted carbon. Step 2: NaBH4 reduces C-Hg to C-H. Net result: Markovnikov hydration with no rearrangement.',
      formula: 'Alkene → Markovnikov alcohol (no rearrangement)',
    },
    tags: ['addition', 'CHEM008B'],
  },
  {
    id: 'rg-011',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does 9-BBN / H2O2, NaOH do? (hydroboration-oxidation)' },
    back: {
      text: 'Hydroboration-oxidation adds water across an alkene with anti-Markovnikov regiochemistry (OH on less substituted carbon) and syn stereochemistry (BH add to same face). Step 1: BH3 or 9-BBN adds B to less hindered carbon, H to more hindered (concerted syn addition). Step 2: H2O2/NaOH oxidizes C-B → C-OH with retention of configuration. Used to make anti-Markovnikov alcohols selectively.',
      formula: 'Alkene → anti-Markovnikov alcohol (syn addition)',
    },
    tags: ['addition', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'rg-012',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does O3 / Zn, H2O (or DMS) do? (ozonolysis)' },
    back: {
      text: 'Ozonolysis cleaves C=C double bonds. Reductive workup (Zn/H2O or DMS): aldehydes from terminal alkene carbons, ketones from internal disubstituted carbons. Oxidative workup (H2O2): aldehydes are further oxidized to carboxylic acids. Used to determine position of a double bond (and identify unknowns) by analyzing cleavage products. Triple bonds give carboxylic acids or CO2.',
      formula: 'Alkene + O3, then reductive workup → 2 carbonyl fragments',
    },
    tags: ['oxidation-reduction', 'CHEM008B'],
  },
  {
    id: 'rg-013',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What is a Grignard reagent and how is it used?' },
    back: {
      text: 'A Grignard reagent (RMgX) is an organomagnesium halide formed by reacting an alkyl/aryl halide with Mg metal in anhydrous ether. R group acts as a carbanion (powerful nucleophile and strong base). Adds to carbonyl groups: adds to aldehydes → secondary alcohol; ketones → tertiary alcohol; CO2 → carboxylic acid; esters → tertiary alcohol (2 equiv added). Must avoid water and protic solvents — Grignard is destroyed by proton sources.',
      formula: 'R-X + Mg → R-MgX; then + R\'CHO → R-CH(OH)-R\'',
    },
    tags: ['carbonyl', 'nucleophilic-substitution', 'CHEM008B'],
  },
  {
    id: 'rg-014',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does SOCl2 (thionyl chloride) do?' },
    back: {
      text: 'SOCl2 converts alcohols to alkyl chlorides with retention of configuration if going through tight ion pair, or inversion if SN2 pathway. Also converts carboxylic acids to acid chlorides (with pyridine as base to neutralize HCl). Mechanism for alcohol: forms chlorosulfite intermediate, then SN2 by Cl⁻ gives inversion, or ion pair gives retention. Byproducts (SO2, HCl) are gases, simplifying workup.',
      formula: 'ROH + SOCl2 → RCl; RCOOH + SOCl2 → RCOCl',
    },
    tags: ['nucleophilic-substitution', 'carbonyl', 'CHEM008A', 'CHEM008B'],
  },
  {
    id: 'rg-015',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does NaOEt / EtOH (sodium ethoxide) do in an E2 context?' },
    back: {
      text: 'NaOEt (sodium ethoxide) is a strong, moderately bulky base commonly used for E2 elimination reactions. Removes a beta-hydrogen anti-periplanar to the leaving group in a concerted single-step mechanism. Favors Zaitsev product (more substituted alkene) with typical substrates. Bulkier bases (e.g., KOtBu) favor Hofmann product (less substituted) by selectively deprotonating the least hindered beta-H.',
      formula: 'E2: base removes beta-H, leaving group leaves simultaneously',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  {
    id: 'rg-016',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does NaH (sodium hydride) do in organic synthesis?' },
    back: {
      text: 'NaH is a strong, non-nucleophilic base (hydride is too basic and bulky to be a good nucleophile). Deprotonates alcohols, thiols, amines, and weakly acidic C-H bonds (pKa < 35) to generate alkoxides, thiolates, and enolates. Commonly used to form alkoxides for Williamson ether synthesis (RONa + R\'X → ROR\'). Also used to generate enolates for alkylation reactions.',
      formula: 'ROH + NaH → RONa + H2; then RONa + R\'X → ROR\'',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A', 'CHEM008B'],
  },
  {
    id: 'rg-017',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does Na/NH3 (sodium in liquid ammonia) do to alkynes?' },
    back: {
      text: 'Na/NH3 (Birch-type conditions) reduces internal alkynes to trans-alkenes (E-alkenes) via a radical anion mechanism. Contrast with Lindlar catalyst (Pd/BaSO4/quinoline + H2) which gives cis-alkenes (Z-alkenes) from internal alkynes. These two methods allow selective synthesis of either alkene geometry from alkynes. Na/NH3 cannot reduce terminal alkynes (NH3 is too acidic — protonates the acetylide anion).',
      formula: 'Internal alkyne + Na/NH3 → trans-alkene',
    },
    tags: ['addition', 'stereochemistry', 'CHEM008B'],
  },
  {
    id: 'rg-018',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does AlCl3 (aluminum chloride) do in Friedel-Crafts reactions?' },
    back: {
      text: 'AlCl3 is a Lewis acid catalyst for Friedel-Crafts alkylation (R-Cl + ArH → Ar-R) and Friedel-Crafts acylation (RCOCl + ArH → Ar-COR). AlCl3 coordinates to the chloride of the alkyl or acyl chloride, generating a highly electrophilic carbocation or acylium ion that attacks the aromatic ring. Acylation is preferred synthetically because the product (ketone) does not undergo further reaction, avoiding polyalkylation problems.',
      formula: 'ArH + RCOCl / AlCl3 → Ar-COR (ketone)',
    },
    tags: ['aromatic', 'CHEM008C'],
  },
  {
    id: 'rg-019',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does NaNO2 / HCl at 0°C do to a primary amine?' },
    back: {
      text: 'NaNO2/HCl (nitrous acid, HNO2) at 0°C converts primary aromatic amines to diazonium salts (Ar-N≡N⁺ Cl⁻). The diazonium group is an excellent leaving group and can be replaced by CN (Sandmeyer with CuCN), Cl (CuCl), Br (CuBr), F (Balz-Schiemann, BF4⁻), OH (warming with H2O), or I (KI). Primary aliphatic amines give unstable diazonium salts that rapidly decompose to carbocations (useful for rearrangements).',
      formula: 'ArNH2 + NaNO2/HCl, 0°C → ArN2⁺ Cl⁻ (diazonium salt)',
    },
    tags: ['functional-groups', 'aromatic', 'CHEM008C'],
  },
  {
    id: 'rg-020',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does DIBAL-H (diisobutylaluminum hydride) do?' },
    back: {
      text: 'DIBAL-H is a bulky reducing agent that selectively reduces esters to aldehydes (at -78°C in toluene) by delivering one hydride and forming a stable tetrahedral alkoxide intermediate that does not react further at low temperature. Upon aqueous workup, the aldehyde is released. At room temperature, over-reduction to alcohol occurs. Also reduces nitriles to aldehydes. Useful for synthesizing aldehydes from esters without further reduction.',
      formula: 'Ester + DIBAL-H (-78°C) → aldehyde',
    },
    tags: ['oxidation-reduction', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'rg-021',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does Ph3P=CH2 (Wittig reagent / phosphonium ylide) do?' },
    back: {
      text: "The Wittig reaction converts carbonyl compounds (aldehydes/ketones) to alkenes by reacting with phosphorus ylides (R2C=PPh3). The reaction proceeds through a 4-membered oxaphosphetane intermediate that collapses to give alkene + Ph3P=O. Highly selective for C=C formation at the exact position of the original C=O. Stabilized ylides (with EWG) give E-alkenes; unstabilized ylides give Z-alkenes. Ph3P=O is the byproduct.",
      formula: 'R2C=O + R\'2C=PPh3 → R2C=CR\'2 + Ph3P=O',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'rg-022',
    deckId: 'reagents',
    category: 'reagent',
    front: { text: 'What does HNO3 / H2SO4 do to benzene? (nitration)' },
    back: {
      text: 'Nitration of benzene: H2SO4 protonates HNO3 to generate the nitronium ion (NO2⁺), a powerful electrophile. NO2⁺ attacks the pi system of benzene (electrophilic aromatic substitution) to form an arenium ion (sigma complex/Wheland intermediate). Loss of a proton restores aromaticity, giving nitrobenzene (ArNO2). The nitro group is a meta-director and ring-deactivator. Product can be reduced to an amine with Fe/HCl or H2/Pd.',
      formula: 'ArH + HNO3/H2SO4 → Ar-NO2 + H2O',
    },
    tags: ['aromatic', 'CHEM008C'],
  },
];

export const reagentsDeck: Deck = {
  id: 'reagents',
  title: 'Common Reagents',
  description: 'Key reagents and what they do — oxidizing agents, reducing agents, and reaction conditions',
  courseId: 'CHEM008B',
  cardIds: reagentCards.map(c => c.id),
  icon: '🧪',
};
