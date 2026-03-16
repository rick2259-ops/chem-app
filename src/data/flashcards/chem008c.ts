import { Flashcard, Deck } from '@/types/flashcard';

export const chem008cCards: Flashcard[] = [
  // ── Aromaticity ──────────────────────────────────────────────────────────
  {
    id: 'c008c-001',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: "What is Hückel's rule for aromaticity?" },
    back: {
      text: "A cyclic, planar, fully conjugated compound is aromatic if it has 4n + 2 π electrons (n = 0, 1, 2, …). Examples: benzene (6e), naphthalene (10e), cyclopentadienyl anion (6e).",
    },
    tags: ['aromaticity', 'CHEM008C'],
  },
  {
    id: 'c008c-002',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What makes a compound antiaromatic?' },
    back: {
      text: 'Cyclic, planar, fully conjugated systems with 4n π electrons (n ≥ 1) are antiaromatic — destabilized relative to the open-chain analog. Example: cyclobutadiene (4π, n=1).',
    },
    tags: ['aromaticity', 'CHEM008C'],
  },
  {
    id: 'c008c-003',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'Why does benzene undergo substitution rather than addition reactions?' },
    back: {
      text: 'Addition would destroy the aromatic 6π system, losing ~36 kcal/mol of resonance stabilization. Electrophilic aromatic substitution (EAS) restores aromaticity after the electrophile attacks.',
    },
    tags: ['aromaticity', 'EAS', 'CHEM008C'],
  },
  // ── EAS Reactions ────────────────────────────────────────────────────────
  {
    id: 'c008c-004',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'What are ortho/para directors in EAS?' },
    back: {
      text: 'Electron-donating groups (–OH, –NH₂, –OR, alkyl) stabilize the arenium ion carbocation at ortho and para positions, directing the incoming electrophile there. Most are activating (faster than benzene).',
    },
    tags: ['EAS', 'directing-effects', 'CHEM008C'],
  },
  {
    id: 'c008c-005',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'What are meta directors in EAS?' },
    back: {
      text: 'Electron-withdrawing groups (–NO₂, –CN, –COOH, –SO₃H, –CHO) destabilize the arenium ion at ortho/para, so meta attack is least unfavorable. All meta directors are deactivating (slower than benzene).',
    },
    tags: ['EAS', 'directing-effects', 'CHEM008C'],
  },
  {
    id: 'c008c-006',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What is Friedel-Crafts alkylation and its major limitation?' },
    back: {
      text: 'An alkyl halide + Lewis acid (AlCl₃) generates a carbocation that attacks benzene. Limitation: polyalkylation occurs because the product is more reactive than starting material; carbocations can also rearrange.',
    },
    tags: ['EAS', 'Friedel-Crafts', 'CHEM008C'],
  },
  {
    id: 'c008c-007',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What is Friedel-Crafts acylation and why is it preferred over alkylation?' },
    back: {
      text: 'An acyl halide + AlCl₃ generates an acylium ion (resonance-stabilized, no rearrangement). The ketone product deactivates the ring → only mono-acylation. Reduction then gives an alkyl group cleanly.',
    },
    tags: ['EAS', 'Friedel-Crafts', 'CHEM008C'],
  },
  // ── Amines ───────────────────────────────────────────────────────────────
  {
    id: 'c008c-008',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'Why are amines basic? How does substitution affect basicity?' },
    back: {
      text: 'Amines donate the lone pair on N to a proton. Alkyl groups (electron-donating) increase basicity; aryl groups / EWG decrease basicity by delocalizing the lone pair into the ring or carbonyl.',
    },
    tags: ['amines', 'basicity', 'CHEM008C'],
  },
  {
    id: 'c008c-009',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What is the Gabriel synthesis and what does it make?' },
    back: {
      text: 'Potassium phthalimide (N–K⁺) undergoes SN2 with a primary alkyl halide, then hydrolysis releases a primary amine. Only 1° amines form — avoids over-alkylation.',
    },
    tags: ['amines', 'synthesis', 'CHEM008C'],
  },
  {
    id: 'c008c-010',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What is diazotization and what can diazonium salts do?' },
    back: {
      text: 'Primary aryl amines + NaNO₂/HCl (0–5 °C) → aryl diazonium salt (Ar–N₂⁺). Can be replaced by: –F (Balz-Schiemann), –Cl/–Br (Sandmeyer with CuX), –CN (CuCN), –OH (H₂O/Δ), –H (H₃PO₂), azo coupling (–N=N–Ar).',
    },
    tags: ['amines', 'diazonium', 'CHEM008C'],
  },
  // ── Carbohydrates ─────────────────────────────────────────────────────────
  {
    id: 'c008c-011',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is the difference between an aldose and a ketose?' },
    back: {
      text: "Aldoses have an aldehyde at C-1 (e.g., glucose). Ketoses have a ketone, usually at C-2 (e.g., fructose). Both can reduce Tollens' reagent if they can tautomerize to an aldehyde.",
    },
    tags: ['carbohydrates', 'CHEM008C'],
  },
  {
    id: 'c008c-012',
    deckId: 'chem008c',
    category: 'stereochemistry',
    front: { text: 'What are anomers and what is mutarotation?' },
    back: {
      text: 'Anomers differ only at C-1 (the anomeric carbon) formed during cyclization. α = OH axial (in glucose); β = OH equatorial. In solution the two forms interconvert via the open-chain form — this is mutarotation.',
    },
    tags: ['carbohydrates', 'stereochemistry', 'CHEM008C'],
  },
  {
    id: 'c008c-013',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'What is a glycosidic bond and how is it formed?' },
    back: {
      text: 'The anomeric –OH of one sugar reacts with an –OH of another in acid-catalyzed acetal formation, releasing water. The C–O–C linkage is a glycosidic bond (e.g., α-1,4 in maltose; β-1,4 in cellobiose).',
    },
    tags: ['carbohydrates', 'glycosidic-bond', 'CHEM008C'],
  },
  {
    id: 'c008c-014',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is the difference between a reducing and a non-reducing sugar?' },
    back: {
      text: "Reducing sugars have a free anomeric –OH (open-chain form available), so they reduce Cu²⁺ (Benedict's/Fehling's) or Ag⁺ (Tollens'). Sucrose is non-reducing because both anomeric carbons are locked in the glycosidic bond.",
    },
    tags: ['carbohydrates', 'CHEM008C'],
  },
  // ── Amino Acids & Proteins ───────────────────────────────────────────────
  {
    id: 'c008c-015',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is the general structure of an α-amino acid?' },
    back: {
      text: 'A central α-carbon bonded to: –NH₂ (amino group), –COOH (carboxyl group), –H, and –R (side chain). All proteinogenic amino acids (except glycine) are L-configuration (S at α-carbon for most).',
    },
    tags: ['amino-acids', 'CHEM008C'],
  },
  {
    id: 'c008c-016',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is the isoelectric point (pI) of an amino acid?' },
    back: {
      text: 'The pH at which the amino acid carries no net charge (exists as zwitterion). For simple AAs: pI = (pKa1 + pKa2)/2. Basic AAs (Lys, Arg, His) have pI > 7; acidic AAs (Asp, Glu) have pI < 7.',
    },
    tags: ['amino-acids', 'pI', 'CHEM008C'],
  },
  {
    id: 'c008c-017',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'What is a peptide bond and what are its special properties?' },
    back: {
      text: 'An amide bond (–CO–NH–) formed by condensation of the carboxyl of one AA with the amino of another. ~40% double-bond character due to resonance → planar, restricted rotation; trans conformation preferred.',
    },
    tags: ['amino-acids', 'peptide-bond', 'CHEM008C'],
  },
  {
    id: 'c008c-018',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'Name the four levels of protein structure.' },
    back: {
      text: '1° — amino acid sequence (peptide bonds). 2° — α-helix / β-sheet (H-bonds). 3° — overall 3D fold (hydrophobic core, disulfide bonds). 4° — multi-subunit assembly.',
    },
    tags: ['amino-acids', 'protein-structure', 'CHEM008C'],
  },
  // ── Lipids ────────────────────────────────────────────────────────────────
  {
    id: 'c008c-019',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is the difference between a saturated and unsaturated fatty acid?' },
    back: {
      text: 'Saturated FAs have no C=C (straight chain, pack tightly → solid at RT, e.g., palmitic acid). Unsaturated FAs have cis C=C (kinked chain, lower melting point → liquid at RT, e.g., oleic acid).',
    },
    tags: ['lipids', 'fatty-acids', 'CHEM008C'],
  },
  {
    id: 'c008c-020',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What is saponification?' },
    back: {
      text: 'Base hydrolysis (NaOH or KOH) of a triglyceride → glycerol + fatty acid carboxylate salts (soaps). Soap works because the carboxylate is hydrophilic and the alkyl chain is hydrophobic (micelle formation).',
    },
    tags: ['lipids', 'saponification', 'CHEM008C'],
  },
  {
    id: 'c008c-021',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What is a phospholipid and how does it form a bilayer?' },
    back: {
      text: 'Glycerol + 2 fatty acids + 1 phosphate-head group. The fatty acid tails are hydrophobic; the phosphate head is hydrophilic → amphipathic → self-assembles into a bilayer in water.',
    },
    tags: ['lipids', 'phospholipids', 'CHEM008C'],
  },
  // ── Diels-Alder ──────────────────────────────────────────────────────────
  {
    id: 'c008c-022',
    deckId: 'chem008c',
    category: 'named-reaction',
    front: { text: 'What are the two components of a Diels-Alder reaction?' },
    back: {
      text: 'A conjugated diene (4π) + a dienophile (2π, usually electron-poor alkene/alkyne). It is a [4+2] cycloaddition forming a 6-membered ring in a concerted pericyclic mechanism.',
    },
    tags: ['Diels-Alder', 'pericyclic', 'CHEM008C'],
  },
  {
    id: 'c008c-023',
    deckId: 'chem008c',
    category: 'mechanism-step',
    front: { text: 'Why must the diene be in the s-cis conformation for Diels-Alder?' },
    back: {
      text: 'The diene must adopt s-cis so that C-1 and C-4 are close enough in space to simultaneously bond to both ends of the dienophile. s-trans dienes cannot react.',
    },
    tags: ['Diels-Alder', 'conformation', 'CHEM008C'],
  },
  {
    id: 'c008c-024',
    deckId: 'chem008c',
    category: 'stereochemistry',
    front: { text: 'What is the endo rule in Diels-Alder reactions?' },
    back: {
      text: 'In bicyclic products, the endo product (dienophile substituents pointing toward the diene bridge) is the kinetic product due to secondary orbital interactions. The exo product is thermodynamically more stable but forms slower.',
    },
    tags: ['Diels-Alder', 'endo-rule', 'CHEM008C'],
  },
  {
    id: 'c008c-025',
    deckId: 'chem008c',
    category: 'stereochemistry',
    front: { text: 'What is the stereochemical outcome of the Diels-Alder reaction?' },
    back: {
      text: 'Syn addition: substituents on the dienophile retain their relative stereochemistry in the product (cis dienophile substituents → cis in product). Stereospecific because both bonds form on the same face simultaneously.',
    },
    tags: ['Diels-Alder', 'stereochemistry', 'CHEM008C'],
  },
  // ── Mixed 008C ────────────────────────────────────────────────────────────
  {
    id: 'c008c-026',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'Is pyridine aromatic? Is the lone pair on N part of the π system?' },
    back: {
      text: 'Yes, pyridine is aromatic (6π, Hückel). The lone pair on N is in an sp² orbital in the plane of the ring — NOT part of the π system. Pyridine is a weaker base than aliphatic amines (lone pair less available).',
    },
    tags: ['aromaticity', 'heterocycles', 'CHEM008C'],
  },
  {
    id: 'c008c-027',
    deckId: 'chem008c',
    category: 'stereochemistry',
    front: { text: 'What is the difference between a Fischer projection and a Haworth projection of glucose?' },
    back: {
      text: 'Fischer: 2D open-chain — horizontal bonds toward viewer, vertical bonds away. Haworth: hexagonal ring flat — groups below Fischer are drawn down in Haworth. Used to show ring form (pyranose/furanose).',
    },
    tags: ['carbohydrates', 'stereochemistry', 'CHEM008C'],
  },
  {
    id: 'c008c-028',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What stabilizes the α-helix secondary structure?' },
    back: {
      text: 'Intramolecular H-bonds between N–H of residue n and C=O of residue n+4, running parallel to the helix axis. Side chains point outward. ~3.6 residues per turn.',
    },
    tags: ['amino-acids', 'alpha-helix', 'CHEM008C'],
  },
  {
    id: 'c008c-029',
    deckId: 'chem008c',
    category: 'reagent',
    front: { text: 'What are the reagents for nitration of benzene?' },
    back: {
      text: 'Conc. HNO₃ + conc. H₂SO₄ → nitronium ion (NO₂⁺) as electrophile. NO₂⁺ attacks benzene → arenium ion → loss of H⁺ restores aromaticity → nitrobenzene. The –NO₂ group is a meta director.',
    },
    tags: ['EAS', 'nitration', 'reagents', 'CHEM008C'],
  },
  {
    id: 'c008c-030',
    deckId: 'chem008c',
    category: 'functional-group',
    front: { text: 'What are eicosanoids and where do they come from?' },
    back: {
      text: 'Eicosanoids (prostaglandins, thromboxanes, leukotrienes) are signaling lipids derived from arachidonic acid (20-carbon ω-6 polyunsaturated FA) via COX or lipoxygenase enzymes. NSAIDs (aspirin, ibuprofen) inhibit COX.',
    },
    tags: ['lipids', 'eicosanoids', 'CHEM008C'],
  },
];

export const chem008cDeck: Deck = {
  id: 'chem008c',
  title: 'CHEM 008C — Orgo III',
  description: 'Aromatic chemistry, amines, carbohydrates, amino acids, lipids, and Diels-Alder reactions',
  courseId: 'CHEM008C',
  cardIds: chem008cCards.map(c => c.id),
  icon: '🔬',
};
