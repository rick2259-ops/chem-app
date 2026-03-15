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
        'Explain carbocation rearrangements'
      ],
      tags: ['addition', 'stereochemistry'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 90
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
        'Distinguish Lindlar vs Na/NH3 reduction'
      ],
      tags: ['addition'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 60
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
        'Predict syn vs anti dihydroxylation products'
      ],
      tags: ['oxidation-reduction'],
      mechanismIds: [],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 75
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
        'Determine structure from spectral data'
      ],
      tags: ['spectroscopy'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 90
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
        'Explain aldol condensation mechanism'
      ],
      tags: ['carbonyl'],
      mechanismIds: ['aldol'],
      flashcardDeckIds: ['reagents', 'named-reactions'],
      estimatedMinutes: 120
    }
  ]
};
