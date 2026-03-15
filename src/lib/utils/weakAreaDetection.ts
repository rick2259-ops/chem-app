import { UserProgress, WeakArea, TopicScore } from '@/types/progress';
import { courses } from '@/data/courses';

export function detectWeakAreas(progress: UserProgress): WeakArea[] {
  const weakAreas: WeakArea[] = [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

  for (const course of courses) {
    for (const topic of course.topics) {
      const score = progress.topicScores[topic.id];

      if (!score) {
        // Never practiced
        weakAreas.push({
          topicId: topic.id,
          topicTitle: topic.title,
          courseId: course.id,
          averageScore: 0,
          reason: 'not-practiced',
          recommendedAction: 'mechanism',
        });
      } else if (score.averageScore < 60) {
        // Low score
        weakAreas.push({
          topicId: topic.id,
          topicTitle: topic.title,
          courseId: course.id,
          averageScore: score.averageScore,
          reason: 'low-score',
          recommendedAction: 'quiz',
        });
      } else if (score.lastStudied < sevenDaysAgo) {
        // Not reviewed recently
        weakAreas.push({
          topicId: topic.id,
          topicTitle: topic.title,
          courseId: course.id,
          averageScore: score.averageScore,
          reason: 'due-for-review',
          recommendedAction: 'flashcards',
        });
      }
    }
  }

  // Sort: not-practiced first, then low-score, then due-for-review
  const priority: Record<string, number> = {
    'not-practiced': 0,
    'low-score': 1,
    'declining': 2,
    'due-for-review': 3,
  };
  weakAreas.sort(
    (a, b) => priority[a.reason] - priority[b.reason] || a.averageScore - b.averageScore
  );

  return weakAreas.slice(0, 6); // Return top 6
}

export function getCourseProgress(progress: UserProgress, courseId: string): number {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;

  const topicScores = course.topics.map(t => progress.topicScores[t.id]?.averageScore ?? 0);
  return Math.round(topicScores.reduce((a, b) => a + b, 0) / topicScores.length);
}
