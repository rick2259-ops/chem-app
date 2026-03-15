import { Course } from '@/types/course';

export const chem008a: Course = {
  id: 'CHEM008A',
  name: 'Organic Chemistry I',
  subtitle: 'Structure, Bonding & Reactions',
  color: 'blue',
  topics: [
    {
      id: 'structure-bonding',
      courseId: 'CHEM008A',
      title: 'Structure & Bonding',
      description: 'Lewis structures, orbital hybridization (sp, sp2, sp3), bond angles, and molecular geometry.',
      learningObjectives: [
        'Draw Lewis structures for organic molecules',
        'Assign hybridization to carbon atoms',
        'Predict bond angles and molecular geometry',
        'Understand sigma vs pi bonds',
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 45,
      realWorldExamples: [
        {
          emoji: '💎',
          title: 'Diamond vs. Graphite',
          description: 'Both are pure carbon but feel completely different. Diamond uses sp3 carbon (tetrahedral, 109.5°) making it the hardest natural substance. Graphite uses sp2 carbon (flat, 120°) with loose pi electrons — which is why it slides and conducts electricity. Same atoms, different hybridization = totally different material.',
        },
        {
          emoji: '🧬',
          title: 'DNA Double Helix',
          description: 'The flat, sp2-hybridized bases in DNA (A, T, G, C) allow them to stack perfectly and form hydrogen bonds across the helix. If the bases were sp3 (tetrahedral), they couldn\'t stack or pair correctly — no DNA, no life.',
        },
        {
          emoji: '🫁',
          title: 'Oxygen Binding in Hemoglobin',
          description: 'The heme group in hemoglobin contains a flat, aromatic porphyrin ring made of sp2 carbons. This flat geometry is essential for the iron atom to sit correctly and grab oxygen molecules in your lungs.',
        },
      ],
    },
    {
      id: 'functional-groups',
      courseId: 'CHEM008A',
      title: 'Functional Groups & Nomenclature',
      description: 'IUPAC naming rules, common functional groups, and their chemical properties.',
      learningObjectives: [
        'Name alkanes, alkenes, alkynes using IUPAC rules',
        'Identify and name functional groups',
        'Convert between structural, condensed, and skeletal formulas',
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60,
      realWorldExamples: [
        {
          emoji: '💊',
          title: 'Aspirin (Ibuprofen)',
          description: 'Aspirin contains a carboxylic acid (-COOH) and an ester (-COO-) group. The ester makes it less irritating to the stomach than pure salicylic acid. When you swallow it, your body hydrolyzes the ester back to the active acid form — a functional group transformation happening inside you.',
        },
        {
          emoji: '🍷',
          title: 'Wine & Fermentation',
          description: 'Fermentation converts glucose (contains -OH hydroxyl groups) → ethanol (an alcohol, CH3CH2OH) + CO2. Then if wine is exposed to air, bacteria oxidize the alcohol to acetic acid (a carboxylic acid) — turning wine into vinegar. Three different functional groups, one process.',
        },
        {
          emoji: '☕',
          title: 'Caffeine',
          description: 'Caffeine contains amide bonds (-CONR2), amine groups (-NR2), and a double-ring aromatic system. The amide nitrogen lone pairs are delocalized into the carbonyl, making caffeine less basic than you\'d expect — that\'s why it doesn\'t taste bitter from basicity alone.',
        },
      ],
    },
    {
      id: 'stereochemistry',
      courseId: 'CHEM008A',
      title: 'Stereochemistry',
      description: 'Chirality, enantiomers, diastereomers, R/S configuration, E/Z isomerism, and optical activity.',
      learningObjectives: [
        'Identify stereocenters and assign R/S configuration',
        'Distinguish enantiomers from diastereomers',
        'Assign E/Z configuration to alkenes',
        'Understand optical rotation and Fischer projections',
      ],
      tags: ['stereochemistry'],
      mechanismIds: [],
      flashcardDeckIds: ['stereochemistry'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '💀',
          title: 'Thalidomide Tragedy',
          description: 'In the 1950s, thalidomide was given to pregnant women for morning sickness. The (R)-enantiomer was safe, but the (S)-enantiomer caused severe birth defects. The drug was a 50/50 mixture. Same molecular formula, mirror-image shapes — one healed, one harmed. This tragedy created modern drug safety testing.',
        },
        {
          emoji: '🍊',
          title: 'Limonene: Orange vs. Lemon',
          description: '(R)-limonene smells like oranges. (S)-limonene smells like lemons. They are mirror images with identical chemical formulas (C10H16). Your nose receptors are chiral, so they detect the difference. This is why chirality matters in perfume, food science, and drug design.',
        },
        {
          emoji: '🧬',
          title: 'All Life Uses L-Amino Acids',
          description: 'Every protein in your body is built from L-amino acids (S configuration at the alpha carbon). D-amino acids exist but your ribosomes can\'t use them. Some bacteria use D-amino acids in their cell walls specifically because human enzymes can\'t break them down — that\'s antibiotic resistance by stereochemistry.',
        },
      ],
    },
    {
      id: 'acids-bases',
      courseId: 'CHEM008A',
      title: 'Acids, Bases & Organic Reactions',
      description: 'pKa, Brønsted-Lowry and Lewis acid-base theory, resonance effects on acidity.',
      learningObjectives: [
        'Predict relative acidity using pKa values',
        'Apply inductive and resonance effects',
        'Use Henderson-Hasselbalch equation',
        'Identify Lewis acids and bases in organic reactions',
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60,
      realWorldExamples: [
        {
          emoji: '🩸',
          title: 'Blood pH Buffer System',
          description: 'Your blood must stay at pH 7.4. It uses carbonic acid (H2CO3, pKa 6.1) and bicarbonate (HCO3−) as a buffer. If blood pH drops to 7.0 (acidosis), you can die. Your lungs and kidneys constantly adjust CO2 and bicarbonate levels — Henderson-Hasselbalch in real time, keeping you alive.',
        },
        {
          emoji: '💊',
          title: 'Why Drug Ionization Matters',
          description: 'A drug crosses cell membranes only in its neutral (uncharged) form. Aspirin (pKa 3.5) is mostly neutral in stomach acid (pH 2) — so it\'s absorbed there. The same aspirin in intestinal fluid (pH 6-7) is mostly ionized (charged) and absorbed more slowly. Knowing pKa determines where your medication is absorbed.',
        },
        {
          emoji: '🥤',
          title: 'Soda Carbonation',
          description: 'Carbonated drinks contain dissolved CO2 forming carbonic acid (H2CO3). The fizz you feel on your tongue is acid triggering your taste receptors. When soda goes flat, CO2 escapes, the solution becomes less acidic, and the taste changes. Simple acid-base chemistry in every sip.',
        },
      ],
    },
    {
      id: 'sn1-sn2',
      courseId: 'CHEM008A',
      title: 'SN1 and SN2 Reactions',
      description: 'Nucleophilic substitution mechanisms, substrate effects, solvent effects, and stereochemical outcomes.',
      learningObjectives: [
        'Distinguish SN1 from SN2 mechanisms',
        'Predict stereochemical outcomes (inversion vs racemization)',
        'Choose between SN1 and SN2 based on substrate, nucleophile, and solvent',
        'Draw complete curved-arrow mechanisms',
      ],
      tags: ['nucleophilic-substitution', 'stereochemistry'],
      mechanismIds: ['sn1', 'sn2'],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '🧬',
          title: 'DNA Methylation (SN2 in Biology)',
          description: 'Enzymes called DNA methyltransferases use SN2 reactions to add a methyl group from SAM (S-adenosylmethionine) directly onto DNA bases. This epigenetic modification controls which genes are turned on or off — essentially SN2 chemistry regulating your entire gene expression.',
        },
        {
          emoji: '⚗️',
          title: 'Mustard Gas (Chemical Weapon)',
          description: 'Mustard gas works by SN2 reaction: its chloride leaving group is displaced by nitrogen atoms in DNA bases, crosslinking the two DNA strands. Cells can\'t replicate, causing blistering and cell death. Understanding SN2 helps explain why it was so devastating — and how antidotes work.',
        },
        {
          emoji: '💊',
          title: 'Drug Metabolism in the Liver',
          description: 'Cytochrome P450 enzymes in your liver use nucleophilic substitution to break down drugs. Some prodrugs are inactive until liver enzymes perform an SN2-type substitution to activate them. Codeine → morphine conversion in your liver is one example.',
        },
      ],
    },
    {
      id: 'e1-e2',
      courseId: 'CHEM008A',
      title: 'E1 and E2 Elimination Reactions',
      description: "Beta-elimination mechanisms, Zaitsev's rule, Hofmann elimination, and competition with substitution.",
      learningObjectives: [
        'Draw E1 and E2 mechanisms with curved arrows',
        "Apply Zaitsev's rule to predict major product",
        'Determine when elimination competes with substitution',
        'Identify anti-periplanar requirement in E2',
      ],
      tags: ['elimination', 'stereochemistry'],
      mechanismIds: ['e1', 'e2'],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 75,
      realWorldExamples: [
        {
          emoji: '🍺',
          title: 'Fermentation & Ethylene Production',
          description: 'Plants produce ethylene gas (CH2=CH2) by an elimination reaction from ACC (a cyclic amino acid). Ethylene is the plant hormone that triggers fruit ripening — that\'s why putting a ripe banana next to green fruit speeds up ripening. Industrial ethylene production also uses elimination (dehydration of ethanol).',
        },
        {
          emoji: '🧫',
          title: 'Steroid Biosynthesis',
          description: 'Your body synthesizes cholesterol and steroid hormones (testosterone, estrogen, cortisol) through a pathway with multiple elimination steps. Enzymes carefully control which proton is removed and from which face — E2-like selectivity built into biology.',
        },
        {
          emoji: '🛢️',
          title: 'Petroleum Cracking',
          description: 'Oil refineries use high-temperature elimination reactions to "crack" large alkane chains into smaller, more useful alkenes. These alkenes are the starting material for making plastics (polyethylene from ethylene), pharmaceuticals, and fuels. E1-type chemistry at industrial scale.',
        },
      ],
    },
  ],
};
