import { create } from 'zustand';
import { UserProgress, WeakArea } from '@/types/progress';
import { loadProgress, saveProgress } from '@/lib/storage/progressStorage';
import { detectWeakAreas, getCourseProgress } from '@/lib/utils/weakAreaDetection';

interface ProgressStore {
  progress: UserProgress;
  weakAreas: WeakArea[];
  isLoaded: boolean;
  loadFromStorage: () => void;
  updateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  getCourseScore: (courseId: string) => number;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: {
    userId: '',
    studySessions: [],
    topicScores: {},
    srsCards: {},
    studyStreak: {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: '',
      studiedDates: [],
    },
    preferences: { dailyGoalMinutes: 30, preferredStudyMode: 'mixed' },
  },
  weakAreas: [],
  isLoaded: false,

  loadFromStorage: () => {
    const progress = loadProgress();
    const weakAreas = detectWeakAreas(progress);
    set({ progress, weakAreas, isLoaded: true });
  },

  updateProgress: (updater) => {
    const newProgress = updater(get().progress);
    saveProgress(newProgress);
    const weakAreas = detectWeakAreas(newProgress);
    set({ progress: newProgress, weakAreas });
  },

  getCourseScore: (courseId: string) => {
    return getCourseProgress(get().progress, courseId);
  },
}));
