import { Course } from '@/types/course';

export const chem008b: Course = {
  id: 'CHEM008B',
  name: 'Organic Chemistry II',
  subtitle: 'Reactions & Spectroscopy',
  color: 'green',
  topics: [
    {
      id: 'alkene-addition',
      courseId: 'CHEM008B',
      title: 'Alkene Addition Reactions',
      description: 'Electrophilic addition to alkenes: hydrohalogenation, halogenation, hydration, and hydrogenation.',
      learningObjectives: [
        "Apply Markovnikov's rule to predict regiochemistry",
        'Predict syn vs anti addition products',
        'Draw mechanisms for electrophilic addition',
        'Explain carbocation rearrangements',
      ],
      tags: ['addition', 'stereochemistry'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '🧈',
          title: 'Margarine & Hydrogenation',
          description: 'Vegetable oils are full of C=C double bonds (unsaturated fats) — they\'re liquid at room temperature. Food companies add H2 across those double bonds (hydrogenation) to make them solid like butter. That\'s margarine. Partial hydrogenation accidentally creates trans fats, which clog arteries — the same reaction, different stereochemistry, very different health effects.',
        },
        {
          emoji: '🏥',
          title: 'Squalene → Cholesterol',
          description: 'Your liver synthesizes cholesterol from squalene through a cascade of alkene addition reactions. Enzymes add water and other groups across double bonds in a precise, stereospecific way. All your steroid hormones (testosterone, estrogen, cortisol) are ultimately made by alkene addition chemistry in your liver.',
        },
        {
          emoji: '🧴',
          title: 'Bromine Water Test',
          description: 'In the lab, bromine water (orange-brown) turns colorless when added to an alkene — bromine adds across the double bond (anti addition via bromonium ion). This is still used as a quick field test for unsaturation in food quality control, checking if fats have gone rancid.',
        },
      ],
    },
    {
      id: 'alkyne-reactions',
      courseId: 'CHEM008B',
      title: 'Alkyne Reactions',
      description: 'Addition reactions of alkynes, terminal alkyne acidity, and reductions.',
      learningObjectives: [
        'Compare alkyne reactivity to alkenes',
        'Predict Markovnikov and anti-Markovnikov hydration products',
        'Use sodium amide as base with terminal alkynes',
        'Distinguish Lindlar vs Na/NH3 reduction',
      ],
      tags: ['addition'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 60,
      realWorldExamples: [
        {
          emoji: '🔥',
          title: 'Acetylene Welding Torches',
          description: 'Acetylene (HC≡CH) burns at over 3,500°C when mixed with oxygen — hot enough to cut steel. The triple bond stores enormous energy. Welders use oxyacetylene torches daily. The same alkyne chemistry in your exam is powering construction, car manufacturing, and metal sculpture worldwide.',
        },
        {
          emoji: '💊',
          title: 'Birth Control Pills (Ethinyl Estradiol)',
          description: 'The most widely used oral contraceptive contains ethinyl estradiol — estrogen with a terminal alkyne (C≡CH) added. That alkyne makes the molecule resistant to liver metabolism, so it stays active longer in the body. A simple alkyne group transformed a natural hormone into an effective drug.',
        },
        {
          emoji: '🌿',
          title: 'Enediyne Antibiotics',
          description: 'Some of the most powerful antibiotics (calicheamicin, used in leukemia treatment) contain enediyne systems — chains with alternating double and triple bonds. These undergo a Bergman cyclization inside cancer cells, generating radical species that cut DNA. Triple bond chemistry as a cancer-killing weapon.',
        },
      ],
    },
    {
      id: 'oxidation-reduction',
      courseId: 'CHEM008B',
      title: 'Oxidation & Reduction',
      description: 'Oxidation states of carbon, common oxidizing agents (KMnO4, OsO4, mCPBA), and reducing agents (NaBH4, LiAlH4).',
      learningObjectives: [
        'Calculate oxidation states of carbon',
        'Predict products of oxidation with various reagents',
        'Choose appropriate reducing agent for functional group selectivity',
        'Predict syn vs anti dihydroxylation products',
      ],
      tags: ['oxidation-reduction'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 75,
      realWorldExamples: [
        {
          emoji: '🍺',
          title: 'Alcohol Metabolism (How You Get Drunk)',
          description: 'Ethanol (CH3CH2OH) is oxidized in two steps in your liver: alcohol → acetaldehyde (by alcohol dehydrogenase, ADH) → acetic acid (by aldehyde dehydrogenase, ALDH). Acetaldehyde is the toxic compound causing hangovers and nausea. People with reduced ALDH activity (common in East Asians) accumulate acetaldehyde faster — "Asian glow" is a biochemical oxidation problem.',
        },
        {
          emoji: '🍊',
          title: 'Vitamin C as an Antioxidant',
          description: 'Vitamin C (ascorbic acid) prevents oxidation of biological molecules by getting oxidized itself first — it\'s a sacrificial reducing agent. It reduces free radicals, keeps iron in its Fe2+ (usable) form for enzyme reactions, and regenerates vitamin E. Understanding reduction reactions explains why antioxidants protect cells.',
        },
        {
          emoji: '💉',
          title: 'Steroid Drug Synthesis',
          description: 'Pharmaceutical companies synthesize cortisone (anti-inflammatory) and other steroids using precise oxidation chemistry. Sharpless asymmetric epoxidation (using mCPBA-type reagents with chiral catalysts) creates specific stereocenters. This work earned a Nobel Prize and is used to make drugs treating asthma, arthritis, and allergies.',
        },
      ],
    },
    {
      id: 'nmr-spectroscopy',
      courseId: 'CHEM008B',
      title: 'NMR Spectroscopy',
      description: 'Proton and carbon NMR: chemical shifts, coupling constants, integration, and structure determination.',
      learningObjectives: [
        'Interpret 1H NMR: chemical shift, splitting pattern, integration',
        'Use 13C NMR to count unique carbons',
        'Apply the n+1 rule for splitting',
        'Determine structure from spectral data',
      ],
      tags: ['spectroscopy'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 90,
      realWorldExamples: [
        {
          emoji: '🏥',
          title: 'MRI Scans (Same Physics as NMR)',
          description: 'MRI (Magnetic Resonance Imaging) is literally NMR applied to your body. Instead of identifying chemical structures, it maps where hydrogen atoms are in your tissues. Fat, water, and muscle have different hydrogen environments — different chemical shifts — giving contrast in the image. The NMR you learn in lab is the same technology saving lives in hospitals.',
        },
        {
          emoji: '🍷',
          title: 'Wine Authentication & Fraud Detection',
          description: 'Expensive wines are routinely tested by NMR to detect counterfeiting. Authentic regional wines have specific isotope ratios and compound profiles detectable by NMR. Customs agencies have caught millions of dollars of fake wine using the same splitting patterns and chemical shifts you study in lab.',
        },
        {
          emoji: '💊',
          title: 'Confirming Drug Purity',
          description: 'Every pharmaceutical drug is verified by NMR before it reaches you. Chemists check that the correct structure was made (13C NMR), that it\'s pure (no extra peaks in 1H NMR), and that the correct stereoisomer was produced. NMR is the gold standard of structural confirmation — you\'re learning the language of quality control.',
        },
      ],
    },
    {
      id: 'carbonyl-chemistry',
      courseId: 'CHEM008B',
      title: 'Carbonyl Chemistry',
      description: 'Aldehydes, ketones, carboxylic acids and derivatives: nucleophilic addition and acyl substitution.',
      learningObjectives: [
        'Draw mechanisms for nucleophilic addition to aldehydes/ketones',
        'Compare reactivity of carboxylic acid derivatives',
        'Predict products of acyl substitution reactions',
        'Explain aldol condensation mechanism',
      ],
      tags: ['carbonyl'],
      mechanismIds: ['aldol'],
      flashcardDeckIds: ['reagents', 'named-reactions'],
      estimatedMinutes: 120,
      realWorldExamples: [
        {
          emoji: '🧴',
          title: 'Aspirin Synthesis',
          description: 'Aspirin (acetylsalicylic acid) is made by reacting salicylic acid with acetic anhydride — an acyl substitution reaction. The -OH group of salicylic acid attacks the electrophilic carbonyl of acetic anhydride, kicking out acetate as the leaving group. This is one of the most-performed reactions in history, and it\'s pure carbonyl chemistry.',
        },
        {
          emoji: '🧬',
          title: 'How Enzymes Build Proteins',
          description: 'Peptide bond formation (joining amino acids) is an acyl substitution reaction. The amine (-NH2) of one amino acid attacks the carbonyl carbon of another\'s carboxyl group (-COOH), expelling water. Your ribosome performs this exact nucleophilic addition/substitution millions of times per second to build every protein in your body.',
        },
        {
          emoji: '🍋',
          title: 'Aldol Reactions in Perfume & Flavor',
          description: 'The aldol condensation creates β-hydroxy carbonyl compounds and α,β-unsaturated carbonyls (like cinnamaldehyde — the smell of cinnamon). Perfumers use aldol chemistry to synthesize complex scent molecules. Citral (lemon scent) and ionone (violet, used in Chanel No. 5) are both made via aldol-type reactions.',
        },
      ],
    },
  ],
};
