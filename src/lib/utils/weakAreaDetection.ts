import { UserProgress, WeakArea } from '@/types/progress';
import { courses } from '@/data/courses';

export function detectWeakAreas(progress: UserProgress): WeakArea[] {
  const weakAreas: WeakArea[] = [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

  // Aggregate drill/flashcard/synthesis session scores by activity type
  const recentSessions = progress.studySessions.slice(-30);
  const mechanismSessions = recentSessions.filter(s => s.topicId === 'mechanism-drill' || s.topicId === 'arrow-pushing-drill');
  const flashcardSessions = recentSessions.filter(s => s.activityType === 'flashcards');
  const synthesisSessions = recentSessions.filter(s => s.topicId === 'synthesis');

  const avgScore = (sessions: typeof recentSessions) => {
    const withScore = sessions.filter(s => s.score != null);
    if (withScore.length === 0) return null;
    return Math.round(withScore.reduce((sum, s) => sum + (s.score ?? 0), 0) / withScore.length);
  };

  const mechanismAvg = avgScore(mechanismSessions);
  const flashcardAvg = avgScore(flashcardSessions);
  const synthesisAvg = avgScore(synthesisSessions);

  // Flag mechanism drill weakness
  if (mechanismSessions.length === 0) {
    weakAreas.push({
      topicId: 'mechanism-drill',
      topicTitle: 'Mechanism Drills',
      courseId: 'CHEM008A',
      averageScore: 0,
      reason: 'not-practiced',
      recommendedAction: 'mechanism',
    });
  } else if (mechanismAvg !== null && mechanismAvg < 60) {
    weakAreas.push({
      topicId: 'mechanism-drill',
      topicTitle: 'Mechanism Drills',
      courseId: 'CHEM008A',
      averageScore: mechanismAvg,
      reason: 'low-score',
      recommendedAction: 'mechanism',
    });
  }

  // Flag flashcard weakness
  if (flashcardSessions.length === 0) {
    weakAreas.push({
      topicId: 'flashcards',
      topicTitle: 'Flashcard Review',
      courseId: 'CHEM008A',
      averageScore: 0,
      reason: 'not-practiced',
      recommendedAction: 'flashcards',
    });
  } else if (flashcardAvg !== null && flashcardAvg < 60) {
    weakAreas.push({
      topicId: 'flashcards',
      topicTitle: 'Flashcard Review',
      courseId: 'CHEM008A',
      averageScore: flashcardAvg,
      reason: 'low-score',
      recommendedAction: 'flashcards',
    });
  }

  // Flag synthesis weakness
  if (synthesisSessions.length > 0 && synthesisAvg !== null && synthesisAvg < 60) {
    weakAreas.push({
      topicId: 'synthesis',
      topicTitle: 'Synthesis Problems',
      courseId: 'CHEM008A',
      averageScore: synthesisAvg,
      reason: 'low-score',
      recommendedAction: 'mechanism',
    });
  }

  for (const course of courses) {
    for (const topic of course.topics) {
      const score = progress.topicScores[topic.id];

      if (!score) {
        weakAreas.push({
          topicId: topic.id,
          topicTitle: topic.title,
          courseId: course.id,
          averageScore: 0,
          reason: 'not-practiced',
          recommendedAction: 'mechanism',
        });
      } else if (score.averageScore < 60) {
        weakAreas.push({
          topicId: topic.id,
          topicTitle: topic.title,
          courseId: course.id,
          averageScore: score.averageScore,
          reason: 'low-score',
          recommendedAction: 'quiz',
        });
      } else if (score.lastStudied < sevenDaysAgo) {
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

  const priority: Record<string, number> = {
    'not-practiced': 0,
    'low-score': 1,
    'declining': 2,
    'due-for-review': 3,
  };
  weakAreas.sort(
    (a, b) => priority[a.reason] - priority[b.reason] || a.averageScore - b.averageScore
  );

  return weakAreas.slice(0, 8);
}

export function getCourseProgress(progress: UserProgress, courseId: string): number {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;

  const topicScores = course.topics.map(t => progress.topicScores[t.id]?.averageScore ?? 0);
  return Math.round(topicScores.reduce((a, b) => a + b, 0) / topicScores.length);
}
