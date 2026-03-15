import { chem008aQuestions } from './chem008a-quizzes';
import { chem008bQuestions } from './chem008b-quizzes';
import { chem008cQuestions } from './chem008c-quizzes';
import { Question } from '@/types/quiz';
import { CourseId, ReactionTag } from '@/types/course';

export const allQuestions: Question[] = [
  ...chem008aQuestions,
  ...chem008bQuestions,
  ...chem008cQuestions,
];

export const questionMap: Record<string, Question> = Object.fromEntries(
  allQuestions.map(q => [q.id, q])
);

export function getQuestion(id: string): Question | undefined {
  return questionMap[id];
}

export function getQuestionsByTopic(topicId: string): Question[] {
  return allQuestions.filter(q => q.topicId === topicId);
}

export function getQuestionsByCourse(courseId: CourseId): Question[] {
  return allQuestions.filter(q => q.courseId === courseId);
}

export function getQuestionsByDifficulty(difficulty: 1 | 2 | 3): Question[] {
  return allQuestions.filter(q => q.difficulty === difficulty);
}

export function getQuestionsByTag(tag: ReactionTag): Question[] {
  return allQuestions.filter(q => q.tags.includes(tag));
}

export function getQuizQuestions(topicId: string, count?: number): Question[] {
  const topicQuestions = getQuestionsByTopic(topicId);
  if (!count || count >= topicQuestions.length) return topicQuestions;
  // Shuffle and return requested count
  const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomQuestions(courseId: CourseId, count: number): Question[] {
  const courseQuestions = getQuestionsByCourse(courseId);
  const shuffled = [...courseQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, courseQuestions.length));
}

export {
  chem008aQuestions,
  chem008bQuestions,
  chem008cQuestions,
};
