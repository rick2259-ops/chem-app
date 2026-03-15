export type CourseId = 'CHEM008A' | 'CHEM008B' | 'CHEM008C';

export type ReactionTag =
  | 'nucleophilic-substitution'
  | 'elimination'
  | 'addition'
  | 'oxidation-reduction'
  | 'aromatic'
  | 'carbonyl'
  | 'stereochemistry'
  | 'spectroscopy'
  | 'functional-groups'
  | 'carbohydrates'
  | 'amino-acids';

export interface Course {
  id: CourseId;
  name: string;
  subtitle: string;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  courseId: CourseId;
  title: string;
  description: string;
  learningObjectives: string[];
  tags: ReactionTag[];
  mechanismIds: string[];
  flashcardDeckIds: string[];
  estimatedMinutes: number;
}
