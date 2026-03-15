import { CourseId } from './course';
import { WeakArea } from './progress';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  topicContext?: string;
}

export interface TutorContext {
  currentTopicId: string | null;
  currentCourseId: CourseId | null;
  recentWeakAreas: WeakArea[];
  sessionGoal?: string;
}
