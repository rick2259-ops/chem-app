import { CourseId } from './course';

export type MasteryLevel = 'not-started' | 'novice' | 'developing' | 'proficient' | 'mastered';

export interface UserProgress {
  userId: string;
  studySessions: StudySession[];
  topicScores: Record<string, TopicScore>;
  srsCards: Record<string, SRSCard>;
  studyStreak: StudyStreak;
  preferences: UserPreferences;
}

export interface TopicScore {
  topicId: string;
  courseId: CourseId;
  quizAttempts: number;
  bestScore: number;
  latestScore: number;
  averageScore: number;
  scoreHistory: { date: string; score: number }[];
  flashcardsReviewed: number;
  lastStudied: string;
  masteryLevel: MasteryLevel;
}

export interface StudySession {
  id: string;
  date: string;
  topicId: string;
  courseId: CourseId;
  activityType: 'quiz' | 'flashcards' | 'mechanism' | 'tutor';
  durationMinutes: number;
  score?: number;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  studiedDates: string[];
}

export interface WeakArea {
  topicId: string;
  topicTitle: string;
  courseId: CourseId;
  averageScore: number;
  reason: 'low-score' | 'not-practiced' | 'declining' | 'due-for-review';
  recommendedAction: 'quiz' | 'flashcards' | 'mechanism' | 'tutor';
}

export interface UserPreferences {
  dailyGoalMinutes: number;
  preferredStudyMode: 'flashcards' | 'quiz' | 'mixed';
}

export interface SRSCard {
  flashcardId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
  lastRating: 0 | 1 | 2 | 3;
}
