import { UserProgress, TopicScore, StudySession } from '@/types/progress';
import { loadProgressFromSupabase, saveProgressToSupabase } from '@/lib/supabase/db';
import { getAuthUserId } from '@/lib/supabase/auth';

const STORAGE_KEY = 'ucr-chem-progress-v1';

function generateUserId(): string {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

const defaultProgress: UserProgress = {
  userId: generateUserId(),
  studySessions: [],
  topicScores: {},
  srsCards: {},
  studyStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: '',
    studiedDates: [],
  },
  preferences: {
    dailyGoalMinutes: 30,
    preferredStudyMode: 'mixed',
  },
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultProgress, userId: generateUserId() };
    return JSON.parse(stored) as UserProgress;
  } catch {
    return { ...defaultProgress, userId: generateUserId() };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
  // Background sync to Supabase — use auth UID if logged in
  const authUid = getAuthUserId();
  const syncProgress = authUid ? { ...progress, userId: authUid } : progress;
  saveProgressToSupabase(syncProgress);
}

/**
 * Call once on app boot to hydrate localStorage from Supabase.
 * If Supabase has a newer record (more quiz attempts) it wins.
 */
export async function hydrateProgressFromSupabase(): Promise<void> {
  if (typeof window === 'undefined') return;
  const local = loadProgress();
  const remote = await loadProgressFromSupabase(local.userId);
  if (!remote) return;

  // Prefer whichever has more study sessions (more complete data)
  const localSessions = local.studySessions.length;
  const remoteSessions = remote.studySessions.length;
  if (remoteSessions > localSessions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    } catch { /* quota */ }
  }
}

export function updateTopicScore(topicId: string, courseId: string, score: number): void {
  const progress = loadProgress();
  const existing = progress.topicScores[topicId];
  const today = new Date().toISOString().split('T')[0];

  const updated: TopicScore = existing
    ? {
        ...existing,
        quizAttempts: existing.quizAttempts + 1,
        bestScore: Math.max(existing.bestScore, score),
        latestScore: score,
        averageScore: Math.round(
          (existing.averageScore * existing.quizAttempts + score) / (existing.quizAttempts + 1)
        ),
        scoreHistory: [...existing.scoreHistory, { date: today, score }],
        lastStudied: today,
        masteryLevel: getMasteryLevel(Math.max(existing.bestScore, score)),
      }
    : {
        topicId,
        courseId: courseId as any,
        quizAttempts: 1,
        bestScore: score,
        latestScore: score,
        averageScore: score,
        scoreHistory: [{ date: today, score }],
        flashcardsReviewed: 0,
        lastStudied: today,
        masteryLevel: getMasteryLevel(score),
      };

  progress.topicScores[topicId] = updated;

  // Update streak
  const streak = progress.studyStreak;
  if (!streak.studiedDates.includes(today)) {
    streak.studiedDates.push(today);
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastStudyDate === yesterday) {
      streak.currentStreak += 1;
    } else if (streak.lastStudyDate !== today) {
      streak.currentStreak = 1;
    }
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
    streak.lastStudyDate = today;
  }

  saveProgress(progress);
}

export function getMasteryLevel(score: number) {
  if (score >= 90) return 'mastered';
  if (score >= 75) return 'proficient';
  if (score >= 55) return 'developing';
  if (score > 0) return 'novice';
  return 'not-started';
}

export function addStudySession(session: StudySession): void {
  const progress = loadProgress();
  progress.studySessions.push(session);
  // Keep only last 100 sessions
  if (progress.studySessions.length > 100) {
    progress.studySessions = progress.studySessions.slice(-100);
  }
  saveProgress(progress);
}
