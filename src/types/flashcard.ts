import { CourseId } from './course';

export type FlashcardCategory =
  | 'functional-group'
  | 'named-reaction'
  | 'reagent'
  | 'mechanism-step'
  | 'stereochemistry'
  | 'spectroscopy';

export interface Flashcard {
  id: string;
  deckId: string;
  category: FlashcardCategory;
  front: FlashcardFace;
  back: FlashcardFace;
  tags: string[];
}

export interface FlashcardFace {
  text: string;
  formula?: string;
  hint?: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  courseId: CourseId;
  topicId?: string;
  cardIds: string[];
  icon: string;
}

export interface SRSCard {
  flashcardId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
  lastRating: 0 | 1 | 2 | 3;
}
