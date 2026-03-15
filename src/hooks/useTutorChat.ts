'use client';
import { useState, useCallback } from 'react';
import { ChatMessage, TutorContext } from '@/types/tutor';
import { useProgressStore } from '@/store/progressStore';

export function useTutorChat(initialContext?: Partial<TutorContext>) {
  const { weakAreas } = useProgressStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [context, setContext] = useState<TutorContext>({
    currentTopicId: initialContext?.currentTopicId ?? null,
    currentCourseId: initialContext?.currentCourseId ?? null,
    recentWeakAreas: weakAreas.slice(0, 3),
    sessionGoal: initialContext?.sessionGoal,
  });

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
        topicContext: context.currentTopicId ?? undefined,
      };

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        isStreaming: true,
      };

      const updatedMessages = [...messages, userMsg, assistantMsg];
      setMessages(updatedMessages);
      setIsStreaming(true);

      try {
        const res = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg],
            context,
          }),
        });

        if (!res.body) throw new Error('No stream body');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMsg.id
                ? { ...m, content: accumulated }
                : m
            )
          );
        }

        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsg.id
              ? { ...m, content: accumulated, isStreaming: false }
              : m
          )
        );
      } catch (error) {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content: 'Sorry, I encountered an error. Please try again.',
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, context]
  );

  const clearChat = useCallback(() => setMessages([]), []);

  const updateContext = useCallback((updates: Partial<TutorContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  }, []);

  return { messages, isStreaming, context, sendMessage, clearChat, updateContext };
}
