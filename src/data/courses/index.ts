import { chem008a } from './chem008a';
import { chem008b } from './chem008b';
import { chem008c } from './chem008c';
import { Course, CourseId } from '@/types/course';

export const courses: Course[] = [chem008a, chem008b, chem008c];

export const courseMap: Record<CourseId, Course> = {
  CHEM008A: chem008a,
  CHEM008B: chem008b,
  CHEM008C: chem008c,
};

export function getCourse(id: CourseId): Course {
  return courseMap[id];
}

export function getTopic(topicId: string) {
  for (const course of courses) {
    const topic = course.topics.find(t => t.id === topicId);
    if (topic) return topic;
  }
  return null;
}
