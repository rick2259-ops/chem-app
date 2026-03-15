import { sn2Mechanism } from './sn2';
import { sn1Mechanism } from './sn1';
import { e2Mechanism } from './e2';
import { e1Mechanism } from './e1';
import { aldolMechanism } from './aldol';
import { dielsAlderMechanism } from './diels-alder';
import { easMechanism } from './electrophilic-aromatic';
import { Mechanism } from '@/types/mechanism';

export const allMechanisms: Mechanism[] = [
  sn2Mechanism,
  sn1Mechanism,
  e2Mechanism,
  e1Mechanism,
  aldolMechanism,
  dielsAlderMechanism,
  easMechanism,
];

export const mechanismMap: Record<string, Mechanism> = Object.fromEntries(
  allMechanisms.map(m => [m.id, m])
);

export function getMechanism(id: string): Mechanism | undefined {
  return mechanismMap[id];
}

export function getMechanismsByTopic(topicId: string): Mechanism[] {
  return allMechanisms.filter(m => m.topicId === topicId);
}

export function getMechanismsByCourse(courseId: string): Mechanism[] {
  return allMechanisms.filter(m => m.courseId === courseId);
}

export {
  sn2Mechanism,
  sn1Mechanism,
  e2Mechanism,
  e1Mechanism,
  aldolMechanism,
  dielsAlderMechanism,
  easMechanism,
};
