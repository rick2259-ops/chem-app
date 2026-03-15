import { SVGScene } from '@/types/mechanism';
import AtomLabel from './AtomLabel';
import BondLine from './BondLine';
import ElectronArrow from './ElectronArrow';

interface MechanismCanvasProps {
  scene: SVGScene;
  stepNumber: number;
}

export default function MechanismCanvas({ scene, stepNumber }: MechanismCanvasProps) {
  // Stagger timings: bonds first → atoms → arrows
  const bondBaseDelay  = 0.05;
  const atomBaseDelay  = 0.15;
  const arrowBaseDelay = 0.55;

  return (
    <div
      key={stepNumber}
      className="w-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
    >
      <svg
        viewBox={scene.viewBox}
        className="w-full"
        style={{ maxHeight: '340px' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep background */}
        <rect width="100%" height="100%" fill="#0f172a" />

        {/* Subtle grid for depth */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

        {/* Bonds — drawn first, staggered */}
        {scene.bonds.map((bond, i) => (
          <BondLine
            key={bond.id}
            bond={bond}
            atoms={scene.atoms}
            animationDelay={bondBaseDelay + i * 0.06}
          />
        ))}

        {/* Electron arrows — draw along path after bonds */}
        {scene.arrows.map((arrow, i) => (
          <ElectronArrow
            key={arrow.id}
            arrow={arrow}
            animationDelay={arrowBaseDelay + i * 0.2}
          />
        ))}

        {/* Atoms — pop in with stagger */}
        {scene.atoms.map((atom, i) => (
          <AtomLabel
            key={atom.id}
            atom={atom}
            animationDelay={atomBaseDelay + i * 0.07}
          />
        ))}

        {/* Text labels — fade in last */}
        {scene.labels.map((label, i) => (
          <text
            key={label.id}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={label.fontSize ?? 11}
            fill={label.color ?? '#64748b'}
            fontFamily="sans-serif"
            opacity={0}
            style={{
              animation: `fadeInUp 0.4s ease ${0.3 + i * 0.08}s forwards`,
            }}
          >
            {label.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
