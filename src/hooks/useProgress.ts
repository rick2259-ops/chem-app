'use client';
import { useEffect } from 'react';
import { useProgressStore } from '@/store/progressStore';

export function useProgress() {
  const store = useProgressStore();

  useEffect(() => {
    if (!store.isLoaded) {
      store.loadFromStorage();
    }
  }, []);

  return store;
}
