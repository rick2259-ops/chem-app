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
        'Understand sigma vs pi bonds'
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 45
    },
    {
      id: 'functional-groups',
      courseId: 'CHEM008A',
      title: 'Functional Groups & Nomenclature',
      description: 'IUPAC naming rules, common functional groups, and their chemical properties.',
      learningObjectives: [
        'Name alkanes, alkenes, alkynes using IUPAC rules',
        'Identify and name functional groups',
        'Convert between structural, condensed, and skeletal formulas'
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60
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
        'Understand optical rotation and Fischer projections'
      ],
      tags: ['stereochemistry'],
      mechanismIds: [],
      flashcardDeckIds: ['stereochemistry'],
      estimatedMinutes: 90
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
        'Identify Lewis acids and bases in organic reactions'
      ],
      tags: ['functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60
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
        'Draw complete curved-arrow mechanisms'
      ],
      tags: ['nucleophilic-substitution', 'stereochemistry'],
      mechanismIds: ['sn1', 'sn2'],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 90
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
        'Identify anti-periplanar requirement in E2'
      ],
      tags: ['elimination', 'stereochemistry'],
      mechanismIds: ['e1', 'e2'],
      flashcardDeckIds: ['reagents'],
      estimatedMinutes: 75
    }
  ]
};
