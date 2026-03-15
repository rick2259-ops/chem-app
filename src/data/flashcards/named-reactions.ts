import { Flashcard, Deck } from '@/types/flashcard';

export const namedReactionCards: Flashcard[] = [
  {
    id: 'nr-001',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Diels-Alder reaction?' },
    back: {
      text: 'A [4+2] cycloaddition between a conjugated diene (4 pi electrons) in s-cis conformation and a dienophile (alkene/alkyne, usually electron-poor). Concerted, one-step, pericyclic reaction. Syn addition on both components: endo rule applies (substituents prefer endo transition state). Forms a six-membered ring stereospecifically. Diene must be s-cis (locked or accessible). Electron-withdrawing groups on dienophile accelerate the reaction.',
      hint: 'Remember: diene + dienophile → cyclohexene (or cyclohexadiene with alkyne)',
    },
    tags: ['addition', 'stereochemistry', 'CHEM008C'],
  },
  {
    id: 'nr-002',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Aldol reaction?' },
    back: {
      text: 'An enolate (or enol) of one carbonyl compound acts as a nucleophile and adds to the carbonyl of another. Under base: enolate attacks aldehyde/ketone → beta-hydroxy carbonyl compound (aldol product). Aldol condensation: subsequent dehydration (base/heat) gives alpha,beta-unsaturated carbonyl. Cross-aldol: using two different carbonyls (one must lack alpha-H). Biologically relevant in glycolysis (aldolase splits fructose-1,6-bisphosphate).',
      hint: 'Aldol = ALDehyde + alcohOL (beta-hydroxy carbonyl)',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-003',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Grignard reaction?' },
    back: {
      text: 'Grignard reagents (RMgX) are organomagnesium halides formed from alkyl/aryl halides + Mg in anhydrous ether. R⁻ acts as nucleophile adding to electrophilic carbonyls. Products: formaldehyde → 1° alcohol; other aldehyde → 2° alcohol; ketone → 3° alcohol; ester → 3° alcohol (2 eq); CO2 → RCOOH. Cannot be used with protic groups (-OH, -NH, -COOH) as Grignard is destroyed.',
      hint: 'Grignard = carbanion nucleophile that attacks carbonyl carbon',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-004',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Wittig reaction?' },
    back: {
      text: "Wittig reaction converts aldehydes/ketones to alkenes using phosphorus ylides (R2C=PPh3). Ylide is formed from Ph3P + R2CHX, then base. Proceeds through a [2+2] cycloaddition forming a 4-membered oxaphosphetane, then retrocycloaddition gives alkene + Ph3P=O. Unstabilized ylides → Z-alkenes. Stabilized ylides (with EWG) → E-alkenes. Byproduct Ph3P=O is a strong P=O bond driving the reaction. Useful for making alkenes from carbonyls with known geometry.",
      hint: 'Wittig: carbonyl → alkene using ylide (R2C=PPh3)',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-005',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Friedel-Crafts acylation?' },
    back: {
      text: "Friedel-Crafts acylation: acyl chloride (RCOCl) + Lewis acid (AlCl3) + benzene → aryl ketone (Ar-CO-R). Generates acylium ion (RC≡O⁺) which attacks the aromatic ring via EAS. Preferred over alkylation because: (1) no carbocation rearrangement, (2) product doesn't undergo further acylation (deactivating ketone carbonyl). The product can be reduced to an alkane using Clemmensen (Zn/Hg, HCl) or Wolff-Kishner (NH2NH2, KOH, heat).",
      hint: 'Acylation with AlCl3 gives Ar-CO-R ketone; no polyacylation',
    },
    tags: ['aromatic', 'CHEM008C'],
  },
  {
    id: 'nr-006',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Hofmann elimination?' },
    back: {
      text: "Hofmann elimination occurs when a quaternary ammonium salt (R4N⁺ OH⁻) is heated. Bulky trimethylamino leaving group forces base to attack the least hindered beta-hydrogen, giving the less substituted (Hofmann, anti-Zaitsev) alkene. Compare to Zaitsev's rule (elimination with smaller base gives more substituted alkene). Important concept: bulky base/leaving group = Hofmann product; small base = Zaitsev product.",
      hint: 'Hofmann = less substituted alkene; Zaitsev = more substituted alkene',
    },
    tags: ['elimination', 'CHEM008A'],
  },
  {
    id: 'nr-007',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Gabriel synthesis?' },
    back: {
      text: 'Gabriel synthesis is a method for preparing primary amines free from secondary and tertiary amine contamination. Step 1: potassium phthalimide (acidic N-H, pKa ~8.3) is alkylated with alkyl halide via SN2. Step 2: hydrolysis of the phthalimide (acid or base, or hydrazine) releases the primary amine. The phthalimide nitrogen can only be mono-alkylated, ensuring a pure primary amine product. Used for simple primary amines where direct N-alkylation gives mixtures.',
      hint: 'Gabriel: phthalimide N-alkylation → pure primary amine after hydrolysis',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'nr-008',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Clemmensen reduction?' },
    back: {
      text: 'Clemmensen reduction converts carbonyl groups (aldehydes, ketones) to methylene groups (-CH2-) using zinc amalgam (Zn/Hg) in concentrated HCl. Used in acidic conditions — substrate must be acid-stable. Commonly used to deoxygenate Friedel-Crafts acylation products, converting Ar-CO-R → Ar-CH2-R (useful for attaching a chain of specific length to a benzene ring). Complementary to Wolff-Kishner reduction (base conditions).',
      hint: 'Clemmensen: C=O → CH2 using Zn/Hg, HCl (acidic conditions)',
    },
    tags: ['oxidation-reduction', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-009',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Sandmeyer reaction?' },
    back: {
      text: 'Sandmeyer reaction replaces the diazonium group (ArN2⁺) of an aryl diazonium salt with a halide or cyano group using copper(I) salts as catalysts. ArN2⁺ + CuCl → ArCl; ArN2⁺ + CuBr → ArBr; ArN2⁺ + CuCN → ArCN. The aryl diazonium salt is formed first from primary aromatic amine + HNO2 (NaNO2/HCl) at 0°C. Allows introduction of substituents that cannot be placed directly by EAS (e.g., F via Balz-Schiemann: ArN2⁺BF4⁻ → ArF).',
      hint: 'Sandmeyer: ArNH2 → ArN2⁺ → ArX using Cu(I) catalyst',
    },
    tags: ['aromatic', 'functional-groups', 'CHEM008C'],
  },
  {
    id: 'nr-010',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Williamson ether synthesis?' },
    back: {
      text: 'Williamson ether synthesis forms ethers via SN2: alkoxide ion (RO⁻, formed with NaH or NaOH) reacts with a primary alkyl halide. R-ONa + R\'CH2X → R-O-CH2R\' + NaX. The alkoxide must act as nucleophile (not the electrophile), and the alkyl halide should be primary or methyl to avoid competing E2 elimination. Tertiary alkyl halides cannot be used (give elimination). Used to make unsymmetrical ethers.',
      hint: 'Williamson: RO⁻ (nucleophile) + R\'X (primary, SN2) → ether',
    },
    tags: ['nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'nr-011',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is reductive amination?' },
    back: {
      text: 'Reductive amination converts an aldehyde or ketone to an amine in two steps: (1) condensation with a primary or secondary amine to form an imine (Schiff base) or iminium ion, and (2) reduction with NaBH3CN (sodium cyanoborohydride, mild enough to reduce iminium but not ketone) or NaBH(OAc)3. Overall: R2C=O + R\'NH2 → R2CH-NHR\'. Biologically important: amino acid biosynthesis, pyridoxal phosphate (PLP) dependent enzymes use this mechanism.',
      hint: 'Reductive amination: ketone/aldehyde + amine → imine → amine (NaBH3CN)',
    },
    tags: ['functional-groups', 'amino-acids', 'CHEM008C'],
  },
  {
    id: 'nr-012',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Claisen condensation?' },
    back: {
      text: 'Claisen condensation forms a beta-keto ester from two ester molecules (or an ester + ketone in Claisen-Schmidt). Step 1: base (NaOEt) deprotonates alpha-C of one ester to give enolate. Step 2: enolate attacks carbonyl of second ester. Step 3: loss of alkoxide leaving group gives beta-keto ester. Thermodynamic driving force: final deprotonation of acidic alpha-H between two carbonyls (pKa ~10-13). Biologically: thiolase in fatty acid beta-oxidation is a Claisen-type reaction.',
      hint: 'Claisen: 2 esters + base → beta-keto ester + alcohol (acyl substitution via enolate)',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-013',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Michael addition?' },
    back: {
      text: 'The Michael addition is a conjugate (1,4) addition of a nucleophile (Michael donor, typically an enolate or soft nucleophile) to an alpha,beta-unsaturated carbonyl compound (Michael acceptor). The nucleophile adds to the beta-carbon (the 4-position counting O=1). Products are 1,4-addition products. Contrasts with 1,2-addition (direct addition to carbonyl carbon) favored by hard nucleophiles. Soft nucleophiles (enolates, cuprates, thiols) prefer 1,4-Michael addition.',
      hint: 'Michael: nucleophile adds to beta-carbon of enone (conjugate/1,4 addition)',
    },
    tags: ['carbonyl', 'addition', 'CHEM008B'],
  },
  {
    id: 'nr-014',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Birch reduction?' },
    back: {
      text: 'Birch reduction converts benzene rings to 1,4-cyclohexadienes using alkali metal (Na or Li) in liquid ammonia with a proton source (alcohol). The aromatic ring is partially reduced: two H atoms are added, giving unconjugated 1,4-diene. Electron-donating substituents (EDG): reduction occurs away from substituent (substituent ends up on double bond). Electron-withdrawing substituents (EWG): reduction occurs at the substituent\'s carbon (substituent ends up on sp3 carbon).',
      hint: 'Birch: benzene + Na/NH3/ROH → 1,4-cyclohexadiene (partial reduction)',
    },
    tags: ['aromatic', 'oxidation-reduction', 'CHEM008C'],
  },
  {
    id: 'nr-015',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is the Wolff-Kishner reduction?' },
    back: {
      text: 'Wolff-Kishner reduction converts carbonyl groups (aldehydes/ketones) to methylene (-CH2-) groups using hydrazine (NH2NH2) followed by strong base (KOH) and heat. Step 1: hydrazone formation (R2C=O + NH2NH2 → R2C=N-NH2). Step 2: base-promoted loss of N2 and protonation gives R2CH2. Requires basic conditions — use for base-stable substrates. Complementary to Clemmensen (acidic). Together they convert Ar-CO-R → Ar-CH2-R.',
      hint: 'Wolff-Kishner: C=O → CH2 using NH2NH2 / KOH, heat (basic conditions)',
    },
    tags: ['oxidation-reduction', 'carbonyl', 'CHEM008B'],
  },
  {
    id: 'nr-016',
    deckId: 'named-reactions',
    category: 'named-reaction',
    front: { text: 'What is electrophilic aromatic substitution (EAS)?' },
    back: {
      text: 'EAS replaces a H on an aromatic ring with an electrophile while preserving aromaticity. General mechanism: (1) Electrophile (E⁺) attacks pi system → arenium ion (sigma complex/Wheland intermediate) — rate-determining step. (2) Base removes H⁺ from sp3 carbon → restores aromaticity. Examples: nitration (NO2⁺), halogenation (X2/FeX3), Friedel-Crafts alkylation (R⁺/AlCl3), acylation (RCO⁺/AlCl3), sulfonation (SO3/H2SO4).',
      hint: 'EAS: E⁺ attacks → arenium ion → proton loss restores aromaticity',
    },
    tags: ['aromatic', 'CHEM008C'],
  },
];

export const namedReactionsDeck: Deck = {
  id: 'named-reactions',
  title: 'Named Reactions',
  description: 'Key named reactions in organic chemistry: mechanism, conditions, and products',
  courseId: 'CHEM008B',
  cardIds: namedReactionCards.map(c => c.id),
  icon: '🔬',
};
