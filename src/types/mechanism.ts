import { CourseId, ReactionTag } from './course';

export interface Mechanism {
  id: string;
  name: string;
  courseId: CourseId;
  topicId: string;
  reactionType: ReactionTag;
  overview: string;
  steps: MechanismStep[];
}

export interface MechanismStep {
  stepNumber: number;
  title: string;
  explanation: string;
  svgScene: SVGScene;
  keyPoints: string[];
}

export interface SVGScene {
  viewBox: string;
  atoms: SVGAtom[];
  bonds: SVGBond[];
  arrows: SVGArrow[];
  labels: SVGLabel[];
}

export interface SVGAtom {
  id: string;
  element: string;
  x: number;
  y: number;
  formalCharge?: number;
  lonePairs?: number;
  highlight?: 'attack' | 'leaving' | 'forming' | 'breaking' | 'none';
}

export interface SVGBond {
  id: string;
  fromAtomId: string;
  toAtomId: string;
  order: 1 | 2 | 3 | 1.5;
  isForming?: boolean;
  isBreaking?: boolean;
}

export interface SVGArrow {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  controlX: number;
  controlY: number;
  arrowType: 'full' | 'half';
  color?: string;
}

export interface SVGLabel {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
}
