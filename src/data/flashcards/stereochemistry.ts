import { Flashcard, Deck } from '@/types/flashcard';

export const stereochemistryCards: Flashcard[] = [
  {
    id: 'st-001',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is chirality and what makes a carbon chiral?' },
    back: {
      text: 'A molecule is chiral if it is non-superimposable on its mirror image. A carbon atom is a stereocenter (chiral center) when it bears four different substituents. Chiral molecules lack a plane of symmetry, axis of symmetry, or center of inversion. All amino acids (except glycine) are chiral. Chirality is crucial in biology — enzymes and receptors interact stereospecifically with only one enantiomer.',
      hint: '4 different substituents on carbon = stereocenter',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-002',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'How do you assign R or S configuration to a stereocenter?' },
    back: {
      text: 'CIP (Cahn-Ingold-Prelog) rules: (1) Assign priorities 1-4 to the four substituents based on atomic number of the attached atoms (highest atomic number = priority 1). For ties, proceed to next atoms. (2) Orient the molecule so priority 4 points away from you (back). (3) Trace a path from priority 1 → 2 → 3: clockwise = R (rectus); counterclockwise = S (sinister). If priority 4 is in front, reverse the assignment.',
      hint: 'CIP priorities → arrange 4 pointing back → 1→2→3 clockwise=R, counterclockwise=S',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-003',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the difference between enantiomers and diastereomers?' },
    back: {
      text: 'Enantiomers: non-superimposable mirror images. Have identical physical properties (except optical rotation — equal and opposite). React identically with achiral reagents. Differ in biological activity (e.g., (R)-thalidomide is sedative; (S)-thalidomide is teratogenic). Diastereomers: stereoisomers that are NOT mirror images of each other. Have different physical properties (mp, bp, solubility, Rf). Occur when a molecule has 2+ stereocenters and not all are inverted.',
      hint: 'Enantiomers = mirror images; Diastereomers = same connectivity, different stereocenters, not mirror images',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-004',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is a meso compound?' },
    back: {
      text: 'A meso compound has multiple stereocenters but is achiral (superimposable on its mirror image) due to an internal plane of symmetry. Example: meso-tartaric acid has (R) and (S) configurations at C2 and C3, but the molecule is achiral because the two halves are mirror images of each other. Meso compounds have 2 or more stereocenters and are optically inactive. They are distinct from the racemic mixture of the chiral enantiomers.',
      hint: 'Meso: stereocenters present but internal plane of symmetry makes molecule achiral',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-005',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'How do you assign E or Z configuration to an alkene?' },
    back: {
      text: 'E/Z (Entgegen/Zusammen) replaces cis/trans for alkenes. Apply CIP priority rules to the two groups on each carbon of the double bond. If the higher-priority groups on each carbon are on the SAME side of the double bond: Z (zusammen = together). If the higher-priority groups are on OPPOSITE sides: E (entgegen = opposite). Priority is assigned by atomic number: higher atomic number = higher priority. More comprehensive than cis/trans (works for all alkenes).',
      hint: 'Z = same side (zusammen); E = opposite sides (entgegen). CIP priorities determine which group is "higher"',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-006',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is optical rotation and what is a racemic mixture?' },
    back: {
      text: 'Optical rotation: chiral molecules rotate plane-polarized light. (+) or (d) enantiomers rotate light clockwise (dextrorotatory); (-) or (l) enantiomers rotate light counterclockwise (levorotatory). Specific rotation [α] is measured with a polarimeter. A racemic mixture (racemate) is a 50:50 mixture of two enantiomers — it has zero net optical rotation (the rotations cancel). Racemic mixtures cannot be separated by ordinary distillation/crystallization — need chiral methods.',
      hint: 'Racemic = 50:50 enantiomers → [α] = 0 (optically inactive overall)',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-007',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What are Fischer projections and how do you read them?' },
    back: {
      text: 'Fischer projections are 2D representations of stereocenters. Convention: the main carbon chain goes vertically (top = most oxidized carbon, e.g., CHO in sugars). Horizontal bonds come TOWARD the viewer; vertical bonds go AWAY from the viewer. To assign R/S: lowest priority group is usually on the horizontal (toward viewer) — if 1→2→3 is clockwise, assignment is opposite (S) because #4 is toward you. Rotate the molecule mentally or use shortcuts. D/L nomenclature for sugars: OH at bottom stereocenter pointing right = D.',
      hint: 'Fischer: horizontal = toward viewer; vertical = away. OH right at bottom = D-sugar',
    },
    tags: ['stereochemistry', 'carbohydrates', 'CHEM008A', 'CHEM008C'],
  },
  {
    id: 'st-008',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the maximum number of stereoisomers possible for a molecule with n stereocenters?' },
    back: {
      text: 'Maximum stereoisomers = 2ⁿ where n = number of stereocenters. Example: n=2 → max 4 stereoisomers (2 pairs of enantiomers, or enantiomeric pairs + meso). Reduced when symmetry creates meso compounds. For n=3: max 8 stereoisomers but some may be meso. In practice, molecules with many stereocenters can have vast numbers of stereoisomers: glucose (4 stereocenters) → 2⁴ = 16 possible stereoisomers (8 aldohexoses × 2 enantiomers each = 16 total, but biology uses D-forms).',
      hint: 'Max stereoisomers = 2ⁿ where n = number of stereocenters',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-009',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the stereochemical outcome of SN2 vs SN1 reactions?' },
    back: {
      text: 'SN2: complete inversion of configuration at the stereocenter (Walden inversion). Backside attack of nucleophile simultaneously with departure of leaving group. A single stereocenter → produces only one enantiomer (100% inversion). SN1: proceeds through a planar carbocation intermediate. Nucleophile can attack from either face → gives racemization (ideally 50:50 mixture of enantiomers). In practice, slightly less than 50% inversion product forms due to ion pair shielding (partial inversion).',
      hint: 'SN2 = inversion; SN1 = racemization (via planar carbocation)',
    },
    tags: ['stereochemistry', 'nucleophilic-substitution', 'CHEM008A'],
  },
  {
    id: 'st-010',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What does "syn" addition mean and which reactions are syn vs anti?' },
    back: {
      text: 'Syn addition: both new groups add to the same face of the double bond → cis relationship. Anti addition: new groups add to opposite faces → trans relationship. Syn: catalytic hydrogenation (H2/Pd), hydroboration-oxidation (BH3 then H2O2/NaOH), OsO4 dihydroxylation, mCPBA epoxidation, Diels-Alder. Anti: Br2 addition (bromonium → anti), HX addition (overall, through carbocation). The distinction is critical for predicting stereochemistry of cyclic substrates.',
      hint: 'Syn = same face (H2/Pd, OsO4, BH3); Anti = opposite faces (Br2, HX)',
    },
    tags: ['stereochemistry', 'addition', 'CHEM008B'],
  },
  {
    id: 'st-011',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the anti-periplanar requirement in E2 elimination?' },
    back: {
      text: 'In E2 elimination, the beta-hydrogen being removed and the leaving group must be anti-periplanar (180° dihedral angle) in the transition state. This allows optimal overlap of the breaking C-H and C-LG bonds with the forming pi bond. For cyclohexane systems: both H and LG must be axial (diaxial elimination only). If the H and LG cannot achieve anti-periplanar geometry, E2 is slow or impossible. This constraint predicts which beta-H is removed and the geometry of the resulting alkene.',
      hint: 'E2 requires anti-periplanar H and LG (180° dihedral); for cyclohexane, both must be axial',
    },
    tags: ['stereochemistry', 'elimination', 'CHEM008A'],
  },
  {
    id: 'st-012',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What are conformational isomers (conformers) and why does cyclohexane chair flip matter?' },
    back: {
      text: 'Conformational isomers are different spatial arrangements of a molecule that interconvert by rotation about single bonds (no bonds broken). Not true stereoisomers. For cyclohexane, the chair conformation is most stable (minimizes torsional and angle strain). Axial substituents experience 1,3-diaxial interactions; equatorial substituents are more stable. Chair flip interconverts axial ↔ equatorial for all substituents. Large groups prefer equatorial position. Critical for predicting reactivity of cyclohexane systems in E2 and nucleophilic additions.',
      hint: 'Chair conformers: axial = steric strain, equatorial = more stable. Chair flip: axial ↔ equatorial',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-013',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the endo rule in Diels-Alder reactions?' },
    back: {
      text: 'In Diels-Alder cycloadditions with bicyclic transition states (cyclic diene or dienophile), the endo product is kinetically favored. Endo orientation: the EWG substituents on the dienophile point TOWARD the diene (secondary orbital interactions stabilize the transition state). Exo: substituents point away. The endo product has substituents in a sterically more crowded position (cis to the newly formed ring junction in bicyclic products). Thermodynamically, the exo product is usually more stable but kinetics often favor endo under mild conditions.',
      hint: 'Endo rule: substituents on dienophile point toward diene → endo product kinetically favored',
    },
    tags: ['stereochemistry', 'addition', 'CHEM008C'],
  },
  {
    id: 'st-014',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is epimerization and where is it important biochemically?' },
    back: {
      text: 'Epimerization is the interconversion of two epimers — diastereomers that differ in configuration at only ONE of multiple stereocenters. Example: glucose and galactose are C4-epimers (differ only at C4 OH configuration). Biochemical importance: UDP-galactose 4-epimerase interconverts UDP-glucose and UDP-galactose in carbohydrate metabolism. Mutarotation in solution is anomeric epimerization at C1. Protein racemases can convert L-amino acids to D-amino acids.',
      hint: 'Epimers: diastereomers differing at exactly one stereocenter. Glucose/galactose = C4 epimers',
    },
    tags: ['stereochemistry', 'carbohydrates', 'amino-acids', 'CHEM008C'],
  },
  {
    id: 'st-015',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the CIP priority rule for double bonds and rings in assigning R/S?' },
    back: {
      text: 'For double bonds: the doubly-bonded atom is duplicated as a phantom atom. A C=C is treated as C bonded to (C,C) on both ends — each double bond carbon "sees" a phantom duplicate of the other. For a ring: trace both paths around the ring to find which gives higher priority substituents at the first point of difference. For aromatic rings, Kekulé structure is used (alternating single and double bonds). These rules allow unambiguous R/S assignment for any organic molecule.',
      hint: 'Double bond: duplicate both atoms as phantom atoms. Ring: trace both paths, pick higher priority path',
    },
    tags: ['stereochemistry', 'CHEM008A'],
  },
  {
    id: 'st-016',
    deckId: 'stereochemistry',
    category: 'stereochemistry',
    front: { text: 'What is the stereochemical difference between OsO4 dihydroxylation and mCPBA epoxidation followed by acid hydrolysis?' },
    back: {
      text: 'OsO4: syn dihydroxylation → both OH groups add to the SAME face → cis-diol. mCPBA: syn epoxidation → O adds to one face. Subsequent acid-catalyzed opening of epoxide → anti addition of H2O (nucleophile attacks from opposite face of O) → trans-diol. Therefore: OsO4 gives cis-diol; mCPBA + H3O⁺ gives trans-diol from the same alkene. For a cyclic alkene: OsO4 → cis-1,2-diol; mCPBA/H3O⁺ → trans-1,2-diol.',
      hint: 'OsO4 = cis-diol (syn,syn). mCPBA then acid = trans-diol (syn epox, anti opening)',
    },
    tags: ['stereochemistry', 'oxidation-reduction', 'CHEM008B'],
  },
];

export const stereochemistryDeck: Deck = {
  id: 'stereochemistry',
  title: 'Stereochemistry',
  description: 'Chirality, R/S configuration, E/Z nomenclature, and stereochemical outcomes of reactions',
  courseId: 'CHEM008A',
  cardIds: stereochemistryCards.map(c => c.id),
  icon: '🔄',
};
