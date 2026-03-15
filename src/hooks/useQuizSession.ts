'use client';
import { useState, useCallback, useRef } from 'react';
import { Question, QuestionAttempt } from '@/types/quiz';
import { updateTopicScore, addStudySession } from '@/lib/storage/progressStorage';

type QuizState = 'idle' | 'answering' | 'feedback' | 'complete';

export function useQuizSession(
  questions: Question[],
  topicId: string,
  courseId: string
) {
  const [state, setState] = useState<QuizState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());

  const start = useCallback(() => {
    setState('answering');
    startTimeRef.current = Date.now();
    questionStartRef.current = Date.now();
    setCurrentIndex(0);
    setAttempts([]);
  }, []);

  const submitMC = useCallback(
    (index: number) => {
      const q = questions[currentIndex];
      const isCorrect = index === q.correctIndex;
      setSelectedIndex(index);
      setState('feedback');
      setAiFeedback(q.explanation);

      const attempt: QuestionAttempt = {
        questionId: q.id,
        selectedIndex: index,
        isCorrect,
        aiFeedback: q.explanation,
        timeSpentSeconds: Math.round(
          (Date.now() - questionStartRef.current) / 1000
        ),
      };
      setAttempts(prev => [...prev, attempt]);
    },
    [currentIndex, questions]
  );

  const submitShortAnswer = useCallback(
    async (answer: string) => {
      const q = questions[currentIndex];
      setIsGrading(true);
      setState('feedback');

      try {
        const res = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gradingMode: true,
            question: q.prompt,
            correctAnswer: q.correctAnswer,
            studentAnswer: answer,
          }),
        });
        const data = await res.json();
        setAiFeedback(data.feedback);

        const attempt: QuestionAttempt = {
          questionId: q.id,
          textAnswer: answer,
          isCorrect: data.isCorrect,
          aiScore: data.score,
          aiFeedback: data.feedback,
          timeSpentSeconds: Math.round(
            (Date.now() - questionStartRef.current) / 1000
          ),
        };
        setAttempts(prev => [...prev, attempt]);
      } catch {
        setAiFeedback(q.explanation);
        const attempt: QuestionAttempt = {
          questionId: q.id,
          textAnswer: answer,
          isCorrect: false,
          timeSpentSeconds: Math.round(
            (Date.now() - questionStartRef.current) / 1000
          ),
        };
        setAttempts(prev => [...prev, attempt]);
      } finally {
        setIsGrading(false);
      }
    },
    [currentIndex, questions]
  );

  const next = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // Complete
      const correctCount = attempts.filter(a => a.isCorrect).length;
      const score = Math.round((correctCount / questions.length) * 100);
      updateTopicScore(topicId, courseId, score);
      addStudySession({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        topicId,
        courseId: courseId as any,
        activityType: 'quiz',
        durationMinutes: Math.round(
          (Date.now() - startTimeRef.current) / 60000
        ),
        score,
      });
      setState('complete');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
      setTextAnswer('');
      setAiFeedback('');
      questionStartRef.current = Date.now();
      setState('answering');
    }
  }, [currentIndex, questions.length, attempts, topicId, courseId]);

  const score =
    attempts.length > 0
      ? Math.round(
          (attempts.filter(a => a.isCorrect).length / questions.length) * 100
        )
      : 0;

  return {
    state,
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    attempts,
    selectedIndex,
    textAnswer,
    setTextAnswer,
    aiFeedback,
    isGrading,
    score,
    start,
    submitMC,
    submitShortAnswer,
    next,
  };
}
