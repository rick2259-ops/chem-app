'use client';
import { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/quiz';

const STORAGE_KEY = 'ucr-chem-custom-questions';

export function useCustomQuestions(topicId: string) {
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all: Question[] = JSON.parse(raw);
        setCustomQuestions(all.filter(q => q.topicId === topicId));
      }
    } catch {
      // ignore
    }
  }, [topicId]);

  const addQuestions = useCallback((newQuestions: Question[]) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Question[] = raw ? JSON.parse(raw) : [];
      const merged = [...all, ...newQuestions];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setCustomQuestions(prev => [...prev, ...newQuestions.filter(q => q.topicId === topicId)]);
    } catch {
      // ignore
    }
  }, [topicId]);

  const clearQuestions = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Question[] = raw ? JSON.parse(raw) : [];
      const filtered = all.filter(q => q.topicId !== topicId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setCustomQuestions([]);
    } catch {
      // ignore
    }
  }, [topicId]);

  return { customQuestions, addQuestions, clearQuestions };
}
