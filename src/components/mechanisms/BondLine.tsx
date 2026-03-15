import { SVGBond, SVGAtom } from '@/types/mechanism';

interface BondLineProps {
  bond: SVGBond;
  atoms: SVGAtom[];
  animationDelay?: number;
}

function getAtom(atoms: SVGAtom[], id: string) {
  return atoms.find(a => a.id === id);
}

function perpendicularOffset(x1: number, y1: number, x2: number, y2: number, dist: number) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) || 1;
  return { dx: (-(y2 - y1) / len) * dist, dy: ((x2 - x1) / len) * dist };
}

export default function BondLine({ bond, atoms, animationDelay = 0 }: BondLineProps) {
  const from = getAtom(atoms, bond.fromAtomId);
  const to   = getAtom(atoms, bond.toAtomId);
  if (!from || !to) return null;

  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;

  const strokeColor = bond.isBreaking ? '#fb923c' : bond.isForming ? '#4ade80' : '#94a3b8';
  const dashed = bond.isBreaking || bond.isForming ? '6,3' : undefined;
  const opacity = bond.isForming ? 0.65 : 1;
  const delay = `${animationDelay}s`;

  // Shorten ends to avoid overlapping atom circles
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) || 1;
  const trim = 14;
  const ddx = ((x2 - x1) / len) * trim;
  const ddy = ((y2 - y1) / len) * trim;
  const sx1 = x1 + ddx, sy1 = y1 + ddy;
  const sx2 = x2 - ddx, sy2 = y2 - ddy;

  const lineProps = {
    stroke: strokeColor,
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    opacity,
    className: 'bond-animated',
    style: { animationDelay: delay },
    ...(dashed ? { strokeDasharray: dashed } : {}),
  };

  if (bond.order === 1 || bond.order === 1.5) {
    return (
      <g>
        <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} {...lineProps} />
        {bond.order === 1.5 && (() => {
          const { dx: odx, dy: ody } = perpendicularOffset(x1, y1, x2, y2, 4);
          return (
            <line
              x1={sx1 + odx} y1={sy1 + ody} x2={sx2 + odx} y2={sy2 + ody}
              {...lineProps} strokeDasharray="4,4" opacity={0.45}
            />
          );
        })()}
      </g>
    );
  }

  if (bond.order === 2) {
    const { dx: odx, dy: ody } = perpendicularOffset(x1, y1, x2, y2, 3.5);
    return (
      <g>
        <line x1={sx1 - odx} y1={sy1 - ody} x2={sx2 - odx} y2={sy2 - ody} {...lineProps} />
        <line x1={sx1 + odx} y1={sy1 + ody} x2={sx2 + odx} y2={sy2 + ody} {...lineProps} style={{ animationDelay: `${animationDelay + 0.08}s` }} />
      </g>
    );
  }

  if (bond.order === 3) {
    const { dx: odx, dy: ody } = perpendicularOffset(x1, y1, x2, y2, 4);
    return (
      <g>
        <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} {...lineProps} />
        <line x1={sx1 - odx} y1={sy1 - ody} x2={sx2 - odx} y2={sy2 - ody} {...lineProps} style={{ animationDelay: `${animationDelay + 0.07}s` }} />
        <line x1={sx1 + odx} y1={sy1 + ody} x2={sx2 + odx} y2={sy2 + ody} {...lineProps} style={{ animationDelay: `${animationDelay + 0.14}s` }} />
      </g>
    );
  }

  return null;
}
