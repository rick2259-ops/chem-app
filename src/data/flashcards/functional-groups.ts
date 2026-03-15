import { Flashcard, Deck } from '@/types/flashcard';

export const functionalGroupCards: Flashcard[] = [
  {
    id: 'fg-001',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of an alcohol?', formula: 'R-OH' },
    back: {
      text: 'An alcohol contains a hydroxyl group (-OH) bonded to a saturated carbon. Named with the suffix -ol. Example: ethanol (CH3CH2OH). Alcohols are polar and can form hydrogen bonds, giving them higher boiling points than comparable alkanes.',
      formula: 'R-OH',
    },
    tags: ['functional-groups', 'CHEM008A'],
  },
  {
    id: 'fg-002',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of an aldehyde?', formula: 'RCHO' },
    back: {
      text: 'An aldehyde has a carbonyl group (C=O) at the end of a carbon chain, with at least one H directly on the carbonyl carbon. Named with the suffix -al. Example: acetaldehyde (ethanal, CH3CHO). Aldehydes are more reactive than ketones toward nucleophilic addition.',
      formula: 'R-CHO',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'fg-003',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of a ketone?', formula: 'RCOR\'' },
    back: {
      text: 'A ketone has a carbonyl group (C=O) flanked by two carbon groups. Named with the suffix -one. Example: acetone (propan-2-one, CH3COCH3). Less reactive than aldehydes toward nucleophilic addition due to steric hindrance and electronic effects.',
      formula: 'R-CO-R\'',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'fg-004',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of a carboxylic acid?', formula: 'RCOOH' },
    back: {
      text: 'A carboxylic acid has a carboxyl group (-COOH) containing both a carbonyl (C=O) and hydroxyl (-OH) on the same carbon. Named with the suffix -oic acid. Example: acetic acid (ethanoic acid, CH3COOH). pKa ~4-5, making them weak acids in aqueous solution.',
      formula: 'R-COOH',
    },
    tags: ['carbonyl', 'functional-groups', 'CHEM008B'],
  },
  {
    id: 'fg-005',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of an ester?', formula: 'RCOOR\'' },
    back: {
      text: 'An ester results from condensation of a carboxylic acid with an alcohol, losing water. Named as alkyl alkanoate. Example: ethyl acetate (CH3COOCH2CH3). Common in fats, oils, and fragrances. Less reactive than acid chlorides but more reactive than amides toward nucleophilic acyl substitution.',
      formula: 'R-COO-R\'',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'fg-006',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of an amide?', formula: 'RCONHR\'' },
    back: {
      text: 'An amide has a carbonyl group bonded to a nitrogen atom. Named with the suffix -amide. Example: acetamide (CH3CONH2). The least reactive carbonyl derivative because nitrogen lone pair donation into the carbonyl stabilizes it via resonance. Peptide bonds in proteins are amides.',
      formula: 'R-CO-NR\'R\'\'',
    },
    tags: ['carbonyl', 'amino-acids', 'CHEM008B', 'CHEM008C'],
  },
  {
    id: 'fg-007',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the general structure of an amine?', formula: 'RNH2 / R2NH / R3N' },
    back: {
      text: 'Amines contain nitrogen with one (primary), two (secondary), or three (tertiary) alkyl/aryl groups. Named using amino- prefix or -amine suffix. Example: methylamine (CH3NH2). Amines are weak bases (pKb ~3-4) that can act as nucleophiles due to the nitrogen lone pair.',
      formula: 'R-NH2',
    },
    tags: ['functional-groups', 'CHEM008C'],
  },
  {
    id: 'fg-008',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the difference between an alkene and an alkyne?' },
    back: {
      text: 'Alkenes contain at least one C=C double bond (sp2 carbons, 120° bond angles, planar geometry). Alkynes contain at least one C≡C triple bond (sp carbons, 180° bond angles, linear geometry). Both undergo addition reactions. Alkynes are more acidic at terminal positions (pKa ~25) due to increased s-character.',
    },
    tags: ['functional-groups', 'CHEM008A', 'CHEM008B'],
  },
  {
    id: 'fg-009',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is an ether and what are its properties?', formula: 'R-O-R\'' },
    back: {
      text: 'An ether has an oxygen atom bonded to two carbon groups (R-O-R\'). Named as alkoxy alkane or dialkyl ether. Example: diethyl ether (CH3CH2-O-CH2CH3). Relatively unreactive (no OH to donate H-bonds). Good solvents due to lone pairs on oxygen. Bent geometry around oxygen (~110°).',
      formula: 'R-O-R\'',
    },
    tags: ['functional-groups', 'CHEM008A'],
  },
  {
    id: 'fg-010',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is hybridization and what are the three types for carbon?' },
    back: {
      text: 'Hybridization is the mixing of atomic orbitals to form equivalent hybrid orbitals. sp3: 4 bonds, tetrahedral, 109.5° (alkanes). sp2: 3 bonds + 1 p orbital, trigonal planar, 120° (alkenes, carbonyls, aromatics). sp: 2 bonds + 2 p orbitals, linear, 180° (alkynes, nitriles). More s-character = shorter, stronger bonds, more acidic C-H.',
    },
    tags: ['functional-groups', 'CHEM008A'],
  },
  {
    id: 'fg-011',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is a thiol and how does it compare to an alcohol?', formula: 'R-SH' },
    back: {
      text: 'A thiol (mercaptan) has a sulfhydryl group (-SH) instead of -OH. More acidic than alcohols (pKa ~10 vs ~16) because S-H bond is weaker. Better nucleophiles than alcohols due to larger, more polarizable sulfur. Form disulfide bonds (-S-S-) important in protein structure (e.g., cysteine residues). Notorious for strong odors.',
      formula: 'R-SH',
    },
    tags: ['functional-groups', 'amino-acids', 'CHEM008C'],
  },
  {
    id: 'fg-012',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is an acid chloride and why is it so reactive?', formula: 'RCOCl' },
    back: {
      text: 'An acid chloride (acyl chloride) has a carbonyl group bonded to a chlorine atom. Most reactive carbonyl derivative. Chlorine is a poor electron donor by resonance but strong electron withdrawer by induction, making the carbonyl carbon highly electrophilic. Reacts vigorously with water, alcohols, and amines. Example: acetyl chloride (CH3COCl).',
      formula: 'R-CO-Cl',
    },
    tags: ['carbonyl', 'CHEM008B'],
  },
  {
    id: 'fg-013',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What are the NMR chemical shift ranges for common functional groups?' },
    back: {
      text: 'Approximate 1H NMR shifts (ppm): Alkyl C-H: 0.5–2.5. Allylic/benzylic: 1.5–3.0. Alkynyl C≡C-H: 1.7–3.3. Ether/alcohol O-CH: 3.3–4.5. Vinyl =C-H: 4.5–6.5. Aromatic Ar-H: 6.5–8.5. Aldehyde CHO: 9–10. Carboxylic acid COOH: 10–13. Alcohol OH: variable 1–5.',
    },
    tags: ['spectroscopy', 'CHEM008B'],
  },
  {
    id: 'fg-014',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is a hemiacetal and how is it formed?' },
    back: {
      text: 'A hemiacetal forms when one equivalent of alcohol adds to an aldehyde (or ketone → hemiketal). Product has both -OH and -OR on the same carbon. Readily formed under acidic or basic conditions but usually exists in equilibrium with starting materials. Intramolecular hemiacetal formation in sugars gives the cyclic (pyranose/furanose) ring forms of carbohydrates like glucose.',
      formula: 'R-CH(OH)(OR\')',
    },
    tags: ['carbonyl', 'carbohydrates', 'CHEM008B', 'CHEM008C'],
  },
  {
    id: 'fg-015',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is an epoxide and what makes it reactive?' },
    back: {
      text: 'An epoxide is a three-membered cyclic ether (oxirane). Highly strained ring (ring strain ~58 kJ/mol) makes it much more reactive than acyclic ethers. Opens readily under both acidic conditions (nucleophile attacks more substituted carbon, Markovnikov) and basic conditions (nucleophile attacks less hindered carbon, backside attack with inversion). Biosynthetically important (e.g., squalene epoxide in cholesterol synthesis).',
      formula: 'Epoxide: cyclic R-CH-CH2 with bridging O',
    },
    tags: ['functional-groups', 'addition', 'CHEM008B'],
  },
  {
    id: 'fg-016',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What distinguishes a primary, secondary, and tertiary alcohol?' },
    back: {
      text: 'Classification based on number of carbon substituents on the carbon bearing -OH. Primary (1°): one carbon attached (e.g., ethanol CH3CH2OH). Secondary (2°): two carbons (e.g., isopropanol (CH3)2CHOH). Tertiary (3°): three carbons (e.g., tert-butanol (CH3)3COH). Tertiary alcohols cannot be oxidized to aldehydes/ketones without C-C bond cleavage. Relevant for SN1/SN2/E1/E2 reactivity patterns.',
    },
    tags: ['functional-groups', 'CHEM008A'],
  },
  {
    id: 'fg-017',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What are the IR absorption frequencies for key functional groups?' },
    back: {
      text: 'Key IR absorptions (cm⁻¹): O-H stretch (alcohol): broad 3200–3550. N-H stretch: 3300–3500. C-H stretch: 2850–3000. C≡N nitrile: sharp ~2200. C≡C alkyne: ~2100–2260. C=O carbonyl: 1630–1870 (acid chloride ~1800, ester ~1735, aldehyde ~1725, ketone ~1715, amide ~1690). C=C alkene: ~1620–1680. C-O ether: 1000–1300.',
    },
    tags: ['spectroscopy', 'CHEM008B'],
  },
  {
    id: 'fg-018',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the isoelectric point (pI) of an amino acid?' },
    back: {
      text: 'The isoelectric point (pI) is the pH at which an amino acid carries no net charge (exists as zwitterion). Calculated as the average of the two pKa values flanking the neutral form. For simple amino acids: pI = (pKa1 + pKa2) / 2 ≈ (2.2 + 9.4) / 2 ≈ 5.8. Basic amino acids (Lys, Arg, His) have higher pI (~9-11). Acidic amino acids (Asp, Glu) have lower pI (~3).',
    },
    tags: ['amino-acids', 'CHEM008C'],
  },
  {
    id: 'fg-019',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the difference between anomers alpha and beta in glucose?' },
    back: {
      text: 'Anomers are cyclic carbohydrate stereoisomers differing only at the anomeric carbon (C1 in aldoses). In D-glucose Haworth projection: alpha-D-glucose has -OH at C1 pointing DOWN (axial in chair). Beta-D-glucose has -OH at C1 pointing UP (equatorial in chair). Beta form is more stable (~64% at equilibrium in water). In starch, alpha linkages create helical coils; in cellulose, beta linkages create straight chains.',
    },
    tags: ['carbohydrates', 'CHEM008C'],
  },
  {
    id: 'fg-020',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is resonance and how does it affect acidity/basicity?' },
    back: {
      text: 'Resonance is the delocalization of electrons across multiple atoms via overlapping p orbitals. Stabilization of a conjugate base by resonance increases acidity. Example: acetic acid (pKa 4.75) is much more acidic than ethanol (pKa 16) because the acetate anion is resonance-stabilized across two equivalent C-O bonds. Similarly, resonance-stabilized carbanions (enolates) and carbocations (allylic, benzylic) are more stable.',
    },
    tags: ['functional-groups', 'CHEM008A'],
  },
  {
    id: 'fg-021',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is a glycosidic bond?' },
    back: {
      text: 'A glycosidic bond is an acetal linkage between the anomeric carbon (C1) of one sugar and the hydroxyl group of another molecule (sugar, amino acid, lipid, etc.). Alpha glycosidic bonds (e.g., in maltose, starch) connect C1-OH down; beta glycosidic bonds (e.g., in cellobiose, cellulose) connect C1-OH up. Humans lack the enzyme (cellulase) to hydrolyze beta-1,4 glycosidic bonds of cellulose.',
    },
    tags: ['carbohydrates', 'CHEM008C'],
  },
  {
    id: 'fg-022',
    deckId: 'functional-groups',
    category: 'functional-group',
    front: { text: 'What is the peptide bond and what are its structural properties?' },
    back: {
      text: 'A peptide bond is an amide bond formed between the carboxyl group of one amino acid and the amino group of another, with loss of water. The C-N bond has partial double bond character due to resonance delocalization, making it planar and resistant to rotation. The peptide bond is ~40% double bond character, giving 6 atoms in the same plane. Exists predominantly in the trans configuration (bulky groups on opposite sides).',
      formula: '-CO-NH- (planar, ~120° bond angles)',
    },
    tags: ['amino-acids', 'CHEM008C'],
  },
];

export const functionalGroupsDeck: Deck = {
  id: 'functional-groups',
  title: 'Functional Groups & Concepts',
  description: 'Core functional group structures, properties, and key concepts across CHEM 008A/B/C',
  courseId: 'CHEM008A',
  cardIds: functionalGroupCards.map(c => c.id),
  icon: '⚗️',
};
