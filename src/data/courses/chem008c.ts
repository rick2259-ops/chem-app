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
        'Explain activating and deactivating groups'
      ],
      tags: ['aromatic'],
      mechanismIds: ['electrophilic-aromatic'],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 90
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
        'Draw diazotization and Sandmeyer reactions'
      ],
      tags: ['functional-groups', 'nucleophilic-substitution'],
      mechanismIds: [],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 60
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
        'Compare structural roles of cellulose vs starch vs glycogen'
      ],
      tags: ['carbohydrates', 'functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 75
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
        'Distinguish primary through quaternary protein structure'
      ],
      tags: ['amino-acids', 'functional-groups'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 90
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
        'Describe roles of cholesterol in membranes'
      ],
      tags: ['functional-groups', 'oxidation-reduction'],
      mechanismIds: [],
      flashcardDeckIds: ['functional-groups'],
      estimatedMinutes: 60
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
        'Explain orbital symmetry basis for concerted reaction'
      ],
      tags: ['addition', 'stereochemistry'],
      mechanismIds: ['diels-alder'],
      flashcardDeckIds: ['named-reactions'],
      estimatedMinutes: 75
    }
  ]
};
