'use client';
import { useState, useEffect, useCallback } from 'react';
import { Flashcard } from '@/types/flashcard';

const STORAGE_KEY = 'ucr-chem-custom-cards';

export function useCustomCards(deckId: string) {
  const [customCards, setCustomCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all: Flashcard[] = JSON.parse(raw);
        setCustomCards(all.filter(c => c.deckId === deckId));
      }
    } catch {
      // ignore
    }
  }, [deckId]);

  const addCards = useCallback((newCards: Flashcard[]) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Flashcard[] = raw ? JSON.parse(raw) : [];
      const merged = [...all, ...newCards];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setCustomCards(prev => [...prev, ...newCards.filter(c => c.deckId === deckId)]);
    } catch {
      // ignore
    }
  }, [deckId]);

  const removeCard = useCallback((cardId: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Flashcard[] = raw ? JSON.parse(raw) : [];
      const filtered = all.filter(c => c.id !== cardId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setCustomCards(prev => prev.filter(c => c.id !== cardId));
    } catch {
      // ignore
    }
  }, []);

  return { customCards, addCards, removeCard };
}
