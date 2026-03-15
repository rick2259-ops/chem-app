import { Course } from '@/types/course';

export const chem008c: Course = {
  id: 'CHEM008C',
  name: 'Organic Chemistry III',
  subtitle: 'Biomolecules & Advanced Reactions',
  color: 'purple',
  topics: [
    {
      id: 'aromatic-chemistry',
      courseId: 'CHEM008C',
      title: 'Aromatic Chemistry',
      description: "Aromaticity (Hückel's rule), electrophilic aromatic substitution (EAS), and directing effects.",
      learningObjectives: [
        "Apply Hückel's rule to determine aromaticity",
        'Draw EAS mechanisms (nitration, halogenation, Friedel-Crafts)',
        'Predict ortho/para vs meta products using directing groups',
        'Explain activating and deactivating groups',
      ],
      tags: ['aromatic'],
      mechanismIds: ['electrophilic-aromatic'],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '🧬',
          title: 'DNA Bases Are Aromatic',
          description: 'Adenine, Guanine, Cytosine, and Thymine — the four DNA bases — are all aromatic molecules. Their flat, pi-electron-rich rings allow them to stack inside the DNA helix (pi stacking) and form specific hydrogen bonds. Without aromaticity, DNA couldn\'t store genetic information stably. You are reading this because of aromatic chemistry.',
        },
        {
          emoji: '💊',
          title: 'Aspirin, Ibuprofen & Most Drugs',
          description: 'Over 70% of FDA-approved drugs contain an aromatic ring. The benzene ring provides a rigid, flat scaffold that fits snugly into enzyme active sites and receptor binding pockets. Aromatic rings resist metabolism (they don\'t get oxidized easily), making drugs last longer in the body.',
        },
        {
          emoji: '🌶️',
          title: 'Capsaicin — Why Peppers Are Hot',
          description: 'Capsaicin (the compound that makes chili peppers burn) contains a phenol ring (aromatic with -OH) and a long fatty acid chain. It binds to TRPV1 pain receptors on your tongue. The aromatic ring is essential for binding — analogues without it don\'t activate the receptor. EAS directing effects determine where the -OH group ends up on the ring during synthesis.',
        },
      ],
    },
    {
      id: 'amines',
      courseId: 'CHEM008C',
      title: 'Amines',
      description: 'Amine structure, basicity, synthesis, and reactions including diazotization.',
      learningObjectives: [
        'Compare basicity of amines vs other nitrogen compounds',
        'Predict amine reactivity based on substituents',
        'Explain Gabriel synthesis and reductive amination',
        'Draw diazotization and Sandmeyer reactions',
      ],
      tags: ['functional-groups', 'nucleophilic-substitution'],
      mechanismIds: [],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 60,
      realWorldExamples: [
        {
          emoji: '🧠',
          title: 'Neurotransmitters Are Amines',
          description: 'Dopamine, serotonin, epinephrine (adrenaline), and histamine are all amines. Their basic nitrogen atoms are protonated at physiological pH, giving them a positive charge that helps them bind to charged receptor sites. Antidepressants (SSRIs like Prozac) and stimulants (Adderall = amphetamine) work by modifying amine neurotransmitter levels.',
        },
        {
          emoji: '🌿',
          title: 'Nicotine & Why It\'s Addictive',
          description: 'Nicotine contains two amine nitrogens — one in a pyridine ring (pKa 3.1, not very basic) and one in a pyrrolidine ring (pKa 8.0, more basic). At blood pH 7.4, the pyrrolidine is ~80% protonated. This charged form crosses the blood-brain barrier poorly, but the 20% neutral form crosses easily and activates nicotinic acetylcholine receptors, causing dopamine release.',
        },
        {
          emoji: '🎨',
          title: 'Azo Dyes — Color in Your Clothes',
          description: 'Most synthetic fabric dyes are azo dyes made via diazotization. An amine is treated with NaNO2/HCl (a Sandmeyer-type reaction) to form a diazonium ion, which couples with another aromatic ring to form a vivid N=N azo group. The same diazotization reaction in your exam creates the colors in your jeans, T-shirts, and food coloring (Red #40).',
        },
      ],
    },
    {
      id: 'carbohydrates',
      courseId: 'CHEM008C',
      title: 'Carbohydrates',
      description: 'Monosaccharides, disaccharides, polysaccharides, anomers, glycosidic bonds, and biological roles.',
      learningObjectives: [
        'Draw Fischer and Haworth projections of glucose',
        'Explain alpha vs beta anomers',
        'Describe glycosidic bond formation',
        'Compare structural roles of cellulose vs starch vs glycogen',
      ],
      tags: ['carbohydrates', 'functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 75,
      realWorldExamples: [
        {
          emoji: '🥛',
          title: 'Lactose Intolerance',
          description: 'Lactose is a disaccharide with a β-1,4-glycosidic bond between glucose and galactose. Lactase enzyme breaks this bond. People who lose lactase production after childhood (lactose intolerance — affects ~68% of humans) cannot digest lactose. Gut bacteria ferment it instead, producing gas and causing discomfort. One glycosidic bond explains a worldwide dietary phenomenon.',
        },
        {
          emoji: '🌲',
          title: 'Why You Can\'t Digest Wood',
          description: 'Cellulose (wood, paper, cotton) and starch (rice, bread) are both made of glucose — but cellulose uses β-1,4 bonds and starch uses α-1,4 bonds. Humans have amylase to break α-1,4 bonds but not β-1,4 bonds. Cows can digest grass because their gut bacteria produce cellulase. One bond orientation difference determines whether glucose is food or furniture.',
        },
        {
          emoji: '🏃',
          title: 'Glycogen — Your Emergency Fuel',
          description: 'When you exercise, your liver and muscles release glucose from glycogen (branched α-1,4 and α-1,6 glycosidic bonds). The branched structure (branch every ~10 glucose units) allows rapid mobilization — many enzyme binding sites simultaneously. Athletes who "carb load" are maximizing glycogen storage. The structure of the polymer determines the speed of energy release.',
        },
      ],
    },
    {
      id: 'amino-acids-proteins',
      courseId: 'CHEM008C',
      title: 'Amino Acids & Proteins',
      description: 'Amino acid structure, pKa, peptide bonds, protein structure levels, and enzyme catalysis basics.',
      learningObjectives: [
        'Draw all 20 amino acids and classify by side chain',
        'Calculate isoelectric point (pI)',
        'Describe peptide bond formation and hydrolysis',
        'Distinguish primary through quaternary protein structure',
      ],
      tags: ['amino-acids', 'functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '🩺',
          title: 'Sickle Cell Disease — One Amino Acid Change',
          description: 'Normal hemoglobin has glutamic acid (charged, hydrophilic) at position 6 of the beta chain. Sickle cell hemoglobin has valine (nonpolar, hydrophobic) instead — a single amino acid substitution. This makes hemoglobin molecules stick together under low oxygen, deforming red blood cells into a sickle shape. One amino acid change out of 287 causes a life-altering disease.',
        },
        {
          emoji: '💉',
          title: 'Insulin — Structure Determines Function',
          description: 'Insulin (51 amino acids) has three disulfide bridges (-S-S- between cysteine residues) that hold its shape. Without the correct tertiary structure, it can\'t bind the insulin receptor and you get diabetes. Pharmaceutical insulin is engineered by changing specific amino acids to make it work faster (lispro) or slower (glargine) — amino acid chemistry as medicine.',
        },
        {
          emoji: '🍖',
          title: 'Cooking Meat = Denaturing Proteins',
          description: 'Raw meat is chewy because proteins are in their native folded structure. Heat breaks hydrogen bonds, disrupts hydrophobic interactions, and unfolds the proteins (denaturation). The unfolded proteins aggregate, making cooked meat firm and easier to digest. Your stomach acid (pH ~2) further denatures proteins, unfolding them so pepsin can cleave peptide bonds.',
        },
      ],
    },
    {
      id: 'lipids',
      courseId: 'CHEM008C',
      title: 'Lipids & Membranes',
      description: 'Fatty acids, triglycerides, phospholipids, and membrane structure.',
      learningObjectives: [
        'Distinguish saturated from unsaturated fatty acids',
        'Draw triglyceride structure and saponification',
        'Explain phospholipid bilayer formation',
        'Describe roles of cholesterol in membranes',
      ],
      tags: ['functional-groups', 'oxidation-reduction'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60,
      realWorldExamples: [
        {
          emoji: '🧼',
          title: 'Soap Making (Saponification)',
          description: 'Soap is made by treating fats (triglycerides) with NaOH — saponification. The base hydrolyzes the ester bonds, releasing glycerol and three fatty acid carboxylate salts (soap). The soap molecule has a hydrophobic tail (the fatty acid chain) that surrounds grease, and a hydrophilic head (the carboxylate) that faces water. This dual nature lets soap lift oil off your skin.',
        },
        {
          emoji: '🫀',
          title: 'Omega-3s & Heart Health',
          description: 'Omega-3 fatty acids (in fish oil) have their first double bond 3 carbons from the methyl end, and the bonds are cis. This creates kinks in the chain that prevent tight packing, making membranes more fluid. Omega-3s reduce inflammation partly by competing with arachidonic acid (omega-6) in prostaglandin synthesis. The position and geometry of one double bond affects heart disease risk.',
        },
        {
          emoji: '🔬',
          title: 'Cell Membrane — Life\'s Barrier',
          description: 'Every cell in your body is wrapped in a phospholipid bilayer. Phospholipids spontaneously form bilayers because the hydrophobic tails hide from water while hydrophilic heads face it — thermodynamics drives self-assembly. Cholesterol inserts between phospholipids, preventing them from packing too tight (membrane too rigid) or too loose (membrane too fluid). Temperature, diet, and drugs all affect membrane chemistry.',
        },
      ],
    },
    {
      id: 'diels-alder',
      courseId: 'CHEM008C',
      title: 'Diels-Alder & Pericyclic Reactions',
      description: 'Concerted [4+2] cycloaddition, diene/dienophile requirements, stereospecificity, and endo rule.',
      learningObjectives: [
        'Identify s-cis diene conformation requirement',
        'Predict regio- and stereo-chemistry of Diels-Alder products',
        'Apply the endo rule',
        'Explain orbital symmetry basis for concerted reaction',
      ],
      tags: ['addition', 'stereochemistry'],
      mechanismIds: ['diels-alder'],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 75,
      realWorldExamples: [
        {
          emoji: '💊',
          title: 'Cortisone & Steroid Drug Synthesis',
          description: 'The first industrial synthesis of cortisone (anti-inflammatory steroid) used a Diels-Alder reaction as the key step to build the four-ring steroid skeleton in one reaction. Vitamin D, reserpine (blood pressure drug), and many antibiotics are synthesized using Diels-Alder reactions. It\'s one of the most powerful tools in pharmaceutical chemistry.',
        },
        {
          emoji: '🌞',
          title: 'Vitamin D Activation',
          description: 'When UV light hits your skin, it causes a retro-Diels-Alder reaction in 7-dehydrocholesterol, breaking the B-ring of the steroid skeleton to form pre-vitamin D3. Then a thermal [1,7]-sigmatropic shift gives vitamin D3. Sunscreen blocks this reaction — that\'s why people who never go outside can become vitamin D deficient.',
        },
        {
          emoji: '🐛',
          title: 'Insecticides (Aldrin & Dieldrin)',
          description: 'Aldrin (a powerful insecticide, now banned) was synthesized using a Diels-Alder reaction between hexachlorocyclopentadiene and norbornadiene. The reaction creates the exact polycyclic cage structure needed for insecticidal activity. Unfortunately, it was also highly toxic to birds and mammals — Rachel Carson\'s Silent Spring documented this, leading to modern pesticide regulation.',
        },
      ],
    },
  ],
};
