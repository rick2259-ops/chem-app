import { supabase } from './client';
import type { UserProgress } from '@/types/progress';

// ─── User Progress ────────────────────────────────────────────────────────────

export async function loadProgressFromSupabase(userId: string): Promise<UserProgress | null> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress')
      .eq('user_id', userId)
      .single();
    if (error || !data) return null;
    return data.progress as UserProgress;
  } catch {
    return null;
  }
}

export async function saveProgressToSupabase(progress: UserProgress): Promise<void> {
  try {
    await supabase
      .from('user_progress')
      .upsert(
        { user_id: progress.userId, progress, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
  } catch {
    // non-fatal — localStorage is the primary store
  }
}

// ─── Drill Sessions ───────────────────────────────────────────────────────────

export async function loadDrillSessionFromSupabase(userId: string): Promise<unknown> {
  try {
    const { data, error } = await supabase
      .from('drill_sessions')
      .select('data')
      .eq('user_id', userId)
      .single();
    if (error || !data) return null;
    return data.data;
  } catch {
    return null;
  }
}

export async function saveDrillSessionToSupabase(userId: string, data: unknown): Promise<void> {
  try {
    await supabase
      .from('drill_sessions')
      .upsert(
        { user_id: userId, data, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
  } catch {
    // non-fatal
  }
}

export async function clearDrillSessionFromSupabase(userId: string): Promise<void> {
  try {
    await supabase
      .from('drill_sessions')
      .delete()
      .eq('user_id', userId);
  } catch {
    // non-fatal
  }
}
