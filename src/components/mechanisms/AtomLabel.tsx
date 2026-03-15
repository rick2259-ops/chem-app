import { SVGAtom } from '@/types/mechanism';

const highlightColors: Record<string, string> = {
  attack:  '#60a5fa',  // blue
  leaving: '#f87171',  // red
  forming: '#4ade80',  // green
  breaking:'#fb923c',  // orange
  none:    '#f1f5f9',
};

const highlightBg: Record<string, string> = {
  attack:  '#1e3a8a55',
  leaving: '#7f1d1d55',
  forming: '#14532d55',
  breaking:'#7c2d1255',
};

interface AtomLabelProps {
  atom: SVGAtom;
  animationDelay?: number;
}

export default function AtomLabel({ atom, animationDelay = 0 }: AtomLabelProps) {
  const isHighlighted = atom.highlight && atom.highlight !== 'none';
  const color = isHighlighted ? highlightColors[atom.highlight!] : highlightColors['none'];
  const bg    = isHighlighted ? highlightBg[atom.highlight!] : 'transparent';
  const delay = `${animationDelay}s`;

  return (
    <g className="atom-animated" style={{ animationDelay: delay }}>
      {/* Pulsing highlight ring */}
      {isHighlighted && (
        <circle
          cx={atom.x}
          cy={atom.y}
          r={18}
          fill={bg}
          stroke={color}
          strokeWidth={1.5}
          className="highlight-pulse"
        />
      )}

      {/* Background for readability */}
      <circle
        cx={atom.x}
        cy={atom.y}
        r={12}
        fill="#0f172a"
        opacity={0.85}
      />

      {/* Element symbol */}
      <text
        x={atom.x}
        y={atom.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={15}
        fontWeight="bold"
        fontFamily="'JetBrains Mono', monospace"
        fill={color}
      >
        {atom.element}
      </text>

      {/* Formal charge */}
      {atom.formalCharge != null && atom.formalCharge !== 0 && (
        <text
          x={atom.x + 14}
          y={atom.y - 12}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fontWeight="bold"
          fontFamily="sans-serif"
          fill={atom.formalCharge > 0 ? '#f87171' : '#60a5fa'}
        >
          {atom.formalCharge > 0 ? '+' : '−'}
        </text>
      )}

      {/* Lone pair dots */}
      {atom.lonePairs != null && atom.lonePairs > 0 &&
        Array.from({ length: atom.lonePairs }).map((_, i) => {
          const angle = (i * Math.PI) / atom.lonePairs! + Math.PI / 4;
          const r = 20;
          return (
            <g key={i}>
              <circle cx={atom.x + r * Math.cos(angle) - 3} cy={atom.y + r * Math.sin(angle)} r={1.8} fill={color} />
              <circle cx={atom.x + r * Math.cos(angle) + 3} cy={atom.y + r * Math.sin(angle)} r={1.8} fill={color} />
            </g>
          );
        })
      }
    </g>
  );
}
