import { CourseId, ReactionTag } from './course';

export type QuestionType = 'multiple-choice' | 'short-answer';

export interface Question {
  id: string;
  topicId: string;
  courseId: CourseId;
  type: QuestionType;
  difficulty: 1 | 2 | 3;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  tags: ReactionTag[];
}

export interface QuizResult {
  id: string;
  topicId: string;
  courseId: CourseId;
  completedAt: string;
  durationSeconds: number;
  questions: QuestionAttempt[];
  score: number;
}

export interface QuestionAttempt {
  questionId: string;
  selectedIndex?: number;
  textAnswer?: string;
  isCorrect: boolean;
  aiScore?: number;
  aiFeedback?: string;
  timeSpentSeconds: number;
}
